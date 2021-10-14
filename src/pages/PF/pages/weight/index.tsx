import { useEffect, useState } from 'react';
import { Chart } from '@antv/g2';
import { FrownOutlined, FireOutlined, BellOutlined, CarryOutOutlined, SmileOutlined } from '@ant-design/icons';
import { Modal, Toast, Progress } from 'antd-mobile';
import moment from 'moment';
import { requestFunc } from '@/util';
import BigNumber from 'bignumber.js'
import styles from './index.less';

const prompt = Modal.prompt;
const renderChart = (data: any) => {
  const dom = document.getElementById('container')
  if (dom) {
    dom.innerHTML = '';
  }
  const chart = new Chart({
    container: 'container',
    autoFit: true,
    height: 200,
  });

  chart.data(data);
  chart.scale({
    date: {
      range: [0, 1],
    },
    weight: {
      min: 48,
      max: 60,
      nice: true,
    },
  });

  chart.tooltip({
    showCrosshairs: true, // 展示 Tooltip 辅助线
    shared: true,
  });
  chart.axis('weight', false)
  chart.line().position('date*weight').label('weight').shape('smooth').color('#7948EA');
  chart.point().position('date*weight').color('#7948EA').shape('circle');

  chart.annotation().line({
    start: ['min', 50],
    end: ['max', 50],
    style: {
      stroke: '#ff4d4f',
      lineWidth: 1,
      lineDash: [3, 3],
    },
    text: {
      position: 'start',
      style: {
        fill: '#8c8c8c',
        fontSize: 12,
        fontWeight: 'normal',
      },
      content: '目标:50kg',
      offsetY: -5,
    },
  });
  chart.render();
}

const PfHeight = () => {
  const [info, setInfo] = useState({
    change: 0,
    allChange: 0,
    allCount: 0,
    curWeight: null,
    firstWeight: 0,
  })
  const initData = async () => {
    const res: any = await requestFunc('/morain/queryWeightList');
    if (res?.data) {
      renderChart(res?.data?.lastDays || []);
      const { firstDay, allCount, curDay, lastDay } = res.data;
      const curDayNum = new BigNumber(curDay?.weight || 0);
      const lastDayNum = new BigNumber(lastDay?.weight || 0);
      const firstDayNum = new BigNumber(firstDay?.weight || 0);

      const change = curDayNum.minus(lastDayNum).toNumber();
      const allChange = firstDayNum.minus(curDayNum).toNumber();
      const isAdd = moment(curDay?.date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');

      const info = {
        firstWeight: firstDay?.weight || 0,
        curWeight: isAdd ? curDay?.weight : null,
        change,
        allChange,
        allCount,
      }
      setInfo(info)
    }

  }

  useEffect(() => {
    initData()
  }, [])

  const tips = [
    {
      key: 1,
      icon: <BellOutlined />,
      iconColor: '#7948ea',
      title: info?.curWeight ? '今日数据已记录，继续加油，控制饮食不要贪吃' : '今日暂无记录哦，请点击添加',
      con: info?.curWeight ? <span style={{ fontSize: '1.5em', color: '#7948ea' }}>{info?.curWeight}kg</span> : '',
      height: '10em',
      background: '#f4eeff',
    },
    {
      key: 2,
      icon: <FireOutlined />,
      iconColor: '#ff756b',
      title: `较一开始的${info?.firstWeight || 0}kg，你已经减了`,
      con: <span>
        <span
          style={{ color: 'red', fontSize: '1.5em', fontWeight: 600, paddingRight: '0.5em' }}>{info?.allChange || 0}kg</span>
        成绩不错，继续加油！
      </span>,
      height: '16em',
      background: '#fff2f1',
    },
    {
      key: 3,
      icon: info?.change > 0 ? <FrownOutlined /> : <SmileOutlined />,
      iconColor: '#2cc774',
      title: '较上一次记录，你的体重变化',
      con: (
        <span>
          {info?.change > 0 ? '增加了' : '减少了'}
          <span
            style={{ color: 'red', fontSize: '1.5em', fontWeight: 600, padding: '0 0.5em' }}>{new BigNumber(info?.change).absoluteValue().toNumber() || 0}kg
          </span>
          {
            info?.change > 0 ? '不太理想，不要辜负往日的努力哦，请继续加油！' : ' 成绩不错，好身材指日可待，继续加油！'
          }
        </span>
      ),
      height: '12em',
      background: '#ebfef4',
    },
    {
      key: 4,
      icon: <CarryOutOutlined />,
      iconColor: '#5991ff',
      title: '你已经坚持记录了',
      con: (
        <span>
          <span
            style={{ color: '#5991ff', fontSize: '1.5em', fontWeight: 600, paddingRight: '0 0.5em' }}>{info?.allCount || 0}天
          </span>，
          继续坚持，控制饮食，多运动就是胜利！
        </span>
      ),
      height: '14em',
      background: '#edf4ff',
    },
  ]

  const onTap = (item: any) => {
    if (item.key === 1) {
      prompt(
        '输入今日记录',
        '',
        (login, password) => {
          const weight = password && parseFloat(password);
          if ((weight && isNaN(weight)) || !weight || weight < 40 || weight > 60) {
            Toast.fail('保存失败，格式错误！', 1);
            return;
          }
          requestFunc('/morain/addWeightData', {
            method: 'POST',
            data: {
              date: login,
              weight,
              userId: '1002',
              userName: '帆帆'
            }
          }).then((res: any) => {
            if (res.isSuccess) {
              Toast.success('保存成功!', 1);
              initData()
            }
          })
        },
        'login-password',
        moment().format('YYYY-MM-DD HH:mm:ss'),
        ['输入日期', '输入体重'],
      )
    }
  }

  return (
    <div className={styles.pf} >
      <div className={styles.title}>
        趋势
      </div>
      <div style={{ padding: '0em 0.5em 1.5em 0.5em', backgroundColor: 'rgba(140, 122, 255,0.1)', borderRadius: '1em' }}>
        <div id='container'></div>
      </div>
      <div className={styles.title}>
        最近
      </div>
      <div className={styles.tip} style={{ padding: '1em' }}>
        <Progress barStyle={{ backgroundColor: '#7948ea' }} percent={((info?.allCount || 0) * 100) / 20} position="normal" />
      </div>
      <div className={styles.tipBox} >
        {
          tips.map((item) => {
            return (
              <div key={item.key} className={styles.tip} onClick={() => { onTap(item) }} >
                <div className={styles.tipCon} style={{ width: '100%', minHeight: item.height, background: item.background }}>
                  <div className={styles.icons} style={{ color: item.iconColor }}>
                    {item.icon}
                  </div>
                  <div className={styles.tipTitle}>
                    {item.title}
                  </div>
                  <div className={styles.tipDes}>
                    {item.con}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

    </div >
  )
}

export default PfHeight;