This is a classic authentication-bypass SQL injection. The login handler interpolates the submitted username and password directly into a SQL query. Entering admin' -- as the username closes the username string and comments out the password comparison, so SQLite returns the admin row and the app displays the admin-only ledger note containing the flag.

The fix is to use bound parameters for both submitted values instead of concatenating strings into the query.
