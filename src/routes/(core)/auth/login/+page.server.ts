import { authLogin } from "$lib/api/auth/auth"
import { authLoginBody } from "$lib/api/auth/auth.zod"
import { fail, redirect, type Actions } from "@sveltejs/kit"
import { isAxiosError } from "axios"
import z from "zod"

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData()


    const res = authLoginBody.safeParse({
      email: data.get("email"),
      password: data.get("password"),
    })

    if (!res.success) {
      return fail(400, {
        errors: z.flattenError(res.error).fieldErrors
      });
    }

    try {
      const logged = await authLogin({
        email: res.data.email,
        password: res.data.password,
      })

      cookies.set("accessToken", logged.data.data.accessToken, {
        path: "/",
      })
      cookies.set("refreshToken", logged.data.data.refreshToken, {
        path: "/",
      })

    } catch (err: any) {
      if (isAxiosError(err)) {
        return fail(err.response?.status ?? 400, {
          error: err.response?.data?.message ?? 'Login failed'
        })
      }
    }

    // throw redirect(302, "/")
  }
}
