console.clear()

const location = {
  search: 'l=javascript://alert(1)//https:.pwnbox-lab.com'
}
const window = {
  location : { hostname: 'dfasdfa.pwnbox-lab.com' }
}

var p = function () {
  const s = new URLSearchParams(location.search);
  const p = {};
  s.forEach((v, k) => {
    (v.indexOf("https:") > -1) ? p[k] = v : void 0;
  });
  return p;
}

s = {
  "debug.pwnbox-lab.com": ["debug_mode"]
}, c = [".pwnbox-lab.com"];

var u = function (e) {
  var t;
  if (!e)
    return !1;
  console.log('https pass')
  var n = /^https?:\/\//i.test(e) ? (new URL(e)).host : e;
  return (null !== (t = s[window.location.hostname]) && void 0 !== t ? t : c).some((function (e) {
    console.log('kir', n , e)
      return n.endsWith(e)
    }
  ))
}

if(u(p().l)){
  console.log('success', u(p().l))
} else{
  console.log('fail')
}

