<template>
    <div id='NewComment'>
    	<label for='newcomment'>Write a comment</label>
	    <textarea name='newcomment' 
        v-model='newcomment'
        id='newcomment' rows="6"></textarea>
        <button v-if='this.newcomment' @click="submitNewComment">
            Submit Comment
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import axios from 'axios'
const content = namespace('content')

@Component
export default class NewComment extends Vue {
    private newcomment = ''

    @content.Action
    private POST_COMMENT!: (payload: any) => void

    private submitNewComment() {
        this.POST_COMMENT({
            parentid: 0,
            threadid: 1,
            content: this.newcomment
        })
    }

}
</script>

<style scoped>
#NewComment textarea {
    width:calc(100% - 6em);
    background:black;
    border:var(--themed-foreground-color) solid 1px;
    color:var(--themed-foreground-color);
    margin:0.5em 3em;
    border-radius:5px;
	resize: none;
}

#NewComment label {
    margin:2.5em;
}

#NewComment {
	margin-top: 2em;
}

button {
    height: 2em;
    margin: 0 4em;
    width:56em;
    background:rgb(0, 255, 85);
    border:none;
}
</style>