// utils/uploadImages.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function uploadImages(files) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await fetch(`${API_URL}/uploads/files`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload images");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
}


// utils/uploadZip.js

export async function uploadZip(file) {
    console.log(file, "FILE")
    const formData = new FormData();
    formData.append('file', file[0]);
  
    try {
      const response = await fetch(`${API_URL}/uploads/game/file`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {predux
        throw new Error('Failed to upload zip file');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error uploading zip file:', error);
      throw error;
    }
  }
  