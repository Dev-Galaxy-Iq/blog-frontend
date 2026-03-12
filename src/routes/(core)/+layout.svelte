<script lang="ts">
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown-menu/dropdown-menu.svelte';
	import DropdownMenuTrigger from '$lib/components/ui/dropdown-menu/dropdown-menu-trigger.svelte';
	import DropdownMenuContent from '$lib/components/ui/dropdown-menu/dropdown-menu-content.svelte';
	import DropdownMenuItem from '$lib/components/ui/dropdown-menu/dropdown-menu-item.svelte';
	import { enhance } from '$app/forms';
	import UpdateProfileDialog from '$lib/components/custom/shared/updateProfileDialog.svelte';

	const { children, data } = $props();
	let dialogOpen = $state(false);
</script>

<nav class="sticky top-0 z-50 flex items-center justify-between bg-muted p-4">
	<div class="text-xl font-bold">Blogger</div>
	<DropdownMenu>
		<DropdownMenuTrigger>
			<Avatar>
				<AvatarImage src={data.me?.avatarUrl} />
				<AvatarFallback>{data.me?.name?.slice(0, 2)}</AvatarFallback>
			</Avatar>
		</DropdownMenuTrigger>

		<DropdownMenuContent>
			<form method="POST" use:enhance action="?/logout">
				<DropdownMenuItem>
					<button type="submit" class="w-full text-left">logout</button>
				</DropdownMenuItem>
			</form>
			<DropdownMenuItem onclick={() => (dialogOpen = !dialogOpen)}>Upadte Profile</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
	<UpdateProfileDialog {dialogOpen} />
</nav>
{@render children()}
