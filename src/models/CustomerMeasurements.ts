interface ConsultationAttributes {
  comments: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: string;
  since: string;
  until: string;
  notifyCustomer: any; // Reemplaza "any" con el tipo correcto si es conocido
  notifyUser: any; // Reemplaza "any" con el tipo correcto si es conocido
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

interface BodyMeasurementsAttributes {
  highWaist: number;
  mean: number;
  navelLine: number;
  lowerBelly: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  consultation: ConsultationData;
  customer: CustomerData;
}

export interface CustomerMeasurementsData {
  id: number;
  attributes: BodyMeasurementsAttributes;
}
