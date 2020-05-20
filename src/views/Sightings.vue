<template>
	<div>
		<div id='header'>
			Sightings
		</div>

		<div id='sightings'>
			<div v-for='(sighting,index) in sightingsList' :key='index' class='sighting'>
				<div v-if='sighting.type == "img"' class='img'>
					<img src="../assets/image.png" height='64px'>
				</div>
				<div v-else class='vid'>
					<img src="../assets/video.png" height='64px'>
				</div>

				<div class='info'>
				
					<div class='headinfo'>
						<div class='user'>
							{{sighting.user}}:
						</div>

						<div class='title'>
							{{sighting.title}}
						</div>
						
						
					</div>

					<div class='content'>
						{{sighting.contents}}
					</div>

				</div>

			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
//import { namespace } from 'vuex-class'

export default class Sightings extends Vue {

	public sightingsList: Array<object> = [
		{
			user: 'The_Truth_88',
			image: 'image',
			title: 'UFO IN MY BACK YARD?!?',
			contents: 'HERE IS AN IMAGE',
			type: 'img'
		},
		{
			user: 'Agent7153',
			image: 'image',
			title: 'I was out ther hunting',
			contents: 'and saw this piece in the montana skyline',
			type: 'video'
		},
		{
			user: 'sys_nominal_AFU',
			image: 'image',
			title: 'I saw the big grey',
			contents: '',
			type: 'img'
		},
		{
			user: 'Pics0rItDidntHapp3n',
			image: 'image',
			title: 'Title',
			contents: 'they keep knockin on my door!!!',
			type: 'video'
		},
	]
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

#sightings {
	width: calc(100% - 2em);
	margin:1em;
	color: #01005e;

}

.sighting {
	display:flex;

	border-radius: 5px;
	background: linear-gradient(145deg, #12cc6f, #15f384);
	box-shadow:  20px 20px 60px #11c169, 
             -20px -20px 60px #17ff8d;

	font-size:1.25rem;
	height:4em;

	margin:0.5em;

	text-align: start;


}

.img, .vid{
	height:3em;
	width:3em;

	margin:0.5em 0.25em;
}

.info {
	display:block;
	padding:0.5em;
}

.headinfo {
	display:flex;
	font-size:1rem;
}

.title {
	font-size:0.75rem;
}

.user {
	font-size: 0.75rem;
}

.content {
	font-size: 1rem;;
	border-radius: 5px;
	color:black;
	width:10em;
	height:2.5em;
	overflow:hidden;

}




</style>