import { apiClient } from '~/services/service'

export default {
  getStories(config = {}) {
    return apiClient.get('/stories/', config)
  },
  getStory(id, config = {}) {
    return apiClient.get(`/stories/${id}/`, config)
  },
  createStory(data, config = {}) {
    return apiClient.post(`/stories/`, data, config)
  },
  deleteStory(id, config = {}) {
    return apiClient.delete(`/stories/${id}/`, config)
  }
}
