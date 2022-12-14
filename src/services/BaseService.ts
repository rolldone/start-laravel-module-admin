import axios from 'axios';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

// Default axios config
let token = window.localStorage.getItem("token");
if (token != null) {
  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  NProgress.start();
  return config;
}, function (error) {
  // Do something with request error
  console.error(error)
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  NProgress.done();
  return response;
}, function (error) {
  // Do something with response error
  console.error(error)
  setTimeout(() => {
    NProgress.done();
  }, 5000);
  return Promise.reject(error);
});

const ENDPOINT = import.meta.env.VITE_APP_API_BASE_URL || 'http://virtualbox.lan:8330/api'

export interface BaseQueryInterface {
  take?: number
  skip?: number
  where_date_field?: string
  sort_option?: string
  sort_field?: string
  start?: string
  end?: string
  search?: string
  join?: string
  join_origin_id?: string
  join_relation_id?: string
}

export default {
  AUTH: ENDPOINT + '/auth',
  USER_ADMIN: ENDPOINT + "/user",
  PEGAWAI: ENDPOINT + "/employee",
  DIVISI: ENDPOINT + "/groupmanagement/division",
  POSITION: ENDPOINT + "/groupmanagement/position",
  COMPANY: ENDPOINT + "/groupmanagement/group",
  PORTAL: ENDPOINT + "/portalgroup/portal",
  PORTAL_SELECTED: ENDPOINT + "/portalgroup/portal-selected",
  PRIVILEGE: ENDPOINT + "/privilege/m",
  PRIVILEGE_ITEM: ENDPOINT + "/privilege/item",
  DASHBOARD: ENDPOINT + "/dashboard"
}