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

4. La rama "api_backend" es la rama para la creación de un servidor BACKEND que crea una API para la actividad "Confección de informes"


Antes de ejecutar el servidor Backend tendremos que tener instalado mysql y ejecutamos el siguiente SQL para crear la base de datos "matriculas" y la tabla "Alumnos":


----------------------------------------------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS matriculas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE matriculas;

CREATE TABLE IF NOT EXISTS Alumnos (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Matricula VARCHAR(30) NOT NULL UNIQUE,
  Nombre VARCHAR(120) NOT NULL,
  Sexo ENUM('M','F') NOT NULL,
  Edad TINYINT UNSIGNED NULL,
  Email VARCHAR(150) NOT NULL,
  Repetidor TINYINT(1) NOT NULL DEFAULT 0,
  Activo TINYINT(1) NOT NULL DEFAULT 1,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_activo ON Alumnos(Activo);
CREATE INDEX idx_sexo ON Alumnos(Sexo);
CREATE INDEX idx_repetidor ON Alumnos(Repetidor);


----------------------------------------------------------------------------------------------------


USE matriculas;

INSERT INTO Alumnos (Matricula, Nombre, Sexo, Edad, Email, Repetidor, Activo) VALUES
('DAM-2026-001', 'Juan Pérez García', 'M', 19, 'juan.perez@correo.com', 0, 1),
('DAM-2026-002', 'María López Hernández', 'F', 18, 'maria.lopez@correo.com', 0, 1),
('DAM-2026-003', 'Carlos Rodríguez Díaz', 'M', 20, 'carlos.rodriguez@correo.com', 1, 1),
('DAM-2026-004', 'Lucía Martín Suárez', 'F', 19, 'lucia.martin@correo.com', 0, 1),
('DAM-2026-005', 'Alejandro Sánchez Morales', 'M', 21, 'alejandro.sanchez@correo.com', 1, 1),
('DAM-2026-006', 'Paula Gómez Navarro', 'F', 18, 'paula.gomez@correo.com', 0, 1),
('DAM-2026-007', 'David Torres Vega', 'M', 22, 'david.torres@correo.com', 1, 1),
('DAM-2026-008', 'Sara Ramírez León', 'F', 20, 'sara.ramirez@correo.com', 1, 1),
('DAM-2026-009', 'Javier Medina Cruz', 'M', 19, 'javier.medina@correo.com', 0, 1),
('DAM-2026-010', 'Elena Navarro Ruiz', 'F', 21, 'elena.navarro@correo.com', 0, 1);



----------------------------------------------------------------------------------------------------




Una vez tengamos la base de datos preparada, tendremos que ejecutar el servidor backend. El backend lo hemos realizado con nodeJS y Express. Para ejecutarlo, ejecutamos el siguiente código:

node server.js

Las rutas las hemos añadido en el fichero: "src/routes/alumnos.routes.js" y la lógica de cada una de ellas se encuentran en los controladores: "src/controllers/alumnos.controller.js"

--------------------------
|   INSERTAR UN ALUMNO   |
--------------------------

Hacemos un POST a la URL:

http://localhost:3001/api/alumnos/insert

Con el siguiente body:

{
  "matricula": "DAM-2026-020",
  "nombre": "Laura Medina Suárez",
  "sexo": "F",
  "edad": 19,
  "email": "laura.medina@correo.com",
  "repetidor": false
}


Tutorial con POSTMAN ( https://www.postman.com ):

1. Abrimos Postman, ponemos el método: POST con la URL: "http://localhost:3001/api/alumnos/insert"

2. Configuramos la cabecera, para ello vamos a la pestaña Headers y añadimos que el contenido que vamos a mandar es un JSON


KEY -> VALUE

Content-Type -> application/json


3. Añadimos en el vbody el JSON que vamos a mandar, para ello vamos a la pestaña Body, marcamos RAW y marcamos JSON y el contenido que vamos a añadir. Por ejemplo:


{
  "matricula": "DAM-2026-111",
  "nombre": "Pepe Bichuela",
  "sexo": "M",
  "edad": 32,
  "email": "pepe.bichuela@correo.com",
  "repetidor": false
}


Picamos Send


------------------------------
|   LISTAR ALUMNOS ACTIVOS   |
------------------------------


GET http://localhost:3001/api/alumnos/list?activo=1


------------------------------
|   OBTENER ALUMNOS POR ID   |
------------------------------

GET http://localhost:3001/api/alumnos/get/5


-------------------------
|   ACTUALIZAR ALUMNO   |
-------------------------


PUT http://localhost:3001/api/alumnos/update/5

{
  "email": "nuevo.email@correo.com",
  "repetidor": true
}



--------------------------
|   DAR DE BAJA ALUMNO   |
--------------------------

DELETE http://localhost:3001/api/alumnos/delete/5


-----------------------------
|   ELIMINAR ALUMNO DE BD   |
-----------------------------

DELETE http://localhost:3001/api/alumnos/delete-fisico/5



----------------------------------------------
|   MOSTRAR ESTADISTICAS PARA LAS GRÁFICAS   |
----------------------------------------------

GET http://localhost:3001/api/alumnos/stats/sexo
GET http://localhost:3001/api/alumnos/stats/repetidor

