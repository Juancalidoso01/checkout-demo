# Integración: Sección 2. Contactos — KYC + OTP

## Objetivo
Validar la persona natural (dueño/representante legal) mediante:
1. **Pre-llenado** de datos del registro (correo validado)
2. **KYC** con Metamap (identidad documental)
3. **OTP por SMS** para validar el teléfono del representante legal

---

## 1. Pre-llenado desde la Sección de Validación

**Datos disponibles** en el contexto de acceso (`pp_onboarding_access_v1`):
- `email` (ya verificado por magic link)
- `phone` (ingresado en el modal)
- `businessName` (nombre del comercio)

**Campos a pre-llenar en Contactos:**
| Campo                    | Origen   | Nota                                      |
|--------------------------|----------|-------------------------------------------|
| Nombre representante     | —        | Usuario lo completa (no lo tenemos)      |
| Correo representante    | `ctx.email` | Ya verificado en sección validación   |
| Teléfono representante  | `ctx.phone` | Se validará con OTP                   |
| Contacto operativo      | Opcional | Puede ser distinto al representante      |

**Implementación actual:** `prefillFromAccess()` ya usa `repEmail`, `repPhone`, `opsContactEmail`, `businessName`. Falta el campo `repPhone` en el HTML de la sección Contactos.

---

## 2. Integración Metamap (KYC)

### Qué necesitas de Metamap

| Requisito              | Dónde obtenerlo | Uso                                  |
|------------------------|-----------------|--------------------------------------|
| **Client ID**          | Dashboard Metamap | Identificar tu aplicación           |
| **Flow ID**            | Dashboard Metamap | Configura el flujo (documento, selfie, etc.) |
| **Script web**         | CDN oficial     | Widget/botón de verificación       |

### Flujo web (recomendado)

```html
<script src="https://web-button.getmati.com/button.js"></script>
```

```javascript
const verification = new MetamapVerification({
  clientId: "TU_CLIENT_ID",
  flowId: "TU_FLOW_ID",
  metadata: {
    onboardingId: "oba_xxx",  // Tu ID de solicitud para correlacionar
    email: "usuario@email.com"
  }
});

verification.on('metamap:userFinishedSdk', ({ detail }) => {
  // Usuario completó el flujo (documento + selfie, etc.)
  // detail.identityId, detail.verificationId
});

verification.on('metamap:exitedSdk', () => {
  // Usuario salió sin completar
});

verification.start();
```

### Eventos útiles

- `metamap:userStartedSdk` — Usuario inició
- `metamap:userFinishedSdk` — Usuario terminó
- `metamap:exitedSdk` — Usuario salió sin completar

### Webhook (resultado final)

Metamap envía el resultado real (aprobado/rechazado) por **webhook**. Necesitas:

1. **URL pública** (HTTPS) en tu backend
2. Configurarla en: Metamap Dashboard → Integrations → Webhook URL
3. Recibir el payload y actualizar el estado de la solicitud

**IPs de Metamap** (para whitelist): `52.55.16.54`, `52.5.135.13`, `18.209.133.212`, `52.7.73.154`

### Qué enviar a Metamap

Para correlacionar usuario y solicitud, pasa en `metadata`:

- `onboardingId` — ID de tu solicitud (`applicationId`)
- `email` — Correo del representante

### Actualizar estado en el frontend (desde webhook)

El backend recibe `verification_completed` y guarda el resultado. El frontend puede:

1. **Polling:** Llamar `GET /api/kyc-status/:onboardingId` cada X segundos; cuando retorne status, llamar `window.setKycResult(onboardingId, payload)`.
2. **Para pruebas:** En consola: `setKycResult('oba_xxx', { status: 'rejected', error: { message: 'Documento alterado' } })`.

Formato del payload para `setKycResult`:

```javascript
window.setKycResult(metadata.onboardingId, {
  status: 'verified' | 'reviewNeeded' | 'rejected',
  error: { message: '...', code: '...', type: 'StepError' }  // solo si rejected
});
```

