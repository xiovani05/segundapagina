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

// Captura de elementos principales de la interfaz
const loginForm = document.getElementById('login-form');
const loginPageContainer = document.getElementById('login-page-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginError = document.getElementById('login-error');
const gradesTableBody = document.getElementById('grades-table-body');
const logoutBtn = document.getElementById('logout-btn');

// Manejador del Inicio de Sesión
loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const matriculaIngresada = document.getElementById('matricula').value.trim();
    const passwordIngresada = document.getElementById('password').value;

    if (matriculaIngresada === USUARIO_VALIDO.matricula && passwordIngresada === USUARIO_VALIDO.password) {
        // Acceso correcto: Ocultar login y mostrar dashboard
        loginPageContainer.classList.add('hidden');
        dashboardContainer.classList.remove('hidden');
        
        // Cargar por defecto la pestaña de reportes (calificaciones)
        activarPestana('tab-reportes');
        cargarCalificaciones();
    } else {
        loginError.textContent = "Matrícula o contraseña incorrectas. Inténtalo de nuevo.";
    }
});

// LÓGICA DE LA NAVEGACIÓN LATERAL INTERACTIVA
const menuButtons = document.querySelectorAll('.sidebar-menu .menu-btn:not(#logout-btn)');

menuButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Quitar la clase 'active' de todos los botones
        menuButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar la clase 'active' al botón presionado
        this.classList.add('active');
        
        // Obtener el ID del apartado correspondiente
        const targetTabId = this.getAttribute('data-tab');
        
        // Activar la vista del apartado correspondiente
        activarPestana(targetTabId);
    });
});

// Función para alternar la visibilidad de los contenidos
function activarPestana(tabId) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.add('hidden'); // Ocultar todas
    });
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.remove('hidden'); // Mostrar solo la seleccionada
    }
}

// Función para inyectar la tabla de calificaciones
function cargarCalificaciones() {
    gradesTableBody.innerHTML = ""; 
    
    MATERIAS_DATA.forEach(materia => {
        const promedioFinal = ((materia.p1 + materia.p2 + materia.p3) / 3).toFixed(1);
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>${materia.nombre}</strong></td>
            <td class="center-text">${materia.p1}</td>
            <td class="center-text">${materia.p2}</td>
            <td class="center-text">${materia.p3}</td>
            <td class="final-grade">${promedioFinal}</td>
        `;
        gradesTableBody.appendChild(fila);
    });
}

// Botón de Cerrar Sesión
logoutBtn.addEventListener('click', function() {
    dashboardContainer.classList.add('hidden');
    loginPageContainer.classList.remove('hidden');
    loginForm.reset();
    loginError.textContent = "";
});
