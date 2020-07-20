<template>
    <div id='SightingDocument' @click='queryContent(sight.id)'>
        <div id='Preview'>
            <div id='PreviewImage'>
                <img src="../assets/sightings.png">
            </div>
            <div id='PreviewUser'>
                {{ sight.user }}
            </div>
        </div>


        <div id='Post'>
            <div id='PostHeader'>
                <div id='PostTitle'>
                    {{ sight.title }}
                </div>
            </div>
            <div id='PostContent'>
                {{ sight.corpus }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const content = namespace('content')

@Component
export default class SightingDocument extends Vue {
    @Prop() readonly sight: {
        id: number;
        username: string;
        title: string;
        corpus: string;
        mediatype: string;
        postdate: string;
    }

    private queryContent(id: number): void {
        this.QUERY_CONTENT(id)
    }

    @content.Action
	private QUERY_CONTENT!: (id: number) => void
    
}
</script>

<style scoped>
#SightingDocument {
    display:flex;
    border-radius: 10px;
    background: linear-gradient(145deg, #000, #111);

    border: 1px solid #111;
    margin: 1em;
}

#Preview {
    margin:1em;
    width:8em;
}

#PreviewImage {
    background-color:var(--themed-foreground-color);
    height:8em;
    width:8em;
    border-radius:5px;
}

#PreviewImage img {
    height:4em;
    margin:2em;
}

#PreviewUser {
    font-weight: bold;
    font-size: 0.8rem;
    width:10em;
    overflow-wrap: break-word;
}

#Post {
    height:8em;
    margin:1em;
    overflow:scroll;
    overflow-x:hidden;
    text-align:start;
}

#PostHeader {
    font-weight: bold;
}
</style>