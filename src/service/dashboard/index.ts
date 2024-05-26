import request from "../config";
import { Request } from "@dashboard-interface";
const dashboard: Request = {
  get_orders_satistics: (params) => request.get("/orders", { params }),
  get_main_satistics: () => request.get("/main"),
};

export default dashboard;
