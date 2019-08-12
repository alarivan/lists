import { UserSession, AppConfig } from "blockstack";
import store from "Store";

export const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

const FILE_NAME = "lists_data.json";

const GET_OPTIONS = {
  encrypt: true
};

const PUT_OPTIONS = {
  decrypt: true
};

export function getFile() {
  if (userSession.isUserSignedIn()) {
    return userSession.getFile(FILE_NAME, GET_OPTIONS).then(data => {
      return JSON.parse(data);
    });
  }

  return Promise.resolve(false);
}

export function putFile() {
  if (userSession.isUserSignedIn()) {
    const data = {
      lists: store.getters.items
    };

    return userSession.putFile(FILE_NAME, JSON.stringify(data), PUT_OPTIONS);
  }

  return Promise.resolve(false);
}
