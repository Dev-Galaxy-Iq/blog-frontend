<script lang="ts">
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import type { LayoutProps } from '../../../../routes/(core)/$types';

	const queryClient = new QueryClient();
	const { children, data }: LayoutProps = $props();
</script>

<QueryClientProvider client={queryClient}>
	<div>
		<nav class="flex items-center justify-between bg-muted">
			<div class="text-xl font-bold">Blogger</div>
			<Avatar>
				<AvatarImage src={data.me?.avatarUrl} />
				<AvatarFallback>{data.me?.name?.slice(0, 2)}</AvatarFallback>
			</Avatar>
		</nav>
		{@render children()}
	</div>
</QueryClientProvider>
