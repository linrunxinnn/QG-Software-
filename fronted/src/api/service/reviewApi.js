import api from '../index.js';

/**
 * 评论相关API接口
 * 包括获取评论、添加评论等功能
 */

/**
 * 获取软件评论列表
 * @param {string} softwareId - 软件ID
 * @returns {Promise} 评论列表数据
 */
export const getSoftwareReviews = async (softwareId) => {
  try {
    const response = await api.get(`/reviews/reviewOfSoftware/${softwareId}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('获取评论列表失败:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

/**
 * 添加评论
 * @param {Object} reviewData - 评论数据
 * @param {string} reviewData.userId - 用户ID
 * @param {string} reviewData.softwareId - 软件ID
 * @param {string} reviewData.content - 评论内容
 * @returns {Promise} 添加评论结果
 */
export const addSoftwareReview = async (reviewData) => {
  try {
    const response = await api.post('/reviews/addReview', {
      userId: reviewData.userId,
      softwareId: reviewData.softwareId,
      content: reviewData.content
    });
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('添加评论失败:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

/**
 * 映射评论数据格式
 * 将后端返回的评论数据转换为前端需要的格式
 * @param {Array} backendReviews - 后端评论数据
 * @returns {Array} 前端格式的评论数据
 */
export const mapReviewsData = (backendReviews) => {
  if (!Array.isArray(backendReviews)) {
    return [];
  }

  return backendReviews.map(review => ({
    id: review.id || review.reviewId,
    userId: review.userId || review.user_id,
    username: review.username || review.user?.name || review.user?.username,
    avatar: review.avatar || review.user?.avatar || review.user?.profilePicture,
    content: review.content || review.reviewContent,
    rating: review.rating || review.score || 5, // 默认5星
    createTime: review.createTime || review.created_at || review.reviewTime,
    isPurchased: review.isPurchased !== undefined ? review.isPurchased : true
  }));
};

/**
 * 获取模拟评论数据（作为API失败时的后备数据）
 * @returns {Array} 模拟评论数据
 */
export const getMockReviews = () => {
  return [
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
};

/**
 * 验证评论数据
 * @param {Object} reviewData - 评论数据
 * @returns {Object} 验证结果
 */
export const validateReviewData = (reviewData) => {
  const required = ['userId', 'softwareId', 'content'];
  const missing = required.filter(field => !reviewData[field]);

  if (missing.length > 0) {
    return {
      valid: false,
      message: `缺少必需参数: ${missing.join(', ')}`
    };
  }

  if (!reviewData.content.trim()) {
    return {
      valid: false,
      message: '评论内容不能为空'
    };
  }

  if (reviewData.content.length > 500) {
    return {
      valid: false,
      message: '评论内容不能超过500字'
    };
  }

  return {
    valid: true,
    message: '参数验证通过'
  };
};

/**
 * 格式化错误信息
 * @param {any} error - 错误对象
 * @returns {string} 格式化后的错误信息
 */
export const formatReviewErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return '操作失败，请稍后重试';
};