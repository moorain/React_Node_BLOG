// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import ReactMarkdown from 'react-markdown';
// import rehypeRaw from 'rehype-raw'
// import { light } from 'react-syntax-highlighter/dist/esm/styles/prism';

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/atom-one-light.css';
// import 'highlight.js/styles/default.css';

const mdParser = new MarkdownIt({
  highlight: function (str: string, lang: string) {
    const langStr = lang || 'javascript'
    if (langStr && hljs.getLanguage(langStr)) {
      try {
        return hljs.highlight(str, { language: langStr }).value;
      } catch (__) { }
    }

    return '';
  }
});

interface Iprops {
  data: string,
}

export default function IndexPage(props: Iprops) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: mdParser.render(props?.data) }}></div>
    </div>
  );
}

