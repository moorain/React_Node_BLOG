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
    <div className={styles.detail} style={{ padding: '1em' }}>
      {data ? <Article data={data || ''} /> : (
        <div style={{ padding: '200px 0', textAlign: 'center' }}>
          <Spin />
        </div>
      )}
    </div>
  )
}

export default withRouter(Detail);