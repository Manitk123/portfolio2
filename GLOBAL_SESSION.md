# ═══════════════════════════════════════════════════════════════════════════════
#  GLOBAL AGENT SESSION FILE
#  Location : C:\Users\manit\agent-context\GLOBAL_SESSION.md
#  Purpose  : Persistent context, rules, savepoint system, and project index
#              for ALL projects. Read this FIRST at the start of every session.
# ═══════════════════════════════════════════════════════════════════════════════

| 2026-07-10 | P02     | UI Component Polish (Cards, Footer) | SP05      | Success  |\n---

## ⚙️ MANDATORY AGENT BEHAVIOUR (Every Session, Every Project)

1. **READ THIS FILE FIRST** before touching any project code.
2. **CREATE / UPDATE a PROJECT SESSION** entry (see "Project Index" section) when switching or starting a project.
3. **SAVEPOINTS**: Create a named savepoint (SP-XX) BEFORE and AFTER every non-trivial change.
4. **ERROR CHECK**: After every completed task run lint / build / type-check and log the result here.
5. **SUGGEST UPGRADES**: After every completed task, append ≥1 upgrade suggestion to the relevant project.
6. **TOKEN EFFICIENCY** — strictly follow the rules in the "Token Efficiency" section below.
7. **NEVER make unilateral architectural decisions** — surface them as open questions, wait for approval.

---

## 👤 USER PROFILE

| Field          | Value                                          |
|----------------|------------------------------------------------|
| Name           | Manit                                          |
| OS             | Windows 11                                     |
| Shell          | PowerShell                                     |
| Projects Root  | C:\Users\manit\OneDrive\Desktop\MANIT\projects |
| Global Context | C:\Users\manit\agent-context\GLOBAL_SESSION.md |
| Preferred Lang | TypeScript / React                             |
| Deploy Target  | Vercel (default)                               |
| Code Style     | Strict TypeScript, oxlint, Prettier            |

---

## 📂 PROJECT INDEX

Each entry is a summary of a known project. Expand one into a full PROJECT SESSION block when working on it.

### [P01] DSA Visualizer
- **Root**: `C:\Users\manit\OneDrive\Desktop\MANIT\projects\DSA visualizer`
- **Local Session**: `SESSION.md` in project root (detailed per-project context)
- **Stack**: React 19, TypeScript, Vite 8, TailwindCSS v3, Zustand v5, Framer Motion v12, GSAP v3
- **Status**: Active development
- **Last Worked**: 2026-07-08
- **Quick Notes**:
  - Engine layer (pure TS) lives in `src/engine/` — NO React imports there
  - All shared types in `src/engine/types.ts`
  - Algorithm metadata registry: `src/data/algorithmMeta.ts` (19 KB — read in chunks)
  - `sorting/` directory exists but file contents were unknown at last scan
  - `hooks/` and `animations/` contents were unknown at last scan

### [P02] Portfolio p1
- **Root**: `C:\Users\manit\OneDrive\Desktop\MANIT\portfolio\p1`
- **Local Session**: `SESSION.md` in project root
- **Stack**: React 19, Vite 8, GSAP v3, Lenis
- **Status**: Active development
- **Last Worked**: 2026-07-08
- **Quick Notes**:
  - Major UI overhaul applied (Rotary dial skills, 3D carousel, Flip cards, Zig-zag experience)
  - Hero text and tagline animated with GSAP (character-by-character entrance and scrub)
  - CSS is centralized in `index.css`
  - Uses Framer Motion and GSAP for animations


#### [P02-SP05] — Project/Experience Card Polish & Full-Bleed Footer (2026-07-10)
- **Description**: Upgraded Project Cards to minimalist frosted glass with hover scaling. Enhanced Experience cards with asymmetric shape-shifting and translate hovers. Extended Footer to full-bleed. Fixed Vite build error.
- **Changed files**:
  - src/components/Projects.jsx, src/components/Footer.jsx, src/index.css
- **Revert**: Run git reset --hard HEAD and git clean -fd if uncommitted, or git revert <commit-hash> if committed.

<!-- TEMPLATE — copy & fill when adding a new project
### [P0X] Project Name
- **Root**: `C:\Users\manit\OneDrive\Desktop\MANIT\projects\...`
- **Local Session**: `SESSION.md` in project root (or N/A)
- **Stack**: ...
- **Status**: Planning | Active | Paused | Complete
- **Last Worked**: YYYY-MM-DD
- **Quick Notes**:
  - ...
