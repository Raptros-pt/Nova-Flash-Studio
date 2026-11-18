document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;
    const maxClicks = 15; // Reaches 100% rage at 15 clicks

    const stage = document.getElementById('stage');
    const card = document.getElementById('cucco-card');
    const provokeBtn = document.getElementById('provoke-btn');
    const resetBtn = document.getElementById('reset-btn');
    const progressFill = document.getElementById('progress-fill');
    const ragePct = document.getElementById('rage-pct');
    const badgeText = document.getElementById('badge-text');
    const titleText = document.getElementById('title-text');
    const descText = document.getElementById('desc-text');
    const btnLabel = document.getElementById('btn-label');

    const states = [
        { threshold: 0, badge: "Peaceful Farmyard", title: "Kakariko Cucco", desc: "A gentle poultry specimen. Absolutely harmless. Do not provoke.", btn: "Provoke Cucco", color: "#c5a059", bg: "#121513" },
        { threshold: 5, badge: "Mildly Annoyed", title: "Restless Plumes", desc: "The bird is giving you a sharp side-eye. It remembers that.", btn: "Poke Again", color: "#eab308", bg: "#181612" },
        { threshold: 10, badge: "Aggression Rising", title: "Warning Cluck", desc: "Wings are beginning to flare. You hear distant reinforcements gathering.", btn: "Keep Poking!", color: "#f97316", bg: "#1d1512" },
        { threshold: 15, badge: "⚠️ TOTAL WAR ⚠️", title: "COCKEREL APOCALYPSE", desc: "THE HORDE HAS BEEN SUMMONED. RUN FOR YOUR LIFE.", btn: "FIGHT FOR YOUR LIFE!", color: "#ef4444", bg: "#1e1111" }
    ];

    function updateState() {
        let currentState = states[0];
        for (let i = states.length - 1; i >= 0; i--) {
            if (clickCount >= states[i].threshold) {
                currentState = states[i];
                break;
            }
        }

        const percentage = Math.min(Math.round((clickCount / maxClicks) * 100), 100);
        
        ragePct.textContent = percentage + '%';
        progressFill.style.width = percentage + '%';
        progressFill.style.backgroundColor = currentState.color;

        badgeText.textContent = currentState.badge;
        badgeText.style.color = currentState.color;
        badgeText.style.background = `rgba(${currentState.color === '#ef4444' ? '239, 68, 68' : '197, 160, 89'}, 0.15)`;

        titleText.textContent = currentState.title;
        descText.textContent = currentState.desc;
        btnLabel.textContent = currentState.btn;
        provokeBtn.style.backgroundColor = currentState.color;

        if (clickCount >= maxClicks) {
            stage.classList.add('shaking');
            card.classList.add('raging');
            document.body.style.backgroundColor = currentState.bg;
        } else {
            stage.classList.remove('shaking');
            card.classList.remove('raging');
            document.body.style.backgroundColor = '#121513';
        }
    }

    provokeBtn.addEventListener('click', () => {
        if (clickCount < maxClicks) {
            clickCount++;
            updateState();
            
            // Subtle pulse on click
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 100);
        }
    });

    resetBtn.addEventListener('click', () => {
        clickCount = 0;
        updateState();
    });
});