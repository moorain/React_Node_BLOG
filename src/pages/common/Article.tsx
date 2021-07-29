// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import ReactMarkdown from 'react-markdown';
// import rehypeRaw from 'rehype-raw'
// import { light } from 'react-syntax-highlighter/dist/esm/styles/prism';

import MarkdownIt from 'markdown-it';
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

// const components = {
//   code({ node, inline, className, children, ...props }: any) {
//     const match = /language-(\w+)/.exec(className || '')
//     return !inline && match ? (
//       <SyntaxHighlighter style={light} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
//     ) : (
//       <code className={className} {...props}>
//         {children}
//       </code>
//     )
//   }
// }

interface Iprops {
  data: string,
}

export default function IndexPage(props: Iprops) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: mdParser.render(props?.data) }}></div>
      {/* <ReactMarkdown components={components} skipHtml={false} rehypePlugins={[rehypeRaw]} children={props?.data || ''} /> */}
    </div>
  );
}

