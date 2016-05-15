import {equal} from 'assert'
import React from 'react'
import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {render, unmountComponentAtNode} from 'react-dom'

import {Subscribe} from 'src/'

import {of} from 'rxjs/add/observable/of'

describe('Subscribe', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a welcome message', () => {
    const instance = (
      <Subscribe message="Welcome!">
        {props => <span>{props.message}</span>}
      </Subscribe>
    )

    render(instance, node, () => {
      equal(node.innerHTML, `<span data-reactroot=\"\">Welcome!</span>`)
    })
  })

  it('consumes an observable to display a welcome message', () => {
    const message = Observable.of(`Welcome`)
    const name = new BehaviorSubject(`Gabe`)

    const instance = (
      <Subscribe message={message} name={name}>
        {props =>
          <span>{props.message}, {props.name}</span>
        }
      </Subscribe>
    )

    render(instance, node)
    equal(node.textContent, `Welcome, Gabe`)

    name.next(`bruh`)

    equal(node.textContent, `Welcome, bruh`)
  })

  it('can change the child function', () => {
    const message = Observable.of(`Welcome`)

    const instance = (
      <Subscribe message={message}>
        {props =>
          <span>{props.message}, Gabe</span>
        }
      </Subscribe>
    )

    const nextInstance = (
      <Subscribe message={message}>
        {props =>
          <span>Sometimes I say "{props.message}"</span>
        }
      </Subscribe>
    )

    render(instance, node, () => {
      equal(node.textContent, `Welcome, Gabe`)
    })

    render(nextInstance, node, () => {
      equal(node.textContent, `Sometimes I say "Welcome"`)
    })
  })
})
