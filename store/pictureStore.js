import pictureService from '~/services/pictureService'
export const state = () => ({
  // models --------------------------
  pictures: [],
  totalPictures: null,
  currentPicture: null,
  // status --------------------------
  fetchPending: false,
  fetchCurrentPicturePending: false,
  createPending: false
})

export const mutations = {
  // models --------------------------
  SET_PICTURES(state, pictures) {
    state.pictures = pictures
  },
  SET_CURRENT_PICTURE(state, picture){
    state.currentPicture = picture
  },
  SET_TOTAL_PICTURES(state, num){
    state.totalPictures = num
  },
  // status --------------------------
  SET_FETCH_PENDING(state, status) {
    state.fetchPending = status
  },
  SET_FETCH_CURRENT_PICTURE_PENDING(state, status) {
    state.fetchCurrentPicturePending = status
  },
  SET_CREATE_PENDING(state, status) {
    state.createPending = status
  },
}

export const getters = {
  getPictureById: (state) => (id) => {
    return state.pictures.find((pic) => parseInt(pic.id) === parseInt(id))
  }
}

export const actions = {
  fetchPictures({ commit }, { config }) {
    commit('SET_FETCH_PENDING', true)
    return pictureService.getPictures(config).then(response => {
      commit('SET_PICTURES', response.data.results)
      commit('SET_TOTAL_PICTURES', response.data.count)
      commit('SET_FETCH_PENDING', false)
      return response
    }).catch(reason => {
      commit('SET_FETCH_PENDING', false)
      return reason
    })
  },
  fetchPicture({ dispatch, commit }, { id, config }) {
    commit('SET_FETCH_CURRENT_PICTURE_PENDING', true)
    return pictureService.getPicture(id, config).then(response => {
      commit('SET_CURRENT_PICTURE', response.data)
      dispatch('commentStore/setCurrentComments', { comments: response.data.comments }, { root: true })
      commit('SET_FETCH_CURRENT_PICTURE_PENDING', false)
      return response
    }).catch(reason => {
      commit('SET_FETCH_CURRENT_PICTURE_PENDING', false)
      return reason
    })
  },
  createPicture({ commit }, { data, config }) {
    commit('SET_CREATE_PENDING', true)
    return pictureService.createPicture(data, config).then(response => {
      commit('SET_CREATE_PENDING', false)
      return response
    }).catch(reason => {
      commit('SET_CREATE_PENDING', false)
      return reason
    })
  }
}
