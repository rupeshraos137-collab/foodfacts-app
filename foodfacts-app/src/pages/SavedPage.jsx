import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../store/savedSlice'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'

function SavedPage() {
  const dispatch = useDispatch()
  const savedItems = useSelector(state => state.saved.items)
  const navigate = useNavigate()

  if (savedItems.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          No saved items yet
        </Typography>
        <Typography color="text.secondary">
          Search for foods and save them to see them here.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Start Searching
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={800}>
        Saved Items
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Your favorite foods for quick reference.
      </Typography>

      <Grid container spacing={3}>
        {savedItems.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea onClick={() => navigate(`/product/${product.id}`, { state: { product } })}>
                {product.image_small_url && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image_small_url}
                    alt={product.product_name}
                    sx={{ objectFit: 'contain', p: 1 }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.product_name || 'Unknown Product'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.brands || 'Unknown Brand'}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => dispatch(removeItem(product.id))}
                sx={{ m: 1 }}
              >
                Remove
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default SavedPage