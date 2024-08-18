import axiosClient from './axiosClient'

const bookAPI = {
  getAllBook: (page, limit) => {
    const url = `/book?page=${page}&limit=${limit}`
    return axiosClient.get(url)
  },
  getBook: (id) => {
    const url = `/book/${id}`
    return axiosClient.get(url)
  },
  deleteBook: (id) => {
    const url = `/book/delete/${id}`
    return axiosClient.delete(url)
  }
}
export default bookAPI
