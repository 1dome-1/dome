class AudioEngine {
  constructor(volume = 0.7) {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.volume = volume
  }

  playSound(type, duration = 0.1, frequency = 440) {
    const now = this.audioContext.currentTime
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.connect(gain)
    gain.connect(this.audioContext.destination)

    osc.frequency.value = frequency
    gain.gain.setValueAtTime(this.volume * 0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration)

    osc.type = type || 'sine'
    osc.start(now)
    osc.stop(now + duration)
  }

  playAttackSound() {
    this.playSound('triangle', 0.15, 800)
  }

  playHitSound() {
    this.playSound('sine', 0.2, 200)
  }

  playCollectSound() {
    this.playSound('sine', 0.1, 1200)
  }

  playJumpSound() {
    this.playSound('triangle', 0.1, 600)
  }
}

export default new AudioEngine()
