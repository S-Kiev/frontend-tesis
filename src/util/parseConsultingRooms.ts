import { ConsultingRoomData } from 'models/ConsultingRoom';

export const parseConsultingsRooms = (consultingsRooms: ConsultingRoomData[]) => {
  return consultingsRooms.map(item => {
    const { id, attributes } = item;
    const { name } = attributes;
    return { value: id, label: name };
  });
};
