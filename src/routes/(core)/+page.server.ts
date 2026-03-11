import { authMe } from '$lib/api/auth/auth.js';

export const load = async ({ request, cookies }) => {

  try {
    const me = await authMe()
    return {
      data: me.data.data
    }
  }
  catch (error) {
    console.log(error);
  }


}
