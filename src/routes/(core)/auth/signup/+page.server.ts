import { authLogin, authRegister } from "$lib/api/auth/auth"
import { authLoginBody, authRegisterBody } from "$lib/api/auth/auth.zod"
import { fail, type Actions } from "@sveltejs/kit"
import { isAxiosError } from "axios"
import z from "zod"

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData()

    const res = authRegisterBody.safeParse({
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
      username: data.get("username"),
    })

    if (!res.success) {
      return fail(400, {
        errors: z.flattenError(res.error).fieldErrors
      });
    }

    try {
      const logged = await authRegister({
        email: res.data.email,
        password: res.data.password,
        name: res.data.name,
        username: res.data.username
      })
      return { data: logged.data }
    } catch (err: any) {
      if (isAxiosError(err)) {
        return fail(err.response?.status ?? 400, {
          error: err.response?.data?.message ?? 'Register failed'
        })
      }
    }
  }
}
