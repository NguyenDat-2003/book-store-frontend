import axiosClient from './axiosClient'

const userAPI = {
  getAllUsers: () => {
    const url = '/user'
    return axiosClient.get(url)
  },
  deleteUser: (id) => {
    const url = `/user/${id}`
    return axiosClient.delete(url)
  },
  getUser: (id) => {
    const url = `/user/${id}`
    return axiosClient.get(url)
  },
  createUser: (data) => {
    const url = '/user'
    return axiosClient.post(url, data)
  }
}

export default userAPI
