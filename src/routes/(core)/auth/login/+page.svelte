<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import InputGroupButton from '$lib/components/ui/input-group/input-group-button.svelte';
	import InputGroupInput from '$lib/components/ui/input-group/input-group-input.svelte';
	import InputGroup from '$lib/components/ui/input-group/input-group.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Eye, EyeClosed } from '@lucide/svelte';

	const { form } = $props();
	let showPass = $state(false);
</script>

<div class="flex h-dvh items-center justify-center">
	<form method="POST" use:enhance class="flex flex-col gap-2 rounded-2xl border bg-card p-4">
		<p class="text-2xl font-bold">Login</p>

		<Label for="email">Email Address</Label>
		<Input
			id="email"
			type="email"
			value={'test@gmail.com'}
			placeholder="email"
			name="email"
			autocomplete="off"
		/>
		{#if form?.errors?.email}
			<p class="text-sm text-destructive">{form.errors.email[0]}</p>
		{/if}
		<Label for="password">Password</Label>

		<InputGroup>
			<InputGroupInput
				type={showPass ? 'text' : 'password'}
				id="password"
				placeholder="password"
				name="password"
				autocomplete="off"
				value={'123456789'}
			/>
			<InputGroupButton onclick={() => (showPass = !showPass)}>
				{#if showPass}
					<EyeClosed />
				{:else}
					<Eye />
				{/if}
			</InputGroupButton>
		</InputGroup>
		{#if form?.errors?.password}
			<p class="text-sm text-destructive">{form.errors.password[0]}</p>
		{/if}
		{#if form?.error}
			<p class="text-sm text-destructive">{form.error}</p>
		{/if}
		<a class="mt-2 text-center text-sm underline" href="/auth/signup"> or signup instead </a>
		<Button class="mt-3 w-max" type="submit">Submit</Button>
	</form>
</div>
