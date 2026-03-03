<script lang="ts">
	const { data } = $props();
</script>

<div>
	<ul>
		{#each data.data as post}
			<li>{post.title}</li>
			<div>post.content</div>
		{/each}
	</ul>
</div>
