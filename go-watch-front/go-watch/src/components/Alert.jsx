import PropTypes from 'prop-types'

const Alert = (props) => {
  return (
    <div className={'alert ' + props.className} role="alert">
      {props.message}
    </div>
  )
}

export default Alert

Alert.propTypes = {
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}
