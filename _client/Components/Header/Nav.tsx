import { getProduct } from '@api/product'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import DropDown from './DropDown'

export default function Nav({ setMobileToggle }) {
  const productQuery: any = useQuery({
    initialData: { data: [] },
    queryKey: ['getProduct'],
    queryFn: () => getProduct(),
    select: ({ data }: any) => {
      const res: any = data?.data || []
      return res
    },
  })

  const product: any = productQuery?.data || []

  return (
    <ul className='cs_nav_list fw-medium'>
      <li className='menu-item-single'>
        <Link href='/'>Home</Link>
      </li>
      <li className='menu-item-has-children'>
        <Link href='/product' onClick={() => setMobileToggle(false)}>
          Product
        </Link>
        <DropDown>
          <ul>
            {product?.map((item, key: number) => (
              <li key={key}>
                <Link href={`/product/${item?.id}`} onClick={() => setMobileToggle(false)}>
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
