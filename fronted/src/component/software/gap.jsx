import React from 'react';
import './gap.css'; // 可选单独样式文件，或内联样式
import { useNavigate } from 'react-router-dom';

// 可通过 props 传值实现动态标题
const Gap = ({ sort }) => {
    const navigate = useNavigate()

    function lookmore() {
        navigate("")
    }


    return (
        <div className="category-bar">| {sort}
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