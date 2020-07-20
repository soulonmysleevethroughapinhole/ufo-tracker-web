import Vue from 'vue'
import Vuex from 'vuex'
import Sightings from '@/store/modules/sightings'
import Content from '@/store/modules/content'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sightings: Sightings,
    content: Content
  }
})
