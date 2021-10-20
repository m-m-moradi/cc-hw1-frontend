import { apiClient } from '~/services/service'

export default {
  getComments(config={}) {
    return apiClient.get('/comments/', config)
  },
  getComment(id, config={}) {
    return apiClient.get(`/comments/${id}/`, config)
  },
  createComment(data, config={}) {
    return apiClient.post(`/comments/`, data, config)
  },
  deleteComment(id, config={}) {
    return apiClient.delete(`/comments/${id}/`, config)
  },
  getContentType(config={}){
    return apiClient.get('/content_type/', config)
  },
  getAudio(id, config={}){
    return apiClient.get(`/comments/${id}/audio/`, config)
  },
  getSentiment(id, config={}){
    return apiClient.get(`/comments/${id}/sentiment`, config)
  }
}
