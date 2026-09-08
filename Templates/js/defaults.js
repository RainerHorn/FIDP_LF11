'use strict';

// =============================================================
// FIDP Kursmaster – Gemeinsames JavaScript (Quelle der Wahrheit)
// =============================================================
// WICHTIG: Diese Datei wird NICHT per <script src> eingebunden!
// Moodle blockiert externe Script-Referenzen.
//
// Workflow:
// 1. JS hier bearbeiten
// 2. _update_templates.ps1 ausführen → schreibt diesen Inhalt
//    in den <script>-Block aller HTML-Seiten
// =============================================================

// ─── Clipboard ───────────────────────────────────────────────

window.copyToClipboard = function (code) {
    navigator.clipboard.writeText(code).catch(() => {});
};

// ─── Chatbot-Integration (MMBBSBOT) ──────────────────────────

window.sendToChatbot = function (message) {
    const chatButton = document.getElementById('chat-icon');
    if (chatButton) chatButton.click();
    setTimeout(() => {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');
        if (chatInput && sendButton) {
            chatInput.value = message;
            sendButton.click();
        }
    }, 500);
};

window.simulateChatbotClick = function () {
    const chatButton = document.getElementById('chat-icon');
    if (chatButton) chatButton.click();
};

window.explainCode = function (code) {
    window.sendToChatbot('Erkläre mir folgenden Code:\n\n' + code);
};

// ─── Akkordeon ────────────────────────────────────────────────

window.toggleAccordion = function (element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('.accordion-icon');
    if (content && icon) {
        content.classList.toggle('open');
        icon.classList.toggle('open');
    }
};

window.expandAllAccordions = function () {
    document.querySelectorAll('.accordion-content').forEach(c => c.classList.add('open'));
    document.querySelectorAll('.accordion-icon').forEach(i => i.classList.add('open'));
};

window.collapseAllAccordions = function () {
    document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
    document.querySelectorAll('.accordion-icon').forEach(i => i.classList.remove('open'));
};

// ─── Mini-Spiele ──────────────────────────────────────────────
// Generische Spiel-Engines, übernommen aus LF10 Kapitel 2. Jede
// Seite ruft die passende Init-Funktion einmal mit ihren eigenen
// Daten auf (Begriffspaare/Wörter/Sortier-Begriffe) — Markup und
// IDs siehe Templates/html/template.html, Abschnitt "Mini-Spiele".
// Aufruf direkt in einem <script>-Tag NACH dem Spiel-Markup, nicht
// in DOMContentLoaded (die Elemente müssen zu diesem Zeitpunkt
// schon im DOM stehen).

// Memory: pairs = [{ pair: 'A', text: '...' }, { pair: 'A', text: '...' }, ...]
// Erwartet Markup mit IDs vtmem-board / vtmem-moves / vtmem-matches /
// vtmem-timer / vtmem-message / vtmem-newgame.
window.vtMemoryInit = function (pairs) {
    const total = pairs.length / 2;
    let flipped = [], matched = 0, moves = 0, started = false, startTime = null, timerInterval = null;

    function shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function init() {
        const cards = shuffle(pairs);
        const board = document.getElementById('vtmem-board');
        board.innerHTML = '';
        cards.forEach((card, index) => {
            const el = document.createElement('div');
            el.className = 'vt-memory-card';
            el.dataset.index = index;
            el.dataset.pair = card.pair;
            el.innerHTML = '<div class="vt-memory-card-back">❓</div><div class="vt-memory-card-front">' + card.text + '</div>';
            el.addEventListener('click', () => flip(index));
            board.appendChild(el);
        });
    }

    function flip(index) {
        if (!started) startTimer();
        const el = document.querySelector('.vt-memory-card[data-index="' + index + '"]');
        if (el.classList.contains('flipped') || el.classList.contains('matched') || flipped.length >= 2) return;
        el.classList.add('flipped');
        flipped.push({ index, pair: el.dataset.pair, element: el });
        if (flipped.length === 2) {
            moves++;
            document.getElementById('vtmem-moves').textContent = moves;
            checkMatch();
        }
    }

    function checkMatch() {
        const [c1, c2] = flipped;
        if (c1.pair === c2.pair) {
            setTimeout(() => {
                c1.element.classList.add('matched');
                c2.element.classList.add('matched');
                c1.element.classList.remove('flipped');
                c2.element.classList.remove('flipped');
                matched++;
                document.getElementById('vtmem-matches').textContent = matched + ' / ' + total;
                flipped = [];
                if (matched === total) end();
            }, 600);
        } else {
            c1.element.classList.add('wrong');
            c2.element.classList.add('wrong');
            setTimeout(() => {
                c1.element.classList.remove('flipped', 'wrong');
                c2.element.classList.remove('flipped', 'wrong');
                flipped = [];
            }, 1000);
        }
    }

    function startTimer() {
        started = true;
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const m = Math.floor(elapsed / 60), s = elapsed % 60;
        document.getElementById('vtmem-timer').textContent = m + ':' + String(s).padStart(2, '0');
    }

    function end() {
        clearInterval(timerInterval);
        started = false;
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const m = Math.floor(elapsed / 60), s = elapsed % 60;
        document.getElementById('vtmem-message').textContent =
            '🎉 Geschafft! Alle ' + total + ' Paare in ' + moves + ' Zügen und ' + m + ':' + String(s).padStart(2, '0') + ' Minuten gefunden.';
    }

    function reset() {
        clearInterval(timerInterval);
        started = false;
        flipped = [];
        matched = 0;
        moves = 0;
        startTime = null;
        document.getElementById('vtmem-moves').textContent = '0';
        document.getElementById('vtmem-matches').textContent = '0 / ' + total;
        document.getElementById('vtmem-timer').textContent = '0:00';
        document.getElementById('vtmem-message').textContent = '';
        init();
    }

    const newGameBtn = document.getElementById('vtmem-newgame');
    if (newGameBtn) newGameBtn.addEventListener('click', reset);
    init();
};

