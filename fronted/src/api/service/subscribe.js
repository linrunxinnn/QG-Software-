import api from "../index.js";

export const getAllSubscriptions = async (id) => {
  const response = await api.get(`/subscribes/${id}`);
  return response.data;
};

export const getAppByAuthorId = async (authorId) => {
  const response = await api.get(
    `/softwares/getSoftwareByDeveloperId/${authorId}`
  );
  return response.data;
};

export const getHaveSubscribed = async (userId) => {
  const response = await api.get(`/subscribes/${userId}`);
  return response.data;
};
