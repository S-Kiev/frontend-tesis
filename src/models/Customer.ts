export interface CustomerData {
  id: number;
  attributes: {
    name: string;
    lastname: string;
    document: string;
    birthdate: Date | null;
    cellphone: string;
    email: string | null;
    address: string;
    howDidYouKnow: string | null;
    profession: string;
    reasonFirstVisit: string | null;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
}

export interface CustomerCreateData {
  name: string;
  lastname: string;
  document: string;
  birthdate: undefined | string;
  cellphone: string;
  email: string;
  city: number | undefined;
  address: string;
  howDidYouKnow: string;
  profession: string;
  reasonFirstVisit: string;
  informedConsent: any;
  medication: string;
  doctor: string;
  emergencyPhone: string;
  suffersIllness: string;
  columnProblem: boolean;
  operation: string;
  heartProblem: boolean;
  cancer: string;
  diu: boolean;
  metalImplants: boolean;
  hypertensive: boolean;
  varicoseVeins: boolean;
  coagulationProblems: boolean;
  comments: string;
}

export interface CustomerMedicalInfo {
  customer: string | number;
  informedConsent?: string | number;
  medication?: string;
  doctor?: string;
  emergencyPhone: string;
  suffersIllness?: string;
  columnProblem?: boolean;
  operation?: string;
  heartProblem?: boolean;
  cancer?: string;
  diu?: boolean;
  metalImplants?: boolean;
  hypertensive?: boolean;
  varicoseVeins?: boolean;
  coagulationProblems?: boolean;
  comments?: string;
}

export interface CustomerMedicalInfoEdit {
  customerMedicalInfoId: string | number;
  informedConsent?: string | number;
  medication?: string;
  doctor?: string;
  emergencyPhone: string;
  suffersIllness?: string;
  columnProblem?: boolean;
  operation?: string;
  heartProblem?: boolean;
  cancer?: string;
  diu?: boolean;
  metalImplants?: boolean;
  hypertensive?: boolean;
  varicoseVeins?: boolean;
  coagulationProblems?: boolean;
  comments?: string;
}

export interface CustomerPersonalInfo {
  name: string;
  lastname: string;
  document: string;
  birthdate: string | Date;
  cellphone: string;
  email?: string;
  city: string | number;
  address: string;
  howDidYouKnow: string;
  profession?: string;
  reasonFirstVisit?: string;
  medicalInformation?: string | number;
}

export interface CustomerPersonalInfoEdit {
  customerId: string;
  name: string;
  lastname: string;
  document: string;
  birthdate: string | Date;
  cellphone: string;
  email?: string;
  city: string | number;
  address: string;
  howDidYouKnow: string;
  profession?: string;
  reasonFirstVisit?: string;
  medicalInformation?: string | number;
}

export interface CustomerGetData {
  id: number;
  attributes: {
    name: string;
    lastname: string;
    document: string;
    birthdate: string;
    cellphone: string;
    city: {
      data: {
        attributes: {
          cityName: string;
        };
        id: number;
      };
    };
    email: string;
    address: string;
    howDidYouKnow: string;
    profession: string;
    reasonFirstVisit: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    publishedAt: string | Date;
    medicalInformation: {
      data: {
        id: number;
        attributes: {
          medication: string;
          doctor: string;
          emergencyPhone: string;
          suffersIllness: string;
          columnProblem: boolean;
          operation: string;
          heartProblem: boolean;
          cancer: string;
          diu: boolean;
          metalImplants: boolean;
          hypertensive: boolean;
          informedConsent: {
            data: {
              id: number;
              attributes: any;
            } | null;
          };
          varicoseVeins: boolean;
          coagulationProblems: boolean;
          comments: string;
          createdAt: string | Date;
          updatedAt: string | Date;
          publishedAt: string | Date;
        };
      };
    };
  };
}
