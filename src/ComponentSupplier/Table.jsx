import React from 'react'
import styled from 'styled-components'

const TableStyled = styled.table`
  color: ${({ theme }) => theme.text} !important;
`

const Table = (props) => {
  return <TableStyled {...props} />
}

export default Table
