import { apiClient } from '~/services/service'

export default {
  getPictures(config={}) {
    return apiClient.get('/pictures/', config)
  },
  getPicture(id, config={}) {
    return apiClient.get(`/pictures/${id}/`, config)
  },
  getPicturesCount(config={}){
    return apiClient.get('/pictures/count/', config)
  },
  createPicture(data, config={}) {
    return apiClient.post(`/pictures/`, data, config)
  },
  deletePicture(id, config={}) {
    return apiClient.delete(`/pictures/${id}/`, config)
  },
  getComments(id, config={}){
    return apiClient.get(`/pictures/${id}/comments`, config)
  }
}
