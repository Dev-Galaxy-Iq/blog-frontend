import { authLogin } from "$lib/api/auth/auth"
import { authLoginBody } from "$lib/api/auth/auth.zod"
import { parseSetCookie } from "$lib/utils"
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

      const setCookie = logged.headers['set-cookie'] as string[]

      const parsedCookies = Object.fromEntries(
        setCookie.map(c => {
          const [nameVal] = c.split(';')
          const [name, value] = nameVal.split('=')
          return [name.trim(), value.trim()]
        })
      ) as {
        access_token: string
        refresh_token: string
      }

      cookies.set('access_token', parsedCookies.access_token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 15 })
      cookies.set('refresh_token', parsedCookies.refresh_token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 7 })

    } catch (err: any) {
      if (isAxiosError(err)) {
        return fail(err.response?.status ?? 400, {
          error: err.response?.data?.message ?? 'Login failed'
        })
      }
    }

    throw redirect(302, "/")
  }
}
