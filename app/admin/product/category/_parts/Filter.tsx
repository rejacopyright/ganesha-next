import { Sticky } from '@components/cards/Sticky'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'

export const Filter: FC<any> = () => {
  const pathname: any = usePathname()

  const router = useRouter()

  return (
    <Sticky className='pb-8px mb-5px bg-body mx-n5 px-5 mt-5 mt-lg-0'>
      <div className='page-filter pt-14px'>
        <div className='d-flex flex-wrap align-items-center justify-content-lg-between bg-white p-18px radius-10 shadow-xs gap-20px'>
          {/* PART 2 */}
          <div className='d-flex flex-wrap align-items-center gap-12px col'>
            <div className='col-auto ms-auto'>
              <div
                className='d-flex flex-center gap-6px bg-primary border border-gray-300 radius-5 h-36px px-16px cursor-pointer'
                onClick={() => router.push(`${pathname}/create`)}>
                <i className='fas fa-plus fs-16px text-white' />
                <div className='fw-bolder lh-1 text-nowrap text-white'>Add Category</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sticky>
  )
}
