import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'
@Module ({
	namespaced: true
})
export default class Content extends VuexModule {
	private id = 0
	private username = 'Selected'
	private title = 'Nothing'
	private corpus = ''
	private mediatype = ''
	private media = ''
	private sightingTags:  Array<object> = []
	private comments: Array<object> = []

	get getSightingTags(): Array<object> {
		return this.sightingTags
	}

	@Mutation
	public SetTags(payload: any): void {
		this.sightingTags = payload
	}

	@Mutation
	public EmptyTags(): void {
		this.sightingTags = []
	}

	@Action
	private QUERY_TAGS(id: number): void {
		axios({
			url: `http://localhost:8000/api/tags/${id}`,
			method: "GET"
		}).then(res => {
			this.context.commit("SetTags", res.data)
		}).catch(err => {
			console.log(err)
			this.context.commit("EmptyTags")
		})
	}

	@Mutation
	public AppendTag(payload: any): void {
		this.sightingTags.unshift(payload)
	}

	@Action
	private POST_TAG(payload: any): void {
		axios({
			url: "http://localhost:8000/api/tags",
			method: "POST",
			data: {
				targetpost: payload.targetpost,
				tagcontent: payload.tagcontent
			}
		}).then(res => {
			this.context.commit("AppendTag", res.data)
		}).catch(err => {
			console.log(err)
		})
	}

	private isContentLoading = false

	get getID(): number {
		return this.id
	}

	get getUsername(): string {
		return this.username
	}

	get getTitle(): string {
		return this.title
	}

	get getCorpus(): string {
		return this.corpus
	}

	get getMediaType(): string {
		return this.mediatype
	}

	get getMedia(): string {
		return this.media
	}


	@Mutation
	public SetContent(payload: any): void {
		this.id = payload.id
		this.username = payload.username
		this.title = payload.title
		this.corpus = payload.corpus
		this.mediatype = payload.mediatype
		this.media = payload.media
		this.isContentLoading = false        
	}

	@Action
	private QUERY_CONTENT(id: number): void {
		//this.isContentLoading = true
		//^^^context commit
		axios({
			url: `http://localhost:8000/api/posts/${id}`,
			method: "GET"
		}).then(res => {
			this.context.commit("SetContent", res.data)
		}).catch(err => {
			console.log(err)
		})
	}

	get getComments(): Array<object> {
		return this.comments
	}

	@Mutation
	public SetComments(payload: any): void {
		this.comments = payload
	}

	@Mutation
	public EmptyComments(): void {
		this.comments = []
	}

	@Action
	private QUERY_COMMENTS(id: number): void {
		axios({
			url: `http://localhost:8000/api/threadid/comments/${id}`,
			method: "GET"
		}).then(res => {
			console.log(res)
			this.context.commit("SetComments", res.data)
		}).catch(err => {
			console.log(err)
			this.context.commit("EmptyComments")
		})
	}

	@Mutation
	public AppendComment(payload: any): void {
		this.comments.unshift(payload)
	}


	@Action
	private POST_COMMENT(payload: any): void {
		axios({
			url: `http://localhost:8000/api/comments`,
			method: "POST",
			data: {
				targetpost: payload.postid,
				tagcontent: payload.postid
			}
		}).then(res => {
			console.log(res)
			this.context.commit("AppendComment", res.data)
		}).catch(err => {
			console.log(err)
		})
	}
}