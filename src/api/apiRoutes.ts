export const routes = {
  LOGIN: 'auth/local',
  USER_DATA: 'users/me?populate=role',
  GET_USERS: 'users?populate=role&sort=createdAt:desc',
  GET_USER: 'users/{id}?populate=role',
  GET_USER_DATA: 'users-data?filters[userId][$eq]={id}&populate=city',
  PUT_USER: 'users/{id}',
  GET_CITIES: 'cities?pagination[page]=1&pagination[pageSize]=90',
  POST_USER: 'users',
  POST_USER_DATA: 'users-data',
  PUT_USER_DATA: 'users-data/{id}',
  POST_PASSWORD: 'auth/change-password',
  GET_CUSTOMERS: 'customer-personal-informations?sort=createdAt:desc',
  UPLOAD_FILE: 'upload',
  UPLOAD_UPDATE_FILE: 'upload?id={id}',
  POST_CUSTOMER_PERSONAL_INFO: 'customer-personal-informations',
  POST_CUSTOMER_MEDICAL_INFO: 'customer-medical-informations',
  GET_TREATMENTS: 'treatments?sort=createdAt:desc',
  GET_EQUIPMENTS: 'equipments?sort=createdAt:desc',
  GET_EQUIPMENTS_HOOK: 'equipments',
  GET_CONSULTINGS_ROOMS: 'consulting-rooms?sort=createdAt:desc',
  GET_CONSULTINGS_ROOMS_HOOK: 'consulting-rooms',
  GET_CUSTOMER_INFO:
    'customer-personal-informations/{id}?populate[city][populate][0]=id&populate[medicalInformation][populate][0]=informedConsent',
  PUT_CUSTOMER_PERSONAL_INFO: 'customer-personal-informations/{id}',
  PUT_CUSTOMER_MEDICAL_INFO: 'customer-medical-informations/{id}',
  POST_EQUIPMENT: 'equipments',
  POST_EQUIPMENT_HISTORY: 'equipment-histories',
  PUT_EQUIPMENT_HISTORY: 'equipment-histories/{id}',
  GET_EQUIPMENT: 'equipments/{id}',
  PUT_EQUIPMENT: 'equipments/{id}',
  POST_CONSULTING_ROOM: 'consulting-rooms',
  PUT_CONSULTING_ROOM: 'consulting-rooms/{id}',
  GET_CONSULTING_ROOM: 'consulting-rooms/{id}',
  GET_CONSULTATIONS:
    'consultations?populate[customer][populate][0]=id&populate[responsibleUser][populate][0]=id&populate[treatments][populate][0]=id&sort=since:desc',
  POST_TREATMENT: 'treatments',
  GET_TREATMENT: 'treatments/{id}?populate[equipments][populate][0]=id&populate[consultingRooms][populate][0]=id',
  PUT_TREATMENT: 'treatments/{id}',
  GET_CUSTOMERS_HOOK: 'customer-personal-informations',
  GET_TREATMENTS_HOOK: 'treatments?populate[equipments][populate][0]=id&populate[consultingRooms][populate][0]=id',
  GET_PENDING_RENT_EQUIPMENT: 'equipment-histories?populate[equipment][populate][0]=id&sort=since:desc',
  GET_HISTORY_CONSULTING_ROOM:
    'consulting-room-histories?populate[consulting_room][populate][0]=id&populate[consultation][populate][0]=responsibleUser&$sort=since:desc',
  GET_HISTORY_EQUIPMENTS:
    'equipment-histories?populate[equipment][populate][0]=id&populate[consultation][populate][0]=responsibleUser&$sort=since:desc',
  POST_HISTORY_CONSULTING_ROOM: 'consulting-room-histories',
  POST_CONSULTATION: 'consultation/simlpleCreateConsultation',
  PUT_CONSULTATION: 'consultation/simlpleUpdateConsultation',
  GET_CONSULTATION:
    'consultations/{id}?populate[customer][populate][0]=id&populate[treatments][populate][0]=id&populate[responsibleUser][populate][0]=id',
  GET_CUSTOMER_PAYMENT: 'customer-payments?populate[consultation][populate][0]=id&populate[customer][populate][0]=id',
  GET_MEASUREMENTS_CUSTOMER:
    'measurements-customers?populate[consultation][populate][0]=id&populate[customer][populate][0]=id',
  GET_HISTORY_CONSULTINGROOM_BY_CONSULTATION:
    'consulting-room-histories?populate[consultation][populate][0]=id&populate[consulting_room][populate][0]=id&$sort=since:desc',
  GET_CONSULTATION_INFO:
    'consultation-informations?populate[consultation][populate][0]=id&populate[images][populate][0]=id&populate[measurements][populate][0]=id',
  PUT_CANCEL_CONSULTATION: 'consultation/simlpleCancelConsultation',
  POST_OBSERVATION: 'consultation-informations',
  POST_MEASUREMENTS: 'measurements-customers',
};
