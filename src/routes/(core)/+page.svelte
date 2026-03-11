<script lang="ts">
	import AddNewPost from '$lib/components/custom/home/addNewPost.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';

	const { data } = $props();
</script>

<AddNewPost me={data.me} />

<Card>
	<CardHeader>
		<CardTitle>helello</CardTitle>
		<CardDescription>helello</CardDescription>
	</CardHeader>
	<CardContent>hello</CardContent>
</Card>
