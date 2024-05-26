import { create } from "zustand";
import { services } from "@service";
import { ServiceStore } from "@services-interface";
const useServiceStore = create<ServiceStore>((set) => ({
  servicesData: [],
  isLoading: false,
  totalCount: 1,
  getServicesData: async (params) => {
    try {
      set({ isLoading: true });
      const response = await services.get_services(params);
      if (response.status === 200) {
        response.data.services.forEach((item: any, index: number) => {
          item.index = index + 1;
        });
        set({ servicesData: response?.data?.services });
      }
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  },

  createData: async (servicesData) => {
    try {
      const response = await services.create_service(servicesData);
      if (response.status === 201) {
        set((state) => ({
          servicesData: [...state.servicesData, response.servicesData],
        }));
        return response.status;
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteData: async (id) => {
    try {
      const response = await services.delete_service(id);
      console.log(response);
      if (response.status === 200) {
        set((state) => ({
          servicesData: state.servicesData.filter((item) => item.id !== id),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateData: async (servicesData) => {
    try {
      const response = await services.update_service(servicesData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useServiceStore;
