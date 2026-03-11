<script lang="ts">
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import type { LayoutProps } from '../../../../routes/(core)/$types';

	let { children, data }: LayoutProps = $props();
</script>

<div>
	<nav class="flex items-center justify-between">
		<div class="text-xl font-bold">Blogger</div>
		<Avatar>
			<AvatarImage src={data?.data?.me.avatarUrl} />
			<AvatarFallback>
				{data?.data?.me.name.slice(0, 2).toLocaleUpperCase()}
			</AvatarFallback>
		</Avatar>
	</nav>
	{@render children()}
</div>
