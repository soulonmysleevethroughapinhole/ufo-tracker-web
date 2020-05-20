<template>
	<div>
		<div id="header">
			World Map
		</div>

		<div id='img'>
			<img src="../assets/heatmap.jpg">
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	
})
</script>

<style scoped>
#header {
	color: #01005e;
	font-size:2rem;
	margin:0 auto;
	padding:0.25em;
	font-weight: bold;
}

#img {

}

#img img {
	width: calc(100% - 4em);
}

</style>