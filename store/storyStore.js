import storyService from '~/services/storyService'
export const state = () => ({
  // model -------------------------------------
  stories: [],
  totalStories: null,
  currentStory: null,
  // status -------------------------------------
  fetchPending: false,
  fetchCurrentStoryPending: false,
  sentimentPending: false,
  createPending: false
})

export const mutations = {
  // model -------------------------------------
  SET_STORIES(state, stories) {
    state.stories = stories
  },
  SET_CURRENT_STORY(state, story) {
    state.currentStory = story
  },
  SET_TOTAL_STORIES(state, num) {
    state.totalStories = num
  },
  SET_SENTIMENT_TO_STORY(state, story) {
    state.currentStory = story
  },
  // status -------------------------------------
  SET_FETCH_PENDING(state, status) {
    state.fetchPending = status
  },
  SET_FETCH_CURRENT_STORY_PENDING(state, status) {
    state.fetchCurrentStoryPending = status
  },
  SET_CREATE_PENDING(state, status) {
    state.createPending = status
  },
  SET_SENTIMENT_PENDING(state, status) {
    state.sentimentPending = status
  }
}

export const getters = {
  getStoryById: (state) => (id) => {
    return state.stories.find((story) => parseInt(story.id) === parseInt(id))
  }
}

export const actions = {
  fetchStories({ commit }, { config }) {
    commit('SET_FETCH_PENDING', true)
    return storyService.getStories(config).then(response => {
      commit('SET_STORIES', response.data.results)
      commit('SET_TOTAL_STORIES', response.data.count)
      commit('SET_FETCH_PENDING', false)
      return response
    }).catch(reason => {
      commit('SET_FETCH_PENDING', false)
      return reason
    })
  },
  fetchStory({ dispatch, commit }, { id, config }) {
    commit('SET_FETCH_CURRENT_STORY_PENDING', true)
    return storyService.getStory(id, config).then(response => {
      commit('SET_CURRENT_STORY', response.data)
      dispatch('commentStore/setCurrentComments', { comments: response.data.comments }, { root: true })
      commit('SET_FETCH_CURRENT_STORY_PENDING', false)
      return response
    }).catch(reason => {
      commit('SET_FETCH_CURRENT_STORY_PENDING', false)
      return reason
    })
  },
  fetchSentiment({ commit }, { id, config }) {
    commit('SET_SENTIMENT_PENDING', true)
    return storyService.getSentiment(id, config)
      .then(response => {
        commit('SET_SENTIMENT_TO_STORY', response.data)
        commit('SET_SENTIMENT_PENDING', false)
        return response
      }).catch(reason => {
        commit('SET_SENTIMENT_PENDING', false)
        return reason
      })
  },
  createStory({ commit }, { data, config }) {
    commit('SET_CREATE_PENDING', true)
    return storyService.createStory(data, config).then(response => {
      commit('SET_CREATE_PENDING', false)
      return response
    }).catch(reason => {
      commit('SET_CREATE_PENDING', false)
      alert(reason)
      return reason
    })
  }

}