-->

---

## 💾 SAVEPOINT SYSTEM

### How Savepoints Work
- A savepoint is a named snapshot of the project state BEFORE a change.
- Numbered sequentially per project: `[P01-SP00]`, `[P01-SP01]`, etc.
- Each entry lists: what changed, which files were touched, and how to revert.
- To revert: say "revert to [P01-SP02]" and I will restore those files.

### Savepoint Registry

#### [P01-SP00] — DSA Visualizer Baseline (2026-07-08)
- **Description**: Initial project scan. No code changes made.
- **Changed files**: NONE (read-only scan)
- **Revert**: Nothing to restore — this IS the baseline.

#### [P02-SP01] — Portfolio Bento Redesign (2026-07-08)
- **Description**: Migrated portfolio layout to an Apple/Vercel-style Bento Grid and asymmetric architecture.
- **Changed files**:
  - `src/components/BentoSection.jsx` (NEW)
  - `src/App.jsx`, `src/components/Skills.jsx`, `src/components/Experience.jsx`, `src/components/Projects.jsx`, `src/index.css`
  - `src/components/About.jsx`, `src/components/Achievements.jsx` (DELETED/MERGED)
- **Revert**: Revert git tree to previous commit.

#### [P02-SP02] — UI Polish, Text Animations & Bug Fixes (2026-07-08)
- **Description**: Fixed UI overlaps on carousel dots, blended footer background with site, adjusted rotary dial spacing, and implemented GSAP character-by-character animation on hero title and tagline.
- **Changed files**:
  - `src/components/Hero.jsx`, `src/components/Footer.jsx`, `src/index.css`
- **Revert**: Run `git reset --hard HEAD` and `git clean -fd` if uncommitted, or `git revert <commit-hash>` if committed.

#### [P02-SP03] — MS Edge Animation Bug Fixes (2026-07-10)
- **Description**: Fixed GSAP filter animation vanishing bug and dropped frames in MS Edge by removing absolute 0px blurs and forcing GPU layer with `will-change: transform`.
- **Changed files**:
  - `src/components/AnimatedTitle.jsx`, `src/components/Experience.jsx`, `src/components/Hero.jsx`, `src/index.css`
- **Revert**: Run `git reset --hard HEAD` and `git clean -fd` if uncommitted, or `git revert <commit-hash>` if committed.

#### [P02-SP04] — Mobile UI Layout Bug Fixes (2026-07-10)
- **Description**: Fixed mobile layout bugs where the about profile image was awkwardly cropped, and the rotary skills dial was misaligned due to incorrect negative margins.
- **Changed files**:
  - `src/index.css`
- **Revert**: Run `git reset --hard HEAD` and `git clean -fd` if uncommitted, or `git revert <commit-hash>` if committed.


#### [P02-SP05] — Project/Experience Card Polish & Full-Bleed Footer (2026-07-10)
- **Description**: Upgraded Project Cards to minimalist frosted glass with hover scaling. Enhanced Experience cards with asymmetric shape-shifting and translate hovers. Extended Footer to full-bleed. Fixed Vite build error.
- **Changed files**:
  - src/components/Projects.jsx, src/components/Footer.jsx, src/index.css
- **Revert**: Run git reset --hard HEAD and git clean -fd if uncommitted, or git revert <commit-hash> if committed.

<!-- TEMPLATE
#### [PXX-SPYY] — Name (YYYY-MM-DD)
- **Description**: What was done
- **Changed files**:
  - `src/path/to/file.ts` — description of change
- **Revert**: Restore listed files. Old content below:
  ```ts
  // paste old file content or git ref here
  ```
-->

---

## ✅ COMPLETED TASKS LOG

| Date       | Project | Task                          | Savepoint | Outcome  |
|------------|---------|-------------------------------|-----------|----------|
| 2026-07-08 | P01     | Session system setup          | SP00      | Success  |
| 2026-07-08 | P02     | Major Portfolio UI Overhaul   | SP00      | Success  |
| 2026-07-08 | P02     | Bento Grid Architecture       | SP01      | Success  |
| 2026-07-10 | P02     | MS Edge Animation Bug Fixes   | SP03      | Success  |
| 2026-07-10 | P02     | Mobile UI Layout Bug Fixes    | SP04      | Success  |

