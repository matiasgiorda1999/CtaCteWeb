import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ButtonLabeled from './ButtonLabeled'

const ButtonIconLabeled = ({ label = '', icon, ...props }) => {
  return (
    <ButtonLabeled {...props} label={label}>
      <FontAwesomeIcon icon={icon} />
    </ButtonLabeled>
  )
}

export default ButtonIconLabeled
