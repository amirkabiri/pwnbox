# My Notes
## exploit
```
https://78498194778c.pwnbox-lab.com/?url=https://78498194778c.pwnbox-lab.com//6i19xxqm.requestrepo.com
```

## flag
```
pwnbox{d8ee05cdea5544b90cbc8d85c742c354}
```


# Author's Note
@Muntrive
Origin-check bypass via path extraction. The server checks the URL's origin (your own instance host passes), then redirects to its pathname. In ?url=https://<instance>///evil.com the origin is the instance but the path ///evil.com is protocol-relative, so the browser lands on evil.com.

