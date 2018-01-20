// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import { store } from './store'
import firebase from 'firebase'
import { firebaseConfig } from './config'

import App from './App'
import router from './router'
import VueFire from 'vuefire'

Vue.use(VueFire)
Vue.use(Vuetify)
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebase
  .auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      el: '#app', router, store, template: '<App/>', components: {
        App
      },
      created() {
        store.dispatch('autoSignIn', firebaseUser)
      }
    })
   unsubscribe()
})

export const db = firebase.database();
export const campainsRef = db.ref('campaignDetails');