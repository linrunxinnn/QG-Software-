import React from 'react';
import './big_card.css'; // 样式文件同步更新

const BigCard = () => {
    return (
        <div className="category-card">
            <div className="category-title">类别2</div>
            <div className="divider"></div>
            {/* 第一个项目：新增价格区域 */}
            <div className="item">
                <div className="item-img"></div>
                <div className="item-info">
                    <div className="item-name">名称</div>
                    <div className="item-price">¥19.90</div>
                </div>
                <button className="download-btn">下载</button>
            </div>
            {/* 第二个项目：新增价格区域 */}
            <div className="item">
                <div className="item-img"></div>
                <div className="item-info">
                    <div className="item-name">名称</div>
                    <div className="item-price">¥29.90</div>
                </div>
                <button className="download-btn">下载</button>
            </div>
        </div>
    );
};

export default BigCard;