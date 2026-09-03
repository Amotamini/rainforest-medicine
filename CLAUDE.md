# Rules for Claude working on the Rainforest Medicine Gatherings website

You are helping **Jonas**. He is not a developer. He will ask you in plain English to change some
wording or swap a photograph. Your job is to do exactly that and nothing more.

**Read this whole file before your first edit in a session.**

This is the second of Jonas's two sites. The other is the Ocean Forest Ecolodge site and it has its
own `CLAUDE.md` with its own rules. The line between the two is the same: **words and pictures are
his, structure is a developer's.**

> **Handover note, 2026-09-03.** This project passed from Eli to Jonas. Older documents, and the
> dated entries in `CHANGES.md`, still name Eli throughout. That is correct history — read those as
> "the client decided this on that date" and never rewrite them. Every live instruction now means
> Jonas.

---

## The one rule that matters

**Change words and pictures. Never change structure.**

If a request would require altering layout, spacing, colours, fonts, code, or how a page is built,
**stop and say so**. Tell Jonas it needs a developer. Do not attempt it, do not offer a
workaround, do not do "just a small version" of it.

It is always better to refuse and be wrong than to change the structure and be wrong. A refused
request costs a message. A broken layout costs a call to a developer.

**This site fails quietly.** That is what makes it different from the Ocean Forest one. If you break
`lib/content.ts`, the site does not look wrong — it stops updating altogether and goes on showing
the old words as though nothing happened. Jonas would have no way of knowing why. This is why the
check further down is not optional.

---

## What Jonas MAY change, and where

### Words — all of them, in one file

**Every word on this site lives in `lib/content.ts`.** There is one page, built from sections, and
all of its copy is in that single file. You edit **only the text inside the quotation marks**.

Nothing else in that file is text. The names to the left of the colons, the brackets, the commas
and the `id` lines are the structure that holds the words up, and changing one of those is what
takes the site down.

The sections in that file, in the order they appear on the page:

| In `content.ts` | On the page |
|---|---|
| `site`, `nav` | The name, the email address, the menu |
| `hero` | The opening screen |
| `invitation`, `gathering` | The invitation and what a gathering is |
| `lineage`, `book`, `plants` | The tradition, Jonathon's book, the plants |
| `setting` | The Osa Peninsula and the lodge |
| `teachers`, `founder`, `testimonials` | Who holds the space, and what people have said |
| `gatherings` | **The three gatherings — dates, prices, deposits, what is included** |
| `intentions`, `conservation` | Intentions and the conservation work |
| `apply`, `footer` | How to apply, and the foot of the page |

### Photographs — by key, never by position

Every photograph is referenced by a short name, its **key**. `beach`, `temple`, `circle`. A new
picture saved under an existing key appears wherever that key is used, which is why a swap is safe
and needs no change to any page.

| Key | Where it sits on the page | What it shows |
|---|---|---|
| `rainforest-banner` | Hero | Sunlight through the canopy |
| `circle` | The gathering | The candlelit ceremonial circle at night |
| `circle-beach` | Upcoming gatherings | A circle on the beach at dusk |
| `img5499` | The lineage | Secoya elders in the ceremonial lodge |
| `nov-2013` | The lineage | A Secoya elder beside Jonathon |
| `book-cover` | The book | The cover of *Rainforest Medicine* |
| `flowers-of-the-vine` | The plants | The flowers of the vine |
| `cacao` | The plants | Sacred plants and cacao |
| `temple` | The setting | The wooden ceremonial temple |
| `san-josecito-bay` | The setting | San Josecito Bay from the air |
| `beach` | The setting | The Pacific shoreline |
| `hammock` | The setting | Hammocks on the deck |
| `room3` | The setting | A guest room |
| `goddess-jacuzzi` | The setting | The stone pool |
| `sunset1` | Intentions | Sunset over the Pacific |
| `sunset2` | Conservation | Dusk over the ocean |
| `jonathon-portrait` | The founder | Portrait of Jonathon |

Two more keys are graded but **not currently shown anywhere**: `fb-ceremony` and `lodge`. If Jonas
asks to swap one of those, do it, and tell him plainly that the picture is prepared but is not on
the page at the moment, so he will not see it change.

**Adding a photograph somewhere that does not already have one needs a developer.** That means changing a
component, which is structure. Refuse it.

---

## What Jonas may NEVER change — and you must refuse

Do not edit these for him under any circumstances:

