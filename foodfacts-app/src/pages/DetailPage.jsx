import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../store/savedSlice'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NutritionRow from '../components/NutritionRow'

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const savedItems = useSelector(state => state.saved.items)

  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        if (!id) {
          setError('Invalid product id')
          return
        }

        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${id}.json`
        )

        if (!cancelled) {
          if (res.data.status === 1) {
            setProduct(res.data.product)
          } else {
            setError('Product not found')
          }
        }
      } catch (err) {
        console.error('ERROR:', err)

        if (!cancelled) {
          setError('Network error. Check your internet.')
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [id])

  if (error) return <Typography>{error}</Typography>
  if (!product) return <Typography>Loading...</Typography>

  const isSaved = savedItems.some(p => p.id === id)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch(removeItem(id))
    } else {
      dispatch(addItem(product))
    }
  }

  const { product_name, brands, image_url, nutriments } = product

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
          {image_url && (
            <Box
              component="img"
              src={image_url}
              alt={product_name}
              sx={{ width: 160, height: 160, objectFit: 'contain' }}
            />
          )}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              {product_name || 'Unknown Product'}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {brands || 'Unknown Brand'}
            </Typography>
            <Button
              variant={isSaved ? 'outlined' : 'contained'}
              color={isSaved ? 'error' : 'primary'}
              startIcon={isSaved ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
              onClick={handleSaveToggle}
              sx={{ mt: 1 }}
            >
              {isSaved ? 'Remove from Saved' : 'Save to My List'}
            </Button>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Nutrition per 100g
        </Typography>

        <NutritionRow label="Calories" value={nutriments?.['energy-kcal_100g']} unit=" kcal" />
        <NutritionRow label="Protein" value={nutriments?.proteins_100g} unit="g" />
        <NutritionRow label="Carbohydrates" value={nutriments?.carbohydrates_100g} unit="g" />
        <NutritionRow label="Sugars" value={nutriments?.sugars_100g} unit="g" />
        <NutritionRow label="Fat" value={nutriments?.fat_100g} unit="g" />
        <NutritionRow label="Saturated Fat" value={nutriments?.['saturated-fat_100g']} unit="g" />
        <NutritionRow label="Fibre" value={nutriments?.fiber_100g} unit="g" />
        <NutritionRow label="Salt" value={nutriments?.salt_100g} unit="g" />
      </Paper>
    </Container>
  )
}

export default DetailPage