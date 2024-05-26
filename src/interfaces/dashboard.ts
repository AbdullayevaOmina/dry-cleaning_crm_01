export interface GetOrdersStatistic {
  start: string;
  end: string;
}

export interface ServiceStore {
  mainSatisticData: any[];
  ordersSatisticData: any[];
  isLoading: boolean;
  getMainStatistics: () => Promise<any>;
  getOrdersStatistics: (params: GetOrdersStatistic) => Promise<any>;
}

export interface Request {
  get_main_satistics: () => Promise<any>;
  get_orders_satistics: (params: GetOrdersStatistic) => Promise<any>;
}
