<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	let { dialogOpen = $bindable() } = $props();
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure?</Dialog.Title>
		</Dialog.Header>

		<form class="flex flex-col gap-2" action="?/updateProfile" method="POST">
			<Input placeholder="update name" name="name" />
			<Input placeholder="Enter profile image url" name="avatarUrl" />

			<Dialog.Footer>
				<Button variant="ghost" onclick={() => (dialogOpen = false)}>Cancel</Button>
				<Button>Confirm</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
