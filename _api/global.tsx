import axios from '@api/axios'

export const getProvince = (params: any) => {
  return axios.get('global/province', params)
}
