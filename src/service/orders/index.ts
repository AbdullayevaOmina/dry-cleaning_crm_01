import request from "../config";
import { Request } from "@orders-interface";
const orders: Request = {
  get_orders: (params) => request.get("/order/all", { params }),
  search_orders: (params) =>
    request.get(
      `/order/search?page=${params.page}&limit=${params.limit}&name=${params.name}`
    ),
  get_order: (id) => request.get(`/order?id=${id}`),
  create_order: (data) => request.post("/order", data),
  delete_order: (id) => request.delete(`/order?id=${id}`),
  update_order: (data) => request.put(`/order`, data),
  update_order_status: (data) =>
    request.put(
      `/order/status?order_id=${data.order_id}&status=${data.status}`
    ),
};

export default orders;
