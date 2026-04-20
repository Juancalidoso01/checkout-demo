#!/usr/bin/env python3
"""
Extrae el listado de puntos Western Union del artículo de referencia panama50.com
(sucursales y horarios). El HTML usa <h3 id="..."> por zona y <p> por detalle / teléfono / horarios.

Salida (por defecto en assets/magazine/benchmark/):
  - western-union-puntos.csv
  - western-union-puntos-resumen.txt

Uso:
  python3 scripts/extract-western-union-panama50.py
  python3 scripts/extract-western-union-panama50.py --url https://panama50.com/...
"""
from __future__ import annotations

import argparse
import csv
import re
import urllib.request
from collections import Counter
from html import unescape
from pathlib import Path


DEFAULT_URL = "https://panama50.com/sucursales-y-horarios-de-western-union-en-panama/"


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


def strip_tags(s: str) -> str:
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.I)
    s = re.sub(r"<[^>]+>", " ", s)
    s = unescape(s)
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n\s*\n+", "\n", s)
    return s.strip()


def normalize_p_inner(inner: str) -> str:
    inner = re.sub(
        r"<strong>\s*\(([a-z])\)\s*:\s*</strong>",
        r"(\1): ",
        inner,
        flags=re.I,
    )
    return strip_tags(inner)


def split_tel_horarios(text: str) -> tuple[str, str, str]:
    """Devuelve (detalle, telefono, horarios) a partir de un párrafo posiblemente combinado."""
    det = text
    tel = ""
    hor = ""
    low = text.lower()
    if "teléfono" in low or "telefono" in low:
        parts = re.split(r"\bTel[eé]fono[s]?\s*:", text, maxsplit=1, flags=re.I)
        det = parts[0].strip().rstrip(" .")
        rest = parts[1].strip() if len(parts) > 1 else ""
        if rest:
            hparts = re.split(r"\bHorarios?\s*:", rest, maxsplit=1, flags=re.I)
            tel = hparts[0].strip().rstrip(" .")
            if len(hparts) > 1:
                hor = hparts[1].strip()
    elif re.search(r"\bHorarios?\s*:", text, flags=re.I):
        parts = re.split(r"\bHorarios?\s*:", text, maxsplit=1, flags=re.I)
        det = parts[0].strip().rstrip(" .")
        hor = parts[1].strip() if len(parts) > 1 else ""
    return det, tel, hor


def parse_section_body(body: str) -> list[dict]:
    ps = re.findall(r"<p[^>]*>([\s\S]*?)</p>", body, flags=re.I)
    rows: list[dict] = []
    cur: dict | None = None

    def flush() -> None:
        nonlocal cur
        if cur and (cur.get("descripcion") or cur.get("horarios")):
            rows.append(cur)
        cur = None

    for inner in ps:
        plain = normalize_p_inner(inner)
        if not plain or plain.lower().startswith("ver más"):
            break
        new_letter = re.match(r"^\(([a-z])\)\s*:\s*", plain, flags=re.I)
        if new_letter:
            flush()
            cur = {
                "descripcion": plain,
                "telefono": "",
                "horarios": "",
            }
            continue
        low = plain.lower()
        if low.startswith("teléfono") or low.startswith("telefono") or low.startswith("teléfonos"):
            if cur is None:
                cur = {"descripcion": "", "telefono": "", "horarios": ""}
            cur["telefono"] = re.sub(r"^tel[eé]fono[s]?\s*:\s*", "", plain, count=1, flags=re.I).strip()
            continue
        if low.startswith("horarios"):
            if cur is None:
                cur = {"descripcion": "", "telefono": "", "horarios": ""}
            cur["horarios"] = re.sub(r"^horarios?\s*:\s*", "", plain, count=1, flags=re.I).strip()
            continue
        # Párrafo único con todo mezclado o descripción sin letra
        det, tel, hor = split_tel_horarios(plain)
        if tel or hor:
            if cur is None:
                cur = {"descripcion": det, "telefono": tel, "horarios": hor}
            else:
                if det and not cur["descripcion"]:
                    cur["descripcion"] = det
                if tel:
                    cur["telefono"] = tel
                if hor:
                    cur["horarios"] = hor
        else:
            if cur is None:
                cur = {"descripcion": plain, "telefono": "", "horarios": ""}
            elif not cur["descripcion"]:
                cur["descripcion"] = plain
            else:
                cur["descripcion"] += " " + plain
    flush()
    return rows


def main() -> None:
    ap = argparse.ArgumentParser(description="Extrae listado WU desde panama50.com.")
    ap.add_argument("--url", default=DEFAULT_URL)
    ap.add_argument(
        "--out-dir",
        type=Path,
        default=Path(__file__).resolve().parent.parent / "assets" / "magazine" / "benchmark",
    )
    args = ap.parse_args()

    html = fetch_html(args.url)
    start = html.find('<h2 id="Sucursales"')
    if start < 0:
        start = html.lower().find("sucursales</span></h2>")
    if start < 0:
        raise SystemExit("No se encontró la sección Sucursales en el HTML.")
    end = html.find("VER MÁS:", start)
    if end < 0:
        end = html.lower().find("ver más:", start)
    if end < 0:
        raise SystemExit("No se encontró el fin del artículo (VER MÁS).")
    chunk = html[start:end]

    sections = list(
        re.finditer(
            r'<h3\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)</h3>([\s\S]*?)(?=<h3\b[^>]*\bid=|VER MÁS:|$)',
            chunk,
            flags=re.I,
        )
    )

    out_rows: list[dict] = []
    for m in sections:
        sec_id = m.group(1)
        h3_inner = m.group(2)
        body = m.group(3)
        zona = strip_tags(h3_inner)
        if not zona or zona.lower() == "sucursales":
            continue
        for i, r in enumerate(parse_section_body(body), start=1):
            out_rows.append(
                {
                    "zona": zona,
                    "zona_id": sec_id,
                    "punto_en_zona": i,
                    "descripcion": r.get("descripcion") or "",
                    "telefono": r.get("telefono") or "",
                    "horarios": r.get("horarios") or "",
                }
            )

    args.out_dir.mkdir(parents=True, exist_ok=True)
    out_csv = args.out_dir / "western-union-puntos.csv"
    out_txt = args.out_dir / "western-union-puntos-resumen.txt"
    fieldnames = ["zona", "zona_id", "punto_en_zona", "descripcion", "telefono", "horarios"]

    with out_csv.open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(out_rows)

    by_zona = Counter(r["zona"] for r in out_rows)
    lines = [
        "Western Union (referencia) — puntos extraídos del listado en panama50.com.",
        "Total filas (puntos / sublocales listados): %d" % len(out_rows),
        "Zonas (encabezados h3): %d" % len(by_zona),
        "",
        "Puntos por zona:",
    ]
    for zona, n in sorted(by_zona.items(), key=lambda x: (-x[1], x[0].lower())):
        lines.append("  %s: %d" % (zona, n))
    lines += ["", "Fuente: " + args.url, "Aviso: contenido de terceros; validar con Western Union para uso oficial."]
    out_txt.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(out_csv, len(out_rows), "filas,", len(by_zona), "zonas")
    print(out_txt)


if __name__ == "__main__":
    main()
