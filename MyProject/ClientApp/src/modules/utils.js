import Vue from 'vue'
import appConfig from './appConfig'
console.log(appConfig.appUrl, 'ROOT')
const utils = {
  root: appConfig.appUrl,
  async get(url, params) {
    return webix.ajax().get(`${appConfig.appUrl}${url}`, params)
  },
  async post(url, data) {
    return webix
      .ajax()
      .headers({
        'Content-type': 'application/json'
      })
      .post(`${appConfig.appUrl}${url}`, data)
  },
  statusMap: {
    none: { value: 0, text: 'None', isPending: true, color: 'text-dark' },
    submitted: { value: 1, text: 'Submitted', isPending: true, color: 'text-dark' },
    queued: { value: 2, text: 'Queued', isPending: true, color: 'text-primary' },
    started: { value: 3, text: 'Running', isPending: true, color: 'text-primary' },
    completed: { value: 4, text: 'Done', isPending: false, color: 'text-dark' },
    cancelled: { value: 5, text: 'Cancelled', isPending: false, color: 'text-warning' },
    automationError: { value: 6, text: 'Error', isPending: false, color: 'text-danger' },
    building: { value: 7, text: 'Pro Build In Progress', isPending: true, color: 'text-primary' },
    buildError: { value: 8, text: 'Pro Build Failed', isPending: true, color: 'text-danger' }
  },
  getStatusFromInt(value) {
    for (let key of Object.keys(this.statusMap)) {
      if (this.statusMap[key].value == value) {
        return this.statusMap[key]
      }
    }
    return this.statusMap.none
  },
  convertTime(totalSeconds) {
    totalSeconds = parseInt(totalSeconds, 10)

    let hours = Math.floor(totalSeconds / 3600)
    let minutes = Math.floor((totalSeconds - hours * 3600) / 60)
    let seconds = totalSeconds - hours * 3600 - minutes * 60
    if (hours) {
      if (minutes) {
        return `${hours}h ${minutes}m ${seconds}s`
      } else {
        return `${hours}h ${seconds}s`
      }
    }
    if (minutes) {
      return `${minutes}m ${seconds}s`
    }
    return `${totalSeconds}s`
  },
  getFileName(url) {
    var urlParts = url.split(/\/|\\/)
    return urlParts[urlParts.length - 1]
  },
  openPlaylistTreeRenameDialog(treeNodeItem) {
    this.bus.$emit('on-playlist-tree-rename', treeNodeItem)
  },
  bus: new Vue()
}
if ((process.env.VUE_APP_APIURL || '').startsWith('http')) {
  webix.attachEvent('onBeforeAjax', function (mode, url, data, request, headers, files, promise) {
    request.withCredentials = true
  })
}
export default utils
