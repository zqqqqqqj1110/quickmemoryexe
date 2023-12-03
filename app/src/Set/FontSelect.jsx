import React, { useState, useEffect } from 'react';
import { setFont } from '../constant';

const FontSelect = () => {
  const [selectedFont, setSelectedFont] = useState(null); // 将初始状态设置为 null
  const [uploadError, setUploadError] = useState(null);
  const [allFonts, setAllFonts] = useState([]);

  useEffect(() => {
    // 在组件加载时获取所有字体文件列表
    fetchFontList();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("选择的文件：", file);

    setSelectedFont(file); // 保存文件对象而不是文件名
  };

  const handleFontUpload = () => {
    setUploadError(null);

    if (selectedFont) {
      const formData = new FormData();
      formData.append('fontFile', selectedFont);

      console.log("准备上传文件：", selectedFont);

      fetch('http://localhost:3001/upload-font', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('上传字体成功', data);
          // 上传成功后刷新字体列表
          fetchFontList();
          // 在这里可以处理上传成功的逻辑
        })
        .catch(error => {
          console.error('上传字体失败', error.message);
          setUploadError('上传字体失败，请检查文件和服务器配置');
          // 在这里可以处理上传失败的逻辑
        });
    }
  };

  const fetchFontList = () => {
    fetch('http://localhost:3001/fontList') // 使用正确的端点和端口号
      .then(response => response.json())
      .then(data => {
        console.log('获取字体文件列表成功', data);
        setAllFonts(data);
      })
      .catch(error => console.error('获取字体文件列表失败', error.message));
  };

  const handleConfirm = () => {
    if (selectedFont) {
      // 在这里处理选择字体后的逻辑
      console.log("选择的字体：", selectedFont);
      setFont(selectedFont);

    } else {
      console.log("没有选择字体");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="fontFile">选择字体文件：</label>
        <input type="file" id="fontFile" accept=".ttf" onChange={handleFileChange} />
      </div>
      <div>
        <button onClick={handleFontUpload}>上传字体文件</button>
        {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      </div>
      <div>
        <label htmlFor="selectFont">选择字体：</label>
        <select
          id="selectFont"
          value={selectedFont ? selectedFont.name : ""}
          onChange={(e) => setSelectedFont(e.target.value)}
        >
          <option value="" disabled>
            选择字体
          </option>
          {allFonts.map((font, index) => (
            <option key={index} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>
      <div>
        {/* 添加确定按钮 */}
        <button onClick={handleConfirm}>获取文件名</button>
      </div>
    </div>
  );
};

export default FontSelect;
