import { BookOpen, Settings2, LayoutDashboard, User, ShoppingCart } from "lucide-react";
import { AdminRoutes, getAdminRoutes } from "../routes/routes";
import { PERMISSIONS } from "./permissions";
export const MENUS_NAVBAR = [
  {
    title: "Dashboard",
    url: getAdminRoutes(AdminRoutes.Dashboard),
    icon: LayoutDashboard,
    isActive: true,
    permissions: [PERMISSIONS.DASHBOARD],
  },
  {
    title: "System",
    // url: "/admin/system",
    icon: User,
    items: [
      {
        title: "User",
        url: "/admin/system/user",
        permissions: [PERMISSIONS.SYSTEM.USER.VIEW],
      },
      {
        title: "Role",
        url: getAdminRoutes(AdminRoutes.Role),
        permissions: [PERMISSIONS.SYSTEM.ROLE.VIEW],
      },
    ],
  },
  {
    title: "Product Management",
    // url: "/admin/manage-product",
    icon: BookOpen,
    items: [
      {
        title: "Product List",
        url: "/admin/manage-product/list-product",
        permissions: [PERMISSIONS.MANAGE_PRODUCT.PRODUCT.VIEW],
      },
      {
        title: "Product Category",
        url: "/admin/manage-product/type-product",
      },
      {
        title: "Comment",
        url: "/admin/manage-product/comment",
      },
    ],
  },
  {
    title: "Order Management",
    // url: "/admin/manage-order",
    icon: ShoppingCart,
    items: [
      {
        title: "Order List",
        url: "/admin/manage-order/list-order",
        permissions: [PERMISSIONS.MANAGE_ORDER.ORDER.VIEW],
      },
      {
        title: "Review List",
        url: "/admin/manage-order/list-review",
      },
    ],
  },
  {
    title: "Setting",
    // url: "/admin/setting",
    icon: Settings2,
    items: [
      {
        title: "City",
        url: "/admin/setting/city",
      },
      {
        title: "Delivery Method",
        url: "/admin/setting/delivery-method",
      },
      {
        title: "Payment Method",
        url: "/admin/setting/payment-method",
      },
    ],
  },
];
