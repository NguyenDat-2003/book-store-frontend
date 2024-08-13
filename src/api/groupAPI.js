import axiosClient from './axiosClient'

const groupAPI = {
  gettAllGroups: () => {
    const url = '/group'
    return axiosClient.get(url)
  }
}
export default groupAPI
