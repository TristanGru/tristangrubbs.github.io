<!-- AI-NATIVE-BACKLOG:START -->
## AI-Native Project Backlog

This project has an active memory workspace. Read it at the start of every session and write to it throughout.

**Before starting work:**
1. Read `.project-memory/tasks/next-task.md` — the specific next task
2. Read `.project-memory/recommendations/current.md` — the recommendation and why
3. Read `.project-memory/tasks/coding-agent-brief.md` — operating mode, thesis, constraints
4. Skim `.project-memory/workspace/` — context and open items from past sessions

**During the session, actively write to `.project-memory/workspace/`:**
- Bugs found → append to `workspace/bugs.md` with a date stamp and what you found
- Ideas that come up → append to `workspace/ideas.md`
- Decisions made, things tried, what worked → append to `workspace/session-notes.md`
- Completed tasks → append to `workspace/progress.md`

Keep entries atomic and specific. Use markdown bullets. Date-stamp each entry.

**Only write to `.portfolio-brain/signals/pending/` for portfolio-level events:**
- A deploy blocker you cannot resolve yourself
- Evidence the project thesis is wrong or the audience has shifted
- A critical bug that changes the project's direction

Signal format for `.portfolio-brain/signals/pending/<name>.jsonl`:
```
{"type": "note", "source": "claude-code", "summary": "...", "details": "..."}
```
Write to `<name>.tmp` first, then rename to `<name>.jsonl` (atomic write rule).

**Do not widen scope** beyond the current recommendation unless fresh evidence justifies it.
<!-- AI-NATIVE-BACKLOG:END -->
