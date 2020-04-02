class AppOpt {
  constructor (options = {}) {
    this.Rotator = {
      collectStatistic: false
    }
  }
}

const options = new AppOpt()

if (window.AppOpt) {
  Object.assign(options, window.AppOpt)
}

export default options
