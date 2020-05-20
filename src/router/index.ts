import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import WorldMap from '../views/WorldMap.vue'
import Pins from '../views/Pins.vue'
import Sightings from '../views/Sightings.vue'
import Friends from '../views/Friends.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
	path: '/',
	name: 'Home',
	component: Home
  },
  {
	path: '/worldmap',
	name: 'WorldMap',
	component: WorldMap
  },
  {
	path: '/pins',
	name: 'Pins',
	component: Pins
  },
  {
	path: '/sightings',
	name: 'Sightings',
	component: Sightings
  },
  {
	path: '/friends',
	name: 'Friends',
	component: Friends
  },
  {
	path: '/about',
	name: 'About',
	// route level code-splitting
	// this generates a separate chunk (about.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
