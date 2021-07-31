import { Upload, message, Button, Input, Form, Table, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { request, history } from 'umi'
import { useState, useEffect } from 'react';
import { urlPipe, requestFunc } from '@/util';

const Edit = () => {
    const [list, setList] = useState([])
    const [mdUploadShow, setmdUploadShow] = useState(false);
    const [filelist, setfileList] = useState<any>()

    const query = () => {
        requestFunc(`/articleLists`).then(res => {
            setList(res?.data)
        })
    }

    useEffect(() => {
        requestFunc('/morain/user');
        query()
    }, []);

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
                query()
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const del = async (id) => {
        if (!id) {
            message.error('id不能为空！')
        };
        const res = await request(urlPipe(`/morain/delete?id=${id}`));
        if (res?.isSuccess) {
            message.success(res.msg);
            query()
        }
    }

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '时间',
            dataIndex: 'modefiled',
            key: 'modefiled',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (a, record) => {
                return (
                    <Button type='link' onClick={() => {
                        del(record.id)
                    }}>删除</Button>
                )
            }
        },
    ];

    const gotoOnlineEdit = () => {
        history.push('./onlineEdit')
    }

    return (
        <div style={{ margin: 20 }}>
            <div style={{ margin: '20px 0px' }}>
                <Button onClick={gotoOnlineEdit}>在线编辑</Button>
                <Button style={{ marginLeft: 10 }} onClick={() => {
                    setmdUploadShow(true)
                }}>md文件上传</Button>
            </div>

            <Table columns={columns} dataSource={list} />

            <Modal visible={mdUploadShow} footer={[]} onCancel={() => { setmdUploadShow(false) }}>
                <div style={{ padding: 20 }}>
                    <Form onValuesChange={onValuesChange}>
                        <Form.Item name='title' label='标题'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='description' label='描述'>
                            <Input />
                        </Form.Item>
                    </Form>
                    <div style={{ textAlign: 'center' }}>
                        <Upload  {...props}>
                            <Button icon={<UploadOutlined />}>上传文件并保存数据</Button>
                        </Upload>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Edit;
