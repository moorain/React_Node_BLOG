import { useState, useEffect } from 'react';
import { Upload, message, Button, Input, Form, Table, Modal, Space } from 'antd';
import { requestFunc } from '@/util'
import { request, history } from 'umi'

export default () => {
  const [list, setList] = useState([])

  // requestFunc('/morain/interview/query')
  const query = () => {
    requestFunc('/morain/interview/query').then(res => {
      setList(res?.data)
    })
  }

  useEffect(() => {
    query()
  }, []);

  const del = (id) => {
    requestFunc(`/morain/interview/delete?id=${id}`).then(res => {
      if (res?.isSuccess) {
        message.success('删除成功！')
        query()
      }
    })
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (a, record) => {
        return (
          <Button
            type='link'
            onClick={() => {
              del(record.id)
            }}>删除</Button>
        )
      }
    },
  ];
  const goAdd = () => {
    history.push('./interviewadd')
  }
  return (
    <div>
      <div style={{ margin: '20px 0px' }}>
        <Button onClick={goAdd}>新增</Button>
      </div>
      <Table columns={columns} dataSource={list} />

    </div>
  )
}