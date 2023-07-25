const cDNArr = [
  ['https://cdn.staticfile.org/vue/3.3.4/vue.runtime.global.prod.min.js', '/static/cdn/src/vue-3.3.4.js'],
  ['https://cdn.staticfile.org/axios/0.21.4/axios.min.js', '/static/cdn/src/axios-0.21.4.js'],
  ['https://cdn.staticfile.org/vue-demi/0.14.0/index.iife.min.js', '/static/cdn/src/vue-demi-0.14.0.js'],
  ['https://cdn.staticfile.org/pinia/2.1.4/pinia.iife.min.js', '/static/cdn/src/pinia-2.1.4.js'],
  ['https://cdn.staticfile.org/vue-router/4.2.4/vue-router.global.min.js', '/static/cdn/src/vue-router-4.2.4.js'],
  ['https://cdn.staticfile.org/element-plus/2.3.3/index.css', '/static/cdn/src/element-plus-2.3.3.css'],
  ['https://cdn.staticfile.org/element-plus/2.3.3/index.full.min.js', '/static/cdn/src/element-plus-2.3.3.js'],
  ['/static/cdn/src/undraw-ui.js'],
  ['/static/cdn/src/undraw-ui.css'],
  ['/assets/js/main-37a2ef6f.js&type=module']
]
loadScripts(cDNArr)
function loadScripts(arr, callback = Function) {
  const loader = (e, success = Function, error = Function) => {
    let typeIndex = e.lastIndexOf('&type=')
    let type
    if (typeIndex != -1) {
      type = e.substring(typeIndex + 6)
      e = e.substring(0, typeIndex)
    }
    //获取最后一个.的位置
    let index = e.lastIndexOf('.')
    //获取后缀
    let suffix = e.substring(index + 1)

    if (suffix.toLowerCase() == 'js') {
      const _script = document.createElement('script')
      _script.onerror = () => {
        document.head.removeChild(_script)
        error()
      }
      if (type) {
        _script.type = type
      }
      _script.src = e
      _script.onload = _script.onreadystatechange = function () {
        _script.onreadystatechange = _script.onload = null
        if (/MSIE ([6-9]+\\.\\d+);/.test(navigator.userAgent))
          window.setTimeout(
            function () {
              success()
            },
            8,
            this
          )
        else success()
      }
      document.head.appendChild(_script)
    } else if (suffix.toLowerCase() == 'css') {
      const _link = document.createElement('link')
      _link.rel = 'stylesheet'
      _link.href = e
      _link.onerror = () => {
        document.head.removeChild(_link)
        error()
      }
      _link.onload = _link.onreadystatechange = function () {
        _link.onreadystatechange = _link.onload = null
        if (/MSIE ([6-9]+\\.\\d+);/.test(navigator.userAgent))
          window.setTimeout(
            function () {
              success()
            },
            8,
            this
          )
        else success()
      }
      document.head.appendChild(_link)
    }
  }
  ;(function () {
    if (arr && arr.length != 0) {
      let e = arr.shift()
      loader(e.shift(), arguments.callee, () => {
        let f = e.shift()
        !f || loader(f, arguments.callee)
      })
    } else {
      callback && callback()
    }
  })()
}
