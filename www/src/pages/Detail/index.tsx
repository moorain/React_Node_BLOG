import Article from '../common/Article';
import { Spin } from 'antd'
import { withRouter, useRequest } from 'umi';
import type { Location } from 'umi'

interface Iprops {
  location: Location,
}

const Detail = (props: Iprops) => {
  const { data } = useRequest(`/article?id=${props?.location?.query?.id}`);
  return (
    <div style={{ padding: '20px' }}>
      {data ? <Article data={data || ''} /> : <Spin />}
    </div>
  )
}

export default withRouter(Detail);