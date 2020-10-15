import firebase from 'firebase/app'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        await dispatch('getUid')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid() {
      console.log('Hello')
    },
    async logout() {
      await firebase.auth().signOut()
    }
  }
}
