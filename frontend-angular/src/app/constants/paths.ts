export class Paths {
  static readonly LOGIN = "login";
  static readonly LOGOUT = "logout";
  static readonly ERROR = "error";
  static readonly HOME = "home";
  static readonly RESOURCES_RESERVATION = "resources";
  static readonly ADMIN_RESOURCES = "admin/resources";
  static readonly ADMIN_RESOURCES_RESERVATION = Paths.ADMIN_RESOURCES + "/reservation-approval";
  static readonly ADMIN_WORKSPACE = "admin/workspaces"
  static readonly ADMIN_WORKSPACE_RESERVATION = Paths.ADMIN_WORKSPACE + "/approval"
}
