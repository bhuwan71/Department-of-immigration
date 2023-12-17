import { type IPagination } from '@type/pagination.types'
import { useState } from 'react'

const usePagination = (): [IPagination, React.Dispatch<React.SetStateAction<IPagination>>] => {
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    perPage: 20,
    searchTerm: '',
    total: undefined,
    totalPages: 1,
    refreshTable: false,
  })

  return [pagination, setPagination]
}

export default usePagination
