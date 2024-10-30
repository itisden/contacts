import axios from "axios";
import { env } from "@/config";

console.log("env", env);

const instance = axios.create({
  baseURL: `${env.backendAPI}/api/v1`,
});

export default instance;
