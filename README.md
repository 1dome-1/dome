# 🎮 Dan Sai Adventure - Phi Ta Khon Festival Arena Game

A highly polished 3D Web Arena Action game themed around the traditional "Dan Sai Phi Ta Khon Festival" (ประเพณีผีตาโขน ด่านซ้าย).

## 🚀 Features

### Characters (3 Playable)
- **Phi Ta Khon Red** (พญายักษ์): Speed 6.5 - High speed, agile offensive
- **Phi Ta Khon Green** (ไพรพฤกษา): Speed 5.2 - Medium speed, high jump  
- **Phi Ta Khon Thong** (สิริมงคล): Speed 5.0 - Rich stats, score magnet

### Game Mechanics
✅ 8-directional player movement  
✅ Real-time enemy spawning and chasing  
✅ Interactive grass trampling physics  
✅ Collectible items system  
✅ Health system (5 hearts max)  
✅ Score & Combo tracking  
✅ Pause system (ESC/P)  
✅ Game Over screen with high score submission  

### Audio System
- Procedural Web Audio API sound synthesis
- No external audio files needed
- UI sounds, jump effects, collection chimes, hit sounds

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Three.js** - 3D WebGL rendering
- **React Three Fiber** - React binding for Three.js
- **Tailwind CSS** - Styling
- **Web Audio API** - Procedural sound generation

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The game will automatically open at `http://localhost:3000`

## 🕹️ Game Controls

| Key | Action |
|-----|--------|
| W / ↑ | Move Up |
| S / ↓ | Move Down |
| A / ← | Move Left |
| D / → | Move Right |
| P | Attack |
| O | Dance |
| ESC | Pause |

## 🎨 Game Assets

All assets are hosted on Cloudinary:

- **Player**: https://res.cloudinary.com/dsucg33fv/image/upload/v1782709479/player_umd922.png
- **Enemy**: https://res.cloudinary.com/dsucg33fv/image/upload/v1782709477/enemy_jykcgz.png
- **Boss**: https://res.cloudinary.com/dsucg33fv/image/upload/v1782709455/boss_e8jti1.png
- **Potion**: https://res.cloudinary.com/dsucg33fv/image/upload/v1782709447/potion_ladf9n.png
- **Ground**: https://res.cloudinary.com/dsucg33fv/image/upload/v1782439980/ground_d1kjrx.png
- **Logo**: https://res.cloudinary.com/dsucg33fv/image/upload/v1782709347/logo_i8827v.png

## 📁 Project Structure

```
src/
├── App.jsx                 # Main app with state management
├── Game.jsx               # Game component
├── game/
│   ├── GameScene.jsx      # Three.js scene setup
│   ├── Player.jsx         # Player character component
│   ├── Ground.jsx         # Ground plane with texture
│   └── EnemySystem.jsx    # Enemy spawning & AI
├── ui/
│   ├── MainMenu.jsx       # Main menu
│   ├── CharacterSelect.jsx # Character selection
│   ├── HUD.jsx            # In-game UI
│   ├── PauseMenu.jsx      # Pause overlay
│   ├── GameOverScreen.jsx # Game over screen
│   └── OptionsMenu.jsx    # Settings menu
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## 🎮 Gameplay Loop

1. Start at main menu
2. Click "Play Game"
3. Select your character
4. Enter arena and fight enemies
5. Collect items to heal
6. Avoid taking 5 hits
7. Submit high score when defeated
8. Return to menu to play again

## 📊 Difficulty Levels

- **Easy**: Slower enemy spawn rate (3s)
- **Normal**: Default spawn rate (2s) 
- **Hard**: Faster spawn rate (1.5s)

## 💾 High Scores

High scores are saved to localStorage and persist across sessions.
Top 10 scores are displayed and sortable.

## 🎭 Credits

Inspired by the traditional Phi Ta Khon Festival from Dan Sai, Thailand.

## 📝 License

MIT License - Feel free to use this project for learning and personal use.

---

**Ready to Play!** 🚀  
Run `npm install && npm run dev` to start the game!
