import { Upload, message, Button, Input, Form, Table, Modal, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { request, history } from 'umi'
import { useState, useEffect } from 'react';
import { urlPipe, requestFunc } from '@/util';

const Edit = () => {
  const [list, setList] = useState([])

  const query = () => {
    requestFunc('/codeListQuery').then(res => {
      setList(res?.data)
    })
  }

  useEffect(() => {
    // requestFunc('/morain/user');
    query()
  }, []);

  if (!(list)) {
    return (
      <Spin />
    )
  }

  const goEditor = (id) => {
    history.push(`./single?key=${id}`)
  }

  return (
    <div style={{ background: '#fff', display: 'flex', flexWrap: 'wrap' }}>
      {(list || []).map((item: any) => {
        return (
          <div style={{ padding: '0.5em' }}>
            <div
              onClick={() => { goEditor(item.id) }}
              key={item}
              style={{ border: '1px solid #d9d9d9', borderRadius: 10, padding: 10, cursor: 'pointer' }}>
              <h2>{item?.title || ''}</h2>
              {/* <div>{item?.createDate || ""}</div> */}
              <div>{item?.id || ''}</div>
              <div>{item?.userName || ''}</div>
            </div>
          </div>
        )
      })}
    </div >
  )
}

export default Edit;
