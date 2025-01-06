import { getProductCategory } from '@api/product'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import DropDown from './DropDown'

export default function Nav({ setMobileToggle }) {
  const productCategoryQuery: any = useQuery({
    initialData: { data: [] },
    queryKey: ['getProductCategory'],
    queryFn: () => getProductCategory(),
    select: ({ data }: any) => {
      const res: any = data?.data || []
      return res
    },
  })

  const productCategory: any = productCategoryQuery?.data || []

  return (
    <ul className='cs_nav_list fw-medium'>
      <li className='menu-item-single'>
        <Link href='/'>Home</Link>
      </li>
      <li className='menu-item-has-children'>
        <Link href='/product/category' onClick={() => setMobileToggle(false)}>
          Product
        </Link>
        <DropDown>
          <ul>
            {productCategory?.map((item, key: number) => (
              <li key={key}>
                <Link href={`/product/category/${item?.id}`} onClick={() => setMobileToggle(false)}>
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
        </DropDown>
      </li>

      <li className='menu-item-has-children'>
        <div onClick={() => setMobileToggle(false)}>R & D</div>
        <DropDown>
          <ul>
            <li>
              <Link href='/rnd/team' onClick={() => setMobileToggle(false)}>
                Team
              </Link>
            </li>
            <li>
              <Link href='/blog' onClick={() => setMobileToggle(false)}>
                Blog
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>
      <li className='menu-item-single'>
        <Link href='/about'>About Us</Link>
      </li>
    </ul>
  )
}
