# motion

A [Remotion](https://www.remotion.dev/) video project. Videos are written as
React components and rendered frame-by-frame.

## The `remotion` skill

The repo ships a Claude Code skill at
[`.claude/skills/remotion/SKILL.md`](.claude/skills/remotion/SKILL.md). It teaches
the agent how Remotion works — compositions, frame-based animation, the
`useCurrentFrame` / `interpolate` / `spring` APIs, `Sequence` / `Series` /
`TransitionSeries`, media tags, and the determinism rules. It activates
automatically when you ask Claude Code to build or edit a video in this project.

## Example composition

[`src/HelloWorld.tsx`](src/HelloWorld.tsx) is a worked example that exercises the
skill: a deterministic twinkling star field (`random()` with static seeds), a
title that springs in (`spring()` + `interpolate()`), and a subtitle that fades
in later via a `<Sequence>`. It is registered in
[`src/Root.tsx`](src/Root.tsx).

## Commands

```bash
npm install        # install dependencies

npm run dev        # open Remotion Studio (interactive preview in the browser)
npm run still      # render a single still frame -> out/HelloWorld.png
npm run render     # render the full video        -> out/HelloWorld.mp4
npm run typecheck  # type-check the project
```

Rendering needs a Chromium build, which Remotion downloads on first run.
