import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LinkLabeledStyled = styled(Link)`
  color: ${({ theme }) => theme.text};
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`

const LinkLabeled = ({ label, linking, children, ...props }) => {
  return (
    <LinkLabeledStyled {...props} to={linking}>
      {label}
      {children}
    </LinkLabeledStyled>
  )
}

export default LinkLabeled
