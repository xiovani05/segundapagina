// Base de datos simulada del estudiante
const USUARIO_VALIDO = {
    matricula: "2025452046",
    password: "1234"
};

// Tus 7 materias oficiales del TESCHI
const MATERIAS_DATA = [
    { num: 1, docente: "GARDUÑO FLORES FRANCISCO ADRIÁN", materia: "FUNDAMENTOS DE PROGRAMACIÓN", p1: 100, p2:90, p3: 98, grupo: "1ISC21" },
    { num: 2, docente: "RAMIREZ HIDALGO JUAN ALBERTO", materia: "ÁLGEBRA LINEAL", p1: 92, p2: 100, p3: 100, grupo: "2ISC11" },
    { num: 3, docente: "CRUZ MONTIEL MARIO", materia: "CÁLCULO INTEGRAL", p1: 100, p2: 100, p3: 99, grupo: "2ISC11" },
    { num: 4, docente: "ZAMORA TÉLLEZ MERCEDES DAMARIS", materia: "CONTABILIDAD FINANCIERA", p1: 94, p2: 90, p3: 100, grupo: "2ISC11" },
    { num: 5, docente: "MENDEZ CALVA JULIO CESAR", materia: "PROBABILIDAD Y ESTADÍSTICA", p1: 100, p2: 90, p3: 95, grupo: "2ISC11" },
    { num: 6, docente: "LLINAS PEREZ MARCO ANTONIO", materia: "PROGRAMACIÓN ORIENTADA A OBJETOS", p1: 90, p2: 100, p3: 100, grupo: "2ISC11" },
    { num: 7, docente: "SOLIS PEREZ SHARON", materia: "QUÍMICA", p1: 95, p2: 95, p3: 85, grupo: "2ISC11" }
];

const loginForm = document.getElementById('login-form');
const loginPageContainer = document.getElementById('login-page-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginError = document.getElementById('login-error');
const gradesTableBody = document.getElementById('grades-table-body');
const finalGradesTableBody = document.getElementById('final-grades-table-body');
const logoutBtn = document.getElementById('logout-btn');

const reportesSubmenu = document.getElementById('reportes-submenu');

// Manejador del Inicio de Sesión
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const matriculaIngresada = document.getElementById('matricula').value.trim();
        const passwordIngresada = document.getElementById('password').value;

        if (matriculaIngresada === USUARIO_VALIDO.matricula && passwordIngresada === USUARIO_VALIDO.password) {
            loginPageContainer.classList.add('hidden');
            dashboardContainer.classList.remove('hidden');
            
            reportesSubmenu.classList.remove('hidden');
            activarContenidoCentral('tab-parciales');
            cargarCalificaciones();
            cargarCalificacionesFinales(); // Carga también la nueva tabla en segundo plano
        } else {
            loginError.textContent = "Matrícula o contraseña incorrectas. Inténtalo de nuevo.";
        }
    });
}

// INTERACCIÓN DE BOTONES PRINCIPALES (Registro, Reportes, Usuario)
const mainButtons = document.querySelectorAll('.sidebar-menu .menu-btn:not(#logout-btn)');
const submenuItems = document.querySelectorAll('.submenu-item');

mainButtons.forEach(button => {
    button.addEventListener('click', function() {
        mainButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        if (this.id === 'btn-reportes-main') {
            reportesSubmenu.classList.toggle('hidden');
            
            if (!reportesSubmenu.classList.contains('hidden')) {
                submenuItems.forEach(item => item.classList.remove('active'));
                if (submenuItems.length > 0) {
                    submenuItems[0].classList.add('active');
                }
                activarContenidoCentral('tab-parciales');
            }
        } else {
            reportesSubmenu.classList.add('hidden');
            const targetTabId = this.getAttribute('data-tab');
            activarContenidoCentral(targetTabId);
        }
    });
});

// INTERACCIÓN DE LAS OPCIONES INTERNAS DE REPORTES
submenuItems.forEach(item => {
    item.addEventListener('click', function() {
        submenuItems.forEach(si => si.classList.remove('active'));
        this.classList.add('active');
        
        const targetTabId = this.getAttribute('data-tab');
        activarContenidoCentral(targetTabId);
    });
});

function activarContenidoCentral(tabId) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.add('hidden'));
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.remove('hidden');
    }
}

// Tabla de Calificaciones Parciales
function cargarCalificaciones() {
    if (!gradesTableBody) return;
    gradesTableBody.innerHTML = ""; 
    MATERIAS_DATA.forEach(row => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="center-text">${row.num}</td>
            <td class="text-left font-small">${row.docente}</td>
            <td class="text-left font-small">${row.materia}</td>
            <td class="center-text">${row.p1}</td>
            <td class="center-text">${row.p2}</td>
            <td class="center-text">${row.p3}</td>
            <td class="center-text font-small">${row.grupo}</td>
        `;
        gradesTableBody.appendChild(fila);
    });
}

// NUEVA FUNCIÓN: Tabla de Calificaciones Finales (idéntica a tu imagen)
function cargarCalificacionesFinales() {
    if (!finalGradesTableBody) return;
    finalGradesTableBody.innerHTML = "";
    MATERIAS_DATA.forEach(row => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="center-text">${row.num}</td>
            <td class="text-left font-small">${row.docente}</td>
            <td class="text-left font-small">${row.materia}</td>
            <td class="center-text"></td> <!-- Primera vuelta vacía -->
            <td class="center-text"></td> <!-- Segunda vuelta vacía -->
            <td class="center-text font-small">${row.grupo}</td>
        `;
        finalGradesTableBody.appendChild(fila);
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        dashboardContainer.classList.add('hidden');
        loginPageContainer.classList.remove('hidden');
        loginForm.reset();
        loginError.textContent = "";
    });
}
