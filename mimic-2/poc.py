#!/usr/bin/env python3
"""
Generate a presigned S3 GET URL that serves an object as a content-type
of your choosing, signed with YOUR own AWS credentials.

Usage:
  python3 poc.py <bucket> <key> <region> <endpoint-url> [content-type] [expires]

Example:
  python3 poc.py plann-api-prod uploads/avatar123.png us-east-1 \
      https://s3.us-east-1.amazonaws.com text/html
"""
import sys
import boto3
from botocore.client import Config

bucket, key, region, endpoint = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
content_type = sys.argv[5] if len(sys.argv) > 5 else "text/html"
expires = int(sys.argv[6]) if len(sys.argv) > 6 else 3600

s3 = boto3.client(
    "s3",
    region_name=region,
    endpoint_url=endpoint,
    config=Config(signature_version="s3v4", s3={"addressing_style": "virtual"}),
)
url = s3.generate_presigned_url(
    "get_object",
    Params={
        "Bucket": bucket,
        "Key": key,
        "ResponseContentType": content_type,
    },
    ExpiresIn=expires,
)

print(url)
