import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import {
  getConsultation,
  getHistoryConsultingRoomConsultation,
  getHistoryEquipmentConsultation,
} from 'api/consultation';
import { consultationGetData } from 'models/Consultation';

export const useGetConsultationData = (
  consultationId: string,
): { data: consultationGetData; error: any; isLoading: boolean } => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Cosnultation],
    queryFn: () => getConsultation(consultationId),
  });

  const {
    data: equipmentHistory,
    error: equipmentError,
    isLoading: equipmentIsLoading,
  } = useQuery({
    queryKey: [QueryKeys.CosnultationEquipmentHistory],
    queryFn: () => getHistoryEquipmentConsultation(consultationId),
  });

  const {
    data: consultingRoomHistory,
    error: consultingRoomError,
    isLoading: consultingRoomIsLoading,
  } = useQuery({
    queryKey: [QueryKeys.CosnultationConsultingRoomHistory],
    queryFn: () => getHistoryConsultingRoomConsultation(consultationId),
  });

  const parseConsultationData = () => {
    let equipments = equipmentHistory?.data?.data.map(item => {
      return item?.attributes?.equipment?.data;
    });
    let consultingRooms = consultingRoomHistory?.data?.data.map(item => {
      return item?.attributes?.consulting_room?.data;
    });
    return {
      id: data?.data?.data?.id,
      customer: data?.data?.data?.attributes?.customer,
      treatments: data?.data?.data?.attributes?.treatments,
      equipments: equipments,
      consultingRooms: consultingRooms,
      responsibleUser: data?.data?.data?.attributes?.responsibleUser,
      comments: data?.data?.data?.attributes?.comments,
      since: data?.data?.data?.attributes?.since,
      until: data?.data?.data?.attributes?.until,
      status: data?.data?.data?.attributes?.status,
      createdAt: data?.data?.data?.attributes?.createdAt,
    };
  };

  return {
    data: parseConsultationData(),
    error: error || equipmentError || consultingRoomError,
    isLoading: isLoading && consultingRoomIsLoading && equipmentIsLoading,
  };
};
