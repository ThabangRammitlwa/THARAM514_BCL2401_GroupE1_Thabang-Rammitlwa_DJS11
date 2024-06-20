
import { Alert, AlertIcon } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Error = ({message}) => {
  return <Alert 
  status='error' 
  position={'fixed'} 
  bottom={'4'} 
  left={'50%'} 
  transform={'translateX(-50%)'} 
  w={'container.lg'}>

    <AlertIcon />
    {message}
  </Alert>
}

Error.propTypes = {
  message: PropTypes.string.isRequired
}

export default Error