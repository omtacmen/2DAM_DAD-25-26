# Clases de 2DAM - CURSO 25-26

# Para crear un proyecto React:

npx create-react-app MI-PROYECTO

# Para ejecutar el proyecto

cd MI-PROYECTO

npm start

# Cuando nos descargamos el proyecto, necesitamos crear el directorio node_modules, para ello es con:

npm install


# Este repositorio tiene las siguientes ramas:

1. La rama "main" que contiene un README para explicar un poco el contenido de las ramas y como crear un proyecto en React.

2. La rama "primera_sesion" que vemos que tiene un componente principal App.js y que actúa como contenedor de la aplicación. En él se muestra un "Hola mundo" en un párrafo en html, el logo de React a través de una imágen y se renderizan dos componentes que hemos creado previamente: PrimerComponente y SegundoComponente. 

PrimerComponente es un componente que se creó para mostrar contenido dinámico. Se define una variable web con el el nombre de la web del instituto, un array de frutas, y utiliza el método map para recorrer el array y generar una lista HTML de forma dinámica, explicando así cómo React renderiza listas. Se utiliza el hook useState (se usa para crear y gestionar el estado de una variable de un componente), que es un estado que se usa para almacenar datos que pueden cambiar durante la ejecución de la aplicación y que hace que el componente se renderice automaticamente. 

También hemos creado un estilo PrimerComponente.css donde pusimos dos clases (rojo y verde).

SegundoComponente que además de mostrar su propio contenido, incluímos en él el PrimerComponente. De esta forma vemos que un componente puede llamar a otro componente, de esta forma vemos que un mismo componente puede reutilizarse varias veces en distintos lugares de la aplicación.

3. La rama "segunda_sesion" se hizo para ver como funciona la navegación entre páginas usando React Router. Primero instalamos la librería "react-router-dom", y luego vemos como en el componente App definimos las rutas de la aplicación mediante los componentes Routes y Route. Cada ruta asocia una URL con un componente distinto, permitiendo crear una aplicación de una sola página (SPA) sin necesidad de recargar el nagvegador.

- La ruta "/" carga HomePage, que hace de página principal.
- La ruta "/blog" muestra BlogPage.
- La ruta "/products/:paramName/:category" utiliza parámetros dinámicos en la URL, lo que nos ayuda a pasar información al componente ProductsPage (en este caso un producto-paramName- y su categoría-category-).
- La ruta "/search" carga SearchPage.
- Se define la ruta comodín (*) que redirige automáticamente a la página principal usando Navigate, para manejar URLs no válidas.

4. La rama "tercera_sesion" se hizo para comprobar el paso de parámetros entre componentes. Sea Componentes hermanos, Componentes padre e hijo, o componentes hijo e padre.
