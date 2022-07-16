export type PartnerType = "SUPPLIER" | "CONSUMER";

export interface Product {
  id: number;
  created: string;
  cropDate: string;
  currentOutPrice: number;
  description: string;
  name: string;
  totalValue: number;
  updated: string;
}

export interface Partner {
  id: number;
  companyName: string;
  description: string;
  email: string;
  phone: string;
  partnerType: PartnerType;
  created: string;
  updated: string;
}

export interface SupplierOperation {
  id: number;
  comment: string;
  price: number;
  received: number;
  created: string;
  partner: Partner;
  product: Product;
}

export interface ConsumerOperation {
  id: number;
  comment: string;
  price: number;
  shipped: number;
  partnerName: string;
  productName: string;
  partner: Partner;
  product: Product;
}

export interface SupplierOperationDialogData {
  supplierOperation: SupplierOperation;
  partnersList: Partner[];
  productsList: Product[];
}

export interface ConsumerOperationDialogData {
  consumerOperation: ConsumerOperation;
  partnersList: Partner[];
  productsList: Product[];
}

export interface EmployeeInformation {
  username: string;
  password: string;
}
