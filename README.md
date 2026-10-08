# QuickDish – Versión web

Sitio web de QuickDish (pedidos de restaurantes) hecho con HTML, CSS y JavaScript, sin frameworks.
Cada pantalla es una página independiente.

## Páginas
- `index.html` – Iniciar sesión
- `registro.html` – Crear cuenta
- `recuperar.html` – Recuperar contraseña
- `restaurantes.html` – Lista de restaurantes
- `menu.html` – Menú de cada restaurante
- `carrito.html` – Carrito de compras
- `pago.html` – Pago (simulado)
- `rastrear.html` – Rastrear pedido
- `estado.html` – Estado del pedido
- `perfil.html` – Datos personales

## Cómo funciona
- Las cuentas se guardan en el navegador (`localStorage`); la contraseña se guarda cifrada (SHA-256), nunca en texto plano.
- La sesión es independiente por pestaña (`sessionStorage`); el carrito y el pedido son independientes por usuario.
- El pago es simulado: no se cobra nada ni se guardan datos de tarjeta.
- Los restaurantes y precios son datos de ejemplo (`js/app.js`).

## Cómo probarlo en local
Abrir la carpeta en VS Code con la extensión Live Server, o con `python -m http.server` y entrar a `http://localhost:8000`.

## Siguiente paso
Conectar el registro, el inicio de sesión y los pedidos a una base de datos real (Supabase).
