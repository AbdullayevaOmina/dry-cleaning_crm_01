import { create } from "zustand";
import { services } from "@service";
import { ServiceStore } from "@services-interface";

const useServiceStore = create<ServiceStore>((set) => ({
  servicesData: [],
  isLoading: false,
  totalCount: 1,

  getServicesData: async (params) => {
    set({ isLoading: true });
    try {
      const response = await services.get_services(params);
      if (response.status === 200) {
        const services = response.data.services.map(
          (item: any, index: number) => ({
            ...item,
            index: index + 1,
          })
        );
        set({ servicesData: services, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },

  createData: async (servicesData) => {
    try {
      const response = await services.create_service(servicesData);
      if (response.status === 201) {
        set((state) => ({
          servicesData: [...state.servicesData, response.data],
        }));
        return response.status;
      }
    } catch (error) {
      console.error(error);
    }
  },

  deleteData: async (id: string) => {
    try {
      const response = await services.delete_service(id);
      if (response.status === 200) {
        set((state) => ({
          servicesData: state.servicesData.filter((item) => item.id !== id),
        }));
      }
      return response?.status;
    } catch (error) {
      console.error(error);
    }
  },

  updateData: async (servicesData) => {
    try {
      const response = await services.update_service(servicesData);
      if (response.status === 200) {
        const updatedService = response.data;
        set((state) => ({
          servicesData: state.servicesData.map((service) =>
            service.id === updatedService.id ? updatedService : service
          ),
        }));
        return response.status;
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useServiceStore;
