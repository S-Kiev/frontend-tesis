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
