# Abakus Game Overhaul — Design Document

**Date**: 2026-02-16
**Status**: Approved

## Problem Statement

The current Abakus/Flash-Cards game has several issues:
- Only shows single-digit numbers regardless of difficulty level
- Numbers 6-9 unreachable at low difficulty (formula caps at 4)
- Timer intervals too coarse (1s-5s, 1s steps)
- Multi-impulse answer validation expects a sum instead of individual numbers
- Black/white color options are unnecessary

## Requirements

### 9 Levels (replaces difficulty 1-10 slider)

| Level | Range | Generation Logic |
|-------|-------|-----------------|
| 1 | 0-9 | `random(0, 9)` |
| 2 | 10-19 | `random(10, 19)` |
| 3 | 0-19 | `random(0, 19)` |
| 4 | 10,20..90 | `random(1, 9) * 10` |
| 5 | 0-99 | `random(0, 99)` |
| 6 | 0-999 | `random(0, 999)` |
| 7 | 0-9999 | `random(0, 9999)` |
| 8 | 0-99999 | `random(0, 99999)` |
| 9 | 0-999999 | `random(0, 999999)` |

Header displays: "Level X: 0-9", "Level X: 10-19", "Level 4: dizaines", etc.

### Impulses (1-6 numbers per round)

- Show 1-6 numbers in sequence per round
- User enters each number **individually** (not the sum)
- UI shows "Nombre X/N" during answering phase
- Score counts each individual number (not per round)

### Timer

- Range: 0.1s to 15.0s
- Step: 0.25s
- Display: seconds with decimal (e.g., "2.5s")
- Internal: milliseconds

### Colors

- Remove "black" and "white" schemes
- Keep "default" (blue/purple)
- Add "standard" (light blue inactive, yellow active — matching abakus-center.eu style)

### Abacus Canvas

- Number of columns adapts to the level's max digit count (not the displayed value)
- Level 1: 1 column, Levels 2-5: 2 columns, Level 6: 3, Level 7: 4, Level 8: 5, Level 9: 6

## Files Impacted

| File | Changes |
|------|---------|
| `src/app/types.ts` | `difficulty` → `level` (1-9), `BeadColorScheme` = "default" \| "standard" |
| `src/app/generators.ts` | New generation logic by level |
| `src/app/components/cards/cards-config.tsx` | Level stepper with "Level X: range" display, timer 0.1-15s/0.25s, impulses 1-6, color toggle 2 options |
| `src/app/components/cards/game.tsx` | Multi-answer validation with `answerIndex` state, "Nombre X/N" display |
| `src/app/components/cards/abacus.tsx` | Dynamic columns by level, add "standard" color scheme (blue/yellow) |
| `src/app/cards/page.tsx` | Adapt to new `CardsConfigState` |

## What Stays the Same

- Overall architecture (no rewrite)
- Rotation support
- Sound / speech synthesis
- Phase system (ready → flashing → answering → complete)
- Replay / new game flow

## Approach

Targeted refactoring of existing components. No architectural changes.
The most complex change is the multi-answer validation flow in game.tsx.
