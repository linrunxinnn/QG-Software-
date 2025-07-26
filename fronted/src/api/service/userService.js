//这里用来创建用户登录，注册，获取用户信息等相关的API
import { version } from "react";
import api from "../index.js";

//等后台api准备好后确定

//这里导出以后会到哪里使用
//1.异步action，比如在userSlice.js中创建一个thunk函数中要使用
//2.在组件的dispatch中使用
//3.其他需要使用api的地方

export const deleteUser = async (userId) => {
    api.delete(`/users/delete/${userId}`);
};

export const loginPassword = async (credentials) => {
    try {
        console.log("登录请求数据:", credentials);
        const response = await api.get("/users/password", {
            params: credentials,
        });
        console.log("登录结果:", response.data);
        return response.data;
    } catch (error) {
        console.error("登录失败:", error);
    }
};

export const loginCode = async (credentials) => {
    const response = await api.get("/users/code", {
        params: credentials,
    });
    console.log("登录结果:", response.data);
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post("/users/register", {
        code: userData.code,
        user: { email: userData.email, password: userData.password },
    });
    return response.data;
};

//发送验证码
export const sendCode = async (email) => {
    console.log("发送验证码到:", email);
    const response = await api.get("/users/sendCodeByEmail", {
        params: { email },
    });
    return response.data;
};

//重设密码
export const resetPassword = async (email, newPassword) => {
    const response = await api.post("/users/resetPassword", {
        params: { email, newPassword },
    });
    return response.data;
};

//更改用户头像
export const changeAvatar = async (formData, userId) => {
    const response = await api.post(`/users/updateAvatar`, formData, {
        params: { userId },
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

//更改用户名
export const changeUsername = async (id, name) => {
    console.log("更新用户名请求数据:", { id, name });
    const response = await api.put(`/users/updateName`, {
        id: id,
        name: name,
    });
    return response.data;
};

//更改手机号
export const changePhone = async (id, phone) => {
    const response = await api.put(`/users/updatePhone`, {
        id: id,
        phone: phone,
    });
    return response.data;
};

//获取用户预约软件
export const getAppointment = async (userId) => {
    // console.log("获取用户预约软件，用户ID:", userId);
    const response = await api.get(`/equipments/selectAppointment/${userId}`);
    // console.log("获取预约软件结果:", response.data);
    return response.data;
};

//获取用户已经购买软件
export const getPurchase = async (userId) => {
    // console.log("获取用户购买软件，用户ID:", userId);
    const response = await api.get(`/equipments/selectPurchased/${userId}`);
    // console.log("获取购买软件结果:", response.data);
    return response.data;
};

//获取软件开发商的软件
export const getDeveloperSoftware = async (authorId) => {
    console.log("获取开发商软件，作者ID:", authorId);
    const response = await api.get(
        `/softwares/selectLastRecordsPerName/${authorId}`
    );
    console.log("获取开发商软件结果:", response.data);
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
            id: item.id,
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
        const result = response.data.data;  // axios 返回的数据位于 `data` 字段中
        console.log("第一个请求的表", result);

        //第一个请求 这里的id 是 id （用为查询详情页的id（以后要用到的id（软件））
        const fetchPublisherName = async (authorId) => {
            try {
                // 使用 axios 发送 GET 请求获取发布者信息
                const publisherResponse = await api.get(`/users/getInformation/${authorId}`);
                const publisherData = publisherResponse.data.data;  // 返回数据位于 `data` 字段中
                console.log("第二个请求的表", publisherData);

                return publisherData;  // 假设返回的数据中包含 'name' 字段
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
                publisher: publisherName.name,  // 用发布者名称替代 ID
                status: item.status,
                type: item.type,
                authorId: item.author_id,//第一个表的authorId
                id: item.id,//第一个software表的Id 
            };
        }));


        return formattedData;
    } catch (error) {
        console.error("请求失败:", error);
        throw error; // 抛出错误以便外部捕获
    }
};

