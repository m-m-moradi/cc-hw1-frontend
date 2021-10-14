import storyService from '~/services/storyService'
export const state = () => ({
  stories: [],
  createPending: false,
})

export const mutations = {
  SET_STORIES(state, stories) {
    state.stories = stories
  },
  SET_CREATE_PENDING(state, status){
    state.status = status;
  }
}

export const actions = {
  fetchStories({ commit }, { config={} }) {
    return storyService.getStories(config).then(response => {
      commit('SET_STORIES', response.data)
      return response;
    })
  },
  fetchStory({ commit }, {id, config={} }) {
    return storyService.getStory(id, config).then(response => {
      return response;
    })
  },
  createStory({commit}, {data= {}, config= {}}) {
    commit("SET_CREATE_PENDING", true);
    return storyService.createStory(data, config).then(response => {
      commit("SET_CREATE_PENDING", false);
      return response;
    }).catch(reason => {
      commit("SET_CREATE_PENDING", false);
      alert(reason);
      return reason;
    })
  }

}
