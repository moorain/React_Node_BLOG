import { Upload, message, Button, Input, Form, Table, Modal, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { request, history } from 'umi'
import { useState, useEffect } from 'react';
import { urlPipe, requestFunc, getLocalStorage } from '@/util';
import CollectionCreateForm from './Form';

const Edit = () => {
  const [list, setList] = useState([])
  const [visible, setVisible] = useState(false);

  const query = () => {
    requestFunc('/morain/queryToolsByPage').then((res: any) => {
      setList(res?.data)
    })
  }

  useEffect(() => {
    query()
  }, []);

  if (!(list)) {
    return (
      <Spin />
    )
  }

  const add = () => {
    setVisible(true);
  }

  const onCreate = (values: any) => {
    requestFunc('/morain/addTool', {
      method: 'post',
      data: values,
    }).then((res: any) => {
      setVisible(false);
      query()
    })
  }

  return (
    <div>
      <div style={{ padding: '1em' }}>
        <Button onClick={add}>+</Button>
      </div>
      <div style={{ background: '#fff', display: 'flex', flexWrap: 'wrap' }}>
        {(list || []).map((item: any) => {
          return (
            <a href={item.url} target='_blank'>
              <div style={{ padding: '0.5em' }}>
                <div
                  key={item}
                  style={{ border: '1px solid #d9d9d9', borderRadius: 10, padding: 10, cursor: 'pointer' }}>
                  <h2>{item?.title || ''}</h2>
                </div>
              </div>
            </a>
          )
        })}
      </div >

      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />

    </div>
  )
}

export default Edit;
