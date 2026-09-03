# Change log

Every edit made to this website, newest at the top.

**Claude adds a line here automatically each time it changes something.** Nobody has to remember to
write it. If a developer ever needs to work out what happened and when, this is the first place they look,
and the full technical record sits behind it in the repository's own history.

Format: date, who asked, what changed, which file.

---

## 2026-08-13 · Mehdi · Eli can now change the words and the photographs herself

This site became editable by talking to Claude, with nothing installed on Eli's Mac. Nothing about
the site itself changed — same pages, same sections, same design, same photographs.

**The photograph treatment now runs in Python.** Preparing a photograph for this site puts it
through one deliberate treatment so every picture reads as the same nocturnal world. Until today
that only worked on a machine with the developer tooling installed, which Eli does not have and is
not going to have. It is now also written in Python, which is already on her Mac, and it needs no
internet. The two versions produce the same picture: every one of the nineteen photographs was
re-made with the new one and compared against the old, and the largest difference on any of them
was under one part in 255. The original version is untouched and a developer can still run `npm run
images`. **No photograph on the site was replaced** — the pictures now showing are the same files
as before, and the comparison was made and then put back.

**Swapping a photograph now means reusing its name.** Every picture on the site is referenced by a
short key — `beach`, `temple`, `circle`. A new picture saved under an existing key appears wherever
that key is used, so a swap changes nothing structural.

**The words are checked before they are published.** All the copy lives in one file. Breaking that
file does not make the site look wrong, it makes the site quietly stop updating, which is a fault
nobody would spot. Claude now proves the file still reads correctly after every wording change, and
does not say it is safe to publish until that passes.

**Two new files.** `CLAUDE.md` is the rules Claude works to on this site, including what it must
refuse and send to a developer. `CHANGES.md` is this diary.

Files: scripts/grade.py (new), CLAUDE.md (new), CHANGES.md (new), README.md
