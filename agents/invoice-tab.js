/**
 * Factura / comprobante (demo) — mismo flujo que el antiguo factura.html, embebido en agents/recharge.
 * Requiere #invoice-tab-root en el DOM e i18n.js cargado (opcional, hay fallbacks).
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'pp_agent_sandbox_v1';
  const DRAFT_KEY = 'pp_receipt_draft_v1';

  function rootEl() {
    return document.getElementById('invoice-tab-root');
  }

  function el(id) {
    const r = rootEl();
    return r ? r.querySelector('#' + id) : null;
  }

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { txs: [] };
    } catch (e) {
      return { txs: [] };
    }
  }

  function fmt(v) {
    const n = Number(v);
    return '$' + (Number.isFinite(n) ? n.toFixed(2) : '0.00');
  }

  function safeText(v) {
    return (v ?? '').toString().trim();
  }

  function setStatus(msg) {
    const s = el('status');
    if (s) s.textContent = msg || '';
  }

  function buildReceiptFromTx(tx) {
    const when = tx && tx.when ? new Date(tx.when) : new Date();
    const type = safeText(tx && tx.type) || 'Operación';
    const desc = safeText(tx && tx.desc) || '—';
    const amount = fmt(tx && tx.amount);
    const ref = safeText(tx && tx.ref) || safeText(tx && tx.id) || safeText(tx && tx.reference) || '—';
    return { title: type, meta: when.toLocaleString() + ' — ' + desc, amount: amount, ref: ref };
  }

  function updatePreview(receipt) {
    const t = el('receiptTitle');
    const m = el('receiptMeta');
    const a = el('receiptAmount');
    const r = el('receiptRef');
    if (t) t.textContent = receipt.title;
    if (m) m.textContent = receipt.meta;
    if (a) a.textContent = receipt.amount;
    if (r) r.textContent = receipt.ref;
  }

  function defaultMessage(receipt, clientName) {
    const name = safeText(clientName);
    const dict = window.I18N && window.I18N.getDict ? window.I18N.getDict() : {};
    const greetText = dict.invoice_greet || 'Hola';
    const greet = name ? greetText + ' ' + name + ',' : greetText + ',';
    return [
      greet,
      dict.invoice_msg_body || 'Te compartimos tu comprobante de pago:',
      String(receipt.title),
      String(receipt.meta),
      (dict.invoice_amount || 'Monto') + ': ' + receipt.amount,
      (dict.invoice_ref || 'Referencia') + ': ' + receipt.ref,
      dict.invoice_msg_footer || 'Gracias por usar Punto Pago.',
    ].join('\n');
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function saveDraft(d) {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch (e) {}
  }

  function clearDraftStorage() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {}
  }

  function hydrateFromDraft(els) {
    const d = loadDraft();
    if (!d) return;
    if (d.clientName && els.clientName) els.clientName.value = d.clientName;
    if (d.clientId && els.clientId) els.clientId.value = d.clientId;
    if (d.waPhone && els.waPhone) els.waPhone.value = d.waPhone;
    if (d.email && els.email) els.email.value = d.email;
    if (d.telegram && els.telegram) els.telegram.value = d.telegram;
    if (d.message && els.message) els.message.value = d.message;
    if (d.receipt) updatePreview(d.receipt);
  }

  function persist(els) {
    const d = {
      clientName: safeText(els.clientName && els.clientName.value),
      clientId: safeText(els.clientId && els.clientId.value),
      waPhone: safeText(els.waPhone && els.waPhone.value),
      email: safeText(els.email && els.email.value),
      telegram: safeText(els.telegram && els.telegram.value),
      message: safeText(els.message && els.message.value),
      receipt: {
        title: safeText(els.receiptTitle && els.receiptTitle.textContent),
        meta: safeText(els.receiptMeta && els.receiptMeta.textContent),
        amount: safeText(els.receiptAmount && els.receiptAmount.textContent),
        ref: safeText(els.receiptRef && els.receiptRef.textContent),
      },
    };
    saveDraft(d);
  }

  function ensureMessage(els) {
    const current = safeText(els.message && els.message.value);
    if (current) return current;
    const receipt = {
      title: safeText(els.receiptTitle && els.receiptTitle.textContent) || 'Operación',
      meta: safeText(els.receiptMeta && els.receiptMeta.textContent) || '',
      amount: safeText(els.receiptAmount && els.receiptAmount.textContent) || '$0.00',
      ref: safeText(els.receiptRef && els.receiptRef.textContent) || '—',
    };
    const msg = defaultMessage(receipt, els.clientName && els.clientName.value);
    if (els.message) els.message.value = msg;
    return msg;
  }

  function openUrl(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function sendWhatsApp(els) {
    const phone = safeText(els.waPhone.value).replace(/[^0-9]/g, '');
    if (!phone) {
      setStatus(
        (window.I18N && window.I18N.getDict && window.I18N.getDict().invoice_err_wa) ||
          'Ingresa el número de WhatsApp (con código de país, sin +).'
      );
      els.waPhone.focus();
      return;
    }
    const msg = ensureMessage(els);
    const url = 'https://wa.me/' + encodeURIComponent(phone) + '?text=' + encodeURIComponent(msg);
    setStatus((window.I18N && window.I18N.getDict && window.I18N.getDict().invoice_status_wa) || 'Abriendo WhatsApp…');
    openUrl(url);
  }

  function sendEmail(els) {
    const email = safeText(els.email.value);
    if (!email) {
      setStatus(
        (window.I18N && window.I18N.getDict && window.I18N.getDict().invoice_err_email) ||
          'Ingresa un correo del cliente.'
      );
      els.email.focus();
      return;
    }
    const msg = ensureMessage(els);
    const subject = 'Comprobante de pago — Punto Pago';
    const url =
      'mailto:' +
      encodeURIComponent(email) +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(msg);
    setStatus((window.I18N && window.I18N.getDict && window.I18N.getDict().invoice_status_email) || 'Abriendo correo…');
    openUrl(url);
  }

  function sendTelegram(els) {
    const handle = safeText(els.telegram.value);
    const msg = ensureMessage(els);
    if (!handle) {
      const url = 'https://t.me/share/url?url=&text=' + encodeURIComponent(msg);
      setStatus(
        (window.I18N && window.I18N.getDict && window.I18N.getDict().invoice_status_tg_share) ||
          'Abriendo Telegram (compartir)…'
      );
      openUrl(url);
      return;
    }
    const clean = handle.replace(/^@/, '').trim();
    const url = 'https://t.me/' + encodeURIComponent(clean);
    setStatus(
      (window.I18N && window.I18N.getDict && window.I18N.getDict().invoice_status_tg) ||
        'Abriendo Telegram… (luego pega el mensaje)'
    );
    openUrl(url);
  }

  function loadLastTx(els) {
    const st = loadState();
    const txs = Array.isArray(st.txs) ? st.txs : [];
    if (!txs.length) {
      setStatus(
        (window.I18N && window.I18N.getDict && window.I18N.getDict().invoice_err_no_tx) ||
          'No hay transacciones en el sandbox todavía. Realiza un Cash In o un pago primero.'
      );
      const dict = (window.I18N && window.I18N.getDict && window.I18N.getDict()) || {};
      const blank = {
        title: dict.invoice_op || 'Operación',
        meta: new Date().toLocaleString(),
        amount: '$0.00',
        ref: '—',
      };
      updatePreview(blank);
      if (els.message) els.message.value = '';
      persist(els);
      return;
    }
    const last = txs[txs.length - 1];
    const receipt = buildReceiptFromTx(last);
    updatePreview(receipt);
    if (els.message) els.message.value = '';
    setStatus(
      (window.I18N && window.I18N.getDict && window.I18N.getDict().invoice_status_loaded) ||
        'Última operación cargada. Completa los datos del cliente y elige el canal.'
    );
    persist(els);
  }

  function resetUi(els) {
    clearDraftStorage();
    if (els.clientName) els.clientName.value = '';
    if (els.clientId) els.clientId.value = '';
    if (els.waPhone) els.waPhone.value = '';
    if (els.email) els.email.value = '';
    if (els.telegram) els.telegram.value = '';
    if (els.message) els.message.value = '';
    setStatus('');
    loadLastTx(els);
  }

  function init() {
    if (!rootEl()) return;

    const els = {
      clientName: el('clientName'),
      clientId: el('clientId'),
      waPhone: el('waPhone'),
      email: el('email'),
      telegram: el('telegram'),
      message: el('message'),
      status: el('status'),
      receiptTitle: el('receiptTitle'),
      receiptMeta: el('receiptMeta'),
      receiptAmount: el('receiptAmount'),
      receiptRef: el('receiptRef'),
      loadLastTx: el('loadLastTx'),
      clearDraft: el('clearDraft'),
      sendWhatsapp: el('sendWhatsapp'),
      sendTelegram: el('sendTelegram'),
      sendEmail: el('sendEmail'),
    };

    if (!els.loadLastTx || !els.receiptTitle) return;

    const persistWrap = function () {
      persist(els);
    };

    ['input', 'change', 'blur'].forEach(function (evt) {
      [els.clientName, els.clientId, els.waPhone, els.email, els.telegram, els.message].forEach(function (node) {
        if (!node) return;
        node.addEventListener(evt, persistWrap);
      });
    });

    if (els.sendWhatsapp) els.sendWhatsapp.addEventListener('click', function () {
      persist(els);
      sendWhatsApp(els);
    });
    if (els.sendTelegram) els.sendTelegram.addEventListener('click', function () {
      persist(els);
      sendTelegram(els);
    });
    if (els.sendEmail) els.sendEmail.addEventListener('click', function () {
      persist(els);
      sendEmail(els);
    });

    els.loadLastTx.addEventListener('click', function () {
      loadLastTx(els);
    });
    if (els.clearDraft) {
      els.clearDraft.addEventListener('click', function () {
        resetUi(els);
      });
    }

    hydrateFromDraft(els);
    var rt = els.receiptTitle && safeText(els.receiptTitle.textContent);
    if (!rt || rt === 'Operación') loadLastTx(els);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
