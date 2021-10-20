import pictureService from '@/services/pictureService'
import storyService from '@/services/storyService'
import commentService from '@/services/commentService'
export const state = () => ({
  // models ------------------------
  currentComments: [],
  ownerEntity: null,
  // status ------------------------
  createPending: false,
  sentimentPending: false,
  fetchPictureCommentPending: false,
  fetchStoryCommentPending: false,
})

export const mutations = {
  // models ------------------------
  SET_CURRENT_COMMENTS(state, comments) {
    state.currentComments = comments
  },
  SET_OWNER_ENTITY(state, entity) {
    state.ownerEntity = entity
  },
  SET_SENTIMENT_TO_COMMENT(state, newComment) {
    Array.prototype.forEach(comment => {
      if (parseInt(comment.id) === parseInt(newComment.id))
        comment.sentiment = newComment.sentiment
    })
  },
  // status ------------------------
  SET_CREATE_PENDING(state, status) {
    state.createPending = status
  },
  SET_SENTIMENT_PENDING(state, status) {
    state.sentimentPending = status
  },
  SET_FETCH_PICTURE_COMMENT_PENDING(state, status) {
    state.fetchPictureCommentPending = status
  },
  SET_FETCH_STORY_COMMENT_PENDING(state, status) {
    state.fetchStoryCommentPending = status
  },
}

export const getters = {
  getCommentById: (state) => (id) => {
    return state.currentComments.find((comment) => parseInt(comment.id) === parseInt(id))
  }
}

export const actions = {
  setCurrentComments({commit}, {comments}){
    commit('SET_CURRENT_COMMENTS', comments)
  },
  // todo: why calling these two methods in 'fetch' in commentSection.vue has not effect
  fetchPictureComments({ commit }, { config }) {
    commit('SET_FETCH_PICTURE_COMMENT_PENDING', true)
    return pictureService.getComments(config).then(response => {
      commit('SET_CURRENT_COMMENTS', response.data)
      commit('SET_OWNER_ENTITY', 'picture')
      commit('SET_FETCH_PICTURE_COMMENT_PENDING', false)
      return response
    }).catch(reason => {
      commit('SET_FETCH_PICTURE_COMMENT_PENDING', false)
      return reason
    })

  },
  fetchStoryComments({ commit }, { config }) {
    commit('SET_FETCH_STORY_COMMENT_PENDING', true)
    return storyService.getComments(config).then(response => {
      commit('SET_CURRENT_COMMENTS', response.data)
      commit('SET_OWNER_ENTITY', 'story')
      commit('SET_FETCH_STORY_COMMENT_PENDING', false)
      return response
    }).catch(reason => {
      commit('SET_FETCH_STORY_COMMENT_PENDING', false)
      return reason
    })
  },
  fetchSentiment({ commit }, { id, config }) {
    commit('SET_SENTIMENT_PENDING', true)
    return commentService.getSentiment(id, config)
      .then(response => {
        commit('SET_SENTIMENT_TO_COMMENT', response.data)
        commit('SET_SENTIMENT_PENDING', false)
        return response
      }).catch(reason => {
        commit('SET_SENTIMENT_PENDING', false)
        return reason
      })
  },
  createComment({ commit }, { data, config }) {
    commit('SET_CREATE_PENDING', true)
    return commentService.createComment(data, {})
      .then(response => {
        commit('SET_CREATE_PENDING', false)
        return response
      }).catch(reason => {
        commit('SET_CREATE_PENDING', false)
        return reason
      })
  }
}
