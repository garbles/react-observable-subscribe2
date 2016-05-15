# React Observable Subscribe 2

Inspired by Jay Phelps' [React Observable Subscribe](https://github.com/jayphelps/react-observable-subscribe), this library exposes a single
component - `<Subscribe>` - which accepts observables as props and unwraps them to a child function which is then rendered. Handles updates
from both React and the Observable props.

### Wat?

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

### Inspiration

[React Observable Subscribe](https://github.com/jayphelps/react-observable-subscribe)

[Cycle JS](https://github.com/cyclejs/core)

[Yolk JS](https://github.com/garbles/yolk)
