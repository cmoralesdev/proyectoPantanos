# PESCA SEGURA – Frontend

Este repositorio contiene el frontend de la aplicación web "Pesca Segura", desarrollada con React. Permite a los usuarios visualizar pantanos, consultar guías de pesca y gestionar reservas de manera sencilla e intuitiva.

## Funcionalidades

- Registro, autenticación y gestión de usuarios (mediante Firebase Authentication)
- Visualización y filtrado de pantanos
- Vista de detalles de cada pantano
- Sistema de reservas con confirmación
- Gestión de reservas desde el perfil de usuario

## Estructura del proyecto (directorio `src/`)

- Home, PantanoDetails, Perfil, Login, Registro y RecoverPass (pantallas principales del proyecto)
- `components/`: Header, Footer, Banner, GuiaCard, PantanoCard, Filtro, PantanoInfo, ReservaModal
- `context/`: UserContext
- `config/`: firebase.config
- `main` (entrada principal del proyecto)

> Nota: La lista muestra los principales archivos del proyecto. Algunos componentes adicionales no están incluidos por motivos de brevedad.

## Instalación

Este repositorio no incluye las credenciales ni el archivo `.env` necesario para ejecutar el proyecto, ya que se encuentra publicado de forma pública.

No obstante, en la entrega oficial del proyecto sí se incluye el `.env`, por lo que la aplicación podrá ejecutarse y desplegarse correctamente desde el código entregado para evaluación.

Pasos para preparar el entorno:

1. Clonar el repositorio:  
   `git clone https://github.com/cmoralesdev/proyectoPantanos`

2. Instalar dependencias:  
   `npm install`

3. Ejecutar el servidor de desarrollo:  
   `npm run dev`

> ⚠️ Asegúrate de tener el archivo `.env` con la configuración de Firebase en la raíz del proyecto antes de ejecutar `npm run dev`.

## Dependencias principales (`package.json`)

- "axios": "^1.8.4"
- "dotenv": "^16.5.0"
- "firebase": "^11.7.1"
- "react": "^19.0.0"
- "react-dom": "^19.0.0"
- "react-hook-form": "^7.56.0"
- "react-router-dom": "^7.5.0"

## Autor

Carlos Morales Moraleda
