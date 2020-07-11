export const fetchJson = async (apiEndpoint, callBack, errorCallback) => {
  fetch(apiEndpoint)
    .then((res) => res.json())
    .then(callBack)
    .catch(errorCallback);
};
