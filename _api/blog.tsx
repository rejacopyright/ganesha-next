import axios from '@api/axios'

export const createBlog = (data: any) => {
  return axios({
    method: 'post',
    url: 'blog/create',
    data,
  })
}

export const updateBlog = (id: string, data: any) => {
  return axios({
    method: 'put',
    url: `blog/${id}/update`,
    data,
  })
}

export const deleteBlog = (id: string) => {
  return axios({
    method: 'delete',
    url: `blog/${id}/delete`,
  })
}

export const getBlog = (params?: any) => {
  return axios({
    method: 'get',
    url: `blog`,
    params,
  })
}

export const getDetailBlog = (id?: string) => {
  return axios({
    method: 'get',
    url: `blog/${id}/detail`,
  })
}
