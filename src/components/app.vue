<script>
	import aselect from '../components/aselect.vue';
	import adata from '../components/adata.vue';

	export default {
		name: 'app',
		data() {
			return {
				list: ["one","two","three"],
				value: "Please select a date"
			}
		},
		props: {
		},
		components: { aselect, adata }
	}
</script>

<template>
	<div class="app">
		<h1>custom select box:</h1>
		<br>
		<aselect v-model="value" :value="value" :list="list"></aselect>
		<adata></adata>
	</div>
</template>

<style lang="scss">
	.app {
		// ..
	}
</style>
