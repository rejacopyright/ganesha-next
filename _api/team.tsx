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

export const getTeam = (params?: any) => {
  return axios({
    method: 'get',
    url: `team`,
    params,
  })
}

export const getDetailTeam = (id?: string) => {
  return axios({
    method: 'get',
    url: `team/${id}/detail`,
  })
}
