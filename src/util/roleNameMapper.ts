import { Role } from 'models/Roles';

export const roleNameMapper = (role: Role) => {
  switch (role) {
    case Role.collaborator:
      return 'Colaborador';
    case Role.superAdmin:
      return 'Super Admin';
    default:
      return '';
  }
};
