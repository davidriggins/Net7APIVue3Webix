class AppConfig {
  constructor() {
    this.appUrl = process.env.VUE_APP_APIURL || '/SelfServe/'
  }
}
const config = new AppConfig()
export default config
