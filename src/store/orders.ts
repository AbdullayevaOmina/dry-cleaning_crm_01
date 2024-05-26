import { create } from "zustand";
import { orders } from "@service";
import { OrdersStore } from "@orders-interface";
const useOrderStore = create<OrdersStore>((set) => ({
  data: [],
  orderData: [],
  isLoading: false,
  totalCount: 1,
  getData: async (params) => {
    try {
      set({ isLoading: true });
      const response = await orders.get_orders(params);
      if (response.status === 200) {
        set({
          totalCount: Math.ceil(response?.data?.total / params.limit),
          data: response?.data?.orders_list,
        });
      }
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  },

  updateStatus: async (data) => {
    const response = await orders.update_order_status(data);
    return response.status;
  },

  searchOrders: async (params) => {
    try {
      set({ isLoading: true });
      const response = await orders.search_orders(params);
      if (response.status === 200) {
        set({
          data: response?.data?.orders_list,
          totalCount: Math.ceil(response?.data?.total / params.limit),
        });
      }
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  },

  getOrderData: async (id) => {
    try {
      set({ isLoading: true });
      const response = await orders.get_order(id);
      if (response.status === 200) {
        set({
          orderData: response?.data,
        });
      }
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  },

  createData: async (data) => {
    try {
      const response = await orders.create_order(data);
      if (response.status === 201) {
        set((state) => ({
          data:
            state.data.length < 10
              ? [...state.data, response.data]
              : [...state.data],
        }));
        return response.status;
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateData: async (data) => {
    try {
      const response = await orders.update_order(data);
      if (response.status === 200) {
        set((state) => ({
          orderData:
            state.orderData.length < 10
              ? [...state.orderData, response.data]
              : [...state.orderData],
        }));
        return response.status;
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useOrderStore;
