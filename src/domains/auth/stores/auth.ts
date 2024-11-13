import { create } from "zustand";
import { type SignInWithEmailAndPasswordResponse } from "../types";
import { getTokens } from "@/domains/auth/utils/tokens";

interface AuthState {
  isAuthenticated: boolean;
  authenticate: (data: SignInWithEmailAndPasswordResponse) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(getTokens()),
  authenticate: () => {
    set({ isAuthenticated: true });
  },
  logout: () => {
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;
