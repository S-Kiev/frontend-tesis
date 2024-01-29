export interface EquipmentAttributes {
  name: string;
  brand: string;
  description: string;
  deactivationDate: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: string;
}

export interface Equipment {
  data: {
    id: number;
    attributes: EquipmentAttributes;
  };
}

export interface RentalAttributes {
  since: string;
  status: string;
  until: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  canceledRental: boolean;
  equipment: Equipment;
}

export interface EquipmentHistoryDataRental {
  id: number;
  attributes: RentalAttributes;
}
