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

function VotingItem(item) {
  var promise = new Promise(function(resolve, reject) {
    item.short_description = item.description.slice(0, 140).concat('...');

    if (item.image_loc === undefined) {
      resolve(item);
    }
    firebase.storage().ref("items").child(item.image_loc).getDownloadURL()
      .then(function(url) {
        item.image_url = url;
        resolve(item); 
      })
      .catch(function(error) {
        item.image_url = "https://placeholdit.imgix.net/~text?txtsize=16&txt=C&w=50&h=50";
        resolve(item);
      });   
  });  
  return promise;
}

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
export const campainsRef = db.ref('campaigns');