# Sound Assets Directory

This directory is reserved for optional sound files if you prefer using pre-recorded sounds
instead of Web Audio API synthesized sounds.

## Current Implementation

The sound system currently uses **Web Audio API** to synthesize all sounds programmatically.
This approach offers several advantages:

- No external files to load (zero network requests)
- Smaller bundle size
- Consistent sound generation across devices
- Easy to modify frequencies and characteristics

## Sound Catalog

The following sounds are synthesized via Web Audio API in `/lib/sound-manager.ts`:

| Sound   | Duration | Description                           |
|---------|----------|---------------------------------------|
| click   | 80ms     | Short percussive tap for buttons      |
| hover   | 50ms     | Gentle high-frequency whisper         |
| switch  | 120ms    | Dual-tone for toggle switches         |
| success | 300ms    | Pleasant ascending major chord (C-E-G)|
| error   | 250ms    | Soft descending tone                  |

## Using Audio Files Instead (Optional)

If you prefer using pre-recorded audio files:

1. Add your audio files to this directory:
   - `click.mp3` (or .wav, .ogg)
   - `hover.mp3`
   - `switch.mp3`
   - `success.mp3`
   - `error.mp3`

2. Modify `/lib/sound-manager.ts` to load and play audio files:

```typescript
// Example modification for file-based sounds
class SoundManager {
  private audioBuffers: Map<SoundName, AudioBuffer> = new Map();

  async loadSound(soundName: SoundName): Promise<void> {
    const response = await fetch(`/sounds/${soundName}.mp3`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.audioBuffers.set(soundName, audioBuffer);
  }

  play(soundName: SoundName): void {
    const buffer = this.audioBuffers.get(soundName);
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.masterGainNode);
    source.start();
  }
}
```

## Sound Design Guidelines

When creating or sourcing audio files:

1. **Keep it subtle** - UI sounds should be barely noticeable
2. **Professional tone** - Avoid game-like or cartoon sounds
3. **Short duration** - Match the durations in the catalog above
4. **Consistent volume** - Normalize all files to the same level
5. **Format** - Use MP3 for best browser compatibility (with OGG fallback)
6. **Sample rate** - 44.1kHz or 48kHz
7. **Bit depth** - 16-bit is sufficient for UI sounds

## Volume Levels

The sound system enforces a maximum volume of 15% (0.15) to ensure sounds
are never intrusive. This is controlled in `/lib/sound-manager.ts`:

```typescript
const MAX_VOLUME = 0.15;
```

## User Preferences

- Sounds are **OFF by default**
- Users must explicitly enable sounds via the sound toggle
- Preference is stored in localStorage
- System's "prefers-reduced-motion" is respected (sounds disabled)
