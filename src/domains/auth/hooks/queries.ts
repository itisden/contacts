import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login, signup } from "@/domains/auth/api/auth";
import useAuthStore from "@/domains/auth/stores/auth";
import {
  type SignInWithEmailAndPasswordResponse,
  type SignUpWithEmailAndPasswordResponse,
} from "@/domains/auth/types";
import { routes } from "@/router";
import { setTokens } from "@/domains/auth/utils/tokens";

export const useLogin = () => {
  const navigate = useNavigate();
  const authenticate = useAuthStore((state) => state.authenticate);

  return useMutation<
    SignInWithEmailAndPasswordResponse,
    Error,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data: SignInWithEmailAndPasswordResponse) => {
      authenticate(data);
      setTokens(data.idToken, data.refreshToken);
      navigate(routes.home);
    },
    retry: false,
  });
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation<
    SignUpWithEmailAndPasswordResponse,
    Error,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => signup(email, password),
    onSuccess: () => {
      navigate(routes.auth.login);
    },
    retry: false,
  });
};
