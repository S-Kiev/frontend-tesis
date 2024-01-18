export const routes = {
  LOGIN: 'auth/local',
  USER_DATA: 'users/me?populate=role',
  GET_USERS: 'users?populate=role&sort=createdAt:desc',
};
