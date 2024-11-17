import { useState } from "react";
import { API_URL } from "../../../configure";
import { toast} from "sonner";
const AddSchedule = () => {
  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    previewFile(selectedFile);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    previewFile(droppedFile);
  };

  const previewFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setPreview("");
    document.getElementById("fileInput").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "profileImage",
      document.getElementById("fileInput").files[0]
    );

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        // On successful upload, set the uploaded file details
        setUploadedFile(data.file);
        toast("Schedule updated successfully!");
      } else {
        toast("error while uploading a schedule!");
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <div
        className={`w-full max-w-md p-6 bg-white rounded-lg shadow-lg transition ${
          isDragging ? "opacity-75 border-2 border-green-400" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Upload Schedule
        </h1>

        <div
          className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center cursor-pointer transition ${
            isDragging ? "border-green-400 bg-green-50" : "border-gray-300"
          }`}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <p className="text-gray-500">Drag and drop a file here</p>
          <p className="text-gray-500">or</p>
          <button
            type="button"
            className="text-lime-700 font-semibold hover:underline"
          >
            Choose File
          </button>
          <input
            id="fileInput"
            type="file"
            name="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {preview && (
          <div className="mb-4">
            <h2 className="text-sm font-medium text-gray-700">Preview:</h2>
            <img
              src={preview}
              alt="File Preview"
              className="mt-2 w-full h-40 object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={handleCancel}
              className="mt-2 px-2 py-2 text-sm bg-black text-white font-semibold rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-customYellow text-black font-semibold rounded-lg"
        >
          Upload File
        </button>
      </div>
    </form>
  );
};

export default AddSchedule;
