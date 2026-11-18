document.addEventListener('DOMContentLoaded', () => {
    let audioCtx = null;

    function playNote(freq) {
        // Force audio context initialization and resumption directly inside user gesture
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    }

    const noteFreqs = {
        'A3': 220.00,
        'B3': 246.94,
        'C4': 261.63,
        'D4': 293.66,
        'F4': 349.23
    };

    const noteNames = {
        'A3': 'Left',
        'B3': 'Down',
        'C4': 'Right',
        'D4': 'Up',
        'F4': 'A-Btn'
    };

    let currentInputSequence = [];
    const songDisplay = document.getElementById('song-display');
    const noteHistory = document.getElementById('note-history');
    const resetNotesBtn = document.getElementById('reset-notes-btn');

    if (resetNotesBtn) {
        resetNotesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentInputSequence = [];
            noteHistory.textContent = '---';
            songDisplay.textContent = 'Ready to Play...';
        });
    }

    const songs = {
        'Right, Down, A-Btn, Right, Down, A-Btn': 'Song of Time ⏳',
        'Left, Down, A-btn, Left, Down, A-Btn': 'Song of Storms ⚡',
        'down, Up, Right, down, Up, Right': "Zelda's Lullaby 👑"
    };

    function triggerNote(note) {
        if (noteFreqs[note]) {
            playNote(noteFreqs[note]);
            
            currentInputSequence.push(noteNames[note]);
            if (currentInputSequence.length > 6) {
                currentInputSequence.shift();
            }

            noteHistory.textContent = currentInputSequence.join(' › ');
            checkSongs();
        }
    }

    function checkSongs() {
        const sequenceStr = currentInputSequence.join(', ');
        for (const [pattern, songName] of Object.entries(songs)) {
            if (sequenceStr.endsWith(pattern)) {
                songDisplay.textContent = `✨ Magical Melody Learned: ${songName} ✨`;
                setTimeout(() => {
                    songDisplay.textContent = 'Ready to Play...';
                }, 4000);
            }
        }
    }

    // Button Listeners
    const buttons = document.querySelectorAll('.ocarina-btn');
    buttons.forEach(btn => {
        const note = btn.getAttribute('data-note');

        btn.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            btn.classList.add('active');
            triggerNote(note);
        });

        btn.addEventListener('pointerup', () => {
            btn.classList.remove('active');
        });

        btn.addEventListener('pointerleave', () => {
            btn.classList.remove('active');
        });
    });

    // Keyboard Listeners
    window.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        
        let targetNote = null;
        if (e.code === 'KeyW') targetNote = 'D4';
        if (e.code === 'KeyA') targetNote = 'A3';
        if (e.code === 'KeyS') targetNote = 'B3';
        if (e.code === 'KeyD') targetNote = 'C4';
        if (e.code === 'Space') {
            targetNote = 'F4';
            e.preventDefault();
        }

        if (targetNote) {
            const btn = document.querySelector(`[data-note="${targetNote}"]`);
            if (btn) {
                btn.classList.add('active');
                triggerNote(targetNote);
            }
        }
    });

    window.addEventListener('keyup', (e) => {
        let targetNote = null;
        if (e.code === 'KeyW') targetNote = 'D4';
        if (e.code === 'KeyA') targetNote = 'A3';
        if (e.code === 'KeyS') targetNote = 'B3';
        if (e.code === 'KeyD') targetNote = 'C4';
        if (e.code === 'Space') targetNote = 'F4';

        if (targetNote) {
            const btn = document.querySelector(`[data-note="${targetNote}"]`);
            if (btn) {
                btn.classList.remove('active');
            }
        }
    });
});