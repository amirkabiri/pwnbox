#!/bin/bash

WORDLIST="js-filename-wordlist.txt"
BASE_URL="https://halyard-cb44e5d3bbc0.pwnbox-lab.com/Content/js"

if [[ ! -f "$WORDLIST" ]]; then
    echo "Wordlist file not found: $WORDLIST"
    exit 1
fi

while IFS= read -r name || [[ -n "$name" ]]; do
    # skip empty lines
    [[ -z "$name" ]] && continue

    for suffix in "-bundle.min.js" "-bundle.js"; do
        url="${BASE_URL}/${name}${suffix}"
        status=$(curl -s -o /dev/null -w "%{http_code}" "$url")

        if [[ "$status" == "200" ]]; then
            echo "[FOUND] $url"
        else
            echo "[  -  ] ($status) $url"
        fi
    done
done < "$WORDLIST"