// Hangman: words = [{ word: 'BEGRIFF', hint: '...' }, ...] (Wörter GROSSSCHREIBEN, ASCII-Buchstaben)
// Erwartet Markup mit IDs vthang-score / vthang-wrong / vthang-words /
// vthang-canvas (220×180) / vthang-hint-text / vthang-word / vthang-message /
// vthang-keyboard / vthang-newword.
window.vtHangmanInit = function (words) {
    const parts = [
        (ctx) => { ctx.moveTo(20, 170); ctx.lineTo(100, 170); },
        (ctx) => { ctx.moveTo(60, 170); ctx.lineTo(60, 20); },
        (ctx) => { ctx.moveTo(60, 20); ctx.lineTo(150, 20); },
        (ctx) => { ctx.moveTo(150, 20); ctx.lineTo(150, 40); },
        (ctx) => { ctx.beginPath(); ctx.arc(150, 52, 12, 0, Math.PI * 2); ctx.stroke(); },
        (ctx) => { ctx.moveTo(150, 64); ctx.lineTo(150, 110); },
        (ctx) => { ctx.moveTo(150, 75); ctx.lineTo(130, 95); },
        (ctx) => { ctx.moveTo(150, 75); ctx.lineTo(170, 95); },
        (ctx) => { ctx.moveTo(150, 110); ctx.lineTo(130, 140); },
        (ctx) => { ctx.moveTo(150, 110); ctx.lineTo(170, 140); }
    ];

    let state = { word: null, guessed: [], wrong: 0, score: 0, wordsPlayed: 0, playedWords: [], over: false };

    function draw() {
        const canvas = document.getElementById('vthang-canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#1e3c72';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        for (let i = 0; i < state.wrong && i < parts.length; i++) {
            ctx.beginPath();
            parts[i](ctx);
            ctx.stroke();
        }
    }

    function updateWord() {
        const container = document.getElementById('vthang-word');
        container.innerHTML = '';
        state.word.word.split('').forEach(letter => {
            const box = document.createElement('div');
            box.className = 'vt-hangman-letter';
            if (state.guessed.includes(letter)) box.textContent = letter;
            container.appendChild(box);
        });
        document.getElementById('vthang-hint-text').textContent = state.word.hint;
    }

    function updateUI() {
        document.getElementById('vthang-score').textContent = state.score;
        document.getElementById('vthang-wrong').textContent = state.wrong + ' / 10';
        document.getElementById('vthang-words').textContent = state.wordsPlayed;
    }

    function guess(letter) {
        if (state.over || state.guessed.includes(letter)) return;
        state.guessed.push(letter);
        const keyBtn = document.querySelector('.vt-hangman-key[data-letter="' + letter + '"]');
        const word = state.word.word;
        if (word.includes(letter)) {
            keyBtn.classList.add('correct');
            state.score += 10;
            const complete = word.split('').every(l => state.guessed.includes(l));
            if (complete) {
                state.over = true;
                state.score += 50;
                document.getElementById('vthang-message').innerHTML = '<span style="color:#2e7d32;">🎉 Richtig! „' + word + '" erraten (+50 Bonus). Klicken Sie „Neues Wort" für die nächste Runde.</span>';
            }
        } else {
            keyBtn.classList.add('wrong');
            state.wrong++;
            draw();
            if (state.wrong >= 10) {
                state.over = true;
                document.getElementById('vthang-message').innerHTML = '<span style="color:#c0392b;">💀 Leider verloren – das Wort war „' + word + '". Klicken Sie „Neues Wort" für die nächste Runde.</span>';
            }
        }
        keyBtn.disabled = true;
        updateWord();
        updateUI();
    }

    function newWord() {
        const available = words.filter(w => !state.playedWords.includes(w.word));
        const pool = available.length > 0 ? available : words;
        if (available.length === 0) state.playedWords = [];
        state.word = pool[Math.floor(Math.random() * pool.length)];
        state.playedWords.push(state.word.word);
        state.guessed = [];
        state.wrong = 0;
        state.wordsPlayed++;
        state.over = false;
        document.getElementById('vthang-message').innerHTML = '';
        document.querySelectorAll('.vt-hangman-key').forEach(k => { k.disabled = false; k.classList.remove('correct', 'wrong'); });
        draw();
        updateWord();
        updateUI();
    }

    const keyboard = document.getElementById('vthang-keyboard');
    keyboard.innerHTML = '';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'vt-hangman-key';
        btn.textContent = letter;
        btn.dataset.letter = letter;
        btn.addEventListener('click', () => guess(letter));
        keyboard.appendChild(btn);
    });

    document.getElementById('vthang-newword').addEventListener('click', newWord);
    newWord();
};

