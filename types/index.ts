import axios from "axios";
import { AccountsApi } from "./generated";

const instance = axios.create();

const getAccessToken = () => {
  const session = window.localStorage.getItem("auth");
  if (session) {
    return JSON.parse(session).accessToken as string;
  }
};

// This handles adding auth to the request
instance.interceptors.request.use(
  (config) =>
    new Promise((resolve) => {
      const accessToken = getAccessToken();
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      resolve(config);
    })
);

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const accountsApi = new AccountsApi(undefined, BASE_URL, instance);
