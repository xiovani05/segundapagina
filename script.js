// Base de datos simulada del estudiante
const USUARIO_VALIDO = {
    matricula: "2025452046",
    password: "2025452046"
};

// Tus 7 materias con las especificaciones exactas de calificaciones
const MATERIAS_DATA = [
    { nombre: "Programación Orientada a Objetos", p1: 96, p2: 97, p3: 95 },
    { nombre: "Cálculo Integral", p1: 95, p2: 98, p3: 95 },
    { nombre: "Álgebra Lineal", p1: 97, p2: 95, p3: 95 },
    { nombre: "Contabilidad", p1: 98, p2: 96, p3: 100 },
    { nombre: "Fundamentos de Programación", p1: 95, p2: 99, p3: 100 },
    { nombre: "Química", p1: 96, p2: 97, p3: 85 },
    { nombre: "Probabilidad", p1: 97, p2: 95, p3: 85 }
];

// Captura de elementos de la interfaz
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginError = document.getElementById('login-error');
const userMatriculaSpan = document.getElementById('user-matricula');
const gradesTableBody = document.getElementById('grades-table-body');
const logoutBtn = document.getElementById('logout-btn');

// Manejador del Inicio de Sesión
loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que recargue la página
    
    const matriculaIngresada = document.getElementById('matricula').value.trim();
    const passwordIngresada = document.getElementById('password').value;

    // Validación estática
    if (matriculaIngresada === USUARIO_VALIDO.matricula && passwordIngresada === USUARIO_VALIDO.password) {
        // Acceso correcto: Cambiar de pantalla
        loginContainer.classList.add('hidden');
        dashboardContainer.classList.remove('hidden');
        
        // Colocar la matrícula en la tarjeta de perfil
        userMatriculaSpan.textContent = matriculaIngresada;
        
        // Renderizar la tabla de calificaciones
        cargarCalificaciones();
    } else {
        // Acceso incorrecto
        loginError.textContent = "Matrícula o contraseña incorrectas. Inténtalo de nuevo.";
    }
});

// Función para procesar y construir la tabla
function cargarCalificaciones() {
    gradesTableBody.innerHTML = ""; // Limpiar tabla por si acaso
    
    MATERIAS_DATA.forEach(materia => {
        // Calcular promedio de los 3 parciales automáticamente
        const promedioFinal = ((materia.p1 + materia.p2 + materia.p3) / 3).toFixed(1);
        
        // Crear la fila HTML
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>${materia.nombre}</strong></td>
            <td>${materia.p1}</td>
            <td>${materia.p2}</td>
            <td>${materia.p3}</td>
            <td class="final-grade">${promedioFinal}</td>
        `;
        
        // Inyectarla en la tabla
        gradesTableBody.appendChild(fila);
    });
}

// Botón de Cerrar Sesión
logoutBtn.addEventListener('click', function() {
    dashboardContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    loginForm.reset();
    loginError.textContent = "";
});
