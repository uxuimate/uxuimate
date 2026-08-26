import pathlib
import re

root = pathlib.Path(__file__).resolve().parent
pat = re.compile(r'\n[ \t]*<div class="mil-back-to-top">[\s\S]*?</div>', re.M)
changed = []
for p in root.rglob("*.html"):
    text = p.read_text(encoding="utf-8")
    new, n = pat.subn("", text)
    if n:
        p.write_text(new, encoding="utf-8")
        changed.append((str(p.relative_to(root)), n))
print("updated", len(changed))
for name, count in changed:
    print(name, count)
remaining = [str(p.relative_to(root)) for p in root.rglob("*.html") if "mil-back-to-top" in p.read_text(encoding="utf-8")]
print("remaining", remaining)