//这个是提交软件申请表的接口
export const submitSoftwareData = async (values, publishId) => {
    // 创建一个新的 FormData 对象
    const formData = new FormData();
    // 将软件信息封装成 JSON 字符串
    const softwareData = JSON.stringify({
        authorId: 1, // 假设这个值是固定的
        price: values.price,
        introduction: values.introduction,
        version: values.version,
        type: values.type,
        name: values.name,
    });
    console.log(softwareData);
    // 将 JSON 数据和文件一起添加到 FormData 中
    formData.append('software', softwareData); // 添加软件信息的 JSON 字符串
    formData.append('picture', values.picture[0].originFileObj); // 图片文件
    formData.append('file', values.file[0].originFileObj);

    try {
        const path = "/softwares/addSoftware";
        // 向后台发送第一个 POST 请求，提交软件信息（使用 FormData）


        const softwareResponse = await api.post(path, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // 假设后台返回的 response.data 中有 softwareId
        const softwareId = softwareResponse.data.data.id;
        console.log(softwareId);

        if (softwareId) {
            // 如果返回了 softwareId，准备第二次请求
            const secondFormData = new FormData();
            const secondData = JSON.stringify({
                userId: 2,
                softwareId: softwareId,
                reason: ""
            });
            secondFormData.append('applySoftware', secondData);
            secondFormData.append('file', values.proof[0].originFileObj); // 上传的证明文件

            // 向后台发送第二个 POST 请求，提交申请信息（使用 FormData）
            const secondpath = "/applySoftwares";
            const applyResponse = await api.post(secondpath, secondFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return { success: true, message: '软件申请已提交' };
        } else {
            throw new Error('获取 softwareId 失败');
        }
    } catch (error) {
        console.error('提交失败:', error);
        return { success: false, message: '提交失败' };
    }
};


//这个是查看开发商发布过的软件的接口
export const fetchPublishSortAPI = async (authorId) => {
    // const path = "/softwares/selectLastRecordsPerName";
    try {
        // 使用 axios 发送 GET 请求，带上 authorId
        const response = await api.get("/softwares/selectLastRecordsPerName", {
            params: {
                authorId
            }
        });
        const result = response.data.data;  // axios 返回的数据位于 `data` 字段中

        // 格式化数据，将返回的字段存入 formattedData
        const formattedData = result.map(item => ({
            picture: item.picture,         // 图片字段
            name: item.name,               // 名称字段
            published_time: item.publishedTime, // 发布时间字段
            softId: item.id//软件的id
        }));

        return formattedData;  // 返回格式化后的数据
    } catch (error) {
        // 打印更详细的错误信息
        if (error.response) {
            console.error('API错误:', error.response);
        } else {
            console.error('请求错误:', error.message);
        }
    }
};

//这个是查看开发商发布过的软件版本的接口
export const fetchSoftVersionAPI = async (id) => {
    const path = "/softwares/SearchSoftwareVersion";
    try {
        // 使用 axios 发送 GET 请求，带上 id
        const response = await api.get("/softwares/SearchSoftwareVersion", {
            params: {
                id
            }
        });
        const result = response.data.data;  // axios 返回的数据位于 `data` 字段中
        console.log(result);

        // 格式化数据，将返回的字段存入 formattedData
        const formattedData = result.map(item => ({
            picture: item.picture,         // 图片字段
            name: item.name,               // 名称字段
            published_time: item.publishedTime, // 发布时间字段
            versionId: item.id,
            version: item.version,
            introduction: item.introduction,
            price: item.price,
        }));
        console.log(formattedData);

        return formattedData; // 返回格式化后的数据
    } catch (error) {
        console.error("请求失败:", error);
        throw error; // 抛出错误以便外部捕获
    }
};

//这个是软件开发商修改完版本信息后修改发送的更新信息
export const fetchUpdateAPI = async (updateData) => {
    const path = "/softwares/changeSoftwareById";
    try {
        const requestBody = {
            ...updateData
        };
        console.log(requestBody);

        const response = await api.put(path, requestBody);
        const result = response.message;  // Get the response data
        // 格式化数据，将返回的字段存入 formattedData

        return result;  // 返回格式化后的数据
    } catch (error) {
        console.error('请求失败:', error);
    }
};

//获取所有账户信息的接口
export const fetchAccountAPI = async () => {
    const path = "/admins"
    try {
        const response = await api.get("/admins")

        return response.data.data;  // 返回格式化后的数据
    } catch (error) {
        console.error('请求失败:', error);
        throw error;
    }
}

//冻结账户的接口
export const fetchstatusAPI = async (userId, endTime) => {
    const path = "/bans/add"
    try {
        const body = {
            userId,
            endTime
        }
        const response = await api.post(path, body)
        return response.message;  // 返回格式化后的数据
    } catch (error) {
        console.log("表哥出错了", error)
    }
}

//解冻账户的接口
export const fetchfrezeeAPI = async (userId) => {
    try {
        const body = { userId }
        const response = await api.delete("/bans",
            body
        )
        return response.data.msg
    } catch (error) {
        console.log("", error)
    }
}

//获取用户申请成为开发商的接口
export const fetchApplyAPI = async () => {
    try {
        const path = "/applyDevelopers";
        // 使用封装好的 api.get 来获取数据
        const response = await api.get(path);  // 假设返回包含id、reason和material的数组
        const applicationsData = response.data.data;

        // 根据id查询name并合并数据
        const fetchNames = applicationsData.map(async (app) => {
            try {
                const nameResponse = await api.get(`/users/getInformation/${app.id}`);
                return {
                    ...app,
                    name: nameResponse.data.data.name,  // 合并name字段
                };
            } catch (error) {
                console.error(`查询ID为${app.id}的name失败:`, error);
                return { ...app, name: '未知' };  // 如果查询失败，返回默认值
            }
        });

        // 等待所有查询完成
        const allApps = await Promise.all(fetchNames);
        return allApps;  // 更新状态

    } catch (error) {
        console.error('获取数据失败:', error);
    }
}

//同意用户升级申请
export const fetchAdmitAPI = async (id, userId) => {
    const path = "/applyDevelopers/agreeApplyDeveloper"
    try {
        const requestbody = {
            id,
            userId
        }
        const response = await api.put(path, requestbody)
        return response.message;  // 返回格式化后的数据
    } catch (error) {
        console.error('请求失败:', error);
    }
}

//拒绝用户升级申请
export const fetchBanAPI = async (id, userId) => {
    const path = "/applyDevelopers/disagreeApplyDeveloper"
    try {
        const reason = "操"
        const requestbody = {
            id,
            userId,
            reason
        }
        const response = await api.post(path, requestbody)
        return response.message;  // 返回格式化后的数据
    } catch (error) {
        console.error('请求失败:', error);
    }
}


//获取软件商发布的审核材料
export const fetchSoftApplyAPI = async (authorId, id) => {
    const path = "/softwares/getSoftwareWithMaterial"
    try {
        const response = await api.get(path, {
            params: {
                authorId,
                id//请求表的id
            }
        })
        console.log("这是点击进入审核资料", response.data);

        return response.data.data
        //这里会有三个id 
    } catch (error) {
        console.error('请求失败', error);

    }
}


//同意软件发布时的接口 /softwares/roleUpdate _body id
export const fetchContollerAdmitAPI = async (softwareId, authorId, id) => {
    const path1 = "/softwares/roleUpdate";
    const path2 = "/applySoftwares/agreeApplySoftware";


    // 请求体
    const body1 = { softwareId };
    const body2 = { userId: authorId, id, softwareId };

    try {
        // 使用 Promise.all 同时发起两个请求
        const [response1, response2] = await Promise.all([
            api.put(path1, body1),
            api.put(path2, body2),
        ]);

        // 返回两个请求的结果
        return {
            response1: response1.data,
            response2: response2.data,
        };
    } catch (error) {
        console.error("请求失败", error);
        // 处理错误，可以返回错误信息
        throw error;
    }
};

//拒绝软件发布时的接口
export const fetchControlcancelAPI = async (id, authorId, softwareId) => {
    const path1 = "/softwares/roleDelete";
    const path2 = "/applySoftwares/disagreeApplySoftware";

    const body2 = { userId: authorId, id, softwareId };

    try {
        // 使用 Promise.all 同时发起两个请求
        const [response1, response2] = await Promise.all([
            api.delete(path1, {
                params: {
                    id
                }
            }),
            api.put(path2, body2),
        ]);

        // 返回两个请求的结果
        return {
            response1: response1.data,
            response2: response2.data,
        };
    } catch (error) {
        console.error("请求失败", error);
        // 处理错误，可以返回错误信息
        throw error;
    }
};