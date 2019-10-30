export const state = () => ({
  userProfile: {},
  loggedIn: false
})

export const mutations = {
  saveUserProfile (state, userProfile) {
    state.userProfile = { ...userProfile }
    localStorage.setItem('xy-user-profile', JSON.stringify(userProfile))
    state.loggedIn = true
  },
  removeUserProfile (state) {
    state.userProfile = {}
    localStorage.removeItem('xy-user-profile')
    state.loggedIn = false
  }
}
