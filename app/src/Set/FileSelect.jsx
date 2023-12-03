import React, { useState, useEffect } from 'react';

const FileSelect = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  const fetchFileList = () => {
    fetch('http://localhost:3001/fileList')
      .then(response => response.json())
      .then(data => setFileList(data))
      .catch(error => console.error('Error fetching file list:', error));
  };

  // 页面加载时获取文件列表
  useEffect(() => {
    fetchFileList();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // 使用 fetch 将文件上传到服务器
      fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.text())
        .then(result => {
          console.log(result);
          // 上传成功后重新获取文件列表
          fetchFileList();
        })
        .catch(error => console.error('Error uploading file:', error));
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>

      <div>
        <h2>File List:</h2>
        <ul>
          {fileList.map((fileName, index) => (
            <li key={index}>{fileName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileSelect;
