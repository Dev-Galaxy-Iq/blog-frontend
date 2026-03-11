import { authMe } from "$lib/api/auth/auth";
import { error } from "@sveltejs/kit";

export const load = async () => {

  try {
    const res = await authMe();

    return { me: res.data.data };
  } catch (e) {
    console.log(e);

    throw error(500, "Unauthorized");
  }
};
