import { getProductCategory } from '@api/product'
import { getTag } from '@api/settings'
import TextEditor from '@components/form/TextEditor'
import { Select as SelectAjaxMultiple } from '@components/select/ajaxMultiple'
import { Select as SelectData } from '@components/select/select'
import { configClass } from '@helpers'
import { useQuery } from '@tanstack/react-query'
import { FormikProps } from 'formik'
import { FC } from 'react'

import { FormValues } from '../page'

interface FormProps {
  formik: FormikProps<FormValues>
}

const Index: FC<FormProps> = ({ formik }) => {
  const dataProductQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getCategory'],
    queryFn: () => getProductCategory({ page: 1, limit: 100 }),
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const dataProduct: any = dataProductQuery?.data?.data || []
  const categories: any = dataProduct?.map(({ id, name }) => ({ value: id, label: name }))

  return (
    <div className='row'>
      <div className='col-lg-8 my-10px'>
        <div className={configClass?.label}>Name</div>
        <input
          type='text'
          placeholder='Enter Product Name'
          // autoComplete='off'
          name='name'
          className={configClass?.form}
          onChange={formik.handleChange}
          value={formik.values?.name}
        />
        {formik?.errors?.name && (
          <div className={configClass.formError}>{formik?.errors?.name}</div>
        )}
      </div>
      <div className='col-lg-4 my-10px'>
        <div className={configClass?.label}>Category</div>
        <SelectData
          sm={true}
          name='category'
          className='p-0 text-start'
          data={[{ value: 'all', label: 'All' }, ...categories]}
          isClearable={false}
          placeholder='Choose Category'
          defaultValue={formik?.values?.category_id}
          styleOption={{
            control: {
              border: '1px solid #eee',
              borderRadius: '5px',
              // width: 150,
              height: 42,
            },
            placeholder: { color: '#000' },
          }}
          onChange={(e: any) => {
            formik.setFieldValue('category_id', e?.value)
          }}
        />
      </div>
      <div className='col-12 my-10px'>
        <div className={configClass?.label}>Tags</div>
        <SelectAjaxMultiple
          api={getTag}
          reload={false}
          params={{}}
          parse={(e: any) => {
            return {
              value: e?.id,
              label: e?.name,
            }
          }}
          sm={true}
          name='tags'
          // className='w-100'
          isClearable={false}
          placeholder='Put some tags'
          defaultValue={formik.initialValues.tags || []}
          onChange={(e: any) => {
            formik.setFieldValue('tags', e)
          }}
        />
        {formik?.errors?.tags && (
          <div className={configClass.formError}>{formik?.errors?.tags?.toString()}</div>
        )}
      </div>
      <div className='col-12 my-10px'>
        <div className={configClass?.label}>Description</div>
        <TextEditor
          id='editor'
          options={{ minHeight: '300px' }}
          placeholder='Enter description here...'
          defaultData={formik?.values?.description || ''}
          onChange={(e: any) => {
            formik.setFieldValue('description', e)
          }}
          loading={false}
        />
        {formik?.errors?.description && (
          <div className={configClass.formError}>{formik?.errors?.description}</div>
        )}
      </div>
    </div>
  )
}

export default Index
