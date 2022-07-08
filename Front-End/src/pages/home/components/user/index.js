import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { QUERYKEY } from '@/api/query-key'
import { get } from '@/api/BaseRequest'
import Pagination from 'react-bootstrap-4-pagination'

const HomeUser = () => {
  const [params, setParams] = useState({
    page: 1,
    size: 10
  })
  const [totalRow, setTotalRow] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  const getCategories = async() => {
    const response = await get('category', params)
    setTotalRow(response.totalRow)
    return response.data
  }

  useEffect(() => {
    if (totalRow) {
      setPageCount(Math.ceil(totalRow / params.size))
    }
  }, [totalRow])
  const { data: categories, isLoading } = useQuery([QUERYKEY.CATEGORY, params], getCategories)

  const handlePageClick = (page) => {
    setParams({
      ...params,
      page: page
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ul className='list-group'>
        {
          categories &&
          categories.map(
            (cat, index) => (<li className='list-group-item' key={`cat_${index}`}>{cat.name}</li>)
          )
        }
      </ul>
      <Pagination
        totalPages={pageCount}
        currentPage={params.page}
        showMax={6}
        size={'sm'}
        threeDots={true}
        prevNext={true}
        onClick={handlePageClick}
      />
    </>
  )
}

export default HomeUser
