import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import { light } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useRequest } from 'umi';

const components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter style={light} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
}

export default function IndexPage() {
  const { data } = useRequest(`/article?id=1234`);
  return (
    <div>
      <ReactMarkdown components={components} skipHtml={false} rehypePlugins={[rehypeRaw]} children={data || ''} />
    </div>
  );
}
