# TP06 - Clon de Instagram con React

Trabajo Práctico N°6 — Clon web de Instagram desarrollado en **React + Vite**, utilizando imágenes de gatos obtenidas desde **The Cat API** y **Cataas** como contenido de las publicaciones.

## Diseño de Figma utilizado como referencia

El diseño fue inspirado en:
https://www.figma.com/es-es/comunidad/file/1235135369163092252/instagram-web-ui-recreated

Se tomó como guía la disposición general de la interfaz web de Instagram: barra lateral de navegación a la izquierda, feed central con historias y publicaciones, y columna derecha con el mini perfil y las sugerencias para seguir.

## Organización del proyecto

```
src/
├── App.jsx              # Componente raíz: maneja el estado global y la petición a la API
├── App.css               # Estilos generales de toda la aplicación
├── index.css              # Estilos base / reset
├── main.jsx               # Punto de entrada de React
├── assets/                # Imágenes propias del proyecto
└── components/
    ├── Sidebar.jsx         # Barra de navegación lateral
    ├── Header.jsx           # Encabezado alternativo (versión superior, mobile-first)
    ├── Stories.jsx           # Carrusel de historias
    ├── Feed.jsx                # Contenedor del feed + columna de sugerencias
    ├── Post.jsx                  # Publicación individual dentro del feed
    ├── PostModal.jsx               # Vista ampliada/detallada de una publicación (modal)
    ├── Profile.jsx                  # Perfil de usuario emulado
    └── Icons.jsx                     # Set de íconos SVG reutilizados en toda la app
```

Se organizó el proyecto separando cada "bloque visual" de Instagram en su propio componente, de manera que `App.jsx` no contenga JSX repetitivo ni publicaciones escritas a mano: todo se genera dinámicamente a partir del arreglo `posts` obtenido de la API.

## Componentes creados y su responsabilidad

- **`Sidebar`**: barra de navegación fija de la izquierda (logo, Home, Search, Explore, Reels, Messages, Notifications, Create, Profile). Es quien dispara el cambio de vista (`feed` / `profile`) mediante la prop `setView`.
- **`Header`**: encabezado alternativo con el logo y navegación reducida a íconos de Home/Perfil.
- **`Stories`**: renderiza el listado de historias en la parte superior del feed a partir de un array local de usuarios de ejemplo.
- **`Feed`**: agrupa las Stories, la lista de `Post` (generada dinámicamente con `.map()`) y la columna derecha con el mini perfil y las sugerencias de usuarios a seguir.
- **`Post`**: representa una publicación individual del feed (avatar, usuario, imagen, acciones de like/comentario/enviar/guardar, cantidad de likes y caption). Mantiene su propio estado de "me gusta".
- **`PostModal`**: vista de detalle de una publicación seleccionada. Se muestra como ventana modal superpuesta con la imagen ampliada, los comentarios simulados y las acciones de la publicación.
- **`Profile`**: perfil de usuario emulado, con foto, biografía, cantidad de publicaciones/seguidores/seguidos y la grilla de publicaciones del usuario.
- **`Icons`**: componentes SVG puros (sin lógica) reutilizados por `Sidebar`, `Post`, `PostModal`, etc., para no repetir el mismo markup de íconos en cada componente.

Se decidió dividir la aplicación de esta manera porque cada componente representa una sección visual y funcional independiente de Instagram: separar `Post` de `Feed` permite reutilizar la publicación tanto en el feed como en la grilla del perfil (que reutiliza los mismos datos), y separar `PostModal` permite mostrar el detalle de una publicación sin duplicar su marcado.

## Comunicación entre componentes (props)

El estado de las publicaciones y de la publicación seleccionada vive en `App.jsx`, y baja hacia los demás componentes mediante props:

- `App` → `Sidebar`: le pasa `setView` para que la barra lateral pueda cambiar la vista activa (feed/perfil).
- `App` → `Feed` / `Profile`: les pasa `posts` (el arreglo de publicaciones traído de la API) y `setSelectedPost` (para poder abrir el modal de detalle).
- `Feed` → `Post`: cada `Post` recibe su objeto `post` individual y una función `onOpenModal` para notificar al padre qué publicación fue clickeada.
- `App` → `PostModal`: recibe la publicación (`post`) actualmente seleccionada y una función `closeModal` para cerrar la vista.
- `Profile` → cada elemento de la grilla recibe los datos de `post` para mostrar likes y comentarios superpuestos.

