import { getDetailTeam } from '@api/team'
import { toCapitalize } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Modal } from 'react-bootstrap'

const Index: FC<{
  show: boolean
  setShow: (e: boolean) => void
  detail: any
}> = ({ show, setShow, detail = {} }) => {
  const detailTeamQuery: any = useQuery({
    // initialData: {data: []},
    enabled: show && Boolean(detail?.id),
    queryKey: ['getDetailTeam', { id: detail?.id }],
    queryFn: async () => {
      const api: any = await getDetailTeam(detail?.id)
      const res = api?.data
      return res
    },
  })

  const detailTeam = detailTeamQuery?.data || {}
  const social = Object.entries(detailTeam?.social || {})?.map((item) => ({
    brand: item?.[0],
    link: item?.[1],
  }))

  return (
    <Modal
      centered
      dialogClassName='modal-md'
      contentClassName='radius-15'
      show={show}
      scrollable
      onHide={() => setShow(false)}>
      <div className='border-bottom border-gray-300 p-15px m-0 d-flex align-items-center'>
        <div className='fas fa-info-circle text-primary me-10px fs-16px' />
        <div className='fw-bold fs-14px'>{detailTeam?.full_name}</div>
      </div>
      <Modal.Body className='p-0'>
        <div className='px-15px py-10px'>
          <div
            className='w-300px h-300px mx-auto btn border border-gray-300 d-flex flex-center position-relative radius-15'
            style={{
              background: `#fff url(${detailTeam?.avatar || '/media/placeholder/avatar.svg'}) center / cover no-repeat`,
            }}
          />
        </div>
        <div className='p-15px'>
          <div className='my-10px'>
            <div className='text-gray-500'>Name</div>
            <div className='fw-bold fs-14px'>{detailTeam?.full_name}</div>
          </div>
          <div className='my-10px'>
            <div className='text-gray-500'>Title</div>
            <div className='fw-bold fs-14px'>
              {detailTeam?.title} ({detailTeam?.category})
            </div>
          </div>
          <div className='my-10px'>
            <div className='text-gray-500'>Email</div>
            <div className='fw-bold fs-14px'>{detailTeam?.email}</div>
          </div>
          <div className='my-10px'>
            <div className='text-gray-500'>Phone</div>
            <div className='fw-bold fs-14px'>{detailTeam?.phone}</div>
          </div>
          {Boolean(social?.length) && (
            <div className='mt-20px mb-10px'>
              <div className='fw-bold mb-10px text-info'>~ Social ~</div>
              <div className='border radius-10'>
                <table className='table table-sm table-striped gx-3'>
                  <tbody>
                    {social?.map(({ brand, link }: any, index: number) => (
                      <tr key={index}>
                        <td className='fw-bold' style={{ width: 0 }}>
                          {toCapitalize(brand)}
                        </td>
                        <td style={{ width: 0 }}>:</td>
                        <td className=''>{link}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
      <div className='border-top border-2 p-15px d-flex align-items-center justify-content-end gap-10px'>
        <div onClick={() => setShow(false)} className='btn btn-sm btn-light px-15px'>
          <div className='fs-14px'>Close</div>
        </div>
      </div>
    </Modal>
  )
}

export default Index
