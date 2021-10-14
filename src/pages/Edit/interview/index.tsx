import { requestFunc } from '@/util'
import { Form, Input, Button, InputNumber, Row, Col, Select, message } from 'antd'
import MdEditor from 'react-markdown-editor-lite';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import MarkdownIt from 'markdown-it';
import { request, history } from 'umi'

const mdParser = new MarkdownIt({
  highlight: function (str: string, lang: string) {
    console.log(str, lang)
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) { }
    }

    return '';
  }
});

const Md = ({ value, onChange }: any) => {
  function handleEditorChange({ html, text }) {
    onChange(text);
  }
  return (
    <MdEditor
      value={value}
      style={{ height: '200px' }}
      renderHTML={text => mdParser.render(text)}
      onChange={handleEditorChange} />
  )
}

const { Option } = Select;

export default () => {
  const [form] = Form.useForm();
  const gotoList = () => {
    history.push('./interview')
  }
  return (
    <>
      <Form form={form} layout='vertical'>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Form.Item name='title' label='title'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name='type' label='type'>
              <Select>
                <Option value="radio">radio</Option>
                <Option value="multiple">multiple </Option>
                <Option value="describe">describe  </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name='correctAnswer' label='correctAnswer'>
              <Select>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name='content' label='correctAnswer'>
          <Md />
        </Form.Item>
        <Form.Item name='extends' label='extends'>
          <Md />
        </Form.Item>
        <Button onClick={() => {
          form.validateFields().then(values => {
            requestFunc('/morain/interview/add', {
              data: values,
              method: 'POST'
            }).then(res => {
              message.success('操作成功！')
              // requestFunc('/morain/interview/query')
              gotoList()
            })
          })
        }}>提交</Button>
      </Form>
    </>
  )
}