- `components/` — every section of the page
- `app/` — the layout, the fonts, the styling
- `lib/images.ts` — how a key is looked up
- `tailwind.config.ts` — the colours and the type
- `next.config.mjs`
- `package.json`
- `netlify.toml` — left over from a host that is no longer used; leave it exactly where it is
- `public/images/processed/` **by hand** — that folder is written by the grade and by nothing else.
  Never save a picture into it, never rename anything in it. Put the picture in
  `public/images/raw/` and run the grade.

Also refuse, and route to a developer:

- Moving, adding, removing or reordering **sections**
- Changing colours, fonts, sizes, spacing or layout
- Adding a photograph in a place that does not already have one
- Anything that mentions CSS, JavaScript, TypeScript, components or deployment

---

## The four recipes

These are the jobs Jonas will ask for. Each is followed in the same order every time. Improvising one
of these is how the site breaks, and the kind of break it produces here is the kind nobody notices
for a week.

**Every recipe ends by writing one line to `CHANGES.md`.**

---

### Recipe 1 — Swap a photograph

1. **Establish which key he means**, by what the picture shows and where it sits on the page. Use
   the table above. Say the key back to him in plain words before you touch anything: "the wide
   shot of the bay in the setting section — that one is `san-josecito-bay`."
2. Save his file into `public/images/raw/` **under that exact key name**, keeping the extension he
   gave you: `san-josecito-bay.jpg`. This replaces the old raw file, which is fine — the old one is
   in the repository's history.
3. Run the grade:

   ```bash
   python3 scripts/grade.py
   ```

   It needs nothing installed and no internet. It takes about twenty seconds and re-does all
   nineteen pictures, which is normal and correct.
4. **Confirm the manifest updated.** Open `lib/image-manifest.json` and check that the entry for
   that key now shows the new width and height. If it does not, the grade did not see the file —
   most likely the filename does not match the key exactly.
5. Tell him the key and where it appears on the page.
6. Write the `CHANGES.md` line, naming the key and the section it appears in.

**If he asks for it to look brighter, or less dark, or without the grain:** that is the grade, and
the grade is deliberate — one treatment over every photograph is what makes the site read as one
world. It needs a developer. Say so.

### Recipe 2 — Change words

1. **Find the string in `lib/content.ts`.** Search for the words he said, not for the section name.
2. **Show him what it says now and what it will say**, both in full, before you change anything.
   Wait for him to confirm.
3. **Change only the text inside the quotation marks.** Do not touch the name to the left of the
   colon, the commas, the brackets, or anything else on the line. If his new wording contains a
   quotation mark or an apostrophe, say so and handle it — that is exactly where this breaks.
4. Then run:

   ```bash
   node --experimental-strip-types lib/content.ts
   ```

   It prints nothing when the file is sound. If it prints an error, **you broke the file** — fix it
   and run it again.
5. **Do not tell him it is safe to publish until that passes.** Not "it should be fine", not "I have
   checked it carefully". Run the command, see it pass, then say so.
6. Write the `CHANGES.md` line.

### Recipe 3 — Change a gathering's price, dates or places

The three gatherings are in `gatherings.upcoming` in `lib/content.ts`. The price, the dates, the
place, the deposit and the number of places are all ordinary text in quotation marks, so this is
Recipe 2 with one extra thing said out loud.

1. Say which gathering you are about to change, by its title and its dates, and wait.
2. Change the strings. Follow Recipe 2 exactly, **including the check in step 4.**
3. **Say plainly that the booking pages are separate.** The money changes hands on WeTravel, on a
   page this site only links to. Changing the price here changes what the website says and nothing
   else. If the WeTravel page still says the old price, the two will disagree, and somebody will
   book at the old one. Tell him he needs to change it on WeTravel too, and that you cannot do it
   for him.
4. Write the `CHANGES.md` line, naming the gathering and both the old and the new value.

### Recipe 4 — Refuse and route to a developer

This is a recipe because refusing well has steps too. Refuse:

- Anything that moves, adds or removes a **section**
- Anything about **colours, fonts, spacing or layout**
- **Adding a photograph in a place that does not already have one**
- Anything touching `components/`, `app/`, `tailwind.config.ts`, `next.config.mjs` or
  `package.json`

When you refuse:

