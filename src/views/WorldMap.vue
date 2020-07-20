<template>
	<div v-if='isLoaded'>
		<div id="header">
			World Map
		</div>

		<div v-for='(stream,index) in streams' :key='index' class="stream">
			<router-link :to="`/stream/${stream.name}`">
				<div class="overlaytext">
					<div class='username'>
						{{ stream.name }}
					</div>
					<div class='description'>
						{{ stream.description }}
					</div>
				</div>
			</router-link>

		</div>

		<!-- <div id='img'>
			<img src="../assets/heatmap.jpg">
		</div> -->
	</div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
//import { namespace } from 'vuex-class'
import axios from 'axios'

@Component
export default class WorldMap extends Vue {
	private isLoaded = false
	private streams: Array<object> = []
	private getStreamList(): void {
		axios({
			url: "http://localhost:8000/api/streams",
			method: "GET"
		}).then(res => {
			console.log(res)
			this.streams = res.data
			this.isLoaded = true
		}).catch(err => {
			console.log(err)
		})
	}
	created() {
		this.getStreamList()
	}	
}
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

.username {
	color: #01005e;
	font-size:1.25rem;
	font-weight: bold;
}

.description {
	color: #01005e;
	font-size:1.5rem;
}


.stream {
	background: linear-gradient(145deg, #eee, #fff);
	box-shadow: 4px 5px 5px -2.5px grey;
	border:#14e37b solid 2px;
	width:85%;
	margin:1em auto;
	padding:1em;
	border-radius: 10px;
	text-align: start;


}

.stream > a {
	text-decoration: none;

}

#img img {
	width: calc(100% - 4em);
}

</style>