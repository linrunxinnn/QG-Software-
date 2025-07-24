//这里用来创建用户登录，注册，获取用户信息等相关的API
import { version } from "react";
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
        // 使用 axios 发送 GET 请求
        const response = await api.get(`${path}?type=${type}`);
        const result = response.data;  // axios 返回的数据位于 `data` 字段中

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

//这个是管理员获取所有软件的信息的接口
export const fetchSortCheckAPI = async () => {
    const path = "/softwares";
    try {
        // 使用 axios 发送 GET 请求
        const response = await api.get(path);
        const result = response.data;  // axios 返回的数据位于 `data` 字段中

        // 定义一个获取发布者名称的函数
        const fetchPublisherName = async (authorId) => {
            try {
                // 使用 axios 发送 GET 请求获取发布者信息
                const publisherResponse = await api.get(`/publishers/${authorId}`);
                const publisherData = publisherResponse.data;  // 返回数据位于 `data` 字段中
                return publisherData.name;  // 假设返回的数据中包含 'name' 字段
            } catch (error) {
                console.error('获取发布者信息失败:', error);
                return '未知发布者';  // 如果请求失败，返回默认值
            }
        };

        // 处理并格式化数据
        const formattedData = await Promise.all(result.map(async (item) => {
            const publisherName = await fetchPublisherName(item.author_id);  // 异步获取发布者名称
            return {
                name: item.name,
                price: item.price,
                publisher: publisherName,  // 用发布者名称替代 ID
                status: item.status,
                type: item.type
            };
        }));

        return formattedData;
    } catch (error) {
        console.error('请求失败:', error);
        throw error;  // 抛出错误以便外部捕获
    }
};

//这个是提交软件申请表的接口
export const submitSoftwareData = async (values, name) => {
    console.log(values.picture)
    const softwareData = {
        software: {
            authorId: name, // 假设这个值是固定的
            price: values.price,
            introduction: values.introduction,
            version: values.version,
            type: values.type,
            name: values.name,
        },
        picture: values.picture[0],  // 图片文件
        file: values.file[0],        // 安装包文件
    };
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    try {
        const path = "/softwares/addSoftware"
        // 向后台发送第一个 POST 请求，提交软件信息
        const softwareResponse = await api.post(path, softwareData, { headers });

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
            const path = "/applySoftwares"
            const applyResponse = await api.post(path, applyData);
            return { success: true, message: '软件申请已提交' };
        } else {
            throw new Error('获取 softwareId 失败');
        }
    } catch (error) {
        console.error('提交失败:', error);
        return { success: false, message: '提交失败' };
    }
}

//这个是查看开发商发布过的软件的接口
export const fetchPublishSortAPI = async (authorId) => {
    const path = "/softwares/selectLastRecordsPerName";
    try {
        // 使用 axios 发送 GET 请求，带上 authorId
        const response = await api.get(`/${path}/${authorId}`);
        const result = response.data;  // axios 返回的数据位于 `data` 字段中

        // 格式化数据，将返回的字段存入 formattedData
        const formattedData = result.map(item => ({
            picture: item.picture,         // 图片字段
            name: item.name,               // 名称字段
            published_time: item.published_time // 发布时间字段
        }));

        return formattedData;  // 返回格式化后的数据
    } catch (error) {
        console.error('请求失败:', error);
        throw error;  // 抛出错误以便外部捕获
    }
};

//这个是查看开发商发布过的软件版本的接口
export const fetchSoftVersionAPI = async (softname) => {
    const path = "/softwares/SearchSoftwareVersion";
    try {
        // 使用 axios 发送 GET 请求，带上 softname
        const response = await api.get(`/${path}/${softname}`);
        const result = response.data;  // axios 返回的数据位于 `data` 字段中

        // 格式化数据，将返回的字段存入 formattedData
        const formattedData = result.map(item => ({
            picture: item.picture,         // 图片字段
            name: item.name,               // 名称字段
            published_time: item.published_time, // 发布时间字段
            versionId: item.id,
            introduction: item.introduction,
            price: item.price,
        }));

        return formattedData;  // 返回格式化后的数据
    } catch (error) {
        console.error('请求失败:', error);
        throw error;  // 抛出错误以便外部捕获
    }
};

//这个是软件开发商修改完版本信息后修改发送的更新信息
export const fetchUpdateAPI = async (versionId) => {
    const path = "/softwares/SearchSoftware";
    try {
        const requestBody = {
            versionId,
            ...updateData
        };
        const response = await api.post(`${path}`, requestBody);
        const result = response.message;  // Get the response data
        // 格式化数据，将返回的字段存入 formattedData

        return result;  // 返回格式化后的数据
    } catch (error) {
        console.error('请求失败:', error);
        throw error;  // 抛出错误以便外部捕获
    }
};