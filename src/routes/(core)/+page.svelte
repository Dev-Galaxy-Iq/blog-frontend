<script lang="ts">
	import { createListPosts } from '../../api/posts/posts';

	const query = createListPosts({
		page: 1,
		size: 5
	});
</script>

<div>
	<!-- {#if $query.isLoading} -->
	<!-- 	<span>Loading...</span> -->
	<!-- {:else if $query.isError} -->
	<!-- 	<span>Error: {$query.error?.message}</span> -->
	<!-- {:else} -->
	<!-- 	<ul> -->
	<!-- 		{#each $query.data?.data as pet} -->
	<!-- 			<li>{pet.title}</li> -->
	<!-- 		{/each} -->
	<!-- 	</ul> -->
	<!-- {/if} -->
</div>
