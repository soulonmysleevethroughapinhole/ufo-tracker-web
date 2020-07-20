import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'
@Module ({
	namespaced: true
})
export default class Sightings extends VuexModule {
    private Sightings:  Array<object> = []
    private isSightingsLoaded = false
    get getSightings(): Array<object> {
        return this.Sightings
    }
    get getIsSightingsLoaded(): boolean {
        return this.isSightingsLoaded
    }

    @Mutation
    public SetSightings(payload: any): void {
        this.Sightings = payload
        this.isSightingsLoaded = true
    }

    @Action
    private QUERY_SIGHTINGS(): void {
        axios({
			url: "http://localhost:8000/api/posts",
			method: "GET",
		}).then(res => {
			this.context.commit("SetSightings", res.data)
		}).catch(err => {
			console.log(err)
		})
    }

    @Mutation
    public AppendSighting(payload: any): void {
        this.Sightings.unshift(payload)
    }

    @Action
    private POST_SIGHTING(title: string, corpus: string): void {    
        axios({
			url: "http://localhost:8000/api/posts",
            method: "POST",
            data: {
        		title: title,
				corpus: corpus
    		}
        }).then(res => {
            this.context.commit("AppendSighting", res.data)
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

}