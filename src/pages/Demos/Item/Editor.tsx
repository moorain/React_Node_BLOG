import React, { useRef } from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";
export default (props) => {
  const monacoRef = useRef(null);
  const { options } = props;
  function handleEditorWillMount(monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    // monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

  }

  function handleEditorDidMount(editor, monaco) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
      if (props?.save) {
        props.save()
      }
    })
  }

  const curoptions = {
    ...options,
  }

  const { onChange, file } = props;
  return (
    <div>
      <Editor
        height="80vh"
        theme="vs-light"
        onChange={onChange}
        path={file?.name}
        defaultLanguage={file?.language}
        defaultValue={file?.value}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}