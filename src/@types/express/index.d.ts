declare namespace Express {
  type UserRole = {
    groupId: string;
    permission: UserPermission;
  };
  export interface Request {
    user: {
      id: string;
      roles: UserRole[];
    };
  }
}
