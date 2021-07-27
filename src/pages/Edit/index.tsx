import { Upload, message, Button, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { request, useRequest } from 'umi'
import { useState, useEffect } from 'react';
import { urlPipe, requestFunc } from '@/util';

const Edit = () => {
    useEffect(() => {
        requestFunc('/morain/user')
    }, []);


    const [delId, setDelId] = useState();
    const [form] = Form.useForm();
    const [param, $param] = useState<{ title: string, description: string }>({
        title: '',
        description: '',
    })
    const onValuesChange = (fleds: any) => {
        $param((param) => {
            return {
                ...param,
                ...fleds,
            }
        })
    }

    const props = {
        data: {
            title: param.title,
            description: param.description,
        },
        name: 'file',
        action: urlPipe('/morain/uploadfile'),
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const delIdchange = (e) => {
        const val = e.target.value;
        setDelId(val)
    }

    const del = async () => {
        if (!delId) {
            message.error('id不能为空！')
        };
        const res = await request(urlPipe(`/morain/delete?id=${delId}`));
        if (res?.success) {
            message.success(res.msg)
        }
    }

    return (
        <div style={{ margin: 20 }}>
            <Form onValuesChange={onValuesChange}>
                <Form.Item name='title' label='标题'>
                    <Input />
                </Form.Item>
                <Form.Item name='description' label='描述'>
                    <Input />
                </Form.Item>
            </Form>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>

            <hr />

            <div style={{ width: 200, display: 'flex' }}>
                <Input onChange={delIdchange} />
                <Button onClick={del}>删除</Button>
            </div>
        </div>
    )
}

export default Edit;
