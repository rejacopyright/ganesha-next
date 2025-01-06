import { API_SERVER } from '@api/axios'
import TextEditor from '@components/form/TextEditor'
import { urlToBase64 } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Modal } from 'react-bootstrap'

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  detail: any
}> = ({ show, setShow, detail = {} }) => {
  const detailProductQuery: any = useQuery({
    // initialData: {data: []},
    enabled: show && Boolean(detail?.id),
    queryKey: ['getDetailProduct', { id: detail?.id }],
    queryFn: async () => {
      const api: any = await new Promise((resolve) => resolve({ data: {} }))
      const newData = api?.data
      newData.images = await Promise.all(
        newData?.product_gallery?.map(async (img) => {
          const base64Img = await urlToBase64(`${API_SERVER}/static/images/class/${img?.filename}`)
          return { index: img?.index, img: base64Img }
        })
      )

      return newData
    },
  })

  const detailProduct = detailProductQuery?.data || {}

  return (
    <Modal
      centered
      dialogClassName='modal-lg'
      contentClassName='radius-15'
      show={show}
      onHide={() => setShow(false)}>
      <Modal.Body className='p-0'>
        <div className='border-bottom border-gray-300 p-15px m-0 d-flex align-items-center'>
          <div className='fas fa-info-circle text-primary me-10px fs-16px' />
          <div className='fw-bold fs-14px'>{detailProduct?.name}</div>
        </div>
        {detailProduct?.product_gallery?.length > 0 && (
          <div className='px-15px py-5px'>
            <div className='row'>
              {detailProduct?.product_gallery?.map(({ filename }: any, key: number) => (
                <div key={key} className='col-auto mt-15px'>
                  <div
                    className='w-100px h-100px btn border border-gray-300 d-flex flex-center position-relative radius-15'
                    style={{
                      background: `#fff url(${API_SERVER}/static/images/class/${filename}) center / cover no-repeat`,
                    }}></div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='p-15px'>
          <div className='mb-15px'>
            <div className='text-gray-500'>Product Name</div>
            <div className='fw-bold fs-14px'>Lorem Ipsum</div>
          </div>
          {detailProduct?.description && (
            <div className='mb-15px'>
              <div className='text-gray-500'>Description</div>
              <div className='' style={{ marginLeft: '-10px', marginRight: '-10px' }}>
                <TextEditor
                  id='editor'
                  disabled
                  options={{ className: 'p-0' }}
                  placeholder='Tulis deskripsi disini...'
                  defaultData={detailProduct?.description || ''}
                  loading={false}
                />
              </div>
            </div>
          )}
        </div>
        <div className='border-top border-2 p-15px d-flex align-items-center justify-content-end gap-10px'>
          <div onClick={() => setShow(false)} className='btn btn-sm btn-light px-15px'>
            <div className='fs-14px'>Close</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Index
