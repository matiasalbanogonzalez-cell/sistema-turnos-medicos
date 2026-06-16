Proyecto desarrollado como trabajo final de Programación 2.

👨‍💻 Alumno: Matias Gozalez
👨‍🏫 Profesor: Santiago Henn


🏥 Sistema de Turnos Médicos

👨‍💻 
👨‍🏫
Proyecto desarrollado como trabajo final de Programación 2.

Aplicación backend desarrollada con Node.js, Express y MongoDB, que permite gestionar usuarios, profesionales y turnos médicos con autenticación mediante JWT.

🚀 Tecnologías utilizadas
Node.js
Express
MongoDB + Mongoose
JSON Web Token (JWT)
bcryptjs
dotenv
cors
helmet
morgan
nodemon (desarrollo)
jest (testing)
📦 Instalación del proyecto
1. Clonar el repositorio
git clone <https://github.com/matiasalbanogonzalez-cell/sistema-turnos-medicos>
cd sistema-turnos-medicos
2. Instalar dependencias
npm install

Esto descargará automáticamente todas las librerías necesarias definidas en package.json.

⚙️ Configuración del entorno (.env)

Crear un archivo .env en la raíz del proyecto:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/turnos_medicos
JWT_SECRET=tu_clave_secreta

Si usás MongoDB Atlas, reemplazá la URI por la de tu cluster.

▶️ Ejecución del proyecto
Modo desarrollo
npm run dev
Modo producción
npm start
📁 Estructura del proyecto (ejemplo)
src/
 ├── config/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── app.js
 └── server.js
🔐 Funcionalidades principales
Registro de usuarios
Login con autenticación JWT
Roles: admin / cliente
Gestión de profesionales
Creación y administración de turnos médicos
Validaciones con Mongoose
📌 Endpoints principales
Auth
POST /api/auth/register
POST /api/auth/login
Usuarios
GET /api/users
Profesionales
GET /api/profesionales
POST /api/profesionales
Turnos
GET /api/turnos
POST /api/turnos
PUT /api/turnos/:id
DELETE /api/turnos/:id
🧪 Testing

Ejecutar tests con Jest:

npm test
⚠️ Requisitos previos
Node.js instalado
MongoDB local o Atlas
Variables de entorno configuradas
👨‍💻 
👨‍🏫
Proyecto desarrollado como trabajo final de Programación 2.