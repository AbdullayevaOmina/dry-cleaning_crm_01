import { UpdateOrderStatus } from "./orders";

export interface ModalProps {
  open: boolean;
  handleClose: () => void;
  item?: any;
}

export interface updateOrderModalProps {
  open: boolean;
  handleClose: () => void;
  data?: any;
  id: string | undefined | null;
}
interface Header {
  title: string;
  value: string;
}

interface BodyItem {
  id: string;
  [key: string]: any;
}

export interface TableProps {
  headers: Header[];
  body: BodyItem[];
  isLoading: boolean;
  pageName: string;
  deleteAction: (id: any) => void;
  edit: (id: any) => void;
  handleStatus?: (data: UpdateOrderStatus) => void;
}
export interface PaginationProps {
  totalCount: number;
  page: number;
  setParams: (value: number) => void;
}

export interface ProtectedRouteProps {
  element: JSX.Element;
}

// ----------------- CONFIRM MODAL ---------------
export interface ConfirmationModalProps {
  open: boolean;
  message: string;
  btnTitle: any;
  onClose: () => void;
  onConfirm: () => void;
}

// ----------------- CONFIRM MODAL ---------------
