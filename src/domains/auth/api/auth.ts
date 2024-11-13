import axios from "axios";
import apiAxios from "@/utils/axios";
import {
  type SignInWithEmailAndPasswordResponse,
  type SignUpWithEmailAndPasswordResponse,
  type RefreshTokenResponse,
} from "@/domains/auth/types";

export const login = async (
  email: string,
  password: string,
): Promise<SignInWithEmailAndPasswordResponse> => {
  return apiAxios
    .post<SignInWithEmailAndPasswordResponse>("/auth/signin", {
      email,
      password,
    })
    .then((response) => response.data);
};

export const signup = async (
  email: string,
  password: string,
): Promise<SignUpWithEmailAndPasswordResponse> => {
  return apiAxios
    .post<SignUpWithEmailAndPasswordResponse>(`/auth/signup/`, {
      email,
      password,
    })
    .then((response) => response.data);
};

export const refreshIdToken = async (
  refreshToken: string,
): Promise<RefreshTokenResponse> => {
  return axios
    .post<RefreshTokenResponse>("/auth/refresh-token", {
      refreshToken,
    })
    .then((response) => response.data);
};
