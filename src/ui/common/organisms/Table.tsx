import {
  Box,
  Button,
  Table as CTable,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { tableLabel } from '@data/localization/common/table'
import { convertToDevanagari } from '@functions/digitConverter'
import useLang from '@hooks/useLang'
import { rankItem } from '@tanstack/match-sorter-utils'
import { type ColumnDef, type FilterFn, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { type IPagination } from '@type/pagination.types'
import NoDataFound from '@ui/common/molecules/NoDataFound'
import { Colors } from '@utils/Colors'
import { memo, useEffect, useRef, useState } from 'react'
import { BsPrinter, BsSearch, BsThreeDots } from 'react-icons/bs'
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'
import { TbDatabaseExport, TbRefresh } from 'react-icons/tb'
import { RiFileExcel2Fill } from 'react-icons/ri'

interface IProps {
  // eslint-disable-next-line
  columns: ColumnDef<any>[]
  rowData: any
  pagination: IPagination
  setPagination: (data: IPagination) => void
  title?: string
  showSearchBar?: boolean
  showTools?: boolean
  loading?: boolean
  excelUpload?: boolean
  setExcelUpload?: (open: boolean) => void
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const Table = (props: IProps) => {
  const { lang } = useLang()
  const {
    columns,
    title,
    rowData,
    pagination,
    setPagination,
    showSearchBar,
    showTools,
    loading,
    excelUpload,
    setExcelUpload,
  } = props
  const [data, setData] = useState(() => [...(rowData ?? [])])
  const [goToPage, setGoToPage] = useState<number>(pagination?.currentPage ?? 1)
  const printRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState<string>('')
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  })

  useEffect(() => {
    setData(rowData)
  }, [rowData])

  useEffect(() => {
    setGoToPage(pagination?.currentPage)
  }, [pagination?.currentPage])

  const searchFn = (searchItem: string) => {
    setSearch(searchItem)
  }

  let timer: ReturnType<typeof setTimeout>

  useEffect(() => {
    if (mounted) {
      timer = setTimeout(() => {
        setPagination({ ...pagination, searchTerm: search })
      }, 500)

      return () => {
        clearTimeout(timer)
      }
    } else {
      setMounted(true)
    }
  }, [search])

  const nextFn = () => {
    if (pagination?.currentPage === pagination?.totalPages) return
    let tempcurrentPage = pagination.currentPage
    tempcurrentPage = tempcurrentPage + 1
    setPagination({ ...pagination, currentPage: tempcurrentPage })
  }

  const prevFn = () => {
    if (pagination?.currentPage === 1) return
    let tempcurrentPage = pagination.currentPage
    tempcurrentPage = tempcurrentPage - 1
    setPagination({ ...pagination, currentPage: tempcurrentPage })
  }

  const handlePage = (page: number) => {
    if (pagination?.currentPage === page) return
    setPagination({ ...pagination, currentPage: page })
  }

  const handlePerPage = (perPage: number) => {
    setPagination({ ...pagination, perPage })
  }

  const handleResetSearch = () => {
    setPagination({ ...pagination, searchTerm: '', refreshTable: true })
    setSearch('')
  }

  const refreshData = () => {
    // update refresh to pagination
    setPagination({ ...pagination, refreshTable: true })
  }

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=2000,width=1000')
    printWindow?.document.write(`<html><head><title>${title as string}</title></head><body>`)

    // Print the DIV contents i.e. the HTML Table with modified inline styles.
    const divContents = document?.getElementById('dvContents')?.innerHTML as any
    // Create a temporary element to parse and manipulate the table
    const tempContainer = document.createElement('div')
    tempContainer.innerHTML = divContents

    // Select all table rows
    const rows = tempContainer.querySelectorAll('tr')

    // Remove the last cell from each row
    rows.forEach((row) => {
      const cells = row.querySelectorAll('td, th')
      const lastCellIndex = cells.length - 1
      if (cells.length > 0) {
        row.removeChild(cells[lastCellIndex])
      }
    })
    // Modify inline styles for each table cell
    const modifiedTableHtml = tempContainer.innerHTML
    const modifiedTable = modifiedTableHtml.replace(/<table/g, '<table style="border: 1px solid black; padding: 0px"')
    const modifiedTdTable = modifiedTable.replace(
      /<td/g,
      '<td style="border-right: 1px solid black; padding-left: 10px; padding-right: 10px; padding-top: 2px; padding-bottom: 2px;"'
    )
    const modifiedTableWithHeading = modifiedTdTable.replace(
      /<th/g,
      '<th style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 0px;"'
    )

    const tableWithStyles = `<table>${modifiedTableWithHeading}</table>`
    printWindow?.document.write(tableWithStyles)

    printWindow?.document.write('</body></html>')
    printWindow?.document.close()
    printWindow?.print()
  }

  const handleExportAsExcel = async () => {
    const table = document.querySelector('table')
    if (table) {
      const rows = Array.from(table.querySelectorAll('tr'))
      const csvContent = rows
        ?.map((row) =>
          Array.from(row.querySelectorAll('td, th'))
            ?.map((cell) => cell.textContent)
            .join(',')
        )
        .join('\n')

      // save in csv format since it allows for automatic adjustment of column width, which is not allowed in xlsx format.
      const csvData = new Blob([csvContent], { type: 'text/csv' })
      const csvUrl = URL.createObjectURL(csvData)

      const link = document.createElement('a')
      link.href = csvUrl
      link.download = `${title as string}.csv`
      link.click()

      URL.revokeObjectURL(csvUrl)
    }
  }

  return (
    <Box className='table'>
      <Box pt='4' pb='1' my='2' borderColor='gray.200'>
        <Flex
          direction={{
            lg: 'row',
            base: 'column',
          }}
          gap='5'
          alignItems='center'
          justify='space-between'
          px='2px'
        >
          {showSearchBar && (
            <Box display={'flex'} alignItems='center'>
              <InputGroup size='sm'>
                <Input
                  pr='4.5rem'
                  size={'sm'}
                  maxWidth='300'
                  onChange={(e) => {
                    searchFn(String(e.target.value))
                  }}
                  value={search}
                  placeholder={tableLabel?.search[lang]}
                />
                <InputRightElement cursor={'pointer'} width='2rem'>
                  {pagination?.searchTerm?.length === 0 ? (
                    <BsSearch />
                  ) : (
                    <MdClose color='red' onClick={handleResetSearch} size='16' fontSize={'16'} />
                  )}
                </InputRightElement>
              </InputGroup>
            </Box>
          )}

          {showTools && (
            <Flex
              gap='3'
              sx={{
                svg: {
                  mb: '1px',
                },
              }}
              justifyContent={'flex-end'}
              flexWrap={'wrap'}
            >
              <Button size='sm' onClick={refreshData} variant='primary'>
                <TbRefresh /> &nbsp; <span>{tableLabel?.refresh[lang]}</span>
              </Button>

              <Button
                size='sm'
                variant='primary'
                onClick={() => {
                  handlePrint()
                }}
              >
                <BsPrinter /> &nbsp; <span>{tableLabel?.print[lang]}</span>
              </Button>

              <Button
                size='sm'
                variant='primary'
                onClick={() => {
                  void handleExportAsExcel()
                }}
              >
                <TbDatabaseExport /> &nbsp; <span>{tableLabel?.exportFile[lang]}</span>
              </Button>

              {excelUpload && (
                <>
                  <Button
                    size='sm'
                    variant='primary'
                    onClick={() => {
                      // @ts-expect-error
                      setExcelUpload(true)
                    }}
                  >
                    <RiFileExcel2Fill /> &nbsp; <span>{tableLabel?.upload[lang]}</span>
                  </Button>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Box>

      <TableContainer id='dvContents' border='1px solid #bdbdbd' ref={printRef} overflowY='auto' height='70vh'>
        <CTable
          className='table'
          sx={{
            thead: {
              tr: {
                th: {
                  textTransform: 'capitalize',
                  paddingTop: '10px',
                  paddingBottom: '8px',
                  fontWeight: '500',
                  color: 'white',
                  border: '1px solid #ebebeb',
                  '&:first-of-child': {
                    borderRight: 'none',
                  },
                  '&:last-of-child': {
                    borderLeft: 'none',
                  },
                },
              },
            },
            tbody: {
              tr: {
                td: {
                  border: '1px solid #ebebeb',
                  '&:first-of-child': {
                    borderRight: 'none',
                  },
                  '&:last-of-child': {
                    borderLeft: 'none',
                  },
                  paddingY: '8px',
                  span: {
                    fontSize: '14px',
                  },
                  button: {
                    fontSize: '10px',
                    height: '25px',
                    width: '25px',
                    padding: '0px',
                  },
                  _hover: {
                    backgroundColor: 'gray.100',
                  },
                },
                _hover: {
                  backgroundColor: '#f5f5f5',
                },
              },
            },
          }}
        >
          <Thead
            border='1px solid #1c4c70'
            background='#1c4c70'
            maxHeight='30px'
            position='sticky'
            top='0px'
            zIndex='2'
          >
            {table.getHeaderGroups()?.map((headerGroup, index: number) => (
              <Tr key={index}>
                {headerGroup.headers?.map((header, index: number) => {
                  return (
                    <Th
                      key={index}
                      style={{
                        width: header.column.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </Th>
                  )
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={100}>
                  <Flex
                    sx={{
                      height: '70vh',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Spinner thickness='3px' speed='0.3s' emptyColor='gray.200' color={Colors.primaryColor} size='xl' />
                    <Text pt='3' fontSize={'14px'} color='gray'>
                      {tableLabel?.loadingPleaseWait[lang]}
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            ) : rowData?.length > 0 ? (
              table?.getRowModel()?.rows?.map((row, index) => (
                <Tr key={index}>
                  {row.getVisibleCells()?.map((cell, index) => {
                    return (
                      <Td key={index}>
                        <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                      </Td>
                    )
                  })}
                </Tr>
              ))
            ) : (
              <Tr height={'66vh'}>
                <Td colSpan={100}>
                  <Flex
                    sx={{
                      height: '100%%',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <NoDataFound />
                    <Box
                      onClick={refreshData}
                      background={Colors.primaryColor}
                      color='white'
                      paddingY='5px'
                      paddingX='20px'
                      fontSize='13px'
                      borderRadius='2px'
                      cursor='pointer'
                      display='flex'
                      alignItems='center'
                      gap='2'
                    >
                      <TbRefresh /> {tableLabel?.refresh[lang]}
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            )}
          </Tbody>
        </CTable>
      </TableContainer>

      <Box border='1px solid #bdbdbd' borderTop={'none'}>
        <Flex
          gap='5'
          px='4'
          py='3'
          borderBottom='1px'
          borderColor='gray.200'
          background='gray.100'
          justifyContent={'space-between'}
          alignItems='center'
        >
          <Text fontSize={'13px'}>{title}</Text>

          {pagination?.total && pagination?.total > 0 ? (
            <Flex justifyContent={'flex-end'} flexWrap='wrap' alignItems={'center'} gap='10'>
              <Box>
                <Flex
                  fontSize='15px'
                  alignItems='center'
                  mr={'2'}
                  sx={{
                    fontSize: '13px',
                  }}
                >
                  {tableLabel?.rowPerPage[lang]}
                  <Select
                    ml={'2'}
                    value={pagination.perPage}
                    onChange={(e) => {
                      handlePerPage(Number(e.target.value))
                    }}
                    size='xs'
                    width='60px'
                    fontSize='15px'
                    sx={{
                      outline: 'none',
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}
                    _hover={{
                      cursor: 'pointer',
                    }}
                  >
                    {[20, 30, 40, 50]?.map((pageSize, index) => (
                      <option key={index} value={pageSize} style={{ fontSize: '15px' }}>
                        {convertToDevanagari(pageSize?.toString(), lang)}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </Box>
              <Box>
                {pagination?.total ? (
                  <Text
                    sx={{
                      fontSize: '13px',
                    }}
                  >
                    {tableLabel?.totalData[lang]} : {convertToDevanagari(pagination?.total?.toString(), lang)}
                  </Text>
                ) : null}
              </Box>
              <Flex gap='2' alignItems={'center'}>
                <Text fontSize={'13px'}>{tableLabel?.gotoPage[lang]} : </Text>
                <form action=''>
                  <Input
                    sx={{
                      height: '22px',
                      width: '40px',
                      borderRadius: '1px',
                      textAlign: 'center',
                      fontSize: '13px',
                      outline: '1px solid #c2c2c2',
                      _focus: {
                        boxShadow: 'none',
                      },
                    }}
                    type='number'
                    min={1}
                    max={pagination?.totalPages ?? 1}
                    onChange={(e) => {
                      setGoToPage(parseInt(e.target.value))
                    }}
                    value={goToPage}
                  />
                  <input
                    onClick={(e) => {
                      e.preventDefault()
                      pagination?.totalPages && goToPage <= pagination?.totalPages && handlePage(goToPage)
                    }}
                    type='submit'
                    style={{
                      display: 'none',
                    }}
                  />
                </form>
              </Flex>
              <Flex
                gap='2'
                sx={{
                  button: {
                    fontSize: '13px',
                    height: '25px',
                    width: '25px',
                    _disabled: {
                      cursor: 'not-allowed',
                    },
                  },
                }}
              >
                <IconButton
                  sx={{
                    padding: '0px',
                  }}
                  isDisabled={pagination?.currentPage === 1}
                  variant='outline'
                  colorScheme='#255d88'
                  aria-label='previous'
                  onClick={prevFn}
                  size='sm'
                  icon={<HiOutlineArrowNarrowLeft color='#255d88' />}
                />
                {pagination?.totalPages &&
                  [...Array(pagination?.totalPages)]?.map((_, index) => {
                    const pageNumber = index + 1
                    if (
                      pageNumber === 1 ||
                      pageNumber === pagination?.totalPages ||
                      (pageNumber >= pagination?.currentPage - 1 && pageNumber <= pagination?.currentPage + 1)
                    ) {
                      return (
                        <Button
                          sx={{
                            padding: '0px',
                          }}
                          key={pageNumber}
                          size='sm'
                          variant={pageNumber === pagination?.currentPage ? 'primary' : 'outline'}
                          colorScheme='#255d88'
                          onClick={() => {
                            handlePage(pageNumber)
                          }}
                        >
                          {convertToDevanagari(pageNumber?.toString(), lang)}
                        </Button>
                      )
                    } else if (
                      (pageNumber === pagination?.currentPage - 2 && pageNumber > 1) ||
                      (pageNumber === pagination?.currentPage + 2 && pageNumber < pagination?.totalPages)
                    ) {
                      return (
                        <IconButton
                          sx={{
                            padding: '0px',
                          }}
                          key={pageNumber}
                          variant='outline'
                          colorScheme='#255d88'
                          aria-label='previous'
                          size='sm'
                          icon={<BsThreeDots color='#255d88' />}
                        />
                      )
                    }
                    return null
                  })}
                <IconButton
                  sx={{
                    padding: '0px',
                  }}
                  isDisabled={pagination?.currentPage === pagination?.totalPages}
                  variant='outline'
                  colorScheme='#255d88'
                  aria-label='next'
                  onClick={nextFn}
                  size='sm'
                  icon={<HiOutlineArrowNarrowRight color='#255d88' />}
                />
              </Flex>
            </Flex>
          ) : null}
        </Flex>
      </Box>
    </Box>
  )
}

Table.defaultProps = {
  showSearchBar: true,
  showTools: true,
  loading: true,
}
export default memo(Table)
