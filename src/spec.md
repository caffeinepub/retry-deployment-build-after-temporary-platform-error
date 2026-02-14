# Specification

## Summary
**Goal:** Make the background music controls consistently visible and usable throughout the Valentine experience on desktop and mobile.

**Planned changes:**
- Render the music controls in a top-level layer (e.g., portal/fixed overlay root) so they are not affected by transforms, parallax layers, or overflow/stacking contexts.
- Ensure the music controls panel is present on first page load and persists across all experience steps (welcome, cards, gift code, bonus card, end).
- Adjust layering and interaction handling so the controls are never hidden behind overlays/effects and remain clickable/tappable.
- Preserve accessibility: keyboard tab navigation and appropriate aria-labels for play/pause, next/previous, mute/unmute, and volume.
- Add lightweight diagnostics: a stable `data-testid="music-controls"` on the root and a non-intrusive console warning + graceful fallback behavior if required provider/context is missing.

**User-visible outcome:** Music controls (play/pause, next/previous, mute, volume) reliably appear immediately and remain accessible across the entire Valentine flow on both desktop and mobile.
