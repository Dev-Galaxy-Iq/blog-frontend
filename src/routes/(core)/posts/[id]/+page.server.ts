import { showPost } from "$lib/api/posts/posts";
import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { addComment, listComments, removeComment, updateComment } from "$lib/api/comments/comments";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const load: PageServerLoad = async ({ params, depends }) => {
  if (!params.id) throw error(401, "post not found");
  try {
    depends("app:comments")
    const post = await showPost(params.id)

    const comments = delay(3000).then(async () => {
      const res = await listComments(params.id);
      return res.data.data;
    });




    return { post: post.data.data, comments };
  } catch (err) {
    throw error(500, "error while getting the post");
  }
};

export const actions: Actions = {
  addComment: async ({ request, params }) => {
    const formData = await request.formData();
    const content = formData.get("content")?.toString();
    const postId = params.id

    if (!content) return fail(400, { message: "please write something" });
    if (!postId) return fail(400, { message: "missing post id" });
    try {
      const newComment = await addComment(postId, { content });
      return { newComment: newComment.data.data };
    } catch (err) {
      return fail(500, { message: "error while adding reply" });
    }
  },

  editComment: async ({ request }) => {
    const formData = await request.formData();
    const content = formData.get("content")?.toString();
    const commentId = formData.get("commentId")?.toString();
    if (!content) return fail(400, { message: "please write something" });
    if (!commentId) return fail(400, { message: "missing comment id" });
    try {
      const updated = await updateComment(parseInt(commentId), { message: content });
      return { updated: updated.data.data };
    } catch (err) {
      return fail(500, { message: "error while editing reply" });
    }
  },

  deleteComment: async ({ request }) => {
    const formData = await request.formData();
    const commentId = formData.get("commentId")?.toString();
    if (!commentId) return fail(400, { message: "missing comment id" });
    try {
      await removeComment(parseInt(commentId));
      return { deleted: true };
    } catch (err) {
      return fail(500, { message: "error while deleting reply" });
    }
  }
};
