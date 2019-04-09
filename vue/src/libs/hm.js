var triggers = ['login-collect'];

function getEnv()
{
  return {
    t: document.title,
    w: window.screen.width,
    h: window.screen.height,
    pd: window.screen.pixelDepth,
    cd: window.screen.colorDepth,
    v: window.navigator.appVersion,
    dm: document.domain,
    u:document.URL,
    r: document.referrer,
    l: window.navigator.language,
    c: document.cookie
  }
}

function report (data) {
  let url = 'https://test/hm?';
  for (let key in data) {
    url += key + '=' + data[key] + '&'
  }
  
  new Image().src = url;  
}

let hm = {
  comeIn() {
    let info = getEnv()
    info['e'] = 'load'
    report(info)
  },
  comeOut() {
    let info = getEnv()
    info['e'] = 'unload'
    report(info)
  },
  flag (e) {
    if (triggers.indexOf(e) >= 0) {
      return true
    }

    triggers.push(e)
  }
}

document.addEventListener('click', (e) => {
  if (e.target.dataset.hm) {
    if (triggers.indexOf(e.target.dataset.hm) >= 0) {
      let info = getEnv()
      info['e'] = e.target.dataset.hm
      report(info)
    }
  }
});

window.onload = (e) => {
  hm.comeIn()
}
window.onunload = (e) => {
  hm.comeOut()
}


export default hm