// Invent a Word We Need — entry program.
//
// Writes exactly one line (no trailing newline) to <output dir>/entry.txt:
// one freshly coined English word plus its one-line definition, 1-140 chars.
// Output dir comes from MAKEFUN_OUTPUT_DIR, defaulting to /output.
//
// ---------------------------------------------------------------------------
// CANDIDATE EVALUATION (scored against the judge's brief, most important first)
// ---------------------------------------------------------------------------
// 1. noddrift (n.) — nodding along to a conversation your mind has already
//    left.
//    (1) Fresh word + one-line definition: yes, a new blend.
//    (2) Real gap: very strong. Almost everyone has nodded along while their
//        mind wandered, and English has no single word for it — "zoning out"
//        is the state, not the nodding-along act. Instantly recognisable.
//    (3) Definition exact and self-contained: lands in one reading; the word
//        itself (nod + drift) echoes the meaning, so no second sentence needed.
//    (4) Well formed: two everyday syllables, trivial to say, spell and
//        remember; sounds like English could have grown it (cf. daydream).
//    (5) Fresh and surprising: the blend is new and the pairing is vivid.
//    VERDICT: strongest overall — broadest, most relatable gap, cleanest form.
//
// 2. miswave (n.) — waving back at someone who was waving at the person
//    behind you.
//    (1) Fresh word + one-line definition: yes.
//    (2) Real gap: strong and sharply memorable, but a rarer moment than
//        noddrift — most readers have done it once or twice, not daily.
//    (3) Definition exact: lands in one reading, very visual.
//    (4) Well formed: mis- + wave is a natural English pattern (cf. misstep),
//        easy to say and spell.
//    (5) Fresh and surprising: high — funny, specific, instantly picturable.
//    VERDICT: close second; loses to noddrift on criterion 2 (frequency and
//    universality of the gap) by a hair.
//
// 3. roomnesia (n.) — the sudden forgetting of why you walked into a room.
//    (1) Fresh word + one-line definition: yes.
//    (2) Real gap: strong — the doorway effect, universally felt.
//    (3) Definition exact: lands in one reading.
//    (4) Well formed: room + amnesia is pronounceable and memorable, but the
//        -amnesia tail makes it sound clinical rather than lived-in, and the
//        blend is the most predictable of the three.
//    (5) Fresh and surprising: weakest of the three — the most obvious blend,
//        and the likeliest to have been coined before.
//    VERDICT: third; a solid gap, but the least original pairing.
//
// CHOSEN: candidate 1, noddrift. It wins on the gap (criterion 2, the most
// heavily weighted after the format itself) and is the cleanest, most
// English-sounding coinage of the three.
// ---------------------------------------------------------------------------

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning entry: one invented word + one-line definition.
// Dictionary style: word, part of speech, em dash, definition, full stop.
const ENTRY =
  "noddrift (n.) \u2014 nodding along to a conversation your mind has already left.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 140;

function main(): void {
  // The gate requires 1-140 characters of UTF-8 text, not only whitespace.
  // Count code points (not UTF-16 units or bytes) so the check matches the
  // human reading of "characters".
  const length = [...ENTRY].length;
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(
      `entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${length}`,
    );
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file is exactly the one line.
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
