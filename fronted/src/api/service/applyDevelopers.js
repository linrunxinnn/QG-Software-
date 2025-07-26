import api from "../index.js";

export const applyDeveloper = async (formData) => {
  console.log("发送的 FormData 内容:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": ", pair[1]);
  }
  const response = await api.post("/applyDevelopers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("申请开发者响应:", response.data);
  return response.data;
};
