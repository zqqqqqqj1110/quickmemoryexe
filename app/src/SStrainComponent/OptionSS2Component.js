import React, { useEffect, useState, useCallback, useRef } from 'react';
import '../css/OptionSS1Component.css';
import { getFont, getPath } from '../constant';
import FormSettingContext from './FomSettingContext';
import FileSelect2CY from '../Set/FileSelect2CY';

const OptionSS2Component = () => {
  const [randomChars, setRandomChars] = useState('');
  const [data, setData] = useState({ fontsize: '', timegap: null });
  const [currentIndex, setCurrentIndex] = useState(-1);
  const timer = useRef(null);

  const onSummit = useCallback((value) => {
    setData(value);
  }, []);

  const onReset = useCallback(() => {
    setData({});
    setCurrentIndex(-1);
    beginTimer();
  }, []);

  const clearTimer = (type) => {
    if (type === 'continue') {
      beginTimer();
    } else {
      clearInterval(timer.current);
    }
  };

  const beginTimer = () => {
    if (!timer.current) {
      timer.current = setInterval(() => {
        const g = getPath();
        const filePath = `/CY/${g}`;
        fetch(filePath)
          .then((response) => response.text())
          .then((fileData) => {
            const sentences = fileData.split(/[ \n]+/);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
            setRandomChars(sentences[currentIndex]);
          })
          .catch((error) => console.error('Error reading file:', error));
      }, data.timegap ? Number(data.timegap) * 1000 : 1000);
    } else {
      clearInterval(timer.current);
      timer.current = null;
      beginTimer();
    }
  };

  useEffect(() => {
    const fontPath = `/Font/${getFont()}`;
    const fontFaceRule = `@font-face { font-family: 'CustomFont'; src: url("${fontPath}"); font-weight: normal; font-style: normal; }`;

    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(fontFaceRule));
    document.head.appendChild(styleElement);

    return () => {
      clearInterval(timer.current);
      timer.current = null;
    };
  }, []);

  useEffect(() => {
    beginTimer();
  }, [data.timegap, currentIndex]);

  return (
    <FormSettingContext onSummit={onSummit} onReset={onReset} clearTimer={clearTimer}>
      <div className="text" style={{ fontSize: data.fontsize ? data.fontsize + 'rem' : '2rem' }}>
        {randomChars}
      </div>
      <FileSelect2CY />
    </FormSettingContext>
  );
};

export default OptionSS2Component;
