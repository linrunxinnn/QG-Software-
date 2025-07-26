import api from '../index.js';

// userOperationApi.js - 修正ID为long类型
// ========================================

/**
 * 将ID转换为数字类型（long）
 * @param {string|number} id - 输入的ID
 * @returns {number} 转换后的数字ID
 */
const convertToLong = (id) => {
  const numId = parseInt(id, 10);
  if (isNaN(numId)) {
    throw new Error(`无效的ID格式: ${id}`);
  }
  return numId;
};


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
      userId: convertToLong(userId),       // 转换为long
      developerId: convertToLong(developerId) //  转换为long
    });
    return {
      success: true,
      data: response.data.data
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
    // 路径参数也需要确保是数字
    const userIdLong = convertToLong(userId);
    const developerIdLong = convertToLong(developerId);

    const response = await api.post(`/subscribes/${userIdLong}/${developerIdLong}`);

    return {
      success: true,
      data: response.data.data || response.data
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
      userId: convertToLong(purchaseData.userid),
      developerId: convertToLong(purchaseData.developerid),
      price: parseFloat(purchaseData.price),
      softwareId: convertToLong(purchaseData.softwareid)
    });
    return {
      success: true,
      data: response.data.data
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
      userid: convertToLong(userid),
      softid: convertToLong(softid)
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
        message: '下载已开始'
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

  // 验证ID格式
  try {
    convertToLong(purchaseData.userid);
    convertToLong(purchaseData.developerid);
    convertToLong(purchaseData.softwareid);
  } catch (error) {
    return {
      valid: false,
      message: `ID格式错误: ${error.message}`
    };
  }

  const price = parseFloat(purchaseData.price);
  if (isNaN(price) || price <= 0) {
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

  // 验证ID格式
  try {
    convertToLong(userid);
    convertToLong(softid);
  } catch (error) {
    return {
      valid: false,
      message: `ID格式错误: ${error.message}`
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

// ============================================
//  🔥 新接口：获取软件状态
// ============================================

/**
 * 获取软件状态（新接口）
 * @param {string} userId - 用户ID
 * @param {string} softwareId - 软件ID
 * @returns {Promise} 软件状态数据
 */
export const getSoftwareStatus = async (userId, softwareId) => {
  try {
    const response = await api.get('/softwares/checkSoftwareStatus', {
      params: {
        userId: convertToLong(userId),
        softwareId: convertToLong(softwareId)
      }
    });
    return {
      success: true,
      data: response.data.data // 直接返回数字状态码
    };
  } catch (error) {
    console.error('获取软件状态失败:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

/**
 * 映射软件状态
 * 根据后端返回的状态码映射软件和用户状态
 * @param {number} statusCode - 后端返回的状态码
 * @returns {Object} 格式化的软件和用户状态
 */
export const mapSoftwareStatus = (statusCode) => {
  const statusMap = {
    1: {
      // 可以预约，但是未预约
      softwareStatus: '可预约',
      canReserve: true,
      canPurchase: false,
      hasReserved: false,
      hasPurchased: false,
      canDownload: false,
      buttonConfig: {
        text: '立即预约',
        type: 'primary',
        disabled: false,
        action: 'reserve'
      }
    },
    2: {
      // 可以预约，并且已预约
      softwareStatus: '可预约',
      canReserve: false,
      canPurchase: false,
      hasReserved: true,
      hasPurchased: false,
      canDownload: false,
      buttonConfig: {
        text: '已预约',
        type: 'default',
        disabled: true,
        action: null
      }
    },
    3: {
      // 可以购买，但是未购买
      softwareStatus: '现货',
      canReserve: false,
      canPurchase: true,
      hasReserved: false,
      hasPurchased: false,
      canDownload: false,
      buttonConfig: {
        text: '立即购买',
        type: 'primary',
        disabled: false,
        action: 'purchase'
      }
    },
    4: {
      // 可以购买，并且已购买
      softwareStatus: '现货',
      canReserve: false,
      canPurchase: false,
      hasReserved: false,
      hasPurchased: true,
      canDownload: true,
      buttonConfig: {
        text: '立即安装',
        type: 'primary',
        disabled: false,
        action: 'download'
      }
    }
  };

  // 如果没有找到对应状态码，返回默认值
  return statusMap[statusCode] || {
    softwareStatus: '暂不可用',
    canReserve: false,
    canPurchase: false,
    hasReserved: false,
    hasPurchased: false,
    canDownload: false,
    buttonConfig: {
      text: '暂不可用',
      type: 'default',
      disabled: true,
      action: null
    }
  };
};

// ============================================
//  保留旧接口（兼容性）
// ============================================

/**
 * @deprecated 使用新的 getSoftwareStatus 替代
 * 获取用户对特定软件的状态
 */
export const getUserSoftwareStatus = getSoftwareStatus;

/**
 * @deprecated 使用新的 mapSoftwareStatus 替代
 * 映射用户软件状态
 */
export const mapUserSoftwareStatus = mapSoftwareStatus;