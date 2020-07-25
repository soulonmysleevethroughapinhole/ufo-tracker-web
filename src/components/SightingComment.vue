<template>
	<div id='SightingCommentWrap'>
		<div id='CommentUser'>
			{{ comm.username }}
		</div>
		<div id='CommentContent'>
			{{ comm.content }}
		</div>
	</div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

@Component
export default class SightingComment extends Vue {
	@Prop() readonly comm: {
		id: number;
		username: string;
		content: string;
		postdate: string;
		children: number;
	}
}
</script>

<style scoped>
#SightingCommentWrap {
	border-radius: 10px;
	background: linear-gradient(235deg, var(--themed-background-color-secondary), var(--themed-background-color));
	width:calc(100% - 6em);
	margin:0.125em 2em;
	padding:1em;	
}

#CommentUser {
	font-size:0.75rem;
}

#CommentContent {
	margin: 0.25em 0;
}


</style>