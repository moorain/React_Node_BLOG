import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { urlPipe } from '../../util';

const MediaModal = ({ visible, visibleChange }) => {
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal visible={visible} onCancel={() => { visibleChange(false) }}>
      <Upload
        action={urlPipe("/morain/uploadImg")}
        listType="picture-card"
        fileList={[]}
      // onPreview={this.handlePreview}
      // onChange={handleChange}
      >
        uploadButton
      </Upload>
    </Modal>
  )
}

export default MediaModal;

