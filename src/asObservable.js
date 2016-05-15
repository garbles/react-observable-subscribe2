import {Observable} from 'rxjs/Observable'
import isObservable from 'is-observable'
import {of} from 'rxjs/observable/of'

export function asObservable () {
  if (isObservable(this)) {
    return this
  }

  return Observable::of(this)
}
