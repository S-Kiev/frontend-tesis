export const routes = {
  LOGIN: 'auth/local',
  USER_DATA: 'users/me?populate=role',
  GET_USERS: 'users?populate=role&sort=createdAt:desc',
  GET_USER: 'users/{id}?populate=role',
  GET_USER_DATA: 'users-data?filters[userId][$eq]={id}&populate=city',
};
