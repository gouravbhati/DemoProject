export class ServiceConstants {
  static BEARER_TOKEN = null;
  static User_ID = null;
  static FCM_TOKEN = null;
  static Socket_IO = false;
  static strip_payment_token = null;

  static setSocketConnection(Socket_IO) {
    if (Socket_IO) {
      this.Socket_IO = Socket_IO;
    }
  }

  static getSocketConnection() {
    if (this.Socket_IO) {
      return this.Socket_IO;
    }
    return false;
  }

  static getFcmToken() {
    return this.FCM_TOKEN;
  }

  static setFcmToken(FCM_TOKEN) {
    this.FCM_TOKEN = FCM_TOKEN;
  }

  static getBearerToken() {
    return this.BEARER_TOKEN;
  }
  static setBearerToken(token = this.BEARER_TOKEN) {
    this.BEARER_TOKEN = token;
  }
}

export const headerWithoutBearer = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const headerWithBearer = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ServiceConstants.getBearerToken()}`,
  };
};

export const headerWithAdminToken = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ServiceConstants.AdminToken}`,
  };
};

export const headerBearerMultiPart = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${ServiceConstants.getBearerToken()}`,
  };
};
