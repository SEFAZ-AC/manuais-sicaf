"use client";

import { getAuthBasePath } from "@/utils/getBasePath";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider basePath={getAuthBasePath()}>{children}</SessionProvider>
  );
};

export default AuthProvider;
