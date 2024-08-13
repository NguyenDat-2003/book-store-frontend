import axiosClient from './axiosClient'

const userAPI = {
  getAllUsers: () => {
    const url = '/user'
    return axiosClient.get(url)
  },
  deleteUser: (id) => {
    const url = `/user/${id}`
    return axiosClient.delete(url)
  }
}

export default userAPI
