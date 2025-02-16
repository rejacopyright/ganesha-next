import axios from '@api/axios'

export const getConfig = () => {
  return axios({
    method: 'get',
    url: `global/config`,
  })
}

export const updateConfig = (data: any) => {
  return axios({
    method: 'post',
    url: `global/config/update`,
    data,
  })
}

export const createTag = (data: any) => {
  return axios({
    method: 'post',
    url: 'tags/create',
    data,
  })
}

export const updateTag = (id: string, data: any) => {
  return axios({
    method: 'put',
    url: `tags/${id}/update`,
    data,
  })
}

export const deleteTag = (id: string) => {
  return axios({
    method: 'delete',
    url: `tags/${id}/delete`,
  })
}

export const getTag = (params?: any) => {
  return axios({
    method: 'get',
    url: `tags`,
    params,
  })
}
