// 软件相关的API接口
import api from "../index.js";

// 获取轮播图软件数据
export const fetchCarouselSoftware = async () => {
  try {
    const path = '/softwares/SearchSoftwareNew';
    const response = await api({
      url: path,
      method: 'GET'
    });

    // 处理并格式化数据
    const formattedData = response.data.map((item) => ({
      id: item.id,
      picture: item.picture,
      name: item.name,
      introduction: item.introduction, // description对应introduction
      price: item.price,
      version: item.version,
      publishedTime: item.publishedTime,
      link: item.link,
      installDetail: item.installDetail,
      status: item.status,
      type: item.type,
      isDeleted: item.isDeleted,
      author_id: item.author_id
    }));

    return formattedData;
  } catch (error) {
    console.error('获取轮播图软件数据失败:', error);
    throw error;
  }
};

// 根据类型获取软件数据
export const fetchSoftwareByType = async (type) => {
  try {
    const response = await api({
      url: '/softwares/SearchTypeNew',
      method: 'GET',
      params: {
        type: type
      }
    });

    // 处理并格式化数据
    const formattedData = response.data.map((item) => ({
      picture: item.picture,
      name: item.name,
      price: item.price,
    }));

    return formattedData;
  } catch (error) {
    console.error('获取软件分类数据失败:', error);
    throw error;
  }
};

// 获取软件详情
export const fetchSoftwareDetail = async (id) => {
  try {
    const response = await api({
      url: `/softwares/${id}`,
      method: 'GET'
    });
    return response.data;
  } catch (error) {
    console.error('获取软件详情失败:', error);
    throw error;
  }
};