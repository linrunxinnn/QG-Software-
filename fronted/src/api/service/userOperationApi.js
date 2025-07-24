import api from '../index.js';

/**
 * 用户操作相关API接口
 * 包括关注/取关、购买、预约、下载等功能
 */

/**
 * 关注开发商
 * @param {string} userId - 用户ID
 * @param {string} developerId - 开发商ID
 * @returns {Promise} 关注操作结果
 */
export const followDeveloper = async (userId, developerId) => {
  try {
    const response = await api.post('/subscribes', {
      userId: userId,
      developerId: developerId
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('关注开发商失败:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

/**
 * 取关开发商
 * @param {string} userId - 用户ID
 * @param {string} developerId - 开发商ID
 * @returns {Promise} 取关操作结果
 */
export const unfollowDeveloper = async (userId, developerId) => {
  try {
    const response = await api.post(`/subscribes/${userId}/${developerId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('取关开发商失败:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

/**
 * 购买软件
 * @param {Object} purchaseData - 购买数据
 * @param {string} purchaseData.userid - 用户ID
 * @param {string} purchaseData.developerid - 开发商ID
 * @param {number} purchaseData.price - 价格
 * @param {string} purchaseData.softwareid - 软件ID
 * @returns {Promise} 购买操作结果
 */
export const purchaseSoftware = async (purchaseData) => {
  try {
    const response = await api.post('/orders/buy', {
      userid: purchaseData.userid,
      developerid: purchaseData.developerid,
      price: purchaseData.price,
      softwareid: purchaseData.softwareid
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('购买软件失败:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

/**
 * 预约软件
 * @param {string} userid - 用户ID
 * @param {string} softid - 软件ID
 * @returns {Promise} 预约操作结果
 */
export const reserveSoftware = async (userid, softid) => {
  try {
    const response = await api.post('/equipments/addAppointment', {
      userid: userid,
      softid: softid
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('预约软件失败:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

/**
 * 获取软件下载链接
 * 从软件详情中获取link参数用于下载
 * @param {string} softwareId - 软件ID
 * @returns {Promise} 下载链接数据
 */
export const getSoftwareDownloadLink = async (softwareId) => {
  try {
    const response = await api.get('/softwares/SearchSoftware', {
      params: {
        id: softwareId
      }
    });

    // 提取下载链接
    const downloadLink = response.data?.link;

    if (!downloadLink) {
      throw new Error('软件下载链接不存在');
    }

    return {
      success: true,
      data: {
        link: downloadLink,
        softwareId: softwareId
      }
    };
  } catch (error) {
    console.error('获取下载链接失败:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

/**
 * 执行软件下载
 * @param {string} softwareId - 软件ID
 * @returns {Promise} 下载操作结果
 */
export const downloadSoftware = async (softwareId) => {
  try {
    // 先获取下载链接
    const linkResult = await getSoftwareDownloadLink(softwareId);

    if (!linkResult.success) {
      throw new Error('获取下载链接失败');
    }

    const downloadLink = linkResult.data.link;

    // 创建下载
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = ''; // 让浏览器自动确定文件名
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return {
      success: true,
      data: {
        message: '下载已开始',
        downloadLink: downloadLink
      }
    };
  } catch (error) {
    console.error('下载软件失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * 切换关注状态（关注/取关）
 * 根据当前关注状态自动选择关注或取关操作
 * @param {string} userId - 用户ID
 * @param {string} developerId - 开发商ID
 * @param {boolean} currentFollowStatus - 当前关注状态
 * @returns {Promise} 操作结果
 */
export const toggleFollowDeveloper = async (userId, developerId, currentFollowStatus) => {
  try {
    let result;

    if (currentFollowStatus) {
      // 当前已关注，执行取关操作
      result = await unfollowDeveloper(userId, developerId);
    } else {
      // 当前未关注，执行关注操作
      result = await followDeveloper(userId, developerId);
    }

    if (result.success) {
      return {
        success: true,
        data: {
          ...result.data,
          isFollowing: !currentFollowStatus,
          action: currentFollowStatus ? 'unfollow' : 'follow'
        }
      };
    } else {
      return result;
    }
  } catch (error) {
    console.error('切换关注状态失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * 批量操作工具函数
 */

/**
 * 验证购买参数
 * @param {Object} purchaseData - 购买数据
 * @returns {Object} 验证结果
 */
export const validatePurchaseData = (purchaseData) => {
  const required = ['userid', 'developerid', 'price', 'softwareid'];
  const missing = required.filter(field => !purchaseData[field]);

  if (missing.length > 0) {
    return {
      valid: false,
      message: `缺少必需参数: ${missing.join(', ')}`
    };
  }

  if (typeof purchaseData.price !== 'number' || purchaseData.price <= 0) {
    return {
      valid: false,
      message: '价格必须是大于0的数字'
    };
  }

  return {
    valid: true,
    message: '参数验证通过'
  };
};

/**
 * 验证预约参数
 * @param {string} userid - 用户ID
 * @param {string} softid - 软件ID
 * @returns {Object} 验证结果
 */
export const validateReserveData = (userid, softid) => {
  if (!userid || !softid) {
    return {
      valid: false,
      message: '用户ID和软件ID不能为空'
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
export const formatErrorMessage = (error) => {
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