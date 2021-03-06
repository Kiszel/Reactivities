import { history } from "./../../index";
import { IActivity } from "./../layout/models/activity";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network Error - make sure API is running!");
  }
  const { data, config } = error.response;
  if (error.response.status === 404) {
    history.push("/notfound");
  }
  if (
    error.response.status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (error.response.status === 500) {
    toast.error("Server error -check the terminal for more info!");
  }
  throw error;
});
const responseBody = (response: AxiosResponse) => response?.data;

const request = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const Activities = {
  list: (): Promise<IActivity[]> => request.get("/activities"),
  details: (id: string) => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post("/activities", activity),
  update: (activity: IActivity) =>
    request.put(`/activities/${activity.id}/`, activity),
  delete: (id: string) => request.del(`/activities/${id}`),
};

export default {
  Activities,
};
