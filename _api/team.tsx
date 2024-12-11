import axios from '@api/axios'

export const createTeam = (data: any) => {
  return axios({
    method: 'post',
    url: 'team/create',
    data,
  })
}

export const updateTeam = (id: string, data: any) => {
  return axios({
    method: 'put',
    url: `team/${id}/update`,
    data,
  })
}

export const deleteTeam = (id: string) => {
  return axios({
    method: 'delete',
    url: `team/${id}/delete`,
  })
}

export const getTeam = (service_id: string = 'studio', params?: any) => {
  return axios({
    method: 'get',
    url: `team/${service_id}`,
    params,
  })
}

export const getDetailTeam = (id?: string) => {
  return axios({
    method: 'get',
    url: `team/${id}/detail`,
  })
}
