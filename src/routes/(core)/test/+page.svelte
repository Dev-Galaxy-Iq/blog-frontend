<script lang="ts">
	import { createAuthMe } from '$lib/api/auth/auth';

	const { data } = $props();
	const meQuery = createAuthMe();
</script>

{#if meQuery.isPending}
	<p>Loading...</p>
{:else if meQuery.isError}
	<p>Error: {meQuery.error.message}</p>
{:else}
	<p>client site => Hello, {meQuery.data?.data.data.name}</p>
{/if}

<p class="mt-4">server => Hello, {data.name}</p>
