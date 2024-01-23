export class Paths {
  static readonly LOGIN = "login";
  static readonly LOGOUT = "logout";
  static readonly ERROR = "error";
  static readonly RESOURCES = "resources";
  static readonly RESERVATIONS = "reservations";
  static readonly USER_RESERVATION = `user/${Paths.RESOURCES}/${Paths.RESERVATIONS}`;
  static readonly ADMIN_RESOURCES = `admin/${Paths.RESOURCES}`;
  static readonly ADMIN_RESOURCES_RESERVATION = Paths.ADMIN_RESOURCES + "/reservation-approval";
  static readonly ADMIN_WORKSPACE = "admin/workspaces"
  static readonly ADMIN_WORKSPACE_RESERVATION = Paths.ADMIN_WORKSPACE + "/approval"
}
