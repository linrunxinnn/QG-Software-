import React from 'react';
import './gap.css'; // 可选单独样式文件，或内联样式

// 可通过 props 传值实现动态标题
const Gap = ({ title = '类别1' }) => {
    return (
        <div className="category-bar">| {title}</div>
    );
};

export default Gap;