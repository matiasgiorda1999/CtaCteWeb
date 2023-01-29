import React from 'react'
import styled from 'styled-components'

const TrStyled = styled.tr`
  color: ${({ theme }) => theme.text};
`

const TableRow = (props) => {
  return <TrStyled {...props}></TrStyled>
}

export default TableRow
