// import MDEditor from "@uiw/react-md-editor";
import { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

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

  function handleEditorChange({ html, text }) {
    setValue(text);
  }

  return (
    <div className="container">
      <MdEditor
        value={value}
        style={{ height: '500px' }}
        renderHTML={text => mdParser.render(text)}
        onChange={handleEditorChange} />
    </div>
  );
}


export default OnlineEdit;