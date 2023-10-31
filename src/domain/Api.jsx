import axios from "axios";

const callAPI = async ({
  endpoint = "/all" /*default val*/,
  method = "GET",
  headers = {},
  data = {},
}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const option = {
    baseURL: BASE_URL,
    method: method,
    url: endpoint,
    headers: headers,
    data: data,
  };
  const response = await axios(option);
  return response?.data;
};

export default callAPI;
