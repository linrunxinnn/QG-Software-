import React, { useState, useEffect } from 'react';
import styles from './detailcomment.module.css';
import { getSoftwareReviews } from '../../../api/service/reviewApi';
import { fetchDeletecommentAPI } from "../../../api/service/userService";
import { useParams } from 'react-router-dom';
import { Modal, message } from 'antd';

const CommentList = () => {
    const [comments, setComments] = useState([]); // 初始化评论列表为空数组
    const [loading, setLoading] = useState(true);  // 用于显示加载状态
    const [error, setError] = useState(null); // 用于错误处理
    const [isModalVisible, setIsModalVisible] = useState(false); // 控制弹窗显示的状态
    const [commentToDelete, setCommentToDelete] = useState(null); // 用于保存待删除的评论
    const { id } = useParams();  // 获取路径中的 id 参数

    // 组件挂载时获取评论数据
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getSoftwareReviews(id);  // 从 API 获取评论数据
                setComments(data?.data || []);  // 确保评论始终是一个数组
                console.log("收到的评论:", data?.data);
            } catch (err) {
                setError('加载评论失败');  // 处理错误
            } finally {
                setLoading(false);  // 结束加载状态
            }
        };

        fetchComments();  // 调用函数来获取评论数据
    }, [id]);  // 依赖 id，确保每次 id 变化时重新获取评论

    // 删除评论的函数
    const deleteComment = async (comment) => {
        try {
            await fetchDeletecommentAPI(comment.id);  // 删除指定 id 的评论
            setComments((prevComments) => prevComments.filter((item) => item.id !== comment.id)); // 过滤掉删除的评论
            setIsModalVisible(false);  // 删除成功后关闭弹窗
            message.success("删除评论成功")
        } catch (error) {
            console.log(error);  // 处理删除操作中的错误
        }
    };

    const showDeleteConfirm = (comment) => {
        setCommentToDelete(comment); // 设置待删除的评论
        setIsModalVisible(true); // 显示删除确认弹窗
    };

    const handleCancel = () => {
        setIsModalVisible(false);  // 取消删除操作，关闭弹窗
    };

    if (loading) {
        return <div>加载中...</div>;  // 显示加载状态
    }

    if (error) {
        return <div>{error}</div>;  // 显示错误信息
    }

    // 如果没有评论，显示提示信息
    if (comments.length === 0) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}>
                <div>该软件暂无评论</div>
            </div>
        );
    }

    return (
        <div className={styles.commentList}>
            <h2>评论列表</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className={styles.commentItem}>
                        <div className={styles.commentHeader}>
                            <img
                                src={comment.avatar}
                                alt={comment.username}
                                className={styles.commentAvatar}
                            />
                            <span className={styles.commentUsername}>{comment.username}</span>
                        </div>
                        <p className={styles.commentContent}>{comment.content}</p>
                        <span className={styles.commentTimestamp}>{comment.timestamp}</span>
                        <button
                            className={styles.deleteButton}
                            onClick={() => showDeleteConfirm(comment)} // 点击时显示删除确认弹窗
                        >
                            删除评论
                        </button>
                    </li>
                ))}
            </ul>

            {/* 删除确认弹窗 */}
            <Modal
                title="确认删除"
                open={isModalVisible}
                onOk={() => deleteComment(commentToDelete)} // 传递待删除评论对象
                onCancel={handleCancel} // 点击取消
                okText="确认"
                cancelText="取消"
            >
                <p>确定要删除这条评论吗？</p>
            </Modal>
        </div>
    );
};

export default CommentList;