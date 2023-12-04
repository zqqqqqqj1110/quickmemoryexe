import React, { useState, useEffect } from 'react';
import { setFont } from '../constant';
import { Upload, Button, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const FontSelect = () => {
  const [selectedFont, setSelectedFont] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [allFonts, setAllFonts] = useState([]);

  useEffect(() => {
    fetchFontList();
  }, []);

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      setSelectedFont(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      setUploadError('上传字体失败');
    }
  };

  const handleFontUpload = ({ file }) => {
    const formData = new FormData();
    formData.append('fontFile', file);

    fetch('http://localhost:3001/upload-font', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        message.success('上传字体成功');
        setAllFonts(prevFonts => [...prevFonts, data.fileName]);
      })
      .catch(error => {
        console.error('上传字体失败', error.message);
        setUploadError('上传字体失败');
      });
  };

  const fetchFontList = () => {
    fetch('http://localhost:3001/fontList')
      .then(response => response.json())
      .then(data => {
        setAllFonts(data);
      })
      .catch(error => console.error('获取字体文件列表失败', error.message));
  };

  const handleConfirm = () => {
    if (selectedFont) {
      console.log("选择的字体：", selectedFont);
      setFont(selectedFont);
    } else {
      console.log("没有选择字体");
    }
  };

  return (
    <div>
      <div>
        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          showUploadList={false}
        >
          选择字体文件：
          <Button icon={<UploadOutlined />}>选择字体文件</Button>
        </Upload>
      </div>
      <div>
        <Button type="primary" onClick={handleFontUpload}>上传</Button>
        {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      </div>
      <div>
        <Select
          style={{ width: 200 }}
          value={selectedFont ? selectedFont.name : ""}
          onChange={(value) => setSelectedFont(value)}
        >
          <Option value="" disabled>
            选择字体
          </Option>
          {allFonts.map((font, index) => (
            <Option key={index} value={font}>
              {font}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <Button type="primary" onClick={handleConfirm}>确定</Button>
      </div>
    </div>
  );
};

export default FontSelect;
