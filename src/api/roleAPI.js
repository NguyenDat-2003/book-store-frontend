import axiosClient from './axiosClient'

export const roleAPI = {
  createRoles: (roles) => {
    const url = '/role/create'
    return axiosClient.post(url, [...roles])
  },
  getAllRoles: () => {
    const url = '/role/read'
    return axiosClient.get(url)
  },
  deleteRole: (id) => {
    const url = `role/delete?id=${id}`
    return axiosClient.delete(url)
  },
  updateRole: (data) => {
    const url = 'role/update'
    return axiosClient.put(url, data)
  }
}
