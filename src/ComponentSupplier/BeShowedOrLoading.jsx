import React from 'react'
import SpinnerLabeled from './SpinnerLabeled'

const BeShowedOrLoading = ({ show, message, children }) => {
  if (show) {
    return children
  } else {
    return <SpinnerLabeled label={message} />
  }
}

export default BeShowedOrLoading
