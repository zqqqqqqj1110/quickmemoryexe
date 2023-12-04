//训练设置
import React from 'react';
import FileSelect from './Set/FileSelect';
import FontSelect from './Set/FontSelect';
import Custom from './Set/Custom';

const Option03Component = () => {
  return(
    <div>
        <FileSelect />
        <br />
        <br />
        <br />
        <FontSelect />
        <br />
        <br />
        <br />
        <p><Custom /></p>
    </div>

      );
};

export default Option03Component;