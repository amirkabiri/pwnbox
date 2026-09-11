Author's Note
@amirmsafari
The whole challenge lives in the gap between how a file is verified on the way in and how its content type is decided on the way out.

PNG verification is a magic-byte check, not a structural one. file-type only reads the 8-byte PNG signature (89 50 4E 47 0D 0A 1A 0A). Anything after the signature is ignored, so a file that starts with the signature and continues with <script>…</script> is accepted as a perfectly good image/png. The declared multipart Content-Type and the .png extension are both attacker-controlled and irrelevant — only the leading bytes matter.

MinIO honours the response-content-type override on anonymous, public-read GETs. The object is stored as image/png, but ?response-content-type=text/html makes MinIO hand it back as text/html — no signature or credentials required. nginx forwards the query string straight through, and X-Content-Type-Options: nosniff does not stop a document that is explicitly declared text/html from parsing as HTML.

Chain them: upload a PNG/HTML polyglot, then report /images/<bucket>/<key>.png?response-content-type=text/html. The admin bot renders your "image" as a document, your inline script runs on the challenge origin, and document.cookie gives up the non-HttpOnly flag cookie.