// Sortierspiel: terms = [{ term: '...', category: 'catId' }, ...], categoryIds = ['catId', ...]
// Erwartet Markup mit IDs vtsort-score / vtsort-timer / vtsort-remaining /
// vtsort-pool / vtsort-message / vtsort-start, sowie je Kategorie
// vtsort-cat-{catId} (mit data-category="{catId}") und vtsort-dropped-{catId}.
window.vtSortInit = function (terms, categoryIds) {
    let state = { pool: [], selected: null, score: 0, remaining: terms.length, timeLeft: 60, timerInterval: null, started: false, over: false };

    function shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function renderPool() {
        const pool = document.getElementById('vtsort-pool');
        pool.innerHTML = '';
        state.pool.forEach((item, idx) => {
            const chip = document.createElement('div');
            chip.className = 'vt-sort-chip' + (state.selected === idx ? ' selected' : '');
            chip.textContent = item.term;
            chip.dataset.idx = idx;
            chip.addEventListener('click', () => select(idx));
            pool.appendChild(chip);
        });
    }

    function select(idx) {
        if (!state.started || state.over) return;
        state.selected = (state.selected === idx) ? null : idx;
        renderPool();
    }

    function choose(category) {
        if (!state.started || state.over || state.selected === null) return;
        const item = state.pool[state.selected];
        const catBox = document.getElementById('vtsort-cat-' + category);
        if (item.category === category) {
            state.score += 10;
            state.remaining--;
            const dropped = document.getElementById('vtsort-dropped-' + category);
            const chip = document.createElement('div');
            chip.className = 'vt-sort-chip';
            chip.textContent = item.term;
            dropped.appendChild(chip);
            state.pool.splice(state.selected, 1);
            state.selected = null;
            catBox.classList.add('flash-correct');
            setTimeout(() => catBox.classList.remove('flash-correct'), 500);
            renderPool();
            if (state.remaining === 0) { updateUI(); end('Alle Begriffe sortiert!'); return; }
        } else {
            state.score = Math.max(0, state.score - 5);
            state.selected = null;
            catBox.classList.add('flash-wrong');
            setTimeout(() => catBox.classList.remove('flash-wrong'), 400);
            renderPool();
        }
        updateUI();
    }

    function updateUI() {
        document.getElementById('vtsort-score').textContent = state.score;
        document.getElementById('vtsort-timer').textContent = state.timeLeft + 's';
        document.getElementById('vtsort-remaining').textContent = state.remaining;
    }

    function tick() {
        state.timeLeft--;
        updateUI();
        if (state.timeLeft <= 0) end('Zeit abgelaufen!');
    }

    function end(reason) {
        clearInterval(state.timerInterval);
        state.started = false;
        state.over = true;
        document.getElementById('vtsort-message').innerHTML =
            '<span style="color:#1e3c72;">🏁 ' + reason + ' Punktestand: ' + state.score + '</span>';
        document.getElementById('vtsort-start').textContent = '🔄 Nochmal spielen';
    }

    function start() {
        clearInterval(state.timerInterval);
        state = { pool: shuffle(terms), selected: null, score: 0, remaining: terms.length, timeLeft: 60, timerInterval: null, started: true, over: false };
        categoryIds.forEach(cat => { document.getElementById('vtsort-dropped-' + cat).innerHTML = ''; });
        document.getElementById('vtsort-message').textContent = '';
        document.getElementById('vtsort-start').textContent = '🔄 Neu starten';
        renderPool();
        updateUI();
        state.timerInterval = setInterval(tick, 1000);
    }

    categoryIds.forEach(cat => {
        document.getElementById('vtsort-cat-' + cat).addEventListener('click', () => choose(cat));
    });
    document.getElementById('vtsort-start').addEventListener('click', start);
    updateUI();
};

