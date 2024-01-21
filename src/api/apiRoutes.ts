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
};
