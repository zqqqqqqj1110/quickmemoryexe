import React, { useState, useEffect } from 'react';
import { setPath } from '../constant';

const FileListSelect = ({ fileList, onFileSelection, selectedFileName }) => {
  return (
    <div>
      <h2>文本选择</h2>
      <select onChange={onFileSelection} value={selectedFileName}>
        <option value="">选择文本</option>
        {fileList.map((fileName, index) => (
          <option key={index} value={fileName}>
            {fileName}
          </option>
        ))}
      </select>
    </div>
  );
};

const FileSelect = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');

  const fetchFileList = async () => {
    try {
      const response = await fetch('http://localhost:3001/fileList');
      const data = await response.json();
      setFileList(data);
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
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

  const handleFileSelection = async (event) => {
    const selectedFileName = event.target.value;

    // 检查文件名是否以 .txt 结尾，如果不是，则添加
    const formattedFileName = selectedFileName.endsWith('.txt') 
      ? selectedFileName 
      : `${selectedFileName}.txt`;

    setSelectedFileName(formattedFileName);
    setPath(formattedFileName)

    // 在选择文件后立即获取所选文件
    try {
      const response = await fetch(`http://localhost:3001/TXT/${formattedFileName}`);
      const data = await response.text();
      console.log('Selected File Content:', data);
    } catch (error) {
      console.error('Error reading selected file:', error);
    }
  };

  const handleGetSelectedFile = () => {
    return selectedFileName;
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>上传文件</button>

      <FileListSelect
        fileList={fileList}
        onFileSelection={handleFileSelection}
        selectedFileName={selectedFileName}
      />

      <button onClick={handleGetSelectedFile}>确定</button>

      {/* 确保正确传递 selectedFileName 到 OptionSD1Component */}
    </div>
  );
};

export default FileSelect;