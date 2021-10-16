import pictureService from '~/services/pictureService'
export const state = () => ({
  pictures: [],
  totalPictures: null,
  createPending: false
})

export const mutations = {
  SET_PICTURES(state, pictures) {
    state.pictures = pictures
  },
  SET_CREATE_PENDING(state, status) {
    state.status = status
  },
  SET_TOTAL_PICTURES(state, num){
    state.totalPictures = num
  },
}

export const getters = {
  getPictureById: (state) => (id) => {
    return state.pictures.find((pic) => pic.id === id)
  }
}

export const actions = {
  fetchPictures({ commit }, { config }) {
    return pictureService.getPictures(config).then(response => {
      commit('SET_PICTURES', response.data.results)
      commit('SET_TOTAL_PICTURES', response.data.count)
      return response
    })
  },
  fetchPicture({ commit }, { id, config }) {
    return pictureService.getPicture(id, config).then(response => {
      return response
    })
  },
  createPicture({ commit }, { data, config }) {
    commit('SET_CREATE_PENDING', true)
    return pictureService.createPicture(data, config).then(response => {
      commit('SET_CREATE_PENDING', false)
      return response
    }).catch(reason => {
      commit('SET_CREATE_PENDING', false)
      alert(reason)
      return reason
    })
  }
}
