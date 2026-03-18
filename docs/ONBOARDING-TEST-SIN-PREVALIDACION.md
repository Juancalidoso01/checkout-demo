# Errores al usar onboarding-test (sin prevalidación)

## ¿Qué hace onboarding-test.html?

Configura en `localStorage` un acceso de prueba (`emailVerified: true`, email, teléfono, comercio) y redirige a `onboarding.html`. **No** requiere registrar correo real ni validación previa.

## Posibles errores y causas

### 1. MetaMap / verificación de identidad (Etapa 2)
**Bloqueo:** "Debe completar la verificación de identidad para continuar"

- **Causa:** Etapa 2 exige KYC completado vía MetaMap (botón "Verificar identidad").
- **Sin prevalidación:** MetaMap es independiente del flujo de acceso. Con o sin prevalidación, hay que completar MetaMap para pasar.
- **Solución prueba:** Usar `onboarding.html?modo_prueba=1` para omitir la validación de KYC en pruebas.

### 2. Correo no verificado / redirección a onboarding-access
**Bloqueo:** Vuelta automática a `onboarding-access.html`

- **Causa:** `onboarding-main.js` exige `accessContext.emailVerified === true`.
- **Con onboarding-test:** Se establece `emailVerified: true` en el mock, por lo que no debería ocurrir.
- **Si ocurre:** Revisar que `onboarding-test.html` se abra antes que `onboarding.html` (que establezca el mock en localStorage).

### 3. Prellenado de datos
**Bloqueo:** Campos vacíos aunque haya pasado por onboarding-access

- **Causa:** `prefillFromAccess()` toma email, teléfono y nombre del comercio de `readAccessContext()`.
- **Con onboarding-test:** El mock incluye `email`, `phone`, `businessName`, por lo que esos campos se prellenan.

### 4. Teléfono en formato incorrecto
**Bloqueo:** "Celular Panamá: 8 dígitos comenzando por 6"

- **Causa:** El mock usa `+50761234567`, que es válido.
- **Posible fallo:** Si el usuario borra el valor y pone otro, debe respetar formato Panamá (8 dígitos, empieza en 6).

### 5. PDF, mapa y otros requisitos
No dependen de la prevalidación. Siempre son obligatorios:
- Etapa 1: PDF de aviso de operaciones
- Etapa 3: Ubicación en mapa (coordenadas)

## Modo prueba

Para probar el flujo sin MetaMap (KYC simulado):

1. **Recomendado:** Abrir `onboarding-test.html` → redirige a `onboarding.html?modo_prueba=1`
2. **Alternativa:** Ir directo a `onboarding.html?modo_prueba=1` si ya tienes acceso en localStorage
3. El parámetro `?modo_prueba=1` hace que `isKycCompleted()` retorne `true` sin verificación real en MetaMap

**URLs completas (GitHub Pages):**
- `https://juancalidoso01.github.io/checkout-demo/onboarding-test.html`
- `https://juancalidoso01.github.io/checkout-demo/onboarding.html?modo_prueba=1` (requiere acceso previo)

En producción no se debe usar `modo_prueba=1`.