**Estados de Metamap:** `verified`, `reviewNeeded`, `rejected`, `postponed`.

Para **rechazado**, el webhook incluye `step.error` con `type`, `code`, `message`. Pásalos en `error` para que el usuario vea el motivo de cara a Metamap.

---

## 3. OTP para teléfono del representante

### Opciones de proveedor

| Proveedor       | Uso típico | API SMS | Coste orientativo |
|-----------------|------------|---------|-------------------|
| Twilio          | Producción | Sí      | ~\$0.01/SMS       |
| Firebase Auth   | Apps móviles / web | Sí | Gratis hasta límite |
| Supabase (Auth) | Magic link por SMS | Limitado | Plan de pago |
| Vonage (Nexmo)  | Producción | Sí      | Similar a Twilio  |

### Flujo recomendado

1. Usuario ve campo **Teléfono representante legal** (pre-llenado con `ctx.phone` si existe).
2. Click en **“Enviar código de verificación”**.
3. Backend/envío: generar código de 6 dígitos y enviar SMS.
4. Usuario ingresa código en campo **“Código OTP”**.
5. Backend valida código; si es correcto, se marca teléfono como verificado.

### Backend necesario

Para OTP por SMS hace falta un backend (o serverless):

- Generar y guardar código OTP (por ejemplo en Redis o DB con TTL).
- Llamar a Twilio/Firebase/Supabase para enviar SMS.
- Endpoint para validar código OTP.

---

## 4. Propuesta de UX para la sección Contactos

```
┌─────────────────────────────────────────────────────────────┐
│ 2. Contactos — Validación del representante legal           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Nombre representante legal *]     (libre)                  │
│ [Correo representante *]           (pre-llenado, readonly)  │
│                                     ✓ Correo ya verificado  │
│                                                             │
│ [Teléfono representante *]         (pre-llenado)           │
│ [Enviar código OTP] [Código: ____]  (botón + input)          │
│                                     Estado: Pendiente / ✓   │
│                                                             │
│ ─── Validación de identidad (KYC) ─────────────────────────  │
│ [Iniciar verificación con Metamap] (botón)                  │
│                                     Estado: Pendiente / ✓   │
│                                                             │
│ [Nombre contacto operativo]                                 │
│ [Correo contacto operativo]                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Orden sugerido de implementación

### Fase 1 — Pre-llenado y estructura (frontend)
- [ ] Añadir campo `repPhone` en la sección Contactos.
- [ ] Pre-llenar `repEmail`, `repPhone` desde `readAccessContext()`.
- [ ] Marcar correo como “Ya verificado” si viene del contexto.

### Fase 2 — Metamap (frontend + webhook)
- [x] Obtener Client ID y Flow ID en el Dashboard Metamap.
- [x] Añadir script button.js (web-button.metamap.com) y widget “Iniciar verificación KYC”.
- [x] Pasar metadata (onboardingId, email) dinámicamente al entrar en Contactos.
- [ ] Guardar `identityId` y `verificationId` en `localStorage` / backend.
- [ ] Crear endpoint webhook para recibir resultado final de Metamap.

### Fase 3 — OTP por SMS (backend + frontend)
- [ ] Elegir proveedor (Twilio, Firebase, Supabase, etc.).
- [ ] Crear endpoint POST para “Enviar OTP”.
- [ ] Crear endpoint POST para “Validar OTP”.
- [ ] En el frontend: botón “Enviar código”, input de código y validación.

---

## 6. Datos que necesitas compartir para integrar

Para Metamap:
- Client ID
- Flow ID
- Confirmar si ya tienes webhook configurado

Para OTP:
- Proveedor elegido
- Si tendrás backend propio o usarás Supabase/Firebase (u otro)

Con esto se puede implementar paso a paso cada fase en el onboarding.
