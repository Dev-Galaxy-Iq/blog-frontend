<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex h-dvh w-full items-center justify-center">
	<Card>
		<CardContent class="w-[30em]">
			<form method="POST" use:enhance>
				{#if form?.message}
					<div class="mb-4 text-sm font-medium text-red-500">{form.message}</div>
				{/if}

				<div class="flex flex-col gap-2">
					<Label for="email">Email</Label>
					<Input name="email" id="email" placeholder="Enter email address" type="email" />
				</div>
				<div class="my-4 flex flex-col gap-2">
					<Label for="password">Password</Label>
					<Input name="password" placeholder="Enter password" type="text" />
				</div>

				<Button type="submit">Submit</Button>
			</form>
		</CardContent>
	</Card>
</div>
