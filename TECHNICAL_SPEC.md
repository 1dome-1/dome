# Technical Specification

## Stack
- HTML5
- CSS3
- Vanilla JavaScript
- Canvas API
- LocalStorage for persistence

## Architecture
The game is implemented in a single HTML file with inline JavaScript for rapid iteration. Core systems are organized as functions that manage player state, enemies, particles, projectiles, UI, audio, and persistence.

## Runtime Model
- The main loop uses requestAnimationFrame.
- World updates run each frame using a delta-time value.
- Rendering is handled directly on the canvas context.

## Persistence
- Save data is stored in browser LocalStorage under a dedicated key.
- Autosave happens every 30 seconds and on important events.

## Performance Notes
- Object pools are not used yet; the project favors simplicity.
- Particle and effect counts should remain bounded for browser performance.
