import InformLabel from './InformLabel'

const InformNoDataLabel = ({ entityPlural }) => {
  return <InformLabel text={`¡No se encontraron ${entityPlural} disponibles!`} />
}

export default InformNoDataLabel
