// utils/uploadImages.js
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function uploadImages(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await axios.post(`${API_URL}/uploads/files`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set appropriate content type
      },
    });

    return response.data; // Axios automatically parses JSON, so no need to call response.json()
  } catch (error) {
    console.error("Error uploading images:", error);
    if (error instanceof Error && error.message) {
      toast(error.message, {type: "error"});
    }
    // throw error;
  }
}

// utils/uploadZip.js

export async function uploadZip(file) {
  console.log(file, "FILE");
  const formData = new FormData();
  formData.append("file", file[0]);

  try {
    const response = await fetch(`${API_URL}/uploads/game/file`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload zip file");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading zip file:", error);
    if (error instanceof Error && error.message) {
      toast(error.message, {type: "error"});
    }
  }
}
