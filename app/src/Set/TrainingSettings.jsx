import OptionSD1Component from './OptionSD1Component';
import React, { useState, useEffect } from 'react';

const TrainingSettings = ({ onSelectFile }) => {
  const [fileList, setFileList] = useState([]);

  const fetchFileList = () => {
    fetch('http://localhost:3001/fileList')
      .then(response => response.json())
      .then(data => setFileList(data))
      .catch(error => console.error('Error fetching file list:', error));
  };

  useEffect(() => {
    fetchFileList();
  }, []);

  const handleFileSelect = (selectedFile) => {
    onSelectFile(selectedFile);
  };

  return (
    <div>
      <h2>Select Training File:</h2>
      <ul>
        {fileList.map((fileName, index) => (
          <li key={index} onClick={() => handleFileSelect(fileName)}>
            {fileName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainingSettings;
