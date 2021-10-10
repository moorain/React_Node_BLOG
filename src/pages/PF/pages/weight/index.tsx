import { Button, InputNumber, message } from 'antd';
import { useState, useEffect } from 'react';
import { Chart } from '@antv/g2';
import styles from './index.less';
import { FrownOutlined, FireOutlined, BellOutlined, CarryOutOutlined } from '@ant-design/icons';

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
    day: {
      range: [0, 1],
    },
    value: {
      min: 48,
      max: 60,
      nice: true,
    },
  });

  chart.tooltip({
    showCrosshairs: true, // 展示 Tooltip 辅助线
    shared: true,
  });
  chart.axis('value', false)
  chart.line().position('day*value').label('value').shape('smooth').color('#7948EA');
  chart.point().position('day*value').color('#7948EA').shape('circle');

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

  const data = [
    { day: '10-1', value: 55 },
    { day: '10-2', value: 55.5 },
    { day: '10-3', value: 56 },
    { day: '10-4', value: 54 },
    { day: '10-5', value: 53 },
    { day: '10-6', value: 54 },
    { day: '10-7', value: 55 },
  ];

  useEffect(() => {
    renderChart(data)
  }, [])

  const tips = [
    {
      key: 1,
      icon: <BellOutlined />,
      iconColor: '#7948ea',
      title: '今日已记录，加油',
      con: <span style={{ fontSize: '1.5em', color: '#7948ea' }}>55kg</span>,
      height: '10em',
      background: '#f4eeff',
    },
    {
      key: 2,
      icon: <FireOutlined />,
      iconColor: '#ff756b',
      title: '较一开始的56kg，你已经减了',
      con: <span>
        <span
          style={{ color: 'red', fontSize: '1.5em', fontWeight: 600, paddingRight: '0.5em' }}>3kg</span>
        成绩不错，继续加油！
      </span>,
      height: '16em',
      background: '#fff2f1',
    },
    {
      key: 3,
      icon: <FrownOutlined />,
      iconColor: '#2cc774',
      title: '较上一次记录，你的体重变化',
      con: (
        <span>
          减少了
          <span
            style={{ color: 'red', fontSize: '1.5em', fontWeight: 600, padding: '0 0.5em' }}>0.5kg
          </span>
          成绩不错，继续加油！
        </span>
      ),
      height: '12em',
      background: '#ebfef4',
    },
    {
      key: 4,
      icon: <CarryOutOutlined />,
      iconColor: '#5991ff',
      title: '你已经坚持了',
      con: (
        <span>
          <span
            style={{ color: '#5991ff', fontSize: '1.5em', fontWeight: 600, paddingRight: '0 0.5em' }}>10天
          </span>，
          一共记录了
          <span
            style={{ color: '#5991ff' }}>10条
          </span>
          数据，
          继续坚持，控制饮食，多运动就是胜利！
        </span>
      ),
      height: '14em',
      background: '#edf4ff',
    },
  ]

  return (
    <div className={styles.pf} >
      <div className={styles.title}>
        趋势
      </div>
      <div style={{ padding: '0em 0.5em 1em 0.5em', backgroundColor: 'rgba(140, 122, 255,0.1)', borderRadius: '1em' }}>
        <div id='container'></div>
      </div>
      <div className={styles.title}>
        最近
      </div>
      <div className={styles.tipBox} >
        {
          tips.map((item) => {
            return (
              <div key={item.key} className={styles.tip} >
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