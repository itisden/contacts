import axios from "axios";
import { env } from "@/config";

const instance = axios.create({
  baseURL: `${env.backendAPI}/api/v1`,
});

export default instance;
