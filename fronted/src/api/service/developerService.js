// 开发者关注相关的API接口
import api from "../index.js";

/**
 * 接口说明：
 * - 获取关注列表：GET /subscribes/{userId}
 * - 关注/取消关注：POST /subscribes/{userId}/{developerId} 
 *   (同一个接口，可能通过切换状态实现关注/取消关注)
 */

// 获取用户关注的开发者列表
export const fetchFollowedDevelopers = async (userId) => {
  try {
    const path = `/subscribes/${userId}`;
    const response = await api({
      url: path,
      method: 'GET'
    });

    // 处理并格式化数据，将后端数据与前端需要的数据对标
    const formattedData = response.data.data.map((item) => ({
      id: item.id,
      name: item.name,
      avatar: item.avatar,
      followersCount: item.followersCount,
      softwareCount: item.softwareCount,

      // 以下字段后端暂时没有返回，先注释掉，使用默认值
      // type: item.type || 'individual', // 后端暂无此字段
      // description: item.description || '', // 后端暂无此字段  
      // followDate: item.followDate || '', // 后端暂无此字段
      // verified: item.verified || false, // 后端暂无此字段

      // 临时使用默认值，等后端提供后再启用
      type: 'individual', // 默认为个人开发者
      description: `${item.name}开发的软件产品`, // 临时描述
      followDate: '2024-01-01', // 临时关注日期
      verified: false // 临时认证状态
    }));

    return {
      data: formattedData,
      code: response.data.code,
      msg: response.data.msg
    };
  } catch (error) {
    console.error('获取关注开发者列表失败:', error);
    throw error;
  }
};

// 获取开发者粉丝列表（为开发者身份准备）
export const fetchDeveloperFans = async (developerId) => {
  try {
    // 这个接口可能需要后端提供，暂时使用虚拟数据
    const response = await api({
      url: `/developer/${developerId}/fans`,
      method: 'GET'
    });

    const formattedData = response.data.data.map((item) => ({
      id: item.id,
      name: item.name,
      avatar: item.avatar,
      followersCount: item.followersCount || 0,
      softwareCount: item.softwareCount || 0,
      followDate: item.followDate || '2024-01-01',
      type: item.type || 'user',
      verified: item.verified || false
    }));

    return {
      data: formattedData,
      code: response.data.code,
      msg: response.data.msg
    };
  } catch (error) {
    console.error('获取粉丝列表失败:', error);
    throw error;
  }
};

// 取消关注开发者
export const unfollowDeveloper = async (userId, developerId) => {
  try {
    const response = await api({
      url: `/subscribes/${userId}/${developerId}`,
      method: 'POST',
      data: {
        userId: userId,
        developerId: developerId
      }
    });
    return {
      data: response.data.data,
      code: response.data.code,
      msg: response.data.msg
    };
  } catch (error) {
    console.error('取消关注失败:', error);
    throw error;
  }
};

// 关注开发者
export const followDeveloper = async (userId, developerId) => {
  try {
    const response = await api({
      url: `/subscribes/${userId}/${developerId}`,
      method: 'POST',
      data: {
        userId: userId,
        developerId: developerId
      }
    });
    return {
      data: response.data.data,
      code: response.data.code,
      msg: response.data.msg
    };
  } catch (error) {
    console.error('关注失败:', error);
    throw error;
  }
};

// 临时虚拟数据函数，用于开发阶段
export const getMockFollowedDevelopers = () => {
  return {
    data: [
      {
        id: 3,
        name: '李开发',
        avatar: '/images/avatar/init.jpg',
        followersCount: 2,
        softwareCount: 4,
        type: 'individual',
        description: '专注于效率工具开发，已发布多款实用软件',
        followDate: '2024-01-15',
        verified: false
      },
      {
        id: 4,
        name: '王开发',
        avatar: '/images/avatar/init.jpg',
        followersCount: 1,
        softwareCount: 2,
        type: 'individual',
        description: '移动应用开发专家，专注于用户体验优化',
        followDate: '2024-02-20',
        verified: false
      },
      {
        id: 5,
        name: 'TechCorp Inc.',
        avatar: '/images/avatar/init.jpg',
        followersCount: 1250,
        softwareCount: 15,
        type: 'company',
        description: '专业软件开发公司，提供企业级解决方案',
        followDate: '2024-03-10',
        verified: true
      }
    ],
    code: 200,
    msg: '获取成功！'
  };
};