import { Sticky } from '@components/cards/Sticky'
import { Searchbox } from '@components/form'
import { useLocation } from '@hooks'
import omit from 'lodash/omit'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parse, stringify } from 'qs'
import { FC } from 'react'

export const Filter: FC<any> = () => {
  const pathname: any = usePathname()
  const searchParamsFn = useSearchParams()
  const searchParams = parse(searchParamsFn.toString() || '', { ignoreQueryPrefix: true })

  const { q = '' }: any = searchParams || {}
  const router = useRouter()

  // Functions
  const omitParams = (key: string) => {
    if (searchParams?.page) {
      searchParams.page = '1'
    }
    const omittedParams: any = omit(searchParams, key)
    const resParams = stringify(omittedParams, { encode: false })
    router.replace(`${pathname}?${resParams}`)
  }
  return (
    <Sticky className='pb-8px mb-5px bg-body mx-n5 px-5 mt-5 mt-lg-0'>
      <div className='page-filter pt-14px'>
        <div className='d-flex flex-wrap align-items-center justify-content-lg-between bg-white p-18px radius-10 shadow-xs gap-20px'>
          {/* PART 2 */}
          <div className='d-flex flex-wrap align-items-center gap-12px col'>
            <div className='col-auto'>
              <Searchbox
                size='sm'
                controlled
                placeholder='Search blog title'
                className='radius-5 w-400px'
                height={36}
                delay={1000}
                defaultValue={q}
                onChange={async (e: any) => {
                  const location = useLocation()
                  if (e) {
                    const thisParams = location?.params || {}
                    if (thisParams?.page) {
                      thisParams.page = '1'
                    }
                    const thisResParams = await stringify(
                      { ...thisParams, q: e },
                      { encode: false }
                    )
                    router.replace(`${pathname}?${thisResParams}`)
                  } else {
                    omitParams('q')
                  }
                }}
              />
            </div>
            <div className='col-auto'>
              <div
                className='d-flex flex-center gap-6px bg-white border border-gray-300 radius-5 h-36px px-16px cursor-pointer'
                onClick={() => router.push(pathname)}>
                <i className='las la-redo-alt fs-16px text-dark' />
                <div className='fw-bolder lh-1 text-nowrap'>Reset</div>
              </div>
            </div>
            <div className='col-auto ms-auto'>
              <div
                className='d-flex flex-center gap-6px bg-primary border border-gray-300 radius-5 h-36px px-16px cursor-pointer'
                onClick={() => router.push(`${pathname}/create`)}>
                <i className='fas fa-plus fs-16px text-white' />
                <div className='fw-bolder lh-1 text-nowrap text-white'>Add New Blog</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sticky>
  )
}
