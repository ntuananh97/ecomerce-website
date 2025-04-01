
export const API_ENDPOINT = {
  AUTH: {
    INDEX: `/auth`,
    AUTH_ME: `/auth/me`,
    REGISTER: `/auth/register`,
    LOGIN: `/auth/login`,
    REFRESH_TOKEN: `/auth/refresh-token`,
    CHANGE_PASSWORD: `/auth/change-password`
  },
  ROLE: {
    INDEX: `/roles`
  },
  SYSTEM: {
   
    USER: {
      INDEX: `/users`
    }
  },
  SETTING: {
    CITY: {
      INDEX: `/city`
    },
    DELIVERY_TYPE: {
      INDEX: `/delivery-type`
    },
    PAYMENT_TYPE: {
      INDEX: `/payment-type`
    }
  },
  MANAGE_PRODUCT: {
    PRODUCT_TYPE: {
      INDEX: `/product-types`
    },
    PRODUCT: {
      INDEX: `/products`
    },
    COMMENT: {
      INDEX: `/comments`
    }
  },
  MANAGE_ORDER: {
    ORDER: {
      INDEX: `/orders`
    },
    REVIEW: {
      INDEX: `/reviews`
    }
  },
  PAYMENT: {
    VN_PAY: {
      INDEX: `/payment/vnpay`
    }
  },
  REPORT: {
    INDEX: `/report`
  },
  NOTIFICATION: {
    INDEX: `/notifications`
  }
}
