import { admin_url } from "@/lib/apiUrls/urlConstants";
import axiosInstance from "@/lib/axiosInstances/axiosInstance";

export interface KittyUserListQuery {
  page?: number;
  limit?: number;
  q?: string;
}

export const getKittyUserListApi = async (params?: KittyUserListQuery) => {
  try {
    const response = await axiosInstance.get(`${admin_url}/kitty-user-list`, {
      params,
    });
    return response;
  } catch (error) {
    return;
  }
};

