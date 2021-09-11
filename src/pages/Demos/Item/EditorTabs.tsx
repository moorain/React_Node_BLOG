import React, { useState, useEffect, useRef } from "react";
import { Radio, Button, Popover, Checkbox } from 'antd';
import { getQueryVariable, requestFunc, getDate } from '@/util';
import { cdnOptions, CDN_ENUM_OBJ } from './constant'
import EditorCom from './Editor';

const filesInit: any = {
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: `//console.log(111)`,
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
  const key = getQueryVariable('key');
  const [fileName, setFileName] = useState("script.js");
  const [cdn, setCdn] = useState([]);
  const [file, setFile] = useState();

  const fileRef = useRef(filesInit)

  useEffect(() => {
    if (key) {
      requestFunc(`/codeQuery?key=${key}`, {
        method: 'GET',
      }).then((res) => {
        const files = res?.data?.filesJson ? JSON.parse(res?.data?.filesJson) : filesInit;
        fileRef.current = files;
        setFile(files[fileName])
        codeChange(fileRef.current);
      })
    } else {
      setFile(filesInit[fileName])
    }
  }, [key])


  const handleModeChange = (e: any) => {
    setFileName(e.target.value)
    setFile(fileRef.current[e.target.value])
  }

  const onChange = (val: string | undefined) => {
    fileRef.current[fileName].value = val;
    isChange = true;
  }

  const codeChange = (currentFiles: any) => {
    const curFiles = currentFiles;
    if (!curFiles?.key) {
      curFiles.key = new Date().valueOf();
    }
    requestFunc('/codeChange', {
      method: 'post',
      data: curFiles,
    }).then(res => {
      isChange = false;
      if (res?.isSuccess) {
        window.history.replaceState({}, '', `/#/single?key=${curFiles.key}`)
        props.setUrl({
          url: res?.data?.url,
          key: new Date().valueOf(),
        })
      }
    })
  }

  // const onCheckboxChange = (vals: any) => {
  //   setCdn(vals)
  // }

  // const confirmCdn = () => {
  //   const cdns: any = []
  //   cdn.forEach((item) => {
  //     if (CDN_ENUM_OBJ[item]) {
  //       cdns.push(CDN_ENUM_OBJ[item])
  //     }
  //   })
  //   fileRef.current.cdns = cdns;
  //   isChange = true;
  //   codeChange(fileRef.current);
  // }

  // const content = (
  //   <div>
  //     <div>
  //       <Checkbox.Group
  //         value={cdn}
  //         options={cdnOptions}
  //         onChange={onCheckboxChange}
  //       />
  //     </div>
  //     <div style={{ paddingTop: 20, textAlign: 'right' }}>
  //       <Button onClick={confirmCdn} size='small' type='primary' style={{ marginLeft: 20 }}>确定</Button>
  //     </div>
  //   </div>
  // )

  const save = () => {
    const filsJSON = JSON.stringify(fileRef.current);

    const params = {
      id: fileRef.current.key || new Date().valueOf(),
      userId: 123,
      userName: 'admin',
      filesJson: filsJSON,
      createDate: getDate(new Date()),
    }

    requestFunc('/codeSave', {
      method: 'post',
      data: params,
    }).then(res => {
      // console.log(res, 'res')
    })
  }

  return (
    <div>
      <>
        <div style={{ paddingBottom: 10 }}>
          <Radio.Group size='small' onChange={handleModeChange} value={fileName} style={{ marginBottom: 8 }}>
            <Radio.Button value="script.js">javascript</Radio.Button>
            <Radio.Button value="style.css">CSS</Radio.Button>
            <Radio.Button value="index.html">HTML</Radio.Button>
          </Radio.Group>
          {/* <Popover content={content} title="CDN" trigger="click">
            <Button size='small' style={{ marginLeft: 20 }}>CDN</Button>
          </Popover> */}
          <div style={{ float: 'right' }}>
            <Button size='small' onClick={save} style={{ margin: '0 20px' }}>保存</Button>
            <Button size='small' onClick={() => { codeChange(fileRef.current) }} type='primary'>运行</Button>
          </div>
        </div>
        <div>
          <EditorCom onChange={onChange} file={file} save={() => { codeChange(fileRef.current) }} />
        </div>
      </>
    </div>
  );
}