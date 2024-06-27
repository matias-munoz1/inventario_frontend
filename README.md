# Frontend Project

## Descripción

Este proyecto es un frontend desarrollado en Vue.js para la gestión de tareas. La aplicación permite a los usuarios interactuar con una interfaz intuitiva para crear, leer, actualizar y eliminar tareas (CRUD). El proyecto está configurado con ESLint para el linting del código, Prettier para el formateo, Husky para los hooks de Git, y utiliza Jest para las pruebas unitarias.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js**: versión 14 o superior. [Descargar Node.js](https://nodejs.org/)
- **npm**: versión 6 o superior, que generalmente viene con Node.js.
- **Git**: para clonar el repositorio. [Descargar Git](https://git-scm.com/)

Además, podrías necesitar un editor de texto como [Visual Studio Code](https://code.visualstudio.com/) para trabajar con el código.

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona el repositorio:
   ```
   git clone https://github.com/matias-munoz1/frontend.git
   ```
2. Navega a la carpeta del proyecto
   ```
   cd frontend
   ```
3. Instala las dependencias
   ```
    npm install
   ```

## Ejecución del proyecto

Para iniciar el servidor de desarrollo, utilizar el siguiente comando:

```
 npm run serve
```

## Uso

Una vez que la aplicacion esté en ejecución, podras interactuar con la interfaz para gestionar tus tareas

## Interfaz de usuario

En la interfaz principal, puedes ver una lista de tareas con las siguientes columnas:

- ID: El identificador único de la tarea.
- Título: El nombre de la tarea.
- Descripción: Una breve descripción de la tarea.
- Estado: El estado actual de la tarea (Completo o Pendiente).
- Acciones: Botones para editar o eliminar la tarea.

## Funcionalidades

1. Ver Tareas: La tabla muestra todas las tareas existentes en la base de datos.
2. Agregar Tarea: Utiliza el botón "Agregar tarea" para abrir un formulario donde puedes introducir detalles de una nueva tarea.
3. Editar Tarea: Haz clic en el botón "Editar" junto a una tarea para modificar sus detalles.
4. Eliminar Tarea: Haz clic en el botón "Eliminar" para borrar una tarea de la lista.

   **Navegación**

- Inicio: Te lleva a la página principal de la aplicación.
- Agregar tarea: Abre el formulario para agregar una nueva tarea.

## Pruebas

Para ejecutar las pruebas unitarias, se utiliza el siguinte comando:

```
 npm run test
```

## Guía de Estilo de Código

Este proyecto utiliza ESLint y Prettier para mantener un estilo de código consistente. Puedes verificar y corregir el estilo de tu código usando:

Para verificar y corregir el estilo con ESLint:

```
 npm run lint
```

Para formatear el código con Prettier:

```
 npm run format
```

## Estructura del Proyecto

- node_modules/: Contiene las dependencias instaladas del proyecto.
- public/: Archivos públicos, como el index.html.
- src/: Código fuente del proyecto.
- assets/: Recursos estáticos como imágenes y CSS.
- components/: Componentes Vue reutilizables.
- router/: Configuración de las rutas de Vue Router.
- App.vue: Componente principal de la aplicación.
- main.js: Punto de entrada de la aplicación.
- types.js: Definiciones de tipos y constantes.
- .husky/: Hooks de Husky para Git.
- .eslintrc.js: Configuración de ESLint para el linting del código.
- .prettierrc: Configuración de Prettier para el formateo del código.
- babel.config.js: Configuración de Babel para la compilación del JavaScript moderno.
- jest.config.js: Configuración de Jest para las pruebas unitarias.
- package.json: Dependencias y scripts del proyecto.
- vue.config.js: Configuración específica del Vue CLI.
- webpack.config.js: Configuración de Webpack.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio.

## Autor

Matias Muñoz Programador
