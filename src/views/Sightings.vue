<template>
	<div id='Sightings'>
		<div id='SightingsPosts'>
				<NewPost />
			<div v-for='(sight,i) in getSightings' :key='i' >
				<SightingDocument v-bind:sight='sight' />
			</div>
		</div>

		<div id='SightingsContent'>
			<SightingContent />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import axios from 'axios'

import SightingDocument from '../components/SightingDocument.vue'
import SightingContent from '../components/SightingContent.vue'
import NewPost from '../components/NewPost.vue'

const sightings = namespace('sightings')

@Component({
	components: {
		SightingDocument,
		SightingContent,
		NewPost
	}
})
export default class Sightings extends Vue {
	@sightings.Getter
	private getSightings!: () => Array<object>
	@sightings.Action
	private QUERY_SIGHTINGS!: () => void

	// get getSightingsList() {
	// 	return this.sightingsList
	// }
	// private sightingsSaved = false
	// private sightingsList: Array<object> = []

	// private getSightings(): void {
		
	// }

	mounted() {
		this.QUERY_SIGHTINGS()
	}
}
</script>

<style scoped>
#Sightings {
	display:flex;
}

#SightingsPosts {
	width:36em;
	height: calc(100vh - 84px);
	overflow:scroll;
	overflow-x: hidden;
}

#SightingsContent {
	width:calc(100% - 64em);
	padding:1em;
	margin: 0 auto;

	border-radius:15px;
	border:1px solid #222;

	height: calc(100vh - 84px);
	overflow:scroll;
	overflow-x: hidden;
}
</style>