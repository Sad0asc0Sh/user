import api from "@/lib/api";

export interface Category {
  _id: string;
  name: string;
  image?: {
    url: string;
    public_id: string;
  };
  icon?: {
    url: string;
    public_id: string;
  };
  isPopular: boolean;
  slug: string;
}

export const categoryService = {
  getPopular: async () => {
    const { data } = await api.get("/categories?isPopular=true");
    return data.data; // Assuming backend returns { success: true, data: [...] }
  },
  getFeatured: async () => {
    const { data } = await api.get("/categories?isFeatured=true");
    return data.data;
  },
  getAll: async () => {
    const { data } = await api.get("/categories");
    return data.data;
  },
};
