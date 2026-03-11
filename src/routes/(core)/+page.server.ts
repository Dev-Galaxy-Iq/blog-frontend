import { authMe } from '$lib/api/auth/auth.js';
import { addPost, listPosts, removePost } from '$lib/api/posts/posts.js';
import { error, fail, type Actions } from '@sveltejs/kit';

export const load = async () => {
  try {
    const [me, posts] = await Promise.all([
      authMe(),
      listPosts({
        page: 1, size: 100
      })
    ])
    return {
      me: me.data.data,  // not `user`
      posts: posts.data.data
    }
  } catch (err) {
    return error(400, "error while adding new post")
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
      return fail(400, {
        error: "failed"
      })
    }
  },


  removePost: async ({ request }) => {
    const formData = await request.formData()
    const postId = formData.get("postId")?.toString()


    if (!postId) return fail(400, {
      error: "missing post id"
    })

    try {
      const rmPost = await removePost(postId)

      return {
        removedPost: rmPost.data.data
      }
    } catch (error) {
      return fail(400, {
        error: "issue while removing post"
      })
    }
  }
}
