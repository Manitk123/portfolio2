# Portfolio p1 - Session Context

## Recent Work (2026-07-08)
- Added GSAP character-by-character entrance and scrub animations to the Hero section (Name and Tagline).
- Fixed the overlapping issues with the 3D Carousel Navigation dots by increasing the container height.
- Shifted the Skills Rotary wheel downwards to improve spacing.
- Made the Contact/Footer section background transparent to blend seamlessly with the main animated starry background.
- Fixed MS Edge animation jank and disappearance bugs by optimizing `filter: blur` and adding `will-change: transform`.
- Fixed mobile layout issues: corrected about-image aspect ratio/object-position and fixed rotary wheel centering margins.

## Savepoints
- **[P02-SP01]**: Bento Redesign Layout
- **[P02-SP02]**: UI Polish, Text Animations, and Bug Fixes
- **[P02-SP03]**: MS Edge Animation Bug Fixes
- **[P02-SP04]**: Mobile UI Layout Bug Fixes (Current)

## Error Check & Verification
- Build: `npm run build` completed successfully.
- Lint/Type-check: Passed without critical errors.

## Upgrade Suggestions for Next Session
1. **Performance**: Implement dynamic `import()` for GSAP and heavy animation components (like the 3D Carousel and Rotary Dial) to reduce the main bundle size (currently ~1.25 MB).
2. **Accessibility**: Review the focus states on the 3D carousel and add screen-reader-only labels for the newly animated characters in the Hero section to ensure screen readers don't misread the split text.
