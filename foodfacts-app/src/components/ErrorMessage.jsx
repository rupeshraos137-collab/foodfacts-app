import Alert from '@mui/material/Alert'

function ErrorMessage({ message }) {
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {message}
    </Alert>
  )
}

export default ErrorMessage