import axios from 'axios'
import { HomeApis } from '../../Configurations/Api_endpoints'

export const HomeService = {
  totalPostedCompletedTasks: (language) => {
    return axios
      .get(`${HomeApis.totalTasksPostedAndCompleted}?Language=${language}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response.status !== 401) return error
      })
  },
  activeTasksList: (language) => {
    return axios
      .get(`${HomeApis.activeTasksList}?Language=${language}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response.status !== 401) return error
      })
  },
  archivedTasksList: (language) => {
    return axios
      .get(`${HomeApis.archivedTasksList}?Language=${language}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response.status !== 401) return error
      })
  },
  deleteTask: id => {
    return axios
      .delete(HomeApis.deleteTask + id)
      .then(response => response.data)
      .catch(error => {
        if (error.response.status !== 401) return error
      })
  },
  cancelTask: (id, language) => {
    return axios
      .put(`${HomeApis.cancelTask}${id}&language=${language}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response.status !== 401) return error
      })
  },
  getTaskDetails: id => {
    return axios
      .get(HomeApis.taskDetails + id)
      .then(response => response.data)
      .catch(error => {
        if (error.response.status !== 401) return error
      })
  },
  getQuotes: (id, language) => {
    return axios
      .get(`${HomeApis.quotes}${id}?language=${language}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response.status !== 401) return error
      })
  },
  acceptOffer: (id, language) => {
    return axios
      .put(`${HomeApis.acceptOffer}${id}&language=${language}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response.status !== 401) return error
      })
  },
  rejectOffer: (id, language) => {
    return axios
      .put(`${HomeApis.rejectOffer}${id}&language=${language}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response.status !== 401) return error
      })
  }
}
