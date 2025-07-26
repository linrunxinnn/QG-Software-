import api from '../index.js';

/**
 * 软件详情页相关API接口
 */


/**
 * 将ID转换为数字类型（long）
 * @param {string|number} id - 输入的ID
 * @returns {number} 转换后的数字ID
 */
const convertToLong = (id) => {
  // 🔥 处理null和undefined的情况
  if (id === null || id === undefined) {
    throw new Error(`ID不能为空: ${id}`);
  }

  // 🔥 使用Number()而不是parseInt()，保持与userOperationApi.js一致
  const numId = Number(id);
  console.log(`转换ID: ${id} -> ${numId}`);

  if (isNaN(numId)) {
    console.error(`无效的ID格式: ${id}`);
    throw new Error(`无效的ID格式: ${id}`);
  }

  return numId;
};

/**
 * 获取软件详情信息
 * @param {string} softwareId - 软件ID
 * @returns {Promise} 软件详情数据
 */
export const getSoftwareDetail = async (softwareId) => {
  try {
    const response = await api.get('/softwares/SearchSoftware', {
      params: {
        id: softwareId
      }
    });
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('获取软件详情失败:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

/**
 * 获取开发商详情信息
 * @param {string} authorId - 开发商ID
 * @returns {Promise} 开发商详情数据
 */
export const getDeveloperInfo = async (authorId) => {
  try {
    const authorIdLong = convertToLong(authorId); // ✅ 转换为long
    const response = await api.get(`/users/getInformation/${authorIdLong}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('获取开发商信息失败:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

/**
 * 获取用户对开发商的关注状态
 * @param {string} authorId - 开发商ID
 * @param {string} userId - 用户ID
 * @returns {Promise} 关注状态数据
 */
export const getSubscribeStatus = async (authorId, userId) => {
  try {
    const response = await api.get('/subscribes/isSubscribe', {
      params: {
        developerId: convertToLong(authorId),
        userId: convertToLong(userId)
      }
    });
    return {
      success: true,
      data: response.data.data // 应该是布尔值
    };
  } catch (error) {
    console.error('获取关注状态失败:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

/**
 * 软件详情页数据映射函数
 * 用于将后端数据格式转换为前端需要的格式
 */

/**
 * 映射软件详情数据
 * @param {Object} backendData - 后端返回的软件数据
 * @returns {Object} 前端格式的软件数据
 */
export const mapSoftwareData = (backendData) => {
  if (!backendData) return null;

  return {
    id: backendData.id,
    name: backendData.name,
    icon: backendData.picture,
    price: `¥${parseFloat(backendData.price || 0).toFixed(2)}`,
    version: `v${backendData.version}`,
    status: mapSoftwareStatus(backendData.status), // 1-可预约, 2-现货
    category: backendData.type,
    description: backendData.introduction,
    publishedTime: backendData.publishedTime,
    link: backendData.link,
    installDetail: backendData.installDetail,
    developerId: backendData.author_id,
    // 静态数据保持不变
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=4'
    ],
    features: [
      {
        title: '智能图像处理',
        description: '采用最新AI技术，提供智能修复、自动调色、对象识别等功能，让图像处理更加高效便捷。支持批量处理和自定义预设，大幅提升工作效率。'
      },
      {
        title: '专业设计工具',
        description: '丰富的画笔工具、图层管理、滤镜效果和调整选项，满足从基础编辑到专业设计的所有需求。支持矢量和位图混合编辑。'
      },
      {
        title: '云端协作支持',
        description: '与Creative Cloud深度集成，支持多设备同步、版本管理和团队协作。随时随地访问您的创作内容，与团队成员实时分享和协作。'
      },
      {
        title: '高性能渲染',
        description: '优化的渲染引擎，支持GPU加速，处理大型文件和复杂效果时依然保持流畅体验。支持HDR和广色域显示。'
      },
      {
        title: '插件生态系统',
        description: '丰富的第三方插件支持，扩展无限可能。从特效处理到工作流程优化，海量插件满足各种专业需求。'
      },
      {
        title: '跨平台兼容',
        description: '完美支持Windows和macOS系统，提供一致的用户体验。支持多种文件格式导入导出，与其他Adobe产品无缝集成。'
      }
    ]
  };
};

/**
 * 映射开发商信息数据
 * @param {Object} backendData - 后端返回的开发商数据
 * @returns {Object} 前端格式的开发商数据
 */
export const mapDeveloperData = (backendData) => {
  if (!backendData) return null;

  return {
    id: backendData.id,
    name: backendData.name || backendData.username,
    avatar: backendData.avatar || backendData.profilePicture,
    type: backendData.userType === 'company' ? 'company' : 'individual',
    description: backendData.description || backendData.bio,
    followersCount: backendData.followersCount || 0,
    softwareCount: backendData.softwareCount || 0,
    isVerified: backendData.isVerified || false,
    // 保留静态数据作为后备
    ...(backendData.followersCount === undefined && {
      followersCount: 25000,
      softwareCount: 12,
      description: '专业的创意软件开发团队，致力于为用户提供高质量的设计工具'
    })
  };
};

/**
 * 映射软件状态
 * @param {number} statusCode - 后端状态码
 * @returns {string} 前端显示的状态文本
 */
export const mapSoftwareStatus = (statusCode) => {
  const statusMap = {
    1: '可预约',
    2: '现货'
  };
  return statusMap[statusCode] || '现货';
};

/**
 * 获取软件详情页完整数据
 * 一次性获取软件详情、开发商信息和关注状态
 * @param {string} softwareId - 软件ID
 * @param {string|null} userId - 当前用户ID（可以为null）
 * @returns {Promise} 完整的页面数据
 */
export const getSoftwareDetailPageData = async (softwareId, userId) => {
  console.log('获取软件详情页数据:', { softwareId, userId });
  try {
    // 转换软件ID为long类型
    const softwareIdLong = convertToLong(softwareId);

    // 只有当userId不为空时才转换，否则保持为null
    const userIdLong = userId ? convertToLong(userId) : null;

    // 1. 获取软件详情
    const softwareResult = await getSoftwareDetail(softwareIdLong);
    if (!softwareResult.success) {
      throw new Error('获取软件详情失败');
    }

    const softwareData = mapSoftwareData(softwareResult.data);

    // 2. 获取开发商信息
    const developerResult = await getDeveloperInfo(softwareData.developerId);
    const developerData = developerResult.success
      ? mapDeveloperData(developerResult.data)
      : null;

    // 3. 修复：获取关注状态（只有当用户已登录且有开发商ID时才获取）
    let subscribeStatus = false;
    if (userIdLong && softwareData.developerId) {
      const subscribeResult = await getSubscribeStatus(softwareData.developerId, userIdLong);
      if (subscribeResult.success) {
        subscribeStatus = subscribeResult.data;
      }
    }

    return {
      success: true,
      data: {
        software: softwareData,
        developer: developerData,
        isFollowing: subscribeStatus
      }
    };

  } catch (error) {
    console.error('获取软件详情页数据失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
};