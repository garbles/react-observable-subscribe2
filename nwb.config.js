module.exports = {
  type: 'react-component',
  babel: {
    stage: 0
  },
  build: {
    externals: {
      'react': 'React',
      'rxjs/BehaviorSubject': 'Rx',
      'rxjs/Observable': 'Rx',
      'rxjs/Subject': 'Rx'
    },
    global: 'Subscribe',
    jsNext: false,
    umd: true
  }
}
