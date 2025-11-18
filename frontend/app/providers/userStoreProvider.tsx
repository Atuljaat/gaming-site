"use client";

import { useEffect, type ReactNode } from "react";
import { authClient } from "../lib/client";
import { useUserStore } from "../store/userStore";

export default function UserStoreProvider({ children }: { children: ReactNode }) {
  const session = authClient.useSession();
  const { setUser, setWalletBalance } = useUserStore();

  useEffect(() => {
    async function hydrateUser() {
      // ensure user exists
      if (!session.data?.user) return;

      const user = {
        userId: session.data.user.id,
        email: session.data.user.email || "",
        username: session.data.user.name || "",
      };

      // save user in Zustand
      setUser(user);

      // fetch balance
      try {
        const res = await fetch("http://localhost:8000/wallet/balance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.userId }),
        });

        const data = await res.json();

        // save balance in Zustand
        setWalletBalance(data.balance ?? 0);

      } catch (err) {
        console.error("Failed to load balance", err);
      }
    }

    hydrateUser();
  }, [session.data]); // RUN WHEN SESSION CHANGES

  return <div>{children}</div>;
}
