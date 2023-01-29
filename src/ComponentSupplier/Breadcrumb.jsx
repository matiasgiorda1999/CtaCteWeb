import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const TypographyStyled = styled(Typography)`
  color: ${({ theme }) => theme.text} !important;
`

const BreadCrumbStyled = styled(Breadcrumbs)`
  color: ${({ theme }) => theme.text} !important;
`

const Breadcrumb = ({ currentName, parentName, parentLink, icon }) => {
  return (
    <div className="bread">
      <BreadCrumbStyled aria-label="breadcrumb">
        <Link color="inherit" to={parentLink}>
          {parentName}
        </Link>
        <TypographyStyled color="textPrimary">
          {currentName}
          &nbsp;
          <FontAwesomeIcon icon={icon} />
        </TypographyStyled>
      </BreadCrumbStyled>
    </div>
  )
}

export default Breadcrumb
