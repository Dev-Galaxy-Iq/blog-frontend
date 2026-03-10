import { authLogin } from "$lib/api/auth/auth"
import { authLoginBody } from "$lib/api/auth/auth.zod"
import { fail, type Actions } from "@sveltejs/kit"
import z from "zod"

export const actions: Actions = {
  default: async ({ request }) => {
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

    // const loged = await authLogin({
    //   email: res.data.email,
    //   password: res.data.password
    // })

    // if (!loged.data.data.name) return fail(400, {
    //
    // })

    return {
      data: "loged.data"
    }
  }
}
