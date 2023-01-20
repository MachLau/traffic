import axios from "axios";

axios.defaults.timeout = 50000;

// axios.interceptors.request.use(
//   (config) => {
//     // ...
//     return config;
//   },
//   (error) => {
//     return Promise.error(error);
//   }
// );
const base =
  location.href.indexOf("localhost") > -1 ? "http://127.0.0.1:7001" : "";
function getSlotsRemain() {
  return axios.get(`${base}/api/get-remain`);
}
function applyAction(params) {
  return axios.post(`${base}api/apply-slot`, params);
}
export { getSlotsRemain, applyAction };
