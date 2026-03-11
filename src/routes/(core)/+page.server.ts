import { authMe } from '$lib/api/auth/auth.js';
import { addPost } from '$lib/api/posts/posts.js';
import { fail, type Actions } from '@sveltejs/kit';

export const load = async ({ }) => {

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

export const actions: Actions = {
  addPost: async ({ request }) => {
    const formData = await request.formData()
    const title = formData.get("title")?.toString()
    const content = formData.get("content")?.toString()

    if (!title) return fail(400, {
      errors: {
        name: "missing post title"
      }
    })

    if (!content) return fail(400, {
      errors: {
        name: "missing post content"
      }
    })



    try {
      const res = await addPost({ title, content })

      return { newPost: res.data.data }
    } catch (error) {
      return fail(400, "error while adding new post")
    }
  }
}
