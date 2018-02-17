import firebase from 'firebase'
import router from '@/router'

export const actions = {
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', firebaseUser)
        commit('setLoading', false)
        router.push('/')
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
            commit('setLoading', false)
            commit('setError', null)
            router.push('/home')
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
  }
}