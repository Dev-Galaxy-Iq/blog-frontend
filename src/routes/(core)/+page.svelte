<script lang="ts">
	import { enhance } from '$app/forms';
	import AddNewPost from '$lib/components/custom/home/addNewPost.svelte';
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardAction from '$lib/components/ui/card/card-action.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Trash } from '@lucide/svelte';

	const { data } = $props();
	let open = $state(false);
</script>

<div class="flex flex-col gap-4 p-4">
	<AddNewPost me={data.me} />

	<Separator />

	<div class="flex flex-col gap-2">
		{#each data.posts as post}
			<Card>
				<CardHeader>
					<CardTitle>{post.title}</CardTitle>
					<CardAction class="flex items-center gap-1">
						<Avatar>
							<AvatarImage src={data.me.avatarUrl} />
							<AvatarFallback>
								{data.me.name.slice(1, 2)}
							</AvatarFallback>
						</Avatar>
						{#if post.authorId === data.me.id}
							<form use:enhance action="?/removePost" method="POST">
								<input type="hidden" name="postId" value={post.id} />
								<Button variant="destructive" type="submit" size="icon-sm">
									<Trash />
								</Button>
							</form>
						{/if}
					</CardAction>
				</CardHeader>
				<CardContent
					>{post.content}

					<a href="/posts/{post.id}">
						<Button>view</Button>
					</a>
				</CardContent>
			</Card>
		{/each}
	</div>
</div>
