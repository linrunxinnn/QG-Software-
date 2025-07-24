//这里用来创建用户登录，注册，获取用户信息等相关的API
import api from "../index.js";

//等后台api准备好后确定

//这里导出以后会到哪里使用
//1.异步action，比如在userSlice.js中创建一个thunk函数中要使用
//2.在组件的dispatch中使用
//3.其他需要使用api的地方

export const loginPassword = async (credentials) => {
  const response = await api.get("/users/password", {
    params: credentials,
  });
  console.log("登录结果:", response.data);
  return response.data;
};

export const loginCode = async (credentials) => {
  const response = await api.post("/users/code", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

//发送验证码
export const sendCode = async (email) => {
  const response = await api.post("/users/sendCodeByEmail", { email });
  return response.data;
};

//这个是展示不同类别的软件的接口
export const fetchSortFromAPI = async (type) => {
  const path = "/softwares/SearchTypeNew";
  try {
    // 使用 axios 发送 GET 请求
    const response = await api.get(`${path}?type=${type}`);
    const result = response.data; // axios 返回的数据位于 `data` 字段中

    // 处理并格式化数据
    const formattedData = result.map((item) => ({
      picture: item.picture,
      name: item.name,
      price: item.price,
    }));

    return formattedData;
  } catch (error) {
    console.error("请求失败:", error);
    throw error; // 抛出错误以便外部捕获
  }
};

//这个是管理员获取所有软件的信息的接口
export const fetchSortCheckAPI = async () => {
  const path = "/softwares";
  try {
    // 使用 axios 发送 GET 请求
    const response = await api.get(path);
    const result = response; // axios 返回的数据位于 `data` 字段中

    // 定义一个获取发布者名称的函数
    const fetchPublisherName = async (authorId) => {
      try {
        // 使用 axios 发送 GET 请求获取发布者信息
        const publisherResponse = await api.get(`/publishers/${authorId}`);
        const publisherData = publisherResponse; // 返回数据位于 `data` 字段中
        return publisherData.name; // 假设返回的数据中包含 'name' 字段
      } catch (error) {
        console.error("获取发布者信息失败:", error);
        return "未知发布者"; // 如果请求失败，返回默认值
      }
    };

    // 处理并格式化数据
    const formattedData = await Promise.all(
      result.map(async (item) => {
        const publisherName = await fetchPublisherName(item.author_id); // 异步获取发布者名称
        return {
          name: item.name,
          price: item.price,
          publisher: publisherName, // 用发布者名称替代 ID
          status: item.status,
          type: item.type,
        };
      })
    );

    return formattedData;
  } catch (error) {
    console.error("请求失败:", error);
    throw error; // 抛出错误以便外部捕获
  }
};

//这个是提交软件申请表的接口
export const submitSoftwareData = async (values, name) => {
  const softwareData = {
    software: {
      authorId: name, // 假设这个值是固定的
      price: values.price,
      introduction: values.introduction,
      version: values.version,
      type: values.type,
      name: values.name,
    },
    picture: values.picture, // 图片文件
    file: values.file, // 安装包文件
  };

  try {
    const path = "/softwares/addSoftware";
    // 向后台发送第一个 POST 请求，提交软件信息
    const softwareResponse = await api.post(path, softwareData);

    // 假设后台返回的 response.data 中有 softwareId
    const softwareId = softwareResponse.data.softwareId;

    if (softwareId) {
      // 如果返回了 softwareId，准备第二次请求
      const applyData = {
        applySoftware: {
          userId: 2, // 假设这个值是固定的
          softwareId: softwareId,
        },
        file: values.proof, // 上传的证明文件
      };

      // 向后台发送第二个 POST 请求，提交申请信息
      const path = "/applySoftwares";
      const applyResponse = await api.post(path, applyData);
      return { success: true, message: "软件申请已提交" };
    } else {
      throw new Error("获取 softwareId 失败");
    }
  } catch (error) {
    console.error("提交失败:", error);
    return { success: false, message: "提交失败" };
  }
};
