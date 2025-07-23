import React from 'react';
import './gap.css'; // 可选单独样式文件，或内联样式
import { useNavigate } from 'react-router-dom';

// 可通过 props 传值实现动态标题
const Gap = ({ title = '类别1' }) => {
    const navigate = useNavigate()

    function lookmore() {
        navigate("")
    }


    return (
        <div className="category-bar">| {title}
            <span style={{
                float: "right"
            }}
                onClick={() => {
                    lookmore()
                }}
            >更多</span>
        </div>
    );
};

export default Gap;