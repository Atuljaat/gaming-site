import { create } from "zustand";

type User = {
  userId: string;
  email: string;
  username: string;
};

type UserStore = {
  user: User | null;
  walletBalance: number;
  setUser: (user: User | null) => void;
  setWalletBalance: (amount: number) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  walletBalance: 0,

  setUser: (user) => set({ user }),

  setWalletBalance: (amount) => set({ walletBalance: amount }),
}));
