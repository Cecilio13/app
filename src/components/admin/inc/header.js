import React, { useState } from 'react';
import { Layout, Button, Dropdown, Menu, Badge, notification, Row, Col, Typography, Avatar } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    NotificationOutlined,
    BellOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Header } = Layout;
const { Text } = Typography;
function Head() {
    const openNotification = () => {
        notification.open({
            message: 'Sample Notification Title',
            description:
                'This is the sample content of the notification. This is the sample content of the notification. This is the sample content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
            icon: <NotificationOutlined style={{ color: '#108ee9' }} />,
        });
    };
    const menu = (
        <Menu >
            <Menu.Item key="user_info_menu">
                <Link style={{ fontSize: 'inherit' }}><UserOutlined /> Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout_menu">
                <Link to="/" style={{ fontSize: 'inherit' }}><LogoutOutlined /> Logout</Link>
            </Menu.Item>
        </Menu>
    );
    const notif = (
        <Menu >
            <Menu.Item key={0}>
                <Link style={{ fontSize: 'inherit' }} onClick={() => openNotification()}>Sample Notification 1</Link>
            </Menu.Item>

            <Menu.Item key={1}>
                <Link style={{ fontSize: 'inherit' }} onClick={() => openNotification()}>Sample Notification 2</Link>
            </Menu.Item>
        </Menu>
    );
    return [
        <Header className="site-layout-background" style={{ paddingRight: '10px', paddingLeft: '10px' }}>
            <Dropdown overlay={menu} trigger={['click']}>
                <Button type="link" style={{ textAlign: 'left', float: "right", height: '100%', color: 'black' }}>
                    <Row gutter="6">
                        <Col span="6" align="middle" justify="center" >
                            <UserOutlined style={{ height: '100%' }} className="center-svg" />
                        </Col>
                        <Col span="18">Long Username<br></br> <Text type="secondary">Position</Text></Col>
                    </Row>
                </Button>
            </Dropdown>
            <Dropdown overlay={notif} trigger={['click']}>
                <Button type="link" style={{ float: "right", height: '100%', color: 'black' }}>
                    <Badge count={99} dot>
                        <BellOutlined />
                    </Badge>
                </Button>
            </Dropdown>
        </Header>
    ]
}

export default Head;