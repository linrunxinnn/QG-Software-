import api from "../index.js";

export const mainSearch = async (name) => {
  const response = await api.get(`/softwares/getSoftwareByFuzzyName`, {
    params: { name },
  });
  console.log("搜索结果:", response.data);
  return response.data;
};
