import { Button, InputNumber, message } from 'antd';
import { useState, useEffect } from 'react';
import { requestFunc } from '../../util';

const PfHeight = () => {
  const [weight, setWeight] = useState(0);
  const [list, setList] = useState([]);


  useEffect(() => {
    requestFunc(`/weightDatalList`).then((res) => {
      console.log(res, 'res')
      if (res?.isSuccess) {
        setList(res.data)
      }
    })
  }, [])

  const inputNumberChange = (num) => {
    setWeight(num)
  }

  return (
    <div style={{ height: '100vh' }}>
      <div>
        {
          (list || []).map((i) => {
            return (
              <div key={i.id} style={{ padding: '1em', borderBottom: '1px solid #e7e7e7', textAlign: 'center' }}>
                <span style={{ paddingRight: '4em' }}>{i.date}</span> <span>{i.weight}kg</span>
              </div>
            )
          })
        }
      </div>
      <div style={{ position: 'fixed', bottom: 0, width: '100%', display: 'flex', alignItems: 'center', padding: '1em', borderTop: '1px solid #e7e7e7', background: '#fff' }}>
        <span style={{ width: '20%' }}>今日体重：</span>
        <InputNumber onChange={inputNumberChange} style={{ width: '30%' }} precision={2} placeholder='请输入' />
        <Button onClick={async () => {
          if (weight <= 20) {
            message.error('数据不正确！')
            return;
          }
          const res = await requestFunc(`addWeightData?weight=${weight}`)
          if (res?.isSuccess) {
            message.success('添加成功！')
            setList(res.data)
          }
        }} style={{ marginLeft: '1em', width: '20%' }}>提交</Button>
        <Button onClick={() => {
          requestFunc(`/weightDatalList`).then((res) => {
            console.log(res, 'res')
            if (res?.isSuccess) {
              setList(res.data)
            }
          })
        }} type='primary' style={{ marginLeft: '1em', width: '20%' }}>刷新</Button>
      </div>
    </div >
  )
}

export default PfHeight;