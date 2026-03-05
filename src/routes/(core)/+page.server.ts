import { listPosts } from "$lib/api/posts/posts"

export const load = async () => {
  const res = await listPosts({
    page: 1,
    size: 5
  })

  return res.data
}
