import { Upload, message, Button, Input, Form, Table, Modal, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { request, history } from 'umi'
import { useState, useEffect } from 'react';
import { urlPipe, requestFunc } from '@/util';

const Edit = () => {
  const [list, setList] = useState([])

  const query = () => {
    requestFunc(`/queryAllImages`).then(res => {
      setList(res?.data)
    })
  }

  useEffect(() => {
    requestFunc('/morain/user');
    query()
  }, []);

  // const del = async (id) => {
  //   if (!id) {
  //     message.error('id不能为空！')
  //   };
  //   const res = await request(urlPipe(`/morain/delete?id=${id}`));
  //   if (res?.isSuccess) {
  //     message.success(res.msg);
  //     query()
  //   }
  // }
  if (!list) {
    return (
      <Spin />
    )
  }

  return (
    <div style={{ margin: 20, background: '#fff', padding: 20 }}>
      {(list || []).map((item) => {
        return (
          <div>
            <div
              key={item}
              style={{ width: 200, border: '1px solid #d9d9d9', padding: 10 }}>
              <img width='100%' src={`http://localhost:8001/${item}`} alt="" />
            </div>
          </div>
        )
      })}
    </div >
  )
}

export default Edit;
