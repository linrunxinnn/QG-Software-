//这里用来创建用户登录，注册，获取用户信息等相关的API
import api from "../index.js";

//等后台api准备好后确定

//这里导出以后会到哪里使用
//1.异步action，比如在userSlice.js中创建一个thunk函数中要使用
//2.在组件的dispatch中使用
//3.其他需要使用api的地方

//这个是展示不同类别的软件的接口
export const fetchSortFromAPI = async (type) => {
    const path = "/softwares/SearchTypeNew";
    try {
        const response = await fetch(`https:/${path}?type=${type}`);
        const result = await response.json();

        // 处理并格式化数据
        const formattedData = result.map((item) => ({
            picture: item.picture,
            name: item.name,
            price: item.price,
        }));

        return formattedData;
    } catch (error) {
        console.error('请求失败:', error);
        throw error;  // 抛出错误以便外部捕获
    }
};
