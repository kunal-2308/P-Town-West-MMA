import { useEffect, useState } from "react";
import { API_URL } from "../../../../configure";

const DisplayUploadedImage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${API_URL}/api/uploads`);
        const data = await response.json();
        if (data.length > 0) {
          const latestImage = data[data.length - 1];
          setUploadedImage(latestImage);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching uploaded image:", err);
        setError("Failed to load image");
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  if (loading) return <p className="text-center text-xl mt-20">Loading...</p>;
  if (error)
    return <p className="text-center text-xl text-red-500 mt-20">{error}</p>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      {uploadedImage ? (
        <div className="text-center py-20 max-w-4xl ">
          <h2 className="text-2xl font-semibold mb-4">Class Schedule:</h2>
          <img
            src={`${API_URL}/${uploadedImage.filepath}`}
            alt={uploadedImage.filename}
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg border-2 border-gray-200 mb-4"
          />
          <a
            href={`${API_URL}/${uploadedImage.filepath}`}
            download={uploadedImage.filename}
            className="inline-block px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Download Image
          </a>
        </div>
      ) : (
        <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-3xl">
          <p className="text-xl font-semibold">
            Schedule has not been uploaded yet
          </p>
          <p className="text-lg mt-2">
            Please wait or contact us for more details
          </p>
        </div>
      )}
    </div>
  );
};

export default DisplayUploadedImage;