De esta forma, el estado "vive" en el componente más alto que lo necesita (`App`) y se comparte hacia abajo por props, mientras que los hijos "avisan" hacia arriba mediante funciones pasadas también como props (patrón *lifting state up*).

## Hooks utilizados

- **`useState`** (en `App.jsx`): guarda `posts` (las publicaciones traídas de la API), `view` (qué sección se está mostrando: feed o perfil) y `selectedPost` (la publicación abierta en el modal, o `null` si no hay ninguna).
- **`useState`** (en `Post.jsx`): cada publicación mantiene su propio estado local `liked` y `likesCount` para poder dar/quitar "me gusta" de forma independiente sin afectar al resto de las publicaciones.
- **`useEffect`** (en `App.jsx`): se ejecuta una única vez al montar la aplicación (`[]` como arreglo de dependencias) y dispara la petición a la API de gatos para cargar las publicaciones iniciales.

## Consumo de API con Axios

En `App.jsx` se utiliza `axios.get` para consultar **The Cat API** (`https://api.thecatapi.com/v1/images/search?limit=10`) dentro de un `useEffect`. Con la respuesta se arma un arreglo de publicaciones (`posts`), agregando a cada imagen un usuario simulado, una cantidad de likes aleatoria, un caption y comentarios de ejemplo, y luego se guarda ese arreglo con `setPosts`. Ese arreglo es el que después se recorre con `.map()` en `Feed` y `Profile` para generar las publicaciones de forma dinámica. Algunos avatares de ejemplo (mini perfil, historias) se completan además con imágenes de **Cataas**.

## Visualización individual de publicaciones

Se resolvió mediante una **ventana modal** (`PostModal.jsx`). Al hacer clic sobre la imagen de una publicación o sobre "View all comments" en el feed, o sobre una publicación de la grilla del perfil, se llama a `setSelectedPost(post)` en `App.jsx`. Esto hace que `PostModal` se renderice por encima del resto de la app, mostrando:

- Imagen ampliada de la publicación.
- Nombre de usuario e ícono de verificado.
- Comentarios simulados (el caption como primer "comentario" del autor + un listado de comentarios de ejemplo).
- Cantidad de likes.
- Botones de interacción (like, comentar, enviar, guardar) y campo para agregar comentario.

El estado `selectedPost` determina qué publicación se muestra; al hacer clic en la "✕" o fuera del contenido del modal, se llama a `closeModal`, que setea `selectedPost` nuevamente en `null` y oculta la vista.

## Perfil de usuario emulado

No se implementó ningún sistema de login ni registro: el usuario activo (`upvox_`) está cargado como un objeto fijo dentro de `Profile.jsx`, simulando que la app ya tiene una sesión iniciada. El perfil muestra:

- Foto de perfil.
- Nombre de usuario y nombre completo.
- Biografía breve.
- Cantidad de publicaciones (calculada dinámicamente a partir de `posts.length`, es decir, la misma cantidad de publicaciones que llegan de la API).
- Cantidad de seguidores y seguidos (valores fijos de ejemplo).
- Grilla de publicaciones asociadas al perfil, reutilizando el mismo arreglo `posts` que se usa en el feed.
- Botones visuales de "Editar perfil" / "Ver archivo" y un ícono de configuración.

La navegación entre el feed y el perfil se resuelve con el estado `view` en `App.jsx`: `Sidebar` permite cambiar entre `'feed'` y `'profile'`, y `App` renderiza condicionalmente `Feed` o `Profile` según ese valor.

## Interactividad implementada

- **Dar/quitar "me gusta"** en cada publicación del feed (`Post.jsx`), que actualiza el contador de likes en tiempo real mediante `useState`.
- **Apertura y cierre del modal** de detalle de una publicación (`selectedPost` en `App.jsx`).
- **Navegación entre feed y perfil** desde la barra lateral (`view` en `App.jsx`).

## Tecnologías utilizadas

- React 19 + Vite
- Axios para el consumo de la API
- CSS puro (sin frameworks), organizado en `App.css` e `index.css`
