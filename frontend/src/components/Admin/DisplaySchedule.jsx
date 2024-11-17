import { useEffect, useState } from "react";
import { API_URL } from "../../../configure";

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
          // Assuming you're fetching the latest uploaded file (you can adjust this)
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {uploadedImage ? (
        <div className="text-center">
          <h2 className="text-lg font-semibold">Updated Schedule:</h2>
          <img
            src={`${API_URL}/${uploadedImage.filepath}`}
            alt={uploadedImage.filename}
            className="mt-4 w-full h-auto object-contain rounded-lg"
          />
        </div>
      ) : (
        <p>No image uploaded yet.</p>
      )}
    </div>
  );
};

export default DisplayUploadedImage;
