import {Observable} from 'rxjs/Observable'
import omit from 'lodash/omit'
import {asObservable} from './asObservable'
import {of} from 'rxjs/observable/of'
import {combineLatestStatic} from 'rxjs/operator/combineLatest'
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged'

export function createProps (obj) {
  obj = omit(obj, ['children'])

  const keys = Object.keys(obj)
  const len = keys.length

  if (len === 0) {
    return Observable::of(obj)
  }

  const values = Array(len)
  let i = -1

  while (++i < len) {
    const key = keys[i]
    const value = obj[key]
    values[i] = value::asObservable()
  }

  return Observable::combineLatestStatic(values, function combineTheThings (...args) {
    const newObj = {}
    i = -1

    while (++i < len) {
      const key = keys[i]
      newObj[key] = args[i]
    }

    return newObj
  })::distinctUntilChanged()
}