// ─── Seitennavigation ────────────────────────────────────────

window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.scrollToBottom = function () {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};

window.scrollPageUp = function () {
    window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
};

window.scrollPageDown = function () {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
};

// ─── Draggable Navigationsmenü ───────────────────────────────
// Speichert Position + Sichtbarkeit in localStorage.

window.makeDraggable = function (element) {
    const POS_KEY = 'vt_nav_menu_pos';
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragging = false;
    let saveTimer = null;

    const header = element.querySelector('.nav-menu-header');
    const dragTargets = [element];
    if (header) dragTargets.push(header);

    dragTargets.forEach(t => {
        t.addEventListener('mousedown', dragMouseDown);
        t.addEventListener('touchstart', dragTouchStart, { passive: false });
    });

    function scheduleSave() {
        if (saveTimer) window.clearTimeout(saveTimer);
        saveTimer = window.setTimeout(() => {
            try {
                localStorage.setItem(POS_KEY, JSON.stringify({
                    top: element.style.top,
                    left: element.style.left
                }));
            } catch (_) {}
        }, 150);
    }

    function clampToViewport() {
        const rect = element.getBoundingClientRect();
        const maxLeft = Math.max(0, window.innerWidth - rect.width);
        const maxTop = Math.max(0, window.innerHeight - rect.height);
        element.style.left = Math.max(0, Math.min(element.offsetLeft, maxLeft)) + 'px';
        element.style.top  = Math.max(0, Math.min(element.offsetTop,  maxTop))  + 'px';
        element.style.bottom = 'auto';
        element.style.right  = 'auto';
    }

    window.addEventListener('resize', () => {
        if (element.classList.contains('is-hidden')) return;
        clampToViewport();
        scheduleSave();
    });

    function dragMouseDown(e) {
        if (e.target.closest('.nav-btn')) return;
        if (e.target.closest('[data-no-drag="true"]')) return;
        e.preventDefault();
        isDragging = false;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup   = closeDragElement;
        document.onmousemove = elementDrag;
        element.style.cursor = 'grabbing';
    }

    function dragTouchStart(e) {
        if (e.target.closest('.nav-btn')) return;
        if (e.target.closest('[data-no-drag="true"]')) return;
        e.preventDefault();
        isDragging = false;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.ontouchend   = closeDragElement;
        document.ontouchmove  = elementDragTouch;
    }

    function applyDrag(newTop, newLeft) {
        newTop  = Math.max(0, Math.min(newTop,  window.innerHeight - element.offsetHeight));
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth  - element.offsetWidth));
        element.style.top    = newTop  + 'px';
        element.style.left   = newLeft + 'px';
        element.style.bottom = 'auto';
        element.style.right  = 'auto';
        scheduleSave();
    }

    function elementDrag(e) {
        e.preventDefault();
        isDragging = true;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        applyDrag(element.offsetTop - pos2, element.offsetLeft - pos1);
    }

    function elementDragTouch(e) {
        isDragging = true;
        pos1 = pos3 - e.touches[0].clientX;
        pos2 = pos4 - e.touches[0].clientY;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        applyDrag(element.offsetTop - pos2, element.offsetLeft - pos1);
    }

    function closeDragElement() {
        document.onmouseup    = null;
        document.onmousemove  = null;
        document.ontouchend   = null;
        document.ontouchmove  = null;
        element.style.cursor  = '';
        isDragging = false;
        scheduleSave();
    }
};

