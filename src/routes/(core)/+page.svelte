<script lang="ts">
	import { createAuthMe } from '$lib/api/auth/auth';

	const { data } = $props();

	const me = createAuthMe();
</script>

<div>
	hello {data.data?.name}
	<br />
	{#if me.isLoading}
		<div>loading...</div>
	{:else}
		<div>{me.data?.data.data.name}</div>
	{/if}
</div>
