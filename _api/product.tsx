import axios from '@api/axios'

export const createProduct = (data: any) => {
  return axios({
    method: 'post',
    url: 'product/create',
    data,
  })
}

export const updateProduct = (id: string, data: any) => {
  return axios({
    method: 'put',
    url: `product/${id}/update`,
    data,
  })
}

export const deleteProduct = (id: string) => {
  return axios({
    method: 'delete',
    url: `product/${id}/delete`,
  })
}

export const getProduct = (params?: any) => {
  return axios({
    method: 'get',
    url: `product`,
    params,
  })
}

export const getDetailProduct = (id?: string) => {
  return axios({
    method: 'get',
    url: `product/${id}/detail`,
  })
}