// ─── DOMContentLoaded: alles verdrahten ──────────────────────

document.addEventListener('DOMContentLoaded', function () {

    // Navigationsbuttons (Reihenfolge im HTML: ⬆ 🔼 🔽 ⬇ 📂 📁)
    const allButtons = document.querySelectorAll('.nav-btn');
    if (allButtons[0]) allButtons[0].addEventListener('click', () => window.scrollToTop());
    if (allButtons[1]) allButtons[1].addEventListener('click', () => window.scrollPageUp());
    if (allButtons[2]) allButtons[2].addEventListener('click', () => window.scrollPageDown());
    if (allButtons[3]) allButtons[3].addEventListener('click', () => window.scrollToBottom());
    if (allButtons[4]) allButtons[4].addEventListener('click', () => window.expandAllAccordions());
    if (allButtons[5]) allButtons[5].addEventListener('click', () => window.collapseAllAccordions());

    // Akkordeon-Header
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => window.toggleAccordion(header));
    });

    // Navigationsmenü: draggable + Position/Sichtbarkeit aus localStorage
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const launcher = document.querySelector('.nav-menu-launcher');
        const hideBtn  = document.querySelector('.nav-menu-hide');

        const POS_KEY    = 'vt_nav_menu_pos';
        const HIDDEN_KEY = 'vt_nav_menu_hidden';

        function setHidden(hidden) {
            if (hidden) {
                navMenu.classList.add('is-hidden');
                if (launcher) launcher.classList.add('is-visible');
            } else {
                navMenu.classList.remove('is-hidden');
                if (launcher) launcher.classList.remove('is-visible');
            }
            try { localStorage.setItem(HIDDEN_KEY, hidden ? '1' : '0'); } catch (_) {}
        }

        // Gespeicherte Position wiederherstellen
        try {
            const saved = localStorage.getItem(POS_KEY);
            if (saved) {
                const pos = JSON.parse(saved);
                if (pos && pos.top && pos.left) {
                    navMenu.style.top    = pos.top;
                    navMenu.style.left   = pos.left;
                    navMenu.style.bottom = 'auto';
                    navMenu.style.right  = 'auto';
                }
            }
        } catch (_) {}

        // Standard-Position wenn noch nichts gesetzt
        if (!navMenu.style.top && !navMenu.style.left) {
            navMenu.style.right = '2rem';
            navMenu.style.top   = '2rem';
        }

        // Gespeicherte Sichtbarkeit wiederherstellen
        try {
            setHidden(localStorage.getItem(HIDDEN_KEY) === '1');
        } catch (_) {}

        if (hideBtn)  hideBtn.addEventListener('click',   e => { e.preventDefault(); e.stopPropagation(); setHidden(true); });
        if (launcher) launcher.addEventListener('click',  e => { e.preventDefault(); setHidden(false); });

        window.makeDraggable(navMenu);
    }
});

// ─── MMBBSBOT Chatbot ─────────────────────────────────────────
// Wird asynchron geladen. Seite bleibt nutzbar falls Server nicht
// erreichbar.
//
// Passe opener, title und hints pro Lerneinheit an:
//   opener → Begrüßungstext
//   title  → Chatfenster-Titel
//   hints  → Systemprompt für das Modell

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const { MMBBSBOT } = await import('https://ai.mmbbs.de/mmbbs-bot.js');
        const contentEl   = document.querySelector('.content');
        const htmlContent = contentEl ? contentEl.innerHTML : '';
        const settings = {
            host:            'ai.mmbbs.de',
            protocol:        'https',
            port:            443,
            opener:          'Hallo! Ich helfe dir bei Fragen zu dieser Lerneinheit.',
            chat_icon:       '',
            chat_icon_style: 'border-radius: 50%; width: 40px; height: 40px;',
            title:           'FIDP GPT',
            task:            htmlContent,
            hints:           'Du bist ein Experte für Daten- und Prozessanalyse. ' +
                             'Erkläre Konzepte verständlich und praxisnah. ' +
                             'Gib Hilfestellungen, aber keine fertigen Lösungen für Aufgaben.'
        };
        new MMBBSBOT(settings);
    } catch (error) {
        console.error('MMBBSBOT konnte nicht geladen werden:', error);
    }
});
