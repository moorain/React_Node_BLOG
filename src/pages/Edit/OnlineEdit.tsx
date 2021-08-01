// import MDEditor from "@uiw/react-md-editor";
import { useState } from 'react';
import { Button } from 'antd';
import { request, history } from 'umi'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import { requestFunc } from '@/util';
import MediaModal from './MediaModal';


const mdParser = new MarkdownIt({
  highlight: function (str: string, lang: string) {
    console.log(str, lang)
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) { }
    }

    return ''; // use external default escaping
  }
});

const mkdStr = `# Markdown Editor for [React](https://facebook.github.io/react/)

**Hello world!!!**

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

export default function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="container">
      <MEDitor
        value={value}
        onChange={setValue}
      />
      <MDEditor.Markdown source={value} />
    </div>
  );
}
\`\`\`
`;

function OnlineEdit() {
  const [value, setValue] = useState(mkdStr);
  const [visible, setVisible] = useState(false)
  function handleEditorChange({ html, text }) {
    setValue(text);
  }

  return (
    <div className="container">
      <div style={{ padding: '20px 0' }}>
        <Button onClick={() => {
          history.push('./edit')
        }}>返回列表</Button>
        <Button style={{ marginLeft: 10 }} onClick={() => { setVisible(true) }}>媒体库</Button>
        <div style={{ float: 'right' }}>
          <Button type='default' style={{ marginRight: 10 }} onClick={() => {
            console.log(value, 'value')
          }}>重置</Button>
          <Button type='primary' onClick={() => {
            const param = {
              title: 'test',
              description: 'test',
              content: value,
            }
            requestFunc('/morain/addOnlineEditArticle', { data: param, method: 'POST' })
          }}>保存</Button>
        </div>

      </div>
      <div>
        <MediaModal visible={visible} visibleChange={(flag) => { setVisible(flag) }} />
      </div>

      <MdEditor
        value={value}
        style={{ height: '600px' }}
        renderHTML={text => mdParser.render(text)}
        onChange={handleEditorChange} />
    </div>
  );
}


export default OnlineEdit;