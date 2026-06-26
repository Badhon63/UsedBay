import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession, updateUser } =
  createAuthClient({
    user: {
      additionalFields: {
        role: {
          type: "string",
          defaultValue: "buyer",
          required: true,
        },
        phone: {
          type: "string",
          defaultValue: "",
          required: false,
        },
        image: {
          type: "string",
          defaultValue: "",
          required: false,
        },
        location: {
          type: "string",
          defaultValue: "",
          required: false,
        },
        status: {
          type: "string",
          defaultValue: "active",
          required: false,
        },
      },
    },
  });
