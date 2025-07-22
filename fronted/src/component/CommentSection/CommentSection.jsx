import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Input,
  Rate,
  Avatar,
  message,
  Empty,
  Pagination,
  Popconfirm,
  Tag,
  Divider,
  Modal
} from 'antd';
import {
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
  SendOutlined,
  StarFilled
} from '@ant-design/icons';
import styles from './CommentSection.module.css';

const { TextArea } = Input;

const CommentSection = ({
  softwareId,
  userInfo = {},
  onCommentSubmit,
  onCommentDelete,
  className = ''
}) => {
  // 状态管理
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(10);

  // 模拟用户权限数据
  const [userPermissions] = useState({
    hasPurchased: true, // 是否已购买
    isAdmin: false, // 是否管理员
    userId: 'user123',
    username: '测试用户',
    avatar: 'https://picsum.photos/40/40?random=1'
  });

  // 模拟评论数据
  useEffect(() => {
    loadComments();
  }, [currentPage, softwareId]);

  const loadComments = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockComments = [
        {
          id: '1',
          userId: 'user123',
          username: '张三',
          avatar: 'https://picsum.photos/40/40?random=1',
          content: '这款软件真的很棒！界面设计很现代，功能也很实用。特别是AI功能，大大提高了我的工作效率。',
          rating: 5,
          createTime: '2024-07-20 14:30:00',
          isPurchased: true
        },
        {
          id: '2',
          userId: 'user456',
          username: '李四',
          avatar: 'https://picsum.photos/40/40?random=2',
          content: '性价比很高，比其他同类软件便宜不少，但功能一点也不差。客服响应也很及时，遇到问题很快就解决了。',
          rating: 4,
          createTime: '2024-07-19 16:45:00',
          isPurchased: true
        },
        {
          id: '3',
          userId: 'user789',
          username: '王五',
          avatar: 'https://picsum.photos/40/40?random=3',
          content: '刚开始使用，整体感觉不错。学习成本比较低，上手很快。希望后续版本能增加更多模板。',
          rating: 4,
          createTime: '2024-07-18 09:20:00',
          isPurchased: true
        },
        {
          id: '4',
          userId: 'user101',
          username: '赵六',
          avatar: 'https://picsum.photos/40/40?random=4',
          content: '软件很稳定，运行流畅，没有出现卡顿现象。云端同步功能很方便，在不同设备上都能无缝使用。强烈推荐！',
          rating: 5,
          createTime: '2024-07-17 11:15:00',
          isPurchased: true
        }
      ];

      setComments(mockComments);
      setTotal(mockComments.length);
    } catch (error) {
      message.error('加载评论失败');
    } finally {
      setLoading(false);
    }
  };

  // 提交评论
  const handleSubmitComment = async () => {
    if (!userPermissions.hasPurchased) {
      message.warning('请先购买软件后再评论');
      return;
    }

    if (!commentText.trim()) {
      message.warning('请输入评论内容');
      return;
    }

    if (commentText.length > 500) {
      message.warning('评论内容不能超过500字');
      return;
    }

    setSubmitting(true);
    try {
      const newComment = {
        id: Date.now().toString(),
        userId: userPermissions.userId,
        username: userPermissions.username,
        avatar: userPermissions.avatar,
        content: commentText,
        rating: rating,
        createTime: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        isPurchased: true
      };

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));

      setComments([newComment, ...comments]);
      setCommentText('');
      setRating(5);
      message.success('评论发表成功');

      // 如果有外部回调，调用它
      if (onCommentSubmit) {
        onCommentSubmit(newComment);
      }
    } catch (error) {
      message.error('发表评论失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  // 删除评论
  const handleDeleteComment = async (commentId) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));

      setComments(comments.filter(comment => comment.id !== commentId));
      message.success('评论删除成功');

      // 如果有外部回调，调用它
      if (onCommentDelete) {
        onCommentDelete(commentId);
      }
    } catch (error) {
      message.error('删除评论失败');
    }
  };

  // 检查是否可以删除评论
  const canDeleteComment = (comment) => {
    return userPermissions.isAdmin || comment.userId === userPermissions.userId;
  };

  // 格式化时间
  const formatTime = (timeStr) => {
    const now = new Date();
    const commentTime = new Date(timeStr);
    const diff = now - commentTime;

    if (diff < 60 * 1000) {
      return '刚刚';
    } else if (diff < 60 * 60 * 1000) {
      return `${Math.floor(diff / (60 * 1000))}分钟前`;
    } else if (diff < 24 * 60 * 60 * 1000) {
      return `${Math.floor(diff / (60 * 60 * 1000))}小时前`;
    } else if (diff < 7 * 24 * 60 * 60 * 1000) {
      return `${Math.floor(diff / (24 * 60 * 60 * 1000))}天前`;
    } else {
      return timeStr;
    }
  };

  return (
    <div className={`${styles.commentSection} ${className}`}>
      {/* 评论统计 */}
      <div className={styles.commentHeader}>
        <h3 className={styles.title}>
          用户评论
          <span className={styles.count}>({total})</span>
        </h3>
        <div className={styles.ratingInfo}>
          <Rate disabled defaultValue={4.5} className={styles.avgRating} />
          <span className={styles.avgScore}>4.5分</span>
        </div>
      </div>

      {/* 发表评论区域 */}
      {userPermissions.hasPurchased ? (
        <Card className={styles.commentForm} size="small">
          <div className={styles.userInfo}>
            <Avatar
              src={userPermissions.avatar}
              icon={<UserOutlined />}
              size={40}
            />
            <span className={styles.username}>{userPermissions.username}</span>
            {/* <Tag color="green" size="small">已购买</Tag> */}
          </div>

          <div className={styles.formContent}>
            <div className={styles.ratingRow}>
              <span className={styles.ratingLabel}>评分：</span>
              <Rate
                value={rating}
                onChange={setRating}
                className={styles.ratingInput}
              />
              <span className={styles.ratingText}>
                {['很差', '较差', '一般', '不错', '很棒'][rating - 1]}
              </span>
            </div>

            <TextArea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="分享您的使用体验..."
              rows={4}
              maxLength={500}
              showCount
              className={styles.commentInput}
            />

            <div className={styles.submitRow}>
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSubmitComment}
                loading={submitting}
                disabled={!commentText.trim()}
                className={styles.submitBtn}
              >
                发表评论
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className={styles.purchasePrompt} size="small">
          <div className={styles.promptContent}>
            <div className={styles.promptText}>
              <span>购买软件后即可参与评论</span>
            </div>
            <Button type="primary" size="small">
              立即购买
            </Button>
          </div>
        </Card>
      )}

      {/* 评论列表 */}
      <div className={styles.commentList}>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : comments.length === 0 ? (
          <Empty
            description="暂无评论，来发表第一个评论吧~"
            className={styles.emptyState}
          />
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className={styles.commentItem} size="small">
              <div className={styles.commentHeader}>
                <div className={styles.userSection}>
                  <Avatar
                    src={comment.avatar}
                    icon={<UserOutlined />}
                    size={36}
                  />
                  <div className={styles.userDetails}>
                    <div className={styles.userMeta}>
                      <span className={styles.commentUsername}>
                        {comment.username}
                      </span>
                     
                    </div>
                    <div className={styles.commentTime}>
                      {formatTime(comment.createTime)}
                    </div>
                  </div>
                </div>

                <div className={styles.commentActions}>
                  <Rate
                    disabled
                    value={comment.rating}
                    size="small"
                    className={styles.commentRating}
                  />
                  {canDeleteComment(comment) && (
                    <Popconfirm
                      title="确定要删除这条评论吗？"
                      onConfirm={() => handleDeleteComment(comment.id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                        className={styles.deleteBtn}
                      />
                    </Popconfirm>
                  )}
                </div>
              </div>

              <div className={styles.commentContent}>
                {comment.content}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 分页 */}
      {total > pageSize && (
        <div className={styles.pagination}>
          <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            onChange={setCurrentPage}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) =>
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条评论`
            }
          />
        </div>
      )}
    </div>
  );
};

export default CommentSection;