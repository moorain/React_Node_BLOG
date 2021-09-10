
import React, { useState, useEffect } from "react";
import EditorTabs from './EditorTabs';
import IframeBox from './IframeBox';
import { getQueryVariable, requestFunc } from '@/util';

export default () => {
  const [urlObj, setUrl] = useState({
    url: `http://localhost:8001/editor_${getQueryVariable('key')}.html`
  });
  return (
    <div style={{ padding: 20, display: 'flex', justifyContent: 'space-around', background: '#fff' }}>
      <div style={{ width: '45%', border: '1px solid #d9d9d9', padding: 10 }}>
        <EditorTabs setUrl={setUrl} />
      </div>
      <div style={{ width: '45%', border: '1px solid #d9d9d9', padding: 10 }}>
        <IframeBox urlObj={urlObj} />
      </div>
    </div>
  )
}

