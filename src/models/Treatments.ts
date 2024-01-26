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
