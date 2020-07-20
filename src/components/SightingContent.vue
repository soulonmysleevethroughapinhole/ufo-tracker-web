<template>
    <div id='SightingContentDoc'>
        <div id='SightingHeader'>
            {{ getTitle }}
        </div>

        {{getUsername}}

        <div id='SightingMedia' v-if='false'>
            
        </div>

        <div id='SightingCorpus'>
            {{ getCorpus }}
        </div>

        <!-- TAGS -->
        <div id='Tags'>
            <div class='infotag'>
                UFOs in the desert
            </div>
            <div class='infotag'>
                UFOs in my back yard
            </div>
            <div class='infotag'>
                Scary UFOs
            </div>
            <div class='infotag'>
                Glowing UFOs!!!
            </div>
            <div class='infotag'>
                Encounter of the 420th kind
            </div>
            <div class='infotag'>
                My dog died yesterday; left me all alone.
            </div>
            <div class='infotag'>
                The finance company, they dropped by today; reposessed my home
            </div>
            <div class='infotag'>
                But that's nothing compared to losing you
            </div>
        </div>
        
        <!-- TAGS -->

        <div id='SightingComments'>
            chit chat
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
//import Tags from './Tags.vue'

const content = namespace('content')

@Component
export default class SightingContent extends Vue {
    @content.Getter
    private getUsername!: () => string
    @content.Getter
    private getTitle!: () => string
    @content.Getter
    private getCorpus!: () => string
    @content.Getter
    private getMediaType!: () => string
    // @content.Getter
    // private getMedia!: () => File

}
</script>

<style scoped>
#SightingContentDoc {
    text-align: start;
    margin:1em;
}

#SightingHeader {
    font-size:1.75rem;
    letter-spacing: 0.1ch;
    margin:1em;
}

#SightingMedia {
    margin:1em auto;
    width:24em;
    height:24em;
    border-radius: 25px;
    background-color:var(--themed-foreground-color);
}

#SightingCorpus {
    margin: 1em;
    padding:1em;
    border-radius: 10px;
    background: linear-gradient(145deg, #101010, #121212);
    border: 1px solid #111;
}

#Tags {
    display:flex;
    flex-wrap: wrap;
    margin: 1em;
}

.infotag {
    margin:0.25em 0.5em;
    padding:0.3em 0.5em;
    font-weight: bold;
    color:var(--themed-foreground-color);
    background-color:#222;
    border-radius:15px;
    border: solid 2px #060606;
    flex-wrap: nowrap;
}

</style>