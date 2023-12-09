import React, { useState, useEffect } from 'react';
import { Upload, Button, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { setFont } from '../constant';

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
      // 上传成功后刷新字体列表
      fetchFontList();
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      setUploadError('上传字体失败，请检查文件和服务器配置');
      message.error(`${info.file.name} 上传失败`);
    }
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
          accept=".ttf"
          customRequest={({ file, onSuccess, onError }) => {
            const formData = new FormData();
            formData.append('fontFile', file);

            fetch('http://localhost:3001/upload-font', {
              method: 'POST',
              body: formData,
            })
              .then(response => response.json())
              .then(data => {
                onSuccess(data, file);
              })
              .catch(error => {
                onError(error, file);
              });
          }}
          onChange={handleFileChange}
        >
          <h2>字体上传</h2>
          <Button icon={<UploadOutlined />}>选择字体文件</Button>
        </Upload>
        {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      </div>
      <br />
      <div>
        <label htmlFor="selectFont">
          <h2>选择字体</h2>
        </label>
        <Select
          id="selectFont"
          style={{ width: 200, marginTop: 16 }}
          value={selectedFont} // 将value改为selectedFont
          onChange={(value) => setSelectedFont(value)}
        >
          <Option value="" disabled>
            选择字体
          </Option>
          {allFonts.map((font, index) => (
            <Option key={font} value={font}> {/* 将value改为字体文件名 */}
              {font}
            </Option>
          ))}
</Select>
      </div>
      <div>
        <Button type="primary" onClick={handleConfirm}>获取文件名</Button>
      </div>
    </div>
  );
};

export default FontSelect;
