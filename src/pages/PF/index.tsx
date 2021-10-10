import { Button, InputNumber, message } from 'antd';
import { useState, useEffect } from 'react';
import { history } from "umi";

import styles from './index.less';
import { menus } from './constant';

const Index = (props: any) => {
  const url = window.location.href;
  const clickMenu = (i: any) => {
    history.push(i.path)
  }

  return (
    <div style={{ paddingBottom: '3.5em' }}>
      <div>
        {props.children}
      </div>
      <div className={styles.footer}>
        {
          menus.map((i) => {
            return (
              <div
                key={i.path}
                onClick={() => { clickMenu(i) }}
                style={{ textAlign: 'center', color: url.indexOf(i.path) > -1 ? '#7948ea' : '' }}>
                <div>{i.icon}</div>
                <div>{i.name}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Index;