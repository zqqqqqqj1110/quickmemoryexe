// FileContext.js
import React, { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleGetSelectedFile = () => {
    return selectedFileName;
  };

  return (
    <FileContext.Provider value={{ selectedFileName, setSelectedFileName, handleGetSelectedFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
