// Base de datos simulada del estudiante
const USUARIO_VALIDO = {
    matricula: "2025452046",
    password: "alumno123"
};

// Tus 7 materias con calificaciones
const MATERIAS_DATA = [
    { nombre: "Programación Orientada a Objetos", p1: 96, p2: 97, p3: 95 },
    { nombre: "Cálculo Integral", p1: 95, p2: 98, p3: 95 },
    { nombre: "Álgebra Lineal", p1: 97, p2: 95, p3: 95 },
    { nombre: "Contabilidad", p1: 98, p2: 96, p3: 100 },
    { nombre: "Fundamentos de Programación", p1: 95, p2: 99, p3: 100 },
    { nombre: "Química", p1: 96, p2: 97, p3: 85 },
    { nombre: "Probabilidad", p1: 97, p2: 95, p3: 85 }
];

const loginForm = document.getElementById('login-form');
const loginPageContainer = document.getElementById('login-page-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginError = document.getElementById('login-error');
const gradesTableBody = document.getElementById('grades-table-body');
const logoutBtn = document.getElementById('logout-btn');

// Elementos del submenú
const btnReportesMain = document.getElementById('btn-reportes-main');
const reportesSubmenu = document.getElementById('reportes-submenu');

// Iniciar sesión
loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const matriculaIngresada = document.getElementById('matricula').value.trim();
    const passwordIngresada = document.getElementById('password').value;

    if (matriculaIngresada === USUARIO_VALIDO.matricula && passwordIngresada === USUARIO_VALIDO.password) {
        loginPageContainer.classList.add('hidden');
        dashboardContainer.classList.remove('hidden');
        
        // Abre el submenú de Reportes por defecto y muestra parciales
        reportesSubmenu.classList.remove('hidden');
        activarContenidoCentral('tab-parciales');
        cargarCalificaciones();
    } else {
        loginError.textContent = "Matrícula o contraseña incorrectas. Inténtalo de nuevo.";
    }
});

// INTERACCIÓN DE BOTONES PRINCIPALES (Registro, Reportes, Usuario)
const mainButtons = document.querySelectorAll('.sidebar-menu > .menu-btn:not(#logout-btn)');
const submenuItems = document.querySelectorAll('.submenu-item');

mainButtons.forEach(button => {
    button.addEventListener('click', function() {
        mainButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Si se hace clic en Reportes, despliega o repliega el submenú
        if (this.id === 'btn-reportes-main') {
            reportesSubmenu.classList.toggle('hidden');
            // Al abrir Reportes, activa automáticamente la primera opción interna
            submenuItems.forEach(item => item.classList.remove('active'));
            submenuItems[0].classList.add('active');
            activarContenidoCentral('tab-parciales');
        } else {
            // Si hace clic en Registro o Usuario, oculta el submenú de Reportes automáticamente
            reportesSubmenu.classList.add('hidden');
            const targetTabId = this.getAttribute('data-tab');
            activarContenidoCentral(targetTabId);
        }
    });
});

// INTERACCIÓN DE LAS OPCIONES INTERNAS DEL SUBMENÚ (Calificaciones parciales, finales, etc)
submenuItems.forEach(item => {
    item.addEventListener('click', function() {
        submenuItems.forEach(si => si.classList.remove('active'));
        this.classList.add('active');
        
        const targetTabId = this.getAttribute('data-tab');
        activarContenidoCentral(targetTabId);
    });
});

// Cambiar visibilidad de las ventanas de información
function activarContenidoCentral(tabId) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.add('hidden'));
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.remove('hidden');
    }
}

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

logoutBtn.addEventListener('click', function() {
    dashboardContainer.classList.add('hidden');
    loginPageContainer.classList.remove('hidden');
    loginForm.reset();
    loginError.textContent = "";
});
