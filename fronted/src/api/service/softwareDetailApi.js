import api from '../index.js';
import screenshot1 from '../../assets/images/screenshot1.jpg';
import screenshot2 from '../../assets/images/screenshot2.jpg';
import screenshot3 from '../../assets/images/screenshot3.jpg';
import screenshot4 from '../../assets/images/screenshot4.jpg';

/**
 * 软件详情页相关API接口
 */


/**
 * 将ID转换为数字类型（long）
 * @param {string|number} id - 输入的ID
 * @returns {number} 转换后的数字ID
 */
const convertToLong = (id) => {
  //  处理null和undefined的情况
  if (id === null || id === undefined) {
    throw new Error(`ID不能为空: ${id}`);
  }

  // 使用Number()而不是parseInt()，保持与userOperationApi.js一致
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
    const authorIdLong = convertToLong(authorId); // 转换为long
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
      screenshot1,
      screenshot2,
      screenshot3,
      screenshot4
    ],
    features: [
      {
        title: '便捷应用获取​​',
        description: '软件应用商城提供一站式下载平台，用户无需通过浏览器搜索，可直接在商城内浏览、搜索和安装应用，节省时间且避免下载风险。海量应用分类清晰，满足不同需求，提升用户体验。'
      },
      {
        title: '安全可靠​​',
        description: '商城严格审核上架应用，减少恶意软件和病毒风险。用户可查看开发者信息、评分和评论，确保下载安全。定期更新提示也能帮助用户及时修补漏洞。'
      },
      {
        title: '​​自动更新维护​​',
        description: '商城自动推送应用更新，用户无需手动检查，确保始终使用最新版本。更新通常包含功能优化和安全补丁，提升稳定性并修复已知问题，保障设备安全。'
      },
      {
        title: '​​个性化推荐​​',
        description: '基于用户下载历史和偏好，商城智能推荐相关应用，帮助发现实用工具或娱乐内容。分类榜单（如“热门”“新品”）也能辅助选择，提高探索效率。'
      },
      {
        title: '跨设备同步​​',
        description: '登录同一账号后，用户可在不同设备间同步已购应用，避免重复下载。部分商城支持云端备份数据，换机时快速恢复应用列表，提升使用连贯性。'
      },
      {
        title: '开发者支持​​',
        description: '商城为开发者提供发布、推广和盈利平台，内置数据分析工具帮助优化应用。用户反馈渠道也能促进产品改进，形成开发者与用户间的良性循环。'
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