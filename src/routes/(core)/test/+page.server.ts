import { authMe } from "$lib/api/auth/auth";
import { error } from "@sveltejs/kit"; // not fail
import { isAxiosError } from "axios";

export const load = async () => {
  try {
    const usr = await authMe();
    return { user: usr.data.data };
  } catch (e) {
    if (isAxiosError(e)) {
      throw error(e.response?.status ?? 400, e.response?.data?.message ?? "Failed to fetch user");
    }
    throw error(500, "Unexpected error");
  }
};
