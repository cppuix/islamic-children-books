# scripts/generate_essays.py
# Dev-time tool: converts Blogger posts (HTML) into markdown files.
# The site never talks to Blogger; only this script does.
#
# Usage:
#   pip install markdownify
#   python scripts/generate_essays.py               # fetch the live feed
#   python scripts/generate_essays.py default.json  # or read a saved JSON

import json
import re
import sys
import unicodedata
from pathlib import Path
from urllib.request import urlopen

from markdownify import markdownify as md

FEED_URL = "https://islaamchildrenbooks.blogspot.com/feeds/posts/default?alt=json&max-results=500"
CONTENT_DIR = Path(__file__).resolve().parent.parent / "src" / "lib" / "content"

# Blogger scars we remove before conversion
STRIP_PATTERNS = [
    r"<a name=['\"]more['\"]></a>",   # the "read more" anchor
    r'<div class="separator".*?</div>',  # image wrapper blocks
    r"<span\s*></span>",              # empty spans
]


def load_feed():
    if len(sys.argv) > 1:
        return json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    with urlopen(FEED_URL) as res:
        return json.loads(res.read().decode("utf-8"))


def slugify(title: str) -> str:
    # drop apostrophes/quotes so "You'll" -> "youll", not "you-ll"
    for ch in "'’\"“”":
        title = title.replace(ch, "")
    title = unicodedata.normalize("NFKD", title)      # strips diacritics (ā -> a)
    title = title.encode("ascii", "ignore").decode()  # drops emoji & Arabic
    title = re.sub(r"[^a-z0-9]+", "-", title.lower())
    return title.strip("-")


def clean_html(html: str) -> str:
    for pattern in STRIP_PATTERNS:
        html = re.sub(pattern, "", html, flags=re.S | re.I)
    return html


def to_markdown(html: str) -> str:
    text = md(html, heading_style="ATX", strip=["img"])
    text = re.sub(r"\n{3,}", "\n\n", text)  # collapse blank lines
    text = re.sub(r"[ \t]+\n", "\n", text)  # trailing whitespace
    return text.strip()


def frontmatter(entry: dict) -> str:
    title = entry["title"]["$t"].strip().replace('"', '\\"')
    date = entry["published"]["$t"][:10]
    link = next(l["href"] for l in entry["link"] if l["rel"] == "alternate")
    labels = [c["term"] for c in entry.get("category", [])]
    return "\n".join([
        "---",
        f'title: "{title}"',
        f"date: {date}",
        f'source: "{link}"',
        f"labels: {json.dumps(labels)}",
        "---",
        "",
    ])


def main():
    feed = load_feed()
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)

    for entry in feed["feed"]["entry"]:
        slug = slugify(entry["title"]["$t"])
        markdown = frontmatter(entry) + to_markdown(clean_html(entry["content"]["$t"])) + "\n"
        (CONTENT_DIR / f"{slug}.md").write_text(markdown, encoding="utf-8")
        print(f"wrote {slug}.md")


if __name__ == "__main__":
    main()
