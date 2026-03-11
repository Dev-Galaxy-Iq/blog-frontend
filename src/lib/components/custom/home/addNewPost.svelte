<script lang="ts">
	import { enhance } from '$app/forms';
	import type { AuthMe200, AuthMe200Data } from '$lib/api/schemas';
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	const {
		me
	}: {
		me: AuthMe200Data;
	} = $props();
</script>

<Card class="sticky top-20 left-0 z-30 p-0">
	<CardContent class="p-4">
		<form use:enhance action="?/addPost" method="POST">
			<div class="flex gap-2">
				<Input name="title" placeholder="title" />
				<Avatar>
					<AvatarImage src={me.avatarUrl} />
					<AvatarFallback>{me.name.slice(0, 2)}</AvatarFallback>
				</Avatar>
			</div>
			<Textarea name="content" placeholder="Content..." class="mt-2" />

			<div class="mt-4 flex gap-2">
				<Button type="submit">Submit</Button>
				<Button variant="outline">Cancel</Button>
			</div>
		</form>
	</CardContent>
</Card>
