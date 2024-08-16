import axiosClient from './axiosClient'

export const roleAPI = {
  createRoles: (roles) => {
    const url = '/role/create'
    return axiosClient.post(url, [...roles])
  }
}
