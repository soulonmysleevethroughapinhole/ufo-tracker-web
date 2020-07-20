import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'
@Module ({
	namespaced: true
})
export default class Content extends VuexModule {
    private username = ''
    private title = 'gabaggool'
    private corpus = ''
    private mediatype = ''
    private media: File

    private isContentLoading = false

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

    @Mutation
    public SetContent(payload: any): void {
        this.username = payload.username
        this.title = payload.title
        this.corpus = payload.corpus
        this.mediatype = payload.mediatype
        this.isContentLoading = false        
    }

    @Action
    private QUERY_CONTENT(id: number): void {
        //this.isContentLoading = true
        axios({
            url: `http://localhost:8000/api/posts/${id}`,
            method: "GET"
        }).then(res => {
            console.log(res)
            this.context.commit("SetContent", res.data)
        }).catch(err => {
            console.log(err)
        })
    }

}