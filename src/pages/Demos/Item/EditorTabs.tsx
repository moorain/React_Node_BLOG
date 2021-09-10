import React, { useState } from "react";
import { Radio, Button, Popover, Checkbox } from 'antd';
import { getQueryVariable, requestFunc } from '@/util';
import { cdnOptions, CDN_ENUM_OBJ } from './constant'
import EditorCom from './Editor';

const files: any = {
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: `
    function App(){
      return (
          <h1 className="name">Hello, world!</h1>
      )
  }
  
  
  ReactDOM.render(<App/>, document.getElementById('root'));
    `,
  },
  "style.css": {
    name: "style.css",
    language: "css",
    value: 'body{\r\n    padding:10px\r\n}',
  },
  "index.html": {
    name: "index.html",
    language: "html",
    value: '<div id="root"></div>',
  },
  key: '',
  cdns: []
}

let isChange = false;
export default function App(props) {
  const [fileName, setFileName] = useState("script.js");
  const [cdn, setCdn] = useState([]);

  const file = files[fileName];

  const handleModeChange = (e: any) => {
    setFileName(e.target.value)
  }

  const onChange = (val: string | undefined) => {
    files[fileName].value = val;
    isChange = true;
  }

  const codeChange = () => {
    console.log(isChange, 'update')
    const key = getQueryVariable('key');
    if (key) {
      files.key = key;
    } else {
      files.key = new Date().valueOf();
    }
    console.log(files, 'files')
    requestFunc('/codeChange', {
      method: 'post',
      data: files,
    }).then(res => {
      isChange = false;
      if (res?.isSuccess) {
        window.history.replaceState({}, '', `/#/single?key=${files.key}`)
        props.setUrl({
          url: res?.data?.url,
          key: new Date().valueOf()
        })
      }
    })

    // if (isChange) {
    //   requestFunc('/codeChange', {
    //     method: 'post',
    //     data: files,
    //   }).then(res => {
    //     isChange = false;
    //     if (res?.isSuccess) {
    //       window.history.replaceState({}, '', `/#/single?key=${files.key}`)
    //       props.setUrl({
    //         url: res?.data?.url,
    //         key: new Date().valueOf()
    //       })
    //     }
    //   })
    // }
  }

  const onCheckboxChange = (vals: any) => {
    setCdn(vals)
  }

  const confirmCdn = () => {
    const cdns: any = []
    cdn.forEach((item) => {
      if (CDN_ENUM_OBJ[item]) {
        cdns.push(CDN_ENUM_OBJ[item])
      }
    })
    files.cdns = cdns;
    isChange = true;
    codeChange()
  }

  const content = (
    <div>
      <div>
        <Checkbox.Group
          value={cdn}
          options={cdnOptions}
          onChange={onCheckboxChange}
        />
      </div>
      <div style={{ paddingTop: 20, textAlign: 'right' }}>
        <Button onClick={confirmCdn} size='small' type='primary' style={{ marginLeft: 20 }}>确定</Button>
      </div>
    </div>
  )

  return (
    <div>
      <>
        <div style={{ paddingBottom: 10 }}>
          <Radio.Group size='small' onChange={handleModeChange} value={fileName} style={{ marginBottom: 8 }}>
            <Radio.Button value="script.js">javascript</Radio.Button>
            <Radio.Button value="style.css">CSS</Radio.Button>
            <Radio.Button value="index.html">HTML</Radio.Button>
          </Radio.Group>
          <Popover content={content} title="CDN" trigger="click">
            <Button size='small' style={{ marginLeft: 20 }}>CDN</Button>
          </Popover>

          <div style={{ float: 'right' }}>
            <Button size='small' onClick={codeChange}>运行</Button>
          </div>
        </div>
        <div>
          <EditorCom onChange={onChange} file={file} save={codeChange} />
        </div>
      </>
    </div>
  );
}