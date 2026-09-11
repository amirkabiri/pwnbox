Author's Note
@thelilnix
Where do you look for XSS?

Every place your input is reflected, and "your input" is a far wider category than the fields the app calls fields. A filename is user input. So is a phone number, a User-Agent, a coupon code, a display name you set six screens ago. Nobody thinks of those as things-you-typed, which is exactly why they reach a template unescaped: this wall whitelists the extension and verifies the magic bytes, and both of those checks are about the file, not about its name. So the work is mechanical, find every place your input comes back out, and test each place separately, because they are separate. The same filename here is printed twice: escaped on the index, raw on the photo's own page. Stop at the first surface that renders it safely and you walk away concluding the app is fine. And then the second half, which is where most people stop too early: a reflection you cannot hand to somebody else is not an attack yet. It has to sit at a URL you can send, which is why the target here is the photo's page and why the wall's report form is the exploit, not a side quest. Find the reflection, test the reflection, then deliver it as a link.



### flag
pwnbox{58263b21676f179241029b20fb927f13}
