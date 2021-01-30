<script>
	export let name;
	import Main from './shared/components/main/Main.svelte'
</script>

<main>
	<Main name={name} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>