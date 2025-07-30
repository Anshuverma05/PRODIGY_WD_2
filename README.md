# PRODIGY_WD_2 - Stopwatch

A high-performance stopwatch application built with:
- **HTML5** for structure
- **CSS3** for dark-mode styling
- **JavaScript** for precise timing

## Key Features
⏱️ **Accurate Timing** - Millisecond precision  
⏯️ **Smart Controls** - Space=Start/Pause, L=Lap, R=Reset  
📊 **Lap Memory** - Scrollable history of all laps  
🌙 **Dark Theme** - Reduces eye strain  

## How to Use
1. Download all files
2. Open `index.html` in any browser
3. Use buttons or keyboard shortcuts

## Technical Highlights
```javascript
// Precise time calculation example
function updateTimer() {
  elapsedTime = Date.now() - startTime;
}
