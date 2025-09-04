import { useErrorStore } from '@/stores/errorStore'
import {Component} from 'react'

export default class RendererErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    console.log(error)

    const setErrors = useErrorStore((state) => state.setErrors())
    setErrors(error)
  }

  static getDerivedStateFromError(error) {
    return {}
  }
  
  render() {
    return this.props.children
  }
}