# React Observable Subscribe 2

Inspired by Jay Phelps' [React Observable Subscribe](https://github.com/jayphelps/react-observable-subscribe), this library exposes a single
component - `<Subscribe>` - which consumes observables as props and maps them to a function. Handles updates
from both React and the Observable props.

### Wat?

So I stole a bunch of code that I wrote from [Yolk.js](https://github.com/garbles/yolk) to make this happen.

```js
import {render} from 'react-dom'
import {Subscribe} from 'react-observable-subscribe2'
import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

const message$ = Observable.of(`Welcome`)
const name$ = new BehaviorSubject(`Gabe`)

render (
  <Subscribe message={message$} name={name$}>
    {props =>
      <span>{props.message}, {props.name}</span>
    }
  </Subscribe>,
  document.querySelector('#app')
)

// renders <span>Welcome, Gabe</span>
```

Pushing a new value to `name$` will update the view accordingly. Additionally, replacing the child function
will immediately invoke the new one and replace the view. The component will render a `<noscript />` until all
observables have passed at least one value to the subscriber.

Subscribe also allows you just wrap your function components like so.

```js
function MyComponent ({message, name}) {
  return <span>{props.message}, {props.name}</span>
}

<Subscribe message={message$} name={name$}>{MyComponent}</Subscribe>
```

### Inspiration

[React Observable Subscribe](https://github.com/jayphelps/react-observable-subscribe)

[Cycle JS](https://github.com/cyclejs/core)

[Yolk JS](https://github.com/garbles/yolk)
