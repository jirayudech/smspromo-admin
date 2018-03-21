import firebase from 'firebase'
import router from '@/router'
import { firebaseConfig } from '../config'

export const actions = {
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    var secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");

    secondaryApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        firebase.database().ref('/users/').push({identifier: firebaseUser.email, name: payload.name, surname: payload.surname, companyId: payload.companyId, companyName: payload.companyName, user_type: 'user'})
        .then(data =>{
          commit('setLoading', false)
          router.push('/usersadmin')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },
  userSignIn({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
    
          firebase.database().ref('/users/' + firebaseUser.uid).once('value')
          .then(data => {
            const dataPairs = data.val()
    
            const updatedUser = {
              id: firebaseUser.uid,
              identifier: dataPairs.identifier,
              userType: dataPairs.user_type,
              email: firebaseUser.email
            }
            commit('setUser', updatedUser) 
            commit('setUserInfo', updatedUser)
            commit('setLoading', false)
            commit('setError', null)
            router.push('/')
          })
          .catch(error => {
            console.log(error)
            commit('setLoading', false)
            commit('setError', error)
          })
        })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  },autoSignIn ({commit}, payload) {
    commit('setUser', payload)
   },userSignOut ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
    router.push('/signin')
  },setPage ({commit}, payload) {
    commit('setPage', payload)
  },setStartLoading({commit}){
    commit('setLoading', true)
  },setStopLoading({commit}){
    commit('setLoading', false)
  }
}