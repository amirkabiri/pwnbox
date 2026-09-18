# my notes

## exploit
https://f4af08a63f4b.pwnbox-lab.com/?rUrl=https://a@f4af08a63f4b.pwnbox-lab.com@6i19xxqm.requestrepo.com

## how it works?

it's only a regex check that i guest is something like this:
```
\/\/(.*@)?f4af08a63f4b.pwnbox-lab.com(\/.*)?$
```

## solution
you can put two @ in url.

## flag
```
pwnbox{174e4c4e44b865c86071e4b13698ab93}
```

# Author's Note
@Muntrive
Parser differential on @. The server's homemade parser takes the host as the field after the FIRST @ (a@b@c->b); the browser follows the LAST @ (->c). ?rUrl=https://x@<instance>@evil.com/ — the server sees <instance> and passes host===instance, while the browser navigates to evil.com.
