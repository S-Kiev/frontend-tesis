export interface User {
  username: string;
  email: string;
  password: string;
  role: number;
  confirmed: boolean;
}

export interface UserData {
  name: string;
  lastname: string;
  document: string;
  cellphone: string;
  city: number;
  address: string;
  userId: number;
}

export interface UserDataEdit {
  name?: string;
  lastname?: string;
  document?: string;
  cellphone?: string;
  city?: number;
  address?: string;
  userId: string;
  userDataId: string;
}

export interface UserGet {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UserDataGet {
  name: string;
  lastname: string;
  document: string;
  cellphone: string;
  address: string;
  deactivationDate: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  userId: number;
  city: {
    data: {
      id: number;
      attributes: {
        cityName: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
    };
  };
}
