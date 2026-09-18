# my note

## exploit
https://d5e2447f8465.pwnbox-lab.com/?r=http://d5e2447f8465.pwnbox-lab.com.6i19xxqm.requestrepo.com/

## flag
pwnbox{1d6950a0c4fb9b7fb38ed3f49e5ef404}


# Author's Note
@Muntrive
Substring allow-list. A link passes if it merely contains the instance host (link.includes(host)) instead of parsing it. Smuggle that string into a query of an attacker URL: ?r=https://evil.com/?x=<instance-host> — the check finds the string and passes, but the browser's real host is evil.com.

