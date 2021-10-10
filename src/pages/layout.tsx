import { Layout, Menu, Affix } from 'antd';
const { Header, Content, Footer } = Layout;
import { MENUS } from '../config/base'
import '../global.css';
import { ReactChild } from 'react';
import { history, withRouter } from 'umi';
import { useState } from 'react';

interface Iprops {
	children: ReactChild;
	history: any;
}

const LayoutPage = (props: Iprops) => {
	const padding = '0.5em';

	const [path, $path] = useState(() => {
		return window.location.hash
	});

	if (window.location.href.indexOf('pf520') > -1) {
		return props.children
	}


	return (
		<Layout className="layout">
			<Affix>
				<div style={{ display: 'flex', backgroundColor: '#fff', height: 60, lineHeight: '60px' }}>
					<div style={{ paddingLeft: 20 }} >
						<img height="50px" src="/logo.png" alt="" />
					</div>
					{
						MENUS.map((item) => {
							return (
								<div key={item.path} onClick={() => {
									$path(item.path)
									history.push(`./${item.path}`);
								}}
									style={{ color: (path || '').indexOf(item.path) > -1 ? '#7C8A71' : '', width: 70, textAlign: 'center', cursor: 'pointer' }}>
									{item.name}
								</div>
							)
						})
					}
				</div>
			</Affix>
			<Content style={{ padding }}>
				{props.children}
			</Content>
			<Footer style={{ textAlign: 'center' }}>MorainBlog ©2021 Created by morain</Footer>
		</Layout>
	)
}

export default LayoutPage;