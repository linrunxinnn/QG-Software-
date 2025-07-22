import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const MediumCard = () => (
    <Card
        style={{ width: '50%' }}
        cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
        }
    >

        <Meta
            title="Soft"
            description="Price"
        />
    </Card>
);
export default MediumCard;