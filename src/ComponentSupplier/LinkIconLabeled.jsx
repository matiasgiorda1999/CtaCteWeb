import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import LinkLabeled from './LinkLabeled'

const LinkIconLabeled = ({ label, icon, linking, ...props }) => {
  return (
    <LinkLabeled {...props} label={label} linking={linking}>
      <FontAwesomeIcon icon={icon} />
    </LinkLabeled>
  )
}

export default LinkIconLabeled
