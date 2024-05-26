import { create } from "zustand";
import { dashboard } from "@service";
import { ServiceStore } from "@dashboard-interface";
const useDashboardStore = create<ServiceStore>((set) => ({
  mainSatisticData: [],
  ordersSatisticData: [],
  isLoading: false,
  getMainStatistics: async () => {
    try {
      set({ isLoading: true });
      const response = await dashboard.get_main_satistics();
      if (response.status === 200) {
        set({ mainSatisticData: response?.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  getOrdersStatistics: async (params) => {
    try {
      set({ isLoading: true });
      const response = await dashboard.get_orders_satistics(params);
      if (response.status === 200) {
        set({ ordersSatisticData: response?.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useDashboardStore;
