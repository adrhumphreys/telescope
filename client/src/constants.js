export const BASE_PATH = "/telescope/";
export const REQUESTS_PATH = BASE_PATH + "requests";
export const REQUEST_PATH = BASE_PATH + "requests/:requestID";
export const REQUEST_PATH_LINK = BASE_PATH + "requests/";
export const DUMPS_PATH = BASE_PATH + "dumps";
export const LOGS_PATH = BASE_PATH + "logs";
export const LOG_PATH = BASE_PATH + "logs/:logID";
export const LOG_PATH_LINK = BASE_PATH + "logs/";
export const API_BASE = BASE_PATH + "api/";
export const API_REQUESTS_PATH = API_BASE + "requests";
export const API_REQUEST_PATH = API_REQUESTS_PATH + "/:requestID";
export const API_REQUEST_PARAM = ":requestID";
export const API_LOGS_PATH = API_BASE + "logs";
export const API_LOG_PATH = API_LOGS_PATH + "/:logID";
export const API_LOG_PARAM = ":logID";

export default {
  BASE_PATH,
  REQUESTS_PATH,
  DUMPS_PATH,
};
