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
import {
  getSoftwareReviews,
  addSoftwareReview,
  mapReviewsData,
  getMockReviews,
  validateReviewData,
  formatReviewErrorMessage
} from '../../api/service/reviewApi';
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
  //  注释掉星级相关状态
  // const [rating, setRating] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(10);
  const [isUsingMockData, setIsUsingMockData] = useState(false); // 标记是否使用虚拟数据

  // 从props获取用户权限信息，并提供默认值
  const userPermissions = {
    hasPurchased: userInfo.hasPurchased || false,
    isAdmin: userInfo.isAdmin || false,
    userId: userInfo.userId || 'guest',
    username: userInfo.username || '游客',
    avatar: userInfo.avatar || null
  };

  // 页面加载时获取评论数据
  useEffect(() => {
    if (softwareId) {
      loadComments();
    }
  }, [currentPage, softwareId]);

  // 按时间排序评论（新评论在前）
  const sortCommentsByTime = (commentsArray) => {
    return commentsArray.sort((a, b) => {
      const timeA = new Date(a.createTime);
      const timeB = new Date(b.createTime);
      return timeB - timeA; // 降序排列，新的在前
    });
  };

  // 修复：加载评论数据 - 正确处理无评论和真正错误的情况
  const loadComments = async () => {
    setLoading(true);
    setIsUsingMockData(false);

    try {
      console.log('正在获取评论数据，软件ID:', softwareId);

      // 尝试从API获取评论数据
      const result = await getSoftwareReviews(softwareId);

      if (result.success) {
        // API调用成功
        if (result.isEmpty) {
          // 后端返回404，表示没有评论（正常情况）
          console.log('该软件暂无评论');
          setComments([]);
          setTotal(0);
        } else {
          // 有评论数据，映射并按时间排序
          const mappedComments = mapReviewsData(result.data);
          const sortedComments = sortCommentsByTime(mappedComments);
          console.log('成功从API获取评论数据:', sortedComments);
          setComments(sortedComments);
          setTotal(sortedComments.length);
        }
      } else {
        // API调用失败 - 真正的错误（网络错误、服务器错误等）
        console.error('API获取评论失败，错误类型:', result.errorType, '错误信息:', result.error);

        // 根据错误类型决定是否使用虚拟数据
        if (result.errorType === 'network_error' || result.errorType >= 500) {
          // 网络错误或服务器错误，使用虚拟数据作为备用
          console.warn('使用虚拟数据作为备用方案');
          await loadMockComments();
          message.warning('网络连接异常，显示示例评论数据');
        } else {
          // 其他错误（如400、401、403等），显示空状态
          console.warn('设置空评论状态');
          setComments([]);
          setTotal(0);
          message.error('获取评论失败，请稍后重试');
        }
      }

    } catch (error) {
      // 捕获到的异常（网络错误等）
      console.error('获取评论数据异常:', error);

      // 网络异常时使用虚拟数据
      console.warn('网络异常，使用虚拟数据');
      await loadMockComments();
      message.warning('网络连接异常，显示示例评论数据');

    } finally {
      setLoading(false);
    }
  };

  //  加载模拟评论数据（只在网络错误等真正异常情况下使用）
  const loadMockComments = async () => {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockComments = getMockReviews();
    const sortedMockComments = sortCommentsByTime(mockComments);
    setComments(sortedMockComments);
    setTotal(sortedMockComments.length);
    setIsUsingMockData(true); // 标记为使用虚拟数据

    console.log('已加载虚拟评论数据作为备用');
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
      // 构建评论数据
      const reviewData = {
        userId: userPermissions.userId,
        softwareId: softwareId,
        content: commentText.trim()
      };

      // 参数验证
      const validation = validateReviewData(reviewData);
      if (!validation.valid) {
        message.error(validation.message);
        return;
      }

      console.log('正在提交评论:', reviewData);

      // 尝试调用API添加评论
      const result = await addSoftwareReview(reviewData);

      if (result.success) {
        // API调用成功
        console.log('评论添加成功:', result.data);

        // 创建新评论对象用于立即显示（不包含星级）
        const newComment = {
          id: result.data?.id || Date.now().toString(),
          userId: userPermissions.userId,
          username: userPermissions.username,
          avatar: userPermissions.avatar,
          content: commentText,
          // 移除星级字段
          // rating: rating,
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

        // 如果之前使用的是虚拟数据，现在有了真实评论，清除虚拟数据标记
        if (isUsingMockData) {
          setIsUsingMockData(false);
          setComments([newComment]); // 只显示新评论
          setTotal(1);
        } else {
          //  新评论添加到顶部，确保按时间倒序
          const updatedComments = [newComment, ...comments];
          const sortedComments = sortCommentsByTime(updatedComments);
          setComments(sortedComments);
          setTotal(total + 1);
        }

        setCommentText('');
        // 注释掉星级重置
        // setRating(5);
        message.success('评论发表成功');

        // 如果有外部回调，调用它
        if (onCommentSubmit) {
          onCommentSubmit(newComment);
        }

      } else {
        // API调用失败
        console.warn('API添加评论失败:', result.error);
        message.error(formatReviewErrorMessage(result.error));
      }

    } catch (error) {
      console.error('提交评论异常:', error);
      message.error('发表评论失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  // 删除评论
  const handleDeleteComment = async (commentId) => {
    try {
      // TODO: 后续如果有删除评论的API，在这里调用
      // const result = await deleteSoftwareReview(commentId);

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));

      setComments(comments.filter(comment => comment.id !== commentId));
      setTotal(total - 1);
      message.success('评论删除成功');

      // 如果有外部回调，调用它
      if (onCommentDelete) {
        onCommentDelete(commentId);
      }
    } catch (error) {
      console.error('删除评论失败:', error);
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
          {/* 🔥 显示数据来源提示 */}
          {isUsingMockData && (
            <Tag color="orange" size="small" style={{ marginLeft: 8 }}>
              示例数据
            </Tag>
          )}
        </h3>
        {/* 🔥 注释掉平均评分显示 */}
        {/* 
        <div className={styles.ratingInfo}>
          <Rate disabled defaultValue={4.5} className={styles.avgRating} />
          <span className={styles.avgScore}>4.5分</span>
        </div>
        */}
      </div>

      {/* 发表评论区域 - 根据购买状态显示 */}
      {userPermissions.hasPurchased ? (
        <Card className={styles.commentForm} size="small">
          <div className={styles.userInfo}>
            <Avatar
              src={userPermissions.avatar}
              icon={<UserOutlined />}
              size={40}
            />
            <span className={styles.username}>{userPermissions.username}</span>
            <Tag color="green" size="small">已购买</Tag>
          </div>

          <div className={styles.formContent}>
            {/* 🔥 注释掉星级评分输入 */}
            {/* 
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
            */}

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
            <div className={styles.promptNote}>
              您可以查看其他用户的评论来了解软件的使用体验
            </div>
          </div>
        </Card>
      )}

      {/* 评论列表 */}
      <div className={styles.commentList}>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : comments.length === 0 ? (
          <Empty
            description={
              isUsingMockData
                ? "网络异常，无法获取评论数据"
                : "暂无评论，来发表第一个评论吧~"
            }
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
                      {comment.isPurchased && (
                        <Tag color="green" size="small">已购买</Tag>
                      )}
                    </div>
                    <div className={styles.commentTime}>
                      {formatTime(comment.createTime)}
                    </div>
                  </div>
                </div>

                {/* <div className={styles.commentActions}> */}
                  {/* 🔥 注释掉星级显示 */}
                  {/* 
                  <Rate
                    disabled
                    value={comment.rating}
                    size="small"
                    className={styles.commentRating}
                  />
                  */}
                  {/* {canDeleteComment(comment) && (
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
                </div> */}
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