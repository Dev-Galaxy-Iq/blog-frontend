<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';
	import { ArrowLeft, Check, Pencil, RefreshCw, Trash2, X } from '@lucide/svelte';
	import type { Snapshot } from '@sveltejs/kit';

	const { data } = $props();

	let editingId = $state<number | null>(null);
	let editContent = $state('');

	export const snapshot: Snapshot<{ editingId: number | null; editContent: string }> = {
		capture: () => ({ editContent, editingId }),
		restore: (value) => {
			editingId = value.editingId;
			editContent = value.editContent;
		}
	};
</script>

<div class="mx-auto max-w-2xl space-y-6 p-4">
	<div class="flex gap-2">
		<Button variant="ghost" size="sm" onclick={() => history.back()}>
			<ArrowLeft class="mr-1 h-4 w-4" /> Back
		</Button>
		<Button variant="ghost" size="sm" onclick={() => invalidate('app:comments')}>
			<RefreshCw class="mr-1 h-4 w-4" /> Refresh
		</Button>
	</div>

	<div class="space-y-2">
		<h1 class="text-3xl font-bold">{data.post.title}</h1>
		<p class="text-muted-foreground">{data.post.content}</p>
	</div>

	<Separator />

	{#await data.comments}
		<p class="text-sm text-muted-foreground">Loading comments...</p>
	{:then comments}
		<Card.Root>
			<Card.Header>
				<Card.Title>Replies ({comments.length})</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				{#each comments as comment (comment.id)}
					{#if editingId === comment.id}
						<form
							method="POST"
							action="?/editComment"
							use:enhance={() => {
								return async ({ update }) => {
									await update();
									editingId = null;
									editContent = '';
								};
							}}
							class="space-y-2 rounded-lg border p-3"
						>
							<input hidden name="commentId" value={comment.id} />
							<Input name="content" bind:value={editContent} />
							<div class="flex gap-1">
								<Button type="submit" size="sm">
									<Check class="mr-1 h-3 w-3" /> Save
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onclick={() => {
										editingId = null;
										editContent = '';
									}}
								>
									<X class="mr-1 h-3 w-3" /> Cancel
								</Button>
							</div>
						</form>
					{:else}
						<div class="flex items-start justify-between rounded-lg bg-muted p-3">
							<div>
								<p class="text-sm">{comment.message}</p>
								<p class="mt-1 text-xs text-muted-foreground">{comment.createdAt}</p>
							</div>
							<div class="flex shrink-0 gap-1">
								<Button
									variant="ghost"
									size="icon"
									class="h-7 w-7"
									onclick={() => {
										editingId = comment.id;
										editContent = comment.message;
									}}
								>
									<Pencil class="h-3.5 w-3.5" />
								</Button>
								<form method="POST" action="?/deleteComment" use:enhance>
									<input hidden name="commentId" value={comment.id} />
									<Button
										type="submit"
										variant="ghost"
										size="icon"
										class="h-7 w-7 text-destructive"
									>
										<Trash2 class="h-3.5 w-3.5" />
									</Button>
								</form>
							</div>
						</div>
					{/if}
				{:else}
					<p class="text-sm text-muted-foreground">No replies yet.</p>
				{/each}

				<Separator />

				<form method="POST" action="?/addComment" use:enhance class="space-y-2">
					<Textarea name="content" placeholder="Write a reply..." rows={3} />
					<Button type="submit" class="w-full">Submit Reply</Button>
				</form>
			</Card.Content>
		</Card.Root>
	{:catch}
		<p class="text-sm text-destructive">Error loading comments.</p>
	{/await}
</div>
