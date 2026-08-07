document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('chat-toggle');
  const panel = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');

  if (!toggle || !panel || !messages) return;

  const STORAGE_KEY = 'diphil_chat_history';
  const MAX_MESSAGES = 50; // keep last 50 messages

  // ---------- History helpers ----------
  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveHistory(history) {
    try {
      // keep only the most recent messages
      const trimmed = history.slice(-MAX_MESSAGES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
      console.warn('Could not save chat history', e);
    }
  }

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    messages.innerHTML = '';
    addMessage("Hello! I'm Diphil Assistant. How can I help you today with datalink services, booking, or technical questions?", false, false);
    saveHistory([{ role: 'bot', text: "Hello! I'm Diphil Assistant. How can I help you today with datalink services, booking, or technical questions?", time: Date.now() }]);
  }

  function renderHistory() {
    const history = loadHistory();
    messages.innerHTML = '';

    if (history.length === 0) {
      addMessage("Hello! I'm Diphil Assistant. How can I help you today with datalink services, booking, or technical questions?", false, false);
      return;
    }

    history.forEach(item => {
      addMessage(item.text, item.role === 'user', false);
    });
    messages.scrollTop = messages.scrollHeight;
  }

  // ---------- UI ----------
  toggle.addEventListener('click', () => {
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
      // restore history every time panel opens
      renderHistory();
      setTimeout(() => input && input.focus(), 100);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => panel.classList.add('hidden'));
  }

  function addMessage(text, isUser = false, persist = true) {
    const div = document.createElement('div');
    div.className = isUser
      ? 'bg-primary/20 text-sky-100 rounded-xl rounded-tr-none p-3 max-w-[85%] ml-auto'
      : 'bg-surface rounded-xl rounded-tl-none p-3 max-w-[85%]';
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;

    if (persist) {
      const history = loadHistory();
      history.push({
        role: isUser ? 'user' : 'bot',
        text: text,
        time: Date.now()
      });
      saveHistory(history);
    }
  }

  function botReply(userText) {
    const lower = userText.toLowerCase();
    let reply = "Thank you for your message. For detailed assistance or to book a service, please use the WhatsApp button below or click 'Book a Call'.";

    if (lower.includes('book') || lower.includes('schedule') || lower.includes('briefing') || lower.includes('call')) {
      reply = "Great! Click the green WhatsApp button below or any 'Book' button on the site to message us directly on WhatsApp (+234 811 971 4460).";
    } else if (lower.includes('link 16') || lower.includes('link 11') || lower.includes('datalink') || lower.includes('tactical')) {
      reply = "We specialise in Link 11 & Link 16 operations, network configuration, COMSEC and multi-platform coordination. Would you like to book a technical briefing?";
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('how much')) {
      reply = "Pricing depends on the scope of work. The best next step is a free briefing via WhatsApp so we can understand your exact requirements.";
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      reply = "Hello! Welcome to DIPHIL WORLD. How can I assist you with our datalink and tactical communications services today?";
    } else if (lower.includes('history') || lower.includes('clear chat') || lower.includes('reset')) {
      reply = "You can clear this conversation using the 'Clear history' button below the chat.";
    } else if (lower.includes('whatsapp') || lower.includes('contact') || lower.includes('phone') || lower.includes('number')) {
      reply = "You can reach us directly on WhatsApp: +234 811 971 4460. Just click any Book button or the green WhatsApp link under this chat.";
    }

    setTimeout(() => addMessage(reply), 600);
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, true);
    input.value = '';
    botReply(text);
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  // ---------- Clear history button (injected once) ----------
  // Find the WhatsApp footer area and add a clear button next to it
  const whatsappLink = panel.querySelector('a[href*="wa.me"]');
  if (whatsappLink && whatsappLink.parentElement) {
    const clearBtn = document.createElement('button');
    clearBtn.id = 'chat-clear-history';
    clearBtn.type = 'button';
    clearBtn.className = 'w-full mt-2 text-xs text-gray-400 hover:text-red-400 transition py-1.5 rounded-lg border border-white/5 hover:border-red-500/30';
    clearBtn.innerHTML = '<i class="fas fa-trash-alt mr-1"></i> Clear chat history';
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all chat history with Diphil Assistant?')) {
        clearHistory();
      }
    });
    whatsappLink.parentElement.appendChild(clearBtn);
  }

  // Initial render if panel is somehow open
  renderHistory();
});
