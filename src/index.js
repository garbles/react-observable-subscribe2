import React from 'react'
import invariant from 'invariant'
import isFunction from 'lodash/isFunction'
import {isValidElement} from 'react/lib/ReactElement'
import {createCompositeSubject} from './createCompositeSubject'
import {createProps} from './createProps'

const TOO_MANY_CHILDREN_ERROR = `<Subscribe> Must only provide one child.`
const CHILDREN_NOT_FUNC_ERROR = `<Subscribe> Invalid child. Must be a function.`
const RETURN_NOT_ELEMENT = `<Subscribe> Function must return a valid React element.`

export class Subscribe extends React.Component {
  constructor (props) {
    super()

    this.composite = null
    this.subscription = null
    this.func = props.children

    this.state = {
      vtree: React.createElement(`noscript`)
    }
  }

  componentWillMount () {
    const composite = this.composite = createCompositeSubject(createProps)(this.props)

    this.subscription = composite.subscribe(props => {
      invariant(!Array.isArray(this.func), TOO_MANY_CHILDREN_ERROR)
      invariant(isFunction(this.func), CHILDREN_NOT_FUNC_ERROR)

      const vtree = this.func(props)

      invariant(isValidElement(vtree), RETURN_NOT_ELEMENT)

      this.setState({vtree})
    })
  }

  componentWillReceiveProps (next) {
    if (next.children !== this.props.children) {
      this.func = next.children
    }

    this.composite.next(next)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.vtree !== this.state.vtree
  }

  componentWillUmount () {
    this.subscription.unsubscribe()
  }

  render () {
    return this.state.vtree
  }
}

export default Subscribe
