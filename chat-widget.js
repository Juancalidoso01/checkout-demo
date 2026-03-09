(function() {
  function initChatWidget() {
    // Si ya existe, no duplicar
    if (document.getElementById('pp-chat-widget')) return;

    // 1. Estilos del widget mock visual
    const style = document.createElement('style');
    style.innerHTML = `
      #pp-chat-widget {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 99999;
        font-family: system-ui, -apple-system, sans-serif;
      }
      #pp-chat-bubble {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #0047bb, #003399);
        border-radius: 30px;
        box-shadow: 0 8px 24px rgba(0, 71, 187, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: white;
        font-size: 24px;
        transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      #pp-chat-bubble:hover {
        transform: scale(1.1);
      }
      #pp-chat-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 360px;
        height: 600px;
        max-height: calc(100vh - 120px);
        max-width: calc(100vw - 48px);
        background: white;
        border-radius: 20px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        display: none;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1);
      }
      #pp-chat-window.open {
        display: flex;
        opacity: 1;
        transform: translateY(0);
      }
      #pp-chat-header {
        background: linear-gradient(135deg, #0047bb, #003399);
        color: white;
        padding: 24px 20px;
        position: relative;
        border-bottom: 1px solid rgba(0,0,0,0.05);
      }
      #pp-chat-header-close {
        position: absolute;
        top: 16px;
        right: 20px;
        cursor: pointer;
        font-size: 28px;
        opacity: 0.7;
        line-height: 1;
      }
      #pp-chat-header-close:hover { opacity: 1; }
      #pp-chat-header-title { margin: 0; font-size: 18px; font-weight: 800; tracking: tight; }
      #pp-chat-header-subtitle { margin: 6px 0 0 0; font-size: 13px; opacity: 0.8; }
      
      #pp-chat-messages {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        background: #f9fafb;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .pp-chat-msg {
        max-width: 85%;
        padding: 12px 16px;
        border-radius: 16px;
        font-size: 14px;
        line-height: 1.5;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }
      .pp-chat-msg.bot {
        background: white;
        color: #1f2937;
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }
      .pp-chat-msg.user {
        background: #0047bb;
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }
      #pp-chat-input-area {
        padding: 16px;
        background: white;
        display: flex;
        gap: 12px;
        align-items: center;
        border-top: 1px solid #f3f4f6;
      }
      #pp-chat-input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid #e5e7eb;
        border-radius: 24px;
        outline: none;
        font-size: 14px;
        background: #f9fafb;
        transition: border 0.2s, background 0.2s;
      }
      #pp-chat-input:focus { 
        border-color: #0047bb;
        background: white;
      }
      #pp-chat-send {
        background: #0047bb;
        color: white;
        border: none;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s, transform 0.1s;
      }
      #pp-chat-send:active { transform: scale(0.95); }
      #pp-chat-send svg { width: 16px; height: 16px; fill: currentColor; }
      
      .intercom-dev-note {
        font-size: 11px;
        color: #9ca3af;
        text-align: center;
        padding: 8px;
        background: #f9fafb;
      }
    `;
    document.head.appendChild(style);

    // 2. Estructura HTML del widget
    const container = document.createElement('div');
    container.id = 'pp-chat-widget';
    
    // Nota: El icono de burbuja usa SVG insertado para funcionar si FontAwesome no carga
    container.innerHTML = `
      <div id="pp-chat-window">
        <div id="pp-chat-header">
          <div id="pp-chat-header-close">&times;</div>
          <h3 id="pp-chat-header-title">Soporte Punto Pago</h3>
          <p id="pp-chat-header-subtitle">Nuestro equipo responde en minutos ⚡️</p>
        </div>
        <div id="pp-chat-messages">
          <div class="pp-chat-msg bot">¡Hola! 👋 Bienvenido a soporte de Punto Pago.  Aquí pronto verás la integración real con <strong>Intercom</strong>.</div>
          <div class="pp-chat-msg bot">¿En qué te puedo ayudar mientras tanto?</div>
        </div>
        <div id="pp-chat-input-area">
          <input type="text" id="pp-chat-input" placeholder="Escribe tu mensaje...">
          <button id="pp-chat-send">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
        <div class="intercom-dev-note">
          Simulación visual. Estructura lista para script oficial <a href="#" style="color:#0047bb;">@Intercom</a>.
        </div>
      </div>
      <div id="pp-chat-bubble">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
      </div>
      
      <!-- 
        ========================================================
        ESTRUCTURA DE CÓDIGO FUTURO (INTEGRACIÓN INTERCOM REAL)
        ========================================================
        Para conectar Intercom, solo tendrás que borrar / comentar la lógica mock
        en este archivo "chat-widget.js" y reemplazarla por el snippet original de Intercom:

        window.intercomSettings = {
          api_base: "https://api-iam.intercom.io",
          app_id: "TU_APP_ID_AQUI"
        };
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(arguments);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/TU_APP_ID_AQUI';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}}})();
      -->
    `;
    
    document.body.appendChild(container);

    // 3. Lógica interactiva del prototipo
    const bubble = document.getElementById('pp-chat-bubble');
    const windowEl = document.getElementById('pp-chat-window');
    const closeBtn = document.getElementById('pp-chat-header-close');
    const inputEl = document.getElementById('pp-chat-input');
    const sendBtn = document.getElementById('pp-chat-send');
    const msgContainer = document.getElementById('pp-chat-messages');

    function toggleChat() {
      if (windowEl.classList.contains('open')) {
        windowEl.classList.remove('open');
        setTimeout(() => windowEl.style.display = 'none', 300);
      } else {
        windowEl.style.display = 'flex';
        // forzar redibujado visual de inmediato para que la transición funcione
        void windowEl.offsetWidth;
        windowEl.classList.add('open');
        inputEl.focus();
      }
    }

    bubble.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    function addMessage(text, sender) {
      if (!text.trim()) return;
      const msg = document.createElement('div');
      msg.className = `pp-chat-msg ${sender}`;
      // Basic anim protection
      msg.style.opacity = '0';
      msg.style.transform = 'translateY(10px)';
      msg.style.transition = 'all 0.3s ease';
      msg.innerText = text;
      
      msgContainer.appendChild(msg);
      
      requestAnimationFrame(() => {
        msg.style.opacity = '1';
        msg.style.transform = 'translateY(0)';
        msgContainer.scrollTop = msgContainer.scrollHeight;
      });
    }

    function handleSend() {
      const text = inputEl.value;
      if (!text.trim()) return;
      addMessage(text, 'user');
      inputEl.value = '';
      
      // Simular auto-respuesta de soporte
      setTimeout(() => {
        const responses = [
          "¡Gracias por comunicarte! Esto es una simulación mientras conectamos el bot real.",
          "Genial. El diseño modular de este widget permitirá que la transición a Intercom sea transparente.",
          "¿Sabías que Intercom inyecta su propio widget de forma muy similar a este script?"
        ];
        const randomRes = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomRes, 'bot');
      }, 1000 + Math.random() * 1000);
    }

    sendBtn.addEventListener('click', handleSend);
    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
  } else {
    initChatWidget();
  }
})();
