export interface GetParams {
  limit: number;
  page: number;
  name: string | undefined;
}
export interface CreateService {
  name: string;
  price: string | number;
  owner_id?: string | undefined;
}
export interface UpdateService extends CreateService {
  id: string;
}

export interface initialValues {
  name: string;
  price: number | string;
}
export interface postData extends initialValues {
  id: string;
}

export interface ServiceStore {
  servicesData: any[];
  isLoading: boolean;
  totalCount: number;
  getServicesData: (params: GetParams) => Promise<any>;
  createData: (data: CreateService) => Promise<any>;
  deleteData: (id: string) => Promise<any>;
  updateData: (data: UpdateService) => Promise<any>;
}

export interface Request {
  get_services: (params: GetParams) => Promise<any>;
  create_service: (data: CreateService) => Promise<any>;
  delete_service: (id: string) => Promise<any>;
  update_service: (data: UpdateService) => Promise<any>;
}