---

## 🔴 ERROR CHECK LOG

| Date       | Project | Task               | Tool   | Result                        |
|------------|---------|--------------------|--------|-------------------------------|
| 2026-07-08 | P01     | Session file setup | —      | No code changed — N/A         |
| 2026-07-08 | P02     | UI Overhaul        | oxlint | Passed (fixed 1 warning)      |
| 2026-07-08 | P02     | Bento Architecture | vite   | Build passed                  |
| 2026-07-10 | P02     | Edge Animation Fix | vite   | Build passed                  |
| 2026-07-10 | P02     | Mobile Layout Fix  | vite   | Build passed                  |

---

## 💡 UPGRADE SUGGESTIONS (Cross-Project)

> Cleared once implemented. Priority: HIGH > MED > LOW.

### P01 — DSA Visualizer
| Priority | Suggestion                                  | Rationale                                         |
|----------|---------------------------------------------|---------------------------------------------------|
| HIGH     | Audit sorting/ algorithm files              | Dir exists, file contents were unknown at scan    |
| HIGH     | Explore hooks/ and animations/ contents     | Unknown — may be stubs needing implementation     |
| MED      | Add React error boundaries around canvas    | Prevent full crash on malformed Snapshot data     |
| MED      | Memoize AlgorithmRunner output              | Cache by [algoId, input] — avoid re-running       |
| MED      | Lazy-load algorithmMeta.ts by category      | 19 KB file loads eagerly — split by category      |
| LOW      | Add vitest coverage thresholds              | Testing infra exists but coverage config missing  |
| LOW      | Add <link rel="preload"> in index.html      | Speed up first paint for fonts/critical chunks    |

---

## ⚡ TOKEN EFFICIENCY RULES

These rules apply across ALL projects at all times.

### Files to NEVER Read
- `node_modules/` — always skip
- `dist/`, `build/`, `.next/`, `out/` — compiled output, skip
- `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` — skip
- `.git/` internals — skip

### Reading Strategy
1. `list_dir` → identify which files are relevant → `view_file` only those
2. `grep_search` BEFORE `view_file` when looking for a specific symbol or pattern
3. For files > 5 KB: use StartLine/EndLine to read in targeted chunks
4. Trust summaries in SESSION.md / GLOBAL_SESSION.md — don't re-read already-scanned files

### Writing Strategy
5. Batch ALL independent tool calls in one parallel block
6. Update session files ONCE at the end of a task — never mid-stream
7. Prefer `multi_replace_file_content` for multi-location edits in one file
8. Use `replace_file_content` for single contiguous edits

### Decision Strategy
9. If a task requires >3 file reads to understand scope → write an implementation plan first
10. Surface architectural decisions as questions — never guess on breaking changes
11. Keep responses concise — bullet points over paragraphs

---

## 📋 SESSION LOG

| Date       | Notes                                                                              |
|------------|------------------------------------------------------------------------------------|
| 2026-07-08 | Global session file created. P01 (DSA Visualizer) scanned and baselined as SP00.  |
| 2026-07-08 | P02 (Portfolio) UI overhaul implemented: rotary dial, 3D carousel, flip cards.    |
| 2026-07-08 | P02 (Portfolio) Refactored to Bento Box and Asymmetric layout architecture.       |
| 2026-07-08 | P02 (Portfolio) User rejected Bento layout; reverted back to [P02-SP01] baseline. |
| 2026-07-10 | P02 (Portfolio) Fixed MS Edge rendering bugs causing animations to disappear.     |
| 2026-07-10 | P02 (Portfolio) Fixed mobile layout bugs for profile image and skills wheel.      |

---

## 🔧 QUICK REFERENCE — COMMON COMMANDS

### DSA Visualizer (P01)
```powershell
# Dev server
cd "C:\Users\manit\OneDrive\Desktop\MANIT\projects\DSA visualizer"
npm run dev

# Lint
npm run lint

# Build (type-check + bundle)
npm run build

# Tests
npx vitest run
```

### Global
```powershell
# Open global session file
code "C:\Users\manit\agent-context\GLOBAL_SESSION.md"
```
