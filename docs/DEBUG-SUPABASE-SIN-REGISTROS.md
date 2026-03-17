# Por qué no hay registros en Supabase – Checklist de depuración

---

## Cómo entran registros a `kyc_verifications`

Solo hay filas cuando se cumple todo este flujo:

1. El usuario termina la verificación en Metamap (aparece el evento `userFinishedSdk`)
2. El usuario hace clic en **"Verificar estado"**
3. La Edge Function llama a Metamap y responde bien
4. La Edge Function hace un `upsert` en `kyc_verifications`

---

## Checklist de depuración

### 1. ¿La verificación de Metamap terminó?

Si se quedó en "subiendo", es posible que nunca se haya completado:

- No se emite `userFinishedSdk`
- No se guarda `verificationId` en `localStorage`
- El botón "Verificar estado" no tiene datos para llamar a la Edge Function

**Prueba:** Haz una nueva verificación que complete bien (incluye cerrar el modal de Metamap al final).

---

### 2. ¿Se está llamando la Edge Function?

Comprueba en el navegador (F12 → pestaña **Network**):

1. Abre la página de onboarding y ve al paso "Contactos"
2. Haz clic en "Verificar estado"
3. Busca una petición a `check-metamap-verification`

- Si **no aparece**:
  - Falta `verificationId` en `localStorage` → la verificación no terminó o se borró
  - Revisa en consola si sale el mensaje: *"Complete la verificación con Metamap primero"*

- Si **sí aparece**:
  - Abre la petición → pestaña **Response**
  - Si ves `{ status: "...", verificationId: "...", applicationId: "..." }` → la función respondió bien
  - Si ves `{ error: "..." }` → la función falló

---

### 3. Revisar logs de la Edge Function

1. Supabase Dashboard → **Edge Functions** → `check-metamap-verification`
2. Pestaña **Logs**
3. Busca errores o mensajes de `console.error`

Errores típicos:

- `Error de autenticación con Metamap` → secrets (`METAMAP_CLIENT_ID` / `METAMAP_CLIENT_SECRET`) mal configurados
- `No se pudo obtener la verificación` → Metamap no devuelve datos (ID incorrecto, verificación no existente, etc.)
- `Error guardando en Supabase` → fallo al escribir en `kyc_verifications`

---

### 4. Verificar que la Edge Function esté guardando en Supabase

1. Supabase Dashboard → **Edge Functions** → `check-metamap-verification`
2. Pestaña **Secrets**
3. Comprueba que existan (Supabase suele inyectarlos):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

Si no están, la función no puede escribir en la base de datos.

---

### 5. Probar la Edge Function a mano

1. Supabase → Edge Functions → `check-metamap-verification` → **Test** / **Invoke**
2. Body (JSON):

```json
{
  "verificationId": "UN_VERIFICATION_ID_REAL_DE_METAMAP",
  "applicationId": "oba_test_12345"
}
```

Sustituye `UN_VERIFICATION_ID_REAL_DE_METAMAP` por un `verificationId` real (de una verificación ya completada en Metamap).

- Si la respuesta es `200` y contiene `status`, la función está bien
- Si ves error, usa ese mensaje para depurar

---

### 6. Insertar un registro de prueba en Supabase

Para comprobar la tabla:

1. Supabase → **SQL Editor**
2. Ejecuta:

```sql
INSERT INTO public.kyc_verifications (
  application_id,
  verification_id,
  identity_id,
  status,
  updated_at
) VALUES (
  'oba_test_manual_001',
  'verification_test_001',
  NULL,
  'approved',
  now()
);
```

3. Supabase → **Table Editor** → `kyc_verifications`

- Si la fila aparece, la tabla y permisos están bien
- Si falla el `INSERT`, puede ser RLS, estructura de la tabla o permisos

---

## Resumen rápido

| Síntoma                          | Posible causa                                  |
|----------------------------------|-----------------------------------------------|
| No hay ningún registro           | La Edge Function no se ha ejecutado correctamente |
| Verificación se quedó "subiendo" | No se completó en Metamap → no `verificationId` |
| No aparece petición en Network   | No se hace clic en "Verificar estado" o falta `verificationId` |
| Respuesta con `error`            | Fallo en Metamap o en la Edge Function        |
| `Error guardando en Supabase`    | Falta `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` o error al escribir |
