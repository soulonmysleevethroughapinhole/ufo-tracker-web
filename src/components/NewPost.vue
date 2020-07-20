<template>
    <div id='NewPost'>
        <div>
            <div>
                <div>
                    <label>Title</label>
                </div>
                <div>
                    <input 
                        v-model="postTitle"
                        id='PostTitle'
                        type='text'
                        required
                    >
                </div>
            </div>
            <div>
                <div>
                    <label>Corpus</label>
                </div>
                <div>
                    <textarea 
                        v-model="postCorpus"
                        id='PostCorpus'
                        required
                    >
                    </textarea>
                </div>
            </div>
            <div>
                Attach image / video
            </div>
            
            <div v-if='postTitle'>
                <button @click='submitNewSighting'>
                Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import axios from 'axios'
const sightings = namespace('sightings')

@Component
export default class NewPost extends Vue {
    private postTitle = ''
    private postCorpus = ''

	@sightings.Action
	private POST_SIGHTING!: (title: string, corpus: string) => void

    private submitNewSighting(): void {
        //validation
        this.POST_SIGHTING(this.postTitle, this.postCorpus)

        //push to array
    }
}
</script>

<style scoped>
#NewPost {
    text-align: start;
    width:40em;
}

#NewPost textarea, #NewPost input {
    width:40em;
    background:black;
    border:var(--themed-foreground-color) solid 1px;
    color:var(--themed-foreground-color);
    margin:0.5em 1em;
    border-radius:5px;    
}

#NewPost textarea {
    resize: none;
    height:4em;
}

#NewPost input {
    height:1.5em;
}

#NewPost label {
    font-size:0.75rem;
    margin:0.5em 1em;
}

#NewPost button {
    width: 39em;
    height: 2em;
    margin: 0.25em;
    background:rgb(0, 255, 85);
    border:none;
}
</style>