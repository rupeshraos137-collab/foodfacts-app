import { Component } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

class ClassFoodCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  // equivalent of useEffect with [] — runs once after mount
  componentDidMount() {
    console.log('ClassFoodCard mounted:', this.props.product.product_name)
  }

  // equivalent of useEffect cleanup — runs before unmount
  componentWillUnmount() {
    console.log('ClassFoodCard unmounting')
  }

  // equivalent of useEffect with dependencies — runs on updates
  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      console.log('Product changed')
    }
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { product } = this.props
    const { expanded } = this.state

    return (
      <Card onClick={this.toggleExpand}>
        <CardContent>
          <Typography variant="h6">
            {product.product_name || 'Unknown'}
          </Typography>
          {expanded && (
            <Typography variant="body2" color="text.secondary">
              {product.brands || 'Unknown Brand'}
            </Typography>
          )}
        </CardContent>
      </Card>
    )
  }
}

export default ClassFoodCard