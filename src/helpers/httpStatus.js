const StatusCode = {
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  OK: 200,
  CREATED: 201,
  Unprocessable_Entity: 422,
};

const ResponseMessage = {
  Loaded: "Data loaded successfully",
  Added: "Data added successfully",
  Updated: "Data updated successfully",
  Removed: "Data removed successfully",
  Restored: "Data restored successfully",
  FailLoaded: "Failed to load data",
  FailAdded: "Failed to add data",
  FailUpdated: "Failed to update data",
  FailRemoved: "Failed to remove data",
  FailRestored: "Failed to restore data",
  FailRegistered: "Failed register data",
  UserNotFound: "User not found",
  EmailAlreadyExist: "Email already registered",
  Success: "Successfully",
  SuksesRegistered: "Successfully register.",
  LoginSuccess: "You have successfully logged in.",
  LoginFailed: "Invalid credentials.",
  NotFound: "Data not found",
  Unauthorized: "Unauthorized",
  Notrequired: "Email and Password not found",
  Emailnot: "Email not found",
  Wrongpass: "Wrong password",
  Orderfailed: "order status not valid",
  OrderNotFound: "order not found",
  Orderstatuscancelled:
    "Only orders with the status Order Placed can be cancelled",
  Ordersuccess: "the order status is updated to the new status",
  ordershipped: "Orders that have been sent cannot be cancelled",
};

module.exports = {
  StatusCode,
  ResponseMessage,
};
