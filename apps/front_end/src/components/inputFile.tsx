import React, { useRef } from 'react';
import Button from '@mui/material/Button';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  // Function to handle file selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  console.log('Selected file:', file);

  const formData = new FormData();
  formData.append('file', file);  // 'file' matches server multer field

  //fetching to the server


  // Optional: Reset input
  event.target.value = '';
};

  return (
    <div>
      <Button
        variant="contained"
        component="span"
        startIcon={<CloudUploadIcon />}
        onClick={handleButtonClick}
      >
        Upload File
      </Button>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploadButton;