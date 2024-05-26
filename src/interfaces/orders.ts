export interface GetParams {
  limit: number;
  page: number;
  name?: string | null | undefined;
}
export interface CreateOrder {
  client_full_name: string;
  client_phone_number: string;
  amount: number | string;
  service_id: string;
}

export interface GetOrder {
  id: string;
}

export interface DeleteOrder extends GetOrder {}

//
type Status = `in_process` | `done` | `taken`;

export interface initialValues {
  service_id: string;
  amount: number;
  status: Status;
}

export interface postData {
  amount: number;
  client_id: string;
  id: string;
  service_id: string;
  status: Status;
}

export interface UpdateOrderStatus {
  order_id: string;
  status: Status;
}

export interface OrdersStore {
  data: any[];
  orderData: any[];
  isLoading: boolean;
  totalCount: number;
  getData: (params: GetParams) => Promise<any>;
  searchOrders: (params: GetParams) => Promise<any>;
  getOrderData: (id: GetOrder) => Promise<any>;
  createData: (data: CreateOrder) => Promise<any>;
  updateData: (data: postData) => Promise<any>;
  updateStatus: (data: UpdateOrderStatus) => Promise<any>;
}

export interface Request {
  get_orders: (params: GetParams) => Promise<any>;
  search_orders: (params: GetParams) => Promise<any>;
  get_order: (params: GetOrder) => Promise<any>;
  create_order: (data: CreateOrder) => Promise<any>;
  delete_order: (id: DeleteOrder) => Promise<any>;
  update_order: (data: postData) => Promise<any>;
  update_order_status: (id: UpdateOrderStatus) => Promise<any>;
}
