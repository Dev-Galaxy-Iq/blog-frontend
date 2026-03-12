<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import { Check, Pencil, Trash2, X } from '@lucide/svelte';

	const { data } = $props();

	let editingId = $state<number | null>(null);
	let editContent = $state('');

	function startEdit(id: number, currentMessage: string) {
		editingId = id;
		editContent = currentMessage;
	}

	function cancelEdit() {
		editingId = null;
		editContent = '';
	}
</script>

<div class="mx-auto max-w-2xl p-4">
	<Button variant="ghost" onclick={() => history.back()}>← Back</Button>

	<div class="mt-4 space-y-2">
		<h1 class="text-3xl font-bold">{data.post.title}</h1>
		<p class="text-muted-foreground">{data.post.content}</p>
	</div>

	<div class="mt-6 rounded-xl border bg-card p-4">
		<h2 class="text-lg font-semibold">Replies ({data.comments.length})</h2>
		<Separator class="my-3" />

		<div class="space-y-4">
			{#each data.comments as comment (comment.id)}
				<div class="flex gap-3">
					<Avatar.Root class="h-8 w-8 shrink-0">
						<Avatar.Fallback class="text-xs">
							{comment.userId.slice(0, 2).toUpperCase()}
						</Avatar.Fallback>
					</Avatar.Root>

					<div class="flex-1 rounded-lg bg-muted p-3">
						{#if editingId === comment.id}
							<!-- Edit mode -->
							<form
								method="POST"
								action="?/editComment"
								use:enhance={() => {
									return async ({ update }) => {
										await update();
										cancelEdit();
									};
								}}
								class="space-y-2"
							>
								<input hidden name="commentId" value={comment.id} />
								<Input name="content" bind:value={editContent} />
								<div class="flex gap-1">
									<Button type="submit" size="sm" variant="default" class="h-7 gap-1 px-2 text-xs">
										<Check class="h-3 w-3" /> Save
									</Button>
									<Button
										type="button"
										size="sm"
										variant="ghost"
										class="h-7 gap-1 px-2 text-xs"
										onclick={cancelEdit}
									>
										<X class="h-3 w-3" /> Cancel
									</Button>
								</div>
							</form>
						{:else}
							<!-- View mode -->
							<div class="flex items-start justify-between gap-2">
								<div class="space-y-1">
									<p class="text-sm">{comment.message}</p>
								</div>
								<div class="flex shrink-0 gap-1">
									<Button
										variant="ghost"
										size="icon"
										class="h-7 w-7"
										onclick={() => startEdit(comment.id, comment.message)}
									>
										<Pencil class="h-3.5 w-3.5" />
									</Button>
									<form method="POST" action="?/deleteComment" use:enhance>
										<input hidden name="commentId" value={comment.id} />
										<Button
											type="submit"
											variant="ghost"
											size="icon"
											class="h-7 w-7 text-destructive hover:text-destructive"
										>
											<Trash2 class="h-3.5 w-3.5" />
										</Button>
									</form>
								</div>
							</div>
							<p class="mt-1 text-xs text-muted-foreground">
								{comment.createdAt}
							</p>
						{/if}
					</div>
				</div>
			{:else}
				<p class="text-sm text-muted-foreground">No replies yet.</p>
			{/each}
		</div>

		<div class="mt-6">
			<Separator class="mb-4" />
			<form method="POST" action="?/addComment" use:enhance class="flex flex-col gap-2">
				<input hidden name="postId" value={page.params.id} />
				<Textarea name="content" placeholder="Write a reply..." rows={3} />
				<Button type="submit" class="self-end">Submit Reply</Button>
			</form>
		</div>
	</div>
</div>
