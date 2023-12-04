import React, { useState, useEffect } from 'react';
import { setPath } from '../constant';
import { Select, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const FileListSelect = ({ fileList, onFileSelection, selectedFileName }) => {
  return (
    <Select style={{ width: 200 }} onChange={onFileSelection} value={selectedFileName}>
      <Option value="">选择文本</Option>
      {fileList.map((fileName, index) => (
        <Option key={index} value={fileName}>
          {fileName}
        </Option>
      ))}
    </Select>
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
          message.success('文件上传成功');
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          message.error('文件上传失败');
        });
    } else {
      console.log('No file selected');
    }
  };

  const handleFileSelection = async (value) => {
    const selectedFileName = value;

    // 检查文件名是否以 .txt 结尾，如果不是，则添加
    const formattedFileName = selectedFileName.endsWith('.txt') 
      ? selectedFileName 
      : `${selectedFileName}.txt`;

    setSelectedFileName(formattedFileName);
    setPath(formattedFileName);

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
      <Upload beforeUpload={() => false}>
        选择上传文件：
        <Button icon={<UploadOutlined />}>选择文本文件</Button>
      </Upload>
      <Button type="primary" onClick={handleFileUpload}>上传文件</Button>
      <br />
      <br />
      <FileListSelect
        fileList={fileList}
        onFileSelection={handleFileSelection}
        selectedFileName={selectedFileName}
      />
      <br />
      <Button type="primary" onClick={handleGetSelectedFile}>确定</Button>

      {/* 确保正确传递 selectedFileName 到 OptionSD1Component */}
    </div>
  );
};

export default FileSelect;
