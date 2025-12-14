import { useRef, useState } from "react";
import axios from "axios";

export default function ImageUpload({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Trigger the hidden file input
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // 1. Get Presigned URL
      const { data } = await axios.post("http://localhost:8000/get-upload-url", {
        filename: file.name,
        contentType: file.type
      });

      const uploadUrl = data.uploadUrl;

      // 2. Upload to Cloud
      await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type
        }
      });

      // 3. Notify Parent to Refresh
      onUploadSuccess();
      alert("Image Uploaded!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
      // Reset input so same file can be selected again if needed
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button 
        className="btn-upload" 
        onClick={handleButtonClick}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "+ Upload New"}
      </button>
    </>
  );
}