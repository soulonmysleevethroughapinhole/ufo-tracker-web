<template>
	<div>
		<div @click='queryChildren(comm.id)' v-if='!childrenShown'>
			View replies
		</div>
		<div @click='hideChildren' v-else>
			Hide replies
		</div>
		<div v-for='(ch, i) in getChildren' :key='i' id='Children'>
				<SightingComment v-bind:comm='ch' />
		</div>
	</div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import axios from 'axios'
import SightingComment from './SightingComment.vue'

@Component({
	components: {
		SightingComment
	}
})
export default class SightingCommentChildren extends Vue {
	@Prop() readonly comm: {
		id: number;
		username: string;
		content: string;
		postdate: string;
		children: number;
	}

	children: Array<object> = []
	private childrenShown = false
	get getChildren(): Array<object> {
		return this.children
	}

	private queryChildren(id: number): void {
		axios({
			url: `http://localhost:8000/api/parentid/comments/${id}`,
			method: "GET"
		}).then(res => {
			console.log(res)
			this.childrenShown = true
			this.children = res.data
		}).catch(err => {
			console.log(err)
		})
	}

	private hideChildren(): void {
		this.children = []
		this.childrenShown = false
	}


}
</script>

<style scoped>

</style>