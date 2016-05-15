import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {switchMap} from 'rxjs/operator/switchMap'

export const createCompositeSubject = switchMapFn => value => {
  const behavior = new BehaviorSubject(value)

  const observable = Observable.create(observer => {
    const subscription = behavior::switchMap(switchMapFn).subscribe(observer)
    return () => subscription.unsubscribe()
  })

  return Subject.create(behavior, observable)
}
