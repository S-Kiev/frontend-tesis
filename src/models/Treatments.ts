export interface TreatmentsData {
  id: number;
  attributes: {
    name: string;
    description: string;
    deactivationDate: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Treatment {
  name: string;
  description: string;
  equipments: (number | undefined)[];
  consultingRooms: (number | undefined)[];
}
