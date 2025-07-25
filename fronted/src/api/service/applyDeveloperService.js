import api from '../index.js';

/**
 * 申请成为开发商
 * @param {Object} applyData - 申请数据
 * @param {number} applyData.userId - 用户ID
 * @param {string} applyData.reason - 申请理由
 * @param {Array} applyData.supportingFiles - 佐证文件数组
 * @returns {Promise} API响应
 */
export const applyToDeveloper = async (applyData) => {
  try {
    // 创建FormData对象用于文件上传
    const formData = new FormData();

    // 构建ApplyDeveloper对象 - 只传必需的参数
    const applyDeveloper = {
      userId: applyData.userId,
      reason: applyData.reason
      // 暂时注释掉其他参数
      // ...(applyData.experience && { experience: applyData.experience }),
      // ...(applyData.portfolio && { portfolio: applyData.portfolio })
    };

    // 将ApplyDeveloper对象转为JSON字符串添加到FormData
    formData.append('ApplyDeveloper', JSON.stringify(applyDeveloper));

    // 添加文件到FormData
    if (applyData.supportingFiles && applyData.supportingFiles.length > 0) {
      applyData.supportingFiles.forEach((fileObj, index) => {
        formData.append('file', fileObj.file, fileObj.name);
      });
    }

    // 发送请求 - 注意这里需要设置正确的Content-Type
    const response = await api.post('/applyDevelopers', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('申请开发商失败:', error);
    throw error;
  }
};

/**
 * 获取申请状态
 * @param {number} userId - 用户ID
 * @returns {Promise} API响应
 */
export const getApplicationStatus = async (userId) => {
  try {
    const response = await api.get(`/applyDevelopers/status/${userId}`);
    return response.data;
  } catch (error) {
    console.error('获取申请状态失败:', error);
    throw error;
  }
};

/**
 * 取消申请
 * @param {number} userId - 用户ID
 * @returns {Promise} API响应
 */
export const cancelApplication = async (userId) => {
  try {
    const response = await api.delete(`/applyDevelopers/${userId}`);
    return response.data;
  } catch (error) {
    console.error('取消申请失败:', error);
    throw error;
  }
};