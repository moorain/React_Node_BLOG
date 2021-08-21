import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { urlPipe } from '../../util';
import { CopyOutlined } from '@ant-design/icons';

const MediaModal = ({ visible, visibleChange }) => {
  const [list, setList] = useState([])
  const [previewVisible, setpreviewVisible] = useState(false)
  const [previewImage, setpreviewImage] = useState('')
  const [imgmd, setImgmd] = useState('')

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const handleChange = ({ fileList }) => {
    setList(fileList)
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const showUploadList = {
    showDownloadIcon: true,
    showRemoveIcon: false,
    downloadIcon: (<CopyOutlined style={{ color: '#fff' }} />)
  }

  const onDownload = (file) => {
    const exter = (file?.name || '').split('.')?.[1];
    const id = file.response.data;

    setImgmd(`![${file?.name || ""}](http://localhost:8001/${id}.${exter})`)
  }

  return (
    <div>
      <Modal footer={null} visible={visible} onCancel={() => { visibleChange(false) }}>
        <Upload
          beforeUpload={beforeUpload}
          action={urlPipe("/morain/uploadImg")}
          listType="picture-card"
          fileList={list}
          onPreview={(file) => {
            setpreviewVisible(true)
            const exter = (file?.name || '').split('.')?.[1];
            file.exter = exter;
            setpreviewImage(file)
          }}
          onChange={handleChange}
          showUploadList={showUploadList}
          onDownload={onDownload}
        >
          {uploadButton}
        </Upload>
        <div style={{ padding: 20, backgroundColor: 'e7e7e7' }}>
          {imgmd}
        </div>
      </Modal>
      <Modal
        visible={previewVisible}
        title={''}
        footer={null}
        onCancel={() => {
          setpreviewVisible(false)
        }}
      >
        <img alt="example" style={{ width: '100%' }} src={`http://localhost:8001/${previewImage?.response?.data}.${previewImage.exter}`} />
      </Modal>
    </div>
  )
}

export default MediaModal;