1. Say what you cannot do, in one sentence, without apologising at length.
2. Say **why** in plain words — "that would mean changing how the page is built, not what it says".
3. Say who can: **a developer**.
4. Offer the nearest thing you can actually do, if there is one. "I cannot add a second photograph
   to that section, but I can swap the one that is already there."
5. Do not do a partial version of it. Do not do "just the easy half".
6. Write nothing to `CHANGES.md` — nothing changed.

---

## How to behave in every session

1. **Show before you save.** Tell him in plain words what you are about to change and what it will
   say afterwards. Wait for him to confirm.
2. **One thing at a time.** If he asks for six changes, do them one by one and confirm each.
3. **Never tidy.** Do not reformat, do not "improve" nearby wording, do not fix things he did not
   ask about. If you notice a problem, mention it and leave it alone.
4. **Never invent content.** No made-up prices, dates, testimonials or facts. If something is
   missing, say it is missing.
5. **Plain language only.** He wants to know what the page will say, not how it is built.
6. **Say when you are unsure.** "I think this needs a developer" is always an acceptable answer.

---

## Record every change — this is not optional

**After every change, add one line to the top of `CHANGES.md`, as the newest entry.**

Do it every single time, even for a one-word fix. Never skip it, never batch several changes into
one line. This is how Jonas and a developer can both see what happened without reading code.

Format, exactly:

```
## 2026-08-14 · Eli · The bay photograph is the new drone shot
The picture in the setting section was swapped. Key: `san-josecito-bay`.
Files: public/images/raw/san-josecito-bay.jpg, public/images/processed/, lib/image-manifest.json
```

Date, who asked for it, one plain sentence, then what it said before and after, then the files.
Written so somebody who has never seen the site can understand it.

---

## Publishing a change

After he confirms, and after `CHANGES.md` is written:

1. Save the files.
2. **If you changed words, `node --experimental-strip-types lib/content.ts` must have passed.**
3. Tell him how to publish: open GitHub Desktop, look at the changes listed, press **Commit**, then
   **Push**.
4. Tell him the site updates by itself about a minute after pushing.

**If you commit for him, write a proper message.** One line, plain English, saying what changed —
"Napo-Galeras: price now $2,900". Never "update", never "changes", never "fix".

---

## Undoing

Every change is recorded twice: in `CHANGES.md` in plain English, and in the repository's own
history in full technical detail. Nothing is ever permanently lost.

**He can undo his own last change, and he does not need anybody:**

> Open GitHub Desktop, click **History** at the top left, right-click the change at the top of the
> list, choose **Revert changes in commit**, then press **Push**. The site goes back to how it was
> about a minute later.

Only if that does not put it right: **"Ask a developer to look at it."** `CHANGES.md` tells him what to
look for.

---

## About the grade, for when you are asked

`scripts/grade.py` and `scripts/process-images.mjs` do the same job and produce the same picture.
The Python one needs nothing installed and is the one you run. The other one needs `npm install`
first and is kept for a developer.

Both read `public/images/raw/`, write `public/images/processed/`, and rewrite
`lib/image-manifest.json`. Nothing else writes to either of those.

Never edit `lib/image-manifest.json` by hand. `lib/images.ts` stops the whole site from building if
a key is missing from it, which is deliberate — a missing picture takes the site down loudly rather
than leaving a hole nobody spots.

---

## Facts about these gatherings — do not contradict them

If a request conflicts with one of these, point it out before changing anything.

- **Three gatherings**, twelve places each
- Booking and payment happen on **WeTravel**, not on this site. This site links to it
- Applying is by **email** — `info@rainforestmedicine.net`
- The formal name is **Rainforest Medicine Council Gatherings**; the site's wordmark is the shorter
  *Rainforest Medicine Gatherings*, and the full name appears in the footer
- The site makes **no medical or health claims** about the plant medicines. Never add any
- The gatherings are held at **Ocean Forest Ecolodge** on the Osa Peninsula, and in **Napo
  Province, Ecuador**

---

## Two known things that are not faults

These were deliberate decisions, not oversights. Do not act on either of them, and do not "fix"
them. They are recorded here so that you recognise them rather than treat them as bugs. Both are
now Jonas's to decide; if he raises one, say what it is and that it needs a developer.

- Every page still declares `rainforestmedicine.net` as its true address, which tells Google the
  old WordPress site is the real one. Whether the domain moves is for Jonas.
- The old WordPress site's articles have not been brought across, and that was a decision, not an
  oversight. There is no blog on this site.
