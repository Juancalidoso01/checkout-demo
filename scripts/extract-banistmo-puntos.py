#!/usr/bin/env python3
"""
Descarga el buscador público de Banistmo y extrae las listas embebidas (Next.js)
en JSON: cajeros (atms.rows) y sucursales (branches.rows).

Salida (por defecto en assets/magazine/benchmark/):
  - banistmo-puntos.csv       — detalle por punto (UTF-8 con BOM para Excel)
  - banistmo-puntos-resumen.txt — conteos por provincia

Uso:
  python3 scripts/extract-banistmo-puntos.py
  python3 scripts/extract-banistmo-puntos.py --url https://www.banistmo.com/personas/buscador-sucursales
"""
from __future__ import annotations

import argparse
import csv
import json
import urllib.request
from collections import Counter
from pathlib import Path


DEFAULT_URL = "https://www.banistmo.com/personas/buscador-sucursales"


def fetch_html(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; PuntoPagoBenchmark/1.0)",
            "Accept-Language": "es-PA,es;q=0.9",
        },
    )
    with urllib.request.urlopen(req, timeout=90) as resp:
        return resp.read().decode("utf-8", errors="ignore")


def extract_rows(html: str, needle: str) -> list:
    i0 = html.find(needle)
    if i0 < 0:
        raise ValueError(f"No se encontró el marcador: {needle!r}")
    open_br = i0 + len(needle) - 1
    if html[open_br] != "[":
        raise ValueError("Se esperaba '[' tras rows")
    close = html.find('],\\"columns\\":', i0 + len(needle))
    if close < 0:
        raise ValueError("No se encontró el cierre de rows antes de columns")
    raw = html[open_br : close + 1]
    fixed = raw.replace('\\"', '"')
    return json.loads(fixed)


def norm_row(obj: dict, categoria: str) -> dict:
    return {
        "categoria": categoria,
        "id": obj.get("id"),
        "nombre": (obj.get("name") or "").replace("\n", " ").strip(),
        "provincia": (obj.get("province") or "").strip(),
        "direccion": (obj.get("direction") or "").replace("\n", " ").strip(),
        "telefono": str(obj.get("phone") or "").strip(),
        "latitud": obj.get("latitude"),
        "longitud": obj.get("longitude"),
        "lunes": (obj.get("monday") or "").strip(),
        "sabado": (obj.get("saturday") or "").strip(),
    }


def main() -> None:
    ap = argparse.ArgumentParser(description="Extrae listados Banistmo del HTML público.")
    ap.add_argument("--url", default=DEFAULT_URL)
    ap.add_argument(
        "--out-dir",
        type=Path,
        default=Path(__file__).resolve().parent.parent / "assets" / "magazine" / "benchmark",
    )
    args = ap.parse_args()

    html = fetch_html(args.url)
    atms = extract_rows(html, '\\"atms\\":{\\"rows\\":[')
    branches = extract_rows(html, '\\"branches\\":{\\"rows\\":[')

    args.out_dir.mkdir(parents=True, exist_ok=True)
    out_csv = args.out_dir / "banistmo-puntos.csv"
    out_txt = args.out_dir / "banistmo-puntos-resumen.txt"

    rows = [norm_row(o, "ATM") for o in atms] + [norm_row(o, "Sucursal") for o in branches]
    fieldnames = list(rows[0].keys()) if rows else []

    with out_csv.open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)

    c_atm = Counter(r["provincia"] for r in rows if r["categoria"] == "ATM")
    c_br = Counter(r["provincia"] for r in rows if r["categoria"] == "Sucursal")
    lines = [
        "Banistmo — puntos extraídos del buscador público (personas/buscador-sucursales).",
        "ATM (cajeros): %d | Sucursales (filial branches): %d | Total filas: %d"
        % (len(atms), len(branches), len(rows)),
        "",
        "Por provincia — ATM:",
    ]
    for prov, n in sorted(c_atm.items(), key=lambda x: (-x[1], x[0])):
        lines.append("  %s: %d" % (prov or "(sin provincia)", n))
    lines += ["", "Por provincia — Sucursales:"]
    for prov, n in sorted(c_br.items(), key=lambda x: (-x[1], x[0])):
        lines.append("  %s: %d" % (prov or "(sin provincia)", n))
    lines += [
        "",
        "Detalle completo (nombre, dirección, coordenadas, horarios): ver banistmo-puntos.csv",
        "Fuente: " + args.url,
    ]
    out_txt.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(out_csv, len(rows), "filas")
    print(out_txt)


if __name__ == "__main__":
    main()
