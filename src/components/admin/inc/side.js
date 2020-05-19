import React, { useContext, useState } from 'react';
import { UserContext } from '../../../routes/routes';
import { Button, Layout, Menu } from 'antd';
import {
    HomeOutlined,
    BarChartOutlined,
    InboxOutlined,
    TagOutlined,
    UserOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
function Side(props) {
    const [collaped, setCollaped] = useState(false)
    const toggle = () => {
        setCollaped(!collaped)
    };
    return [
        <Sider className='sider' theme={'light'} onCollapse={toggle} collapsible collapsed={collaped} >
            <div className="logo" />
            <Menu theme="light" mode="inline" defaultSelectedKeys={[(props.no).toString()]}>
                <Menu.Item key="1" >
                    <Link to="/">
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" >
                    <Link to="/users">
                        <UserAddOutlined />
                        <span className="nav-text">Staff</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/products">
                        <TagOutlined />
                        <span className="nav-text">Inventory</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/customers">
                        <UserOutlined />
                        <span className="nav-text">Customers</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/analytics">
                        <BarChartOutlined />
                        <span className="nav-text">Analytics</span>
                    </Link>
                </Menu.Item>

            </Menu>
        </Sider>

    ]
}

export default Side;