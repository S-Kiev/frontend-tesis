interface ConsultationAttributes {
  comments: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: string;
  since: string;
  until: string;
  notifyCustomer: boolean;
  notifyUser: boolean;
}

interface ConsultationData {
  data: {
    id: number;
    attributes: ConsultationAttributes;
  };
}

interface CustomerAttributes {
  name: string;
  lastname: string;
  document: string;
  birthdate: string;
  cellphone: string;
  email: string;
  address: string;
  howDidYouKnow: string;
  profession: string;
  reasonFirstVisit: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface CustomerData {
  data: {
    id: number;
    attributes: CustomerAttributes;
  };
}

interface RentalAttributes {
  totalCost: number;
  paid: number;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  consultation: ConsultationData;
  customer: CustomerData;
}

export interface CustomerPayment {
  id: number;
  attributes: RentalAttributes;
}
