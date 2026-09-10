/**
 * Kept out of `send-message.ts`: a `"use server"` module may only export async
 * functions. Exporting this object from there makes it arrive as `undefined` on
 * the client, which crashes the form during SSR.
 */
export type ContactState = {
  status: "idle" | "success" | "error" | "unconfigured";
  message: string;
  fieldErrors: {
    name?: string;
    email?: string;
    message?: string;
  };
  /**
   * React 19 resets an uncontrolled form once its action resolves, which would
   * wipe what the user typed the moment validation fails. Echoing the values
   * back and feeding them to `defaultValue` restores them; on success we return
   * empty strings so the form clears as expected.
   */
  values: {
    name: string;
    email: string;
    message: string;
  };
};

export const emptyValues: ContactState["values"] = {
  name: "",
  email: "",
  message: "",
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: emptyValues,
};

export const MAX_MESSAGE_LENGTH = 2000;
