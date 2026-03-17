#!/bin/bash
cd "$(dirname "$0")"
echo "=========================================="
echo "  Prueba de autocompletado de dirección"
echo "=========================================="
echo ""
echo "Iniciando servidor..."
python3 -m http.server 3333 &
sleep 2
echo "Abriendo en el navegador..."
open "http://localhost:3333/test-direccion.html" 2>/dev/null
echo ""
echo "Escribe en el campo (ej: bella, via españa)"
echo "para ver las sugerencias."
echo ""
echo "Presiona ENTER para cerrar el servidor."
read
kill %1 2>/dev/null
echo "Listo."
