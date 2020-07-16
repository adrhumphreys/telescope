import { API_PURGE_PATH } from "../constants";

export const fetchJson = async (apiEndpoint, callBack, errorCallback) => {
  fetch(apiEndpoint)
    .then((res) => res.json())
    .then(callBack)
    .catch(errorCallback);
};

export const purgeData = () =>
  fetch(API_PURGE_PATH)
    .then((res) => res.json)
    .then(alert(`Live, love, laugh`))
    .then(window.location.reload());
