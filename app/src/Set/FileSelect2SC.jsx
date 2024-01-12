import React, { useState, useEffect } from 'react';
import { Upload, Button, Select, message } from 'antd';
import { setPath } from '../constant';
import '../css/XL.css';
import '../css/SD.css';

const { Option } = Select;

const FileSelect2SC = () => {
  const [fileList, setFileList] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploadError, setUploadError] = useState('');

  const fetchFileList = async () => {
    try {
      const response = await fetch('http://ymq.xqzyyds.top:3001/fileList2SC');
      const data = await response.json();
      setFileList(data);
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  };

  useEffect(() => {
    fetchFileList();
  }, []);

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('fileSC', file);

    fetch('http://ymq.xqzyyds.top:3001/upload2SC', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);
        fetchFileList();
        setUploadError('');
        message.success('文件上传成功');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setUploadError('文件上传失败');
        message.error('文件上传失败');
      });
  };

  const handleFileSelection = async (value) => {
    const selectedFileName = value;
    const formattedFileName = selectedFileName.endsWith('.txt') 
      ? selectedFileName 
      : `${selectedFileName}.txt`;

    setSelectedFileName(formattedFileName);
    setPath(formattedFileName);

    try {
      const response = await fetch(`http://ymq.xqzyyds.top:3001/SC/${formattedFileName}`);
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
    <div className='row' style={{ margin: '20px' }}>
      <div class="fileselect1">
         <h3>文件上传</h3>
      <Upload
        accept=".txt"
        customRequest={({ file }) => handleFileUpload(file)}
        showUploadList={false}
      >
        <Button>选择文本文件以上传</Button>
      </Upload>

      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      </div>
      <br />
      <div class="fontselect2">
        <h3>选择文件</h3>
      <Select
        style={{ width: 200}}
        placeholder="选择文本"
        onChange={handleFileSelection}
        value={selectedFileName}
      >
        {fileList.map((fileName, index) => (
          <Option key={index} value={fileName}>
            {fileName}
          </Option>
        ))}
      </Select>
      </div>
    </div>
  );
};

export default FileSelect2SC;
