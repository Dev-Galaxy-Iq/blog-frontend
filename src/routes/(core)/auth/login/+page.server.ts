import { authLogin } from "$lib/api/auth/auth"
import { authLoginBody } from "$lib/api/auth/auth.zod"
import type { AuthLogin400 } from "$lib/api/schemas"
import { fail, type Actions } from "@sveltejs/kit"

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData()

    const res = authLoginBody.safeParse({
      email: data.get("email"),
      password: data.get("password")
    })

    if (!res.success) {
      return fail(400, { message: "Invalid input" });
    }

    try {
      await authLogin({
        email: res.data.email,
        password: res.data.password
      })

      return { success: true };
    } catch (error: any) {
      let err: AuthLogin400 = error.response.data
      return fail(400, { message: err.message || "Login failed" });
    }
  }
}
