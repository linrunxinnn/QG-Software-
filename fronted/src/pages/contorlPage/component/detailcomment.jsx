import React, { useState, useEffect } from 'react';
import styles from './detailcomment.module.css';
import { getSoftwareReviews } from '../../../api/service/reviewApi';
import { fetchDeletecommentAPI } from "../../../api/service/userService";
import { useParams } from 'react-router-dom';

const CommentList = () => {
    const [comments, setComments] = useState([]);  // Initialize as an empty array
    const [loading, setLoading] = useState(true);  // For displaying loading state
    const [error, setError] = useState(null);  // For error handling
    const { id } = useParams();  // 获取路径中的 id 参数
    // Fetch comments on component mount
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getSoftwareReviews(id);  // Fetching comments from API
                console.log(data);

                // Ensure that comments is always an array, even if API returns null
                setComments(data?.data || []);  // Fallback to empty array if data is null or undefined
                console.log("Received comments:", comments);

            } catch (err) {
                setError('Failed to load comments');  // Handle error
            } finally {
                setLoading(false);  // End loading state
            }
        };

        fetchComments();  // Call the function to fetch comments
    }, []);  // Empty dependency array to call only once on mount

    const deleteComment = async (id) => {
        try {
            await fetchDeletecommentAPI(id);  // Delete the comment with the provided id
            setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
        } catch (error) {
            console.log(error);  // Handle error during delete operation
        }
    };

    if (loading) {
        return <div>Loading...</div>;  // Loading state
    }

    if (error) {
        return <div>{error}</div>;  // Error state
    }

    // If there are no comments, display a message
    if (comments.length === 0) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',  // 确保父容器有足够的高度来进行居中
            }}>
                <div>该软件暂无评论</div>
            </div>
        );
    }

    return (
        <div className={styles.commentList}>
            <h2>Comment List</h2>
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
                            onClick={() => deleteComment(comment.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
