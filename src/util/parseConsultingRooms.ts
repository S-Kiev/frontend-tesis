import { ConsultingRoomData } from 'models/ConsultingRoom';

export const parseConsultingsRooms = (consultingsRooms: ConsultingRoomData[]): { value: string; label: string }[] => {
  return consultingsRooms?.map(item => {
    const { id, attributes } = item;
    const { name } = attributes;
    return { value: id.toString(), label: name };
  });
};
