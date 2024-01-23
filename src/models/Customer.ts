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
  birthdate: Date | null;
  cellphone: string;
  email: string;
  city: number | null;
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
