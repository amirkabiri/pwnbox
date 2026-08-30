https://a0b6e3b85b9a.pwnbox-lab.com/go?to=https://pwnbox.io@ff8f-51-68-214-15.ngrok-free.app/



Author's Note
@pitok
One point that many hand-maiden URL checkers are weak at, is finding the host part of the URL correctly.

Some developers think the first thing that comes after scheme:// is the host.

While based on the WHATWG URL Standard the format of the URLs is:

scheme://username:password@host:port/path?query#fragment

And the username:password part is kinda optional in the browser point of view.

