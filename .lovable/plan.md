## Objetivo

Una única pantalla hero fullscreen mobile-first para Epic Fest, construida sobre las dos imágenes oficiales adjuntas (escena y logo), sin backend ni funcionalidades adicionales.

## Recursos oficiales

Las dos imágenes se suben tal cual a la CDN de assets del proyecto y se referencian por URL (sin recrearlas, redibujarlas ni alterarlas):
- Escena: `src/assets/epic-scene.png.asset.json`
- Logo: `src/assets/epic-fest-logo.png.asset.json`

Nota: el logo llega con fondo negro sólido. Se coloca sobre la navbar oscura con `object-contain`, sin recortes ni cambios de color, de modo que el negro se funde con el fondo. Si preferís un PNG con transparencia real, decímelo y lo trato aparte.

## Pantalla (composición)

```text
┌──────────────────────────────┐
│ [LOGO]              [☰]      │  navbar flotante
│                              │
│    03 : 05 : 10 : 19         │  countdown protagonista
│    DÍAS HORAS MIN SEG        │
│                              │
│ EPIC FEST · PRÓXIMAMENTE     │
│ La noche está                │  título izq., 3 líneas
│ por comenzar        🐻 oso   │  (escena abajo-derecha)
│                              │
│   [ Descubrir Epic Fest → ]  │  CTA 80% ancho
└──────────────────────────────┘
```

`100dvh`, `overflow: hidden`, safe areas arriba/abajo, sin scroll. En desktop, la experiencia se centra en un contenedor tipo teléfono con fondo exterior negro.

## Componentes

- `EpicLanding` — orquesta la secuencia de entrada y el layout.
- `EpicScene` — imagen oficial `object-cover` con `object-position` ajustado para conservar visibles cabeza, entradas, trono, "E" y escaleras; overlays de gradiente/viñeta; zoom-pan cinematográfico 100→103% de 12s en loop, parallax ligero por puntero/dedo y micro-tilt al tocar la zona del oso.
- `EpicAmbientEffects` — capas CSS/Motion: glow violeta tras el trono, halos laterales, luz superior, humo difuso bajo (blur alto, baja opacidad), 12–16 partículas ascendentes (violetas + doradas discretas), barrido diagonal sobre la zona de las entradas (~cada 8s) y destello breve sobre los lentes. Todo por `transform`/`opacity`, fuera de las zonas de texto.
- `EpicNavbar` — barra redondeada negro-azulada semitransparente, blur sutil, borde violeta tenue; logo oficial a la izquierda con aire y `object-contain`; botón hamburguesa circular ≥44px con glow.
- `EpicMobileMenu` — overlay fullscreen (Inicio, El evento, Entradas, Mi acceso) con entrada escalonada, botón X, cierre con Escape, bloqueo de scroll; los ítems solo dan feedback y cierran.
- `EpicCountdown` — cuenta hasta `EVENT_DATE`, formato `03 : 05 : 10 : 19` con etiquetas DÍAS/HORAS/MIN/SEG, tipografía condensada, `tabular-nums`, glow sutil, sin tarjeta ni cajas; transición de dígitos con fade + desplazamiento mínimo; al llegar a cero muestra "EPIC FEST COMENZÓ"; limpia el intervalo al desmontar.
- `EpicHeroContent` — etiqueta "EPIC FEST · PRÓXIMAMENTE" + título "La noche está por comenzar" en display condensado, alineado a la izquierda, entrada línea por línea con máscara.
- `EpicCTA` — "Descubrir Epic Fest" con `ArrowUpRight`, 80% del ancho, alto ≥52px, degradado violeta, borde luminoso, micro-escala al tocar, sin acción ni subtítulo.

## Detalles técnicos

- Se instala `motion` (Framer Motion v12, paquete actual) y se usa vía `motion/react`.
- La página se construye reemplazando el placeholder de `src/routes/index.tsx`, con `head()` propio (título, descripción, og/twitter).
- Tipografías condensadas (Anton para título/countdown, Oswald/Inter para etiquetas) cargadas con `<link>` en `__root.tsx` y registradas como tokens en `src/styles.css`.
- Paleta violeta/negro definida como tokens semánticos en `src/styles.css` (nada de colores hardcodeados en componentes).
- `EVENT_DATE = "2026-08-01T23:30:00-03:00"` centralizado en un módulo de constantes junto a las URLs de los assets.
- `prefers-reduced-motion`: se desactivan parallax, partículas, humo y barridos; el contenido queda estático y legible.
- Secuencia de entrada orquestada con delays de Motion: escena → glows → navbar/logo → countdown → etiqueta → título → CTA → ambiente, todo visible en ~1.8s.
