import { apiClient } from '~/services/service'

export default {
  getStories(config = {}) {
    return apiClient.get('/stories/', config)
  },
  getStory(id, config = {}) {
    return apiClient.get(`/stories/${id}/`, config)
  },
  getStoriesCount(config={}){
    return apiClient.get('/stories/count/', config)
  },
  createStory(data, config = {}) {
    return apiClient.post(`/stories/`, data, config)
  },
  deleteStory(id, config = {}) {
    return apiClient.delete(`/stories/${id}/`, config)
  },
  getAudio(id, config={}){
    return apiClient.get(`/stories/${id}/audio/`, config)
  },
  getSentiment(id, config={}){
    return apiClient.get(`/stories/${id}/sentiment`, config)
  },
  getComments(id, config={}){
    return apiClient.get(`/stories/${id}/comments`, config)
  }

}
