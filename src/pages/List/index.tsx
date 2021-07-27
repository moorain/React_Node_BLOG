
import React from 'react'
import { useRequest, history } from 'umi'
import { List, Space, Spin } from 'antd';
import { urlPipe } from '../../util';

const ListPage = () => {
    const { data } = useRequest(urlPipe(`/articleLists`));


    // const IconText = ({ icon, text }) => (
    //     <Space>
    //         {React.createElement(icon)}
    //         {text}
    //     </Space>
    // );

    const onClickListItem = (item) => {
        history.push(`/detail?id=${item.id}`)
    }

    if (!data) {
        return <Spin />
    }

    return (
        <List
            style={{ backgroundColor: '#fff', marginTop: 20 }}
            pagination={false}
            itemLayout="vertical"
            size="large"
            // pagination={{
            //     onChange: page => {
            //         console.log(page);
            //     },
            //     pageSize: 3,
            // }}
            dataSource={data || []}
            // footer={
            //     <div>
            //         <b>ant design</b> footer part
            //     </div>
            // }
            renderItem={item => (
                <List.Item
                    key={item.id}
                // actions={[
                //     <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                //     <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                //     <IconText type="message" text="2" key="list-vertical-message" />,
                // ]}
                // extra={
                //     <img
                //         width={272}
                //         alt="logo"
                //         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                //     />
                // }
                >
                    <List.Item.Meta
                        // avatar={<Avatar src={item.avatar} />}
                        title={<a onClick={() => {
                            onClickListItem(item)
                        }} >{item.title}</a>}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    )
}

export default ListPage;