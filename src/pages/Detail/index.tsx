import Article from '../common/Article';
import { Spin } from 'antd'
import { withRouter, useRequest } from 'umi';
import type { Location } from 'umi'
import { urlPipe } from '@/util';
import styles from './index.less';

interface Iprops {
  location: Location,
}

const Detail = (props: Iprops) => {
  const { data } = useRequest(urlPipe(`/article?id=${props?.location?.query?.id}`));
  return (
    <div className={styles.detail} style={{ padding: '20px' }}>
      <h1>标题标题</h1>
      {data ? <Article data={data || ''} /> : <Spin />}
    </div>
  )
}

export default withRouter(Detail);