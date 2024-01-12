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
    fetch('http://ymq.xqzyyds.top:3001/fontList')
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
    <div className='row' style={{ margin: '20px' }}>
      <div  class="fontselect1">
        <Upload
          accept=".ttf"
          customRequest={({ file, onSuccess, onError }) => {
            const formData = new FormData();
            formData.append('fontFile', file);

            fetch('http://ymq.xqzyyds.top:3001/upload-font', {
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
          <h3>字体上传</h3>
          <Button icon={<UploadOutlined />}>选择字体文件</Button>
        </Upload>
        {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      </div>
      <br />
      <div class="fontselect2">
        <label htmlFor="selectFont">
          <h3>选择字体</h3>
        </label>
        <Select
          id="selectFont"
          style={{ width: 200}}
          value={selectedFont} // 将value改为selectedFont
          onChange={(value) => setSelectedFont(value)}
        >
          <Option value="" disabled>
            <h3>选择字体</h3>
          </Option>
          {allFonts.map((font, index) => (
            <Option key={font} value={font}> {/* 将value改为字体文件名 */}
              {font}
            </Option>
          ))}
</Select>
      </div>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Button type="primary" onClick={handleConfirm} size="large">确定</Button>
      </div>
    </div>
  );
};

export default FontSelect;
