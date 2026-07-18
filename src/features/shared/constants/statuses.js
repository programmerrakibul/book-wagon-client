export const UserRoles = {
  USER: "USER",
  LIBRARIAN: "LIBRARIAN",
  ADMIN: "ADMIN",
};

export const UserRoleConfig = {
  [UserRoles.USER]: {
    label: UserRoles.USER,
    className: "bg-green-100 text-green-800 border-green-200",
  },
  [UserRoles.LIBRARIAN]: {
    label: UserRoles.LIBRARIAN,
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  [UserRoles.ADMIN]: {
    label: UserRoles.ADMIN,
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export const BookStatuses = {
  PUBLISHED: "PUBLISHED",
  UNPUBLISHED: "UNPUBLISHED",
};

export const BookStatusConfig = {
  [BookStatuses.PUBLISHED]: {
    label: BookStatuses.PUBLISHED,
    className: "bg-green-100 text-green-800 border-green-200",
  },
  [BookStatuses.UNPUBLISHED]: {
    label: BookStatuses.UNPUBLISHED,
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
};

export const OrderStatuses = {
  PENDING: "PENDING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

export const OrderStatusConfig = {
  [OrderStatuses.PENDING]: {
    label: OrderStatuses.PENDING,
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  [OrderStatuses.SHIPPED]: {
    label: OrderStatuses.SHIPPED,
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  [OrderStatuses.DELIVERED]: {
    label: OrderStatuses.DELIVERED,
    className: "bg-green-100 text-green-800 border-green-200",
  },
  [OrderStatuses.CANCELLED]: {
    label: OrderStatuses.CANCELLED,
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export const PaymentStatuses = {
  UNPAID: "UNPAID",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
};

export const PaymentStatusConfig = {
  [PaymentStatuses.PAID]: {
    label: PaymentStatuses.PAID,
    className: "bg-green-100 text-green-800 border-green-200",
  },
  [PaymentStatuses.UNPAID]: {
    label: PaymentStatuses.UNPAID,
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  [PaymentStatuses.FAILED]: {
    label: PaymentStatuses.FAILED,
    className: "bg-red-100 text-red-800 border-red-200",
  },
  [PaymentStatuses.REFUNDED]: {
    label: PaymentStatuses.REFUNDED,
    className: "bg-purple-100 text-purple-800 border-purple-200",
  },
};

export function getStatusBadge(status, configMap) {
  const key = String(status).toUpperCase();

  return configMap[key] ?? { label: status ?? "Unknown", className: "" };
}
