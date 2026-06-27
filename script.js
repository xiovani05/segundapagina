// Base de datos simulada del estudiante
const USUARIO_VALIDO = {
    matricula: "2025452046",
    password: "1123"
};

// Tus 7 materias con los docentes, calificaciones y grupos exactos de tu imagen
const MATERIAS_DATA = [
    { num: 1, docente: "GARDUÑO FLORES FRANCISCO ADRIÁN", materia: "FUNDAMENTOS DE PROGRAMACIÓN", p1: 70, p2: 70, p3: 95, grupo: "1ISC21" },
    { num: 2, docente: "RAMIREZ HIDALGO JUAN ALBERTO", materia: "ÁLGEBRA LINEAL", p1: 71, p2: 86, p3: 95, grupo: "2ISC11" },
    { num: 3, docente: "CRUZ MONTIEL MARIO", materia: "CÁLCULO INTEGRAL", p1: 72, p2: 94, p3: 95, grupo: "2ISC11" },
    { num: 4, docente: "ZAMORA TÉLLEZ MERCEDES DAMARIS", materia: "CONTABILIDAD FINANCIERA", p1: 74, p2: 80, p3: 100, grupo: "2ISC11" },
    { num: 5, docente: "MENDEZ CALVA JULIO CESAR", materia: "PROBABILIDAD Y ESTADÍSTICA", p1: 92, p2: 70, p3: 85, grupo: "2ISC11" },
    { num: 6, docente: "LLINAS PEREZ MARCO ANTONIO", materia: "PROGRAMACIÓN ORIENTADA A OBJETOS", p1: 90, p2: 85, p3: 100, grupo: "2ISC11" },
    { num: 7, docente: "SOLIS PEREZ SHARON", materia: "QUÍMICA", p1: 95, p2: 95, p3: 85, grupo: "2ISC11" }
];

const loginForm = document.getElementById('login-form');
const loginPageContainer = document.getElementById('login-page-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginError = document.getElementById('login-error');
const gradesTableBody = document.getElementById('grades-table-body');
const logoutBtn = document.getElementById('logout-btn');

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
        
        // Comportamiento inicial correcto: abrir menú de reportes y cargar parciales
        reportesSubmenu.classList.remove('hidden');
        activarContenidoCentral('tab-parciales');
        cargarCalificaciones();
    } else {
        loginError.textContent = "Matrícula o contraseña incorrectas. Inténtalo de nuevo.";
    }
});

// INTERACCIÓN DE BOTONES PRINCIPALES (Registro, Reportes, Usuario)
const mainButtons = document.querySelectorAll('.sidebar-menu > .menu-btn:not(#logout-btn)');
const submenuItems = document.querySelectorAll('.submenu-content .submenu-item');

mainButtons.forEach(button => {
    button.addEventListener('click', function() {
        mainButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        if (this.id === 'btn-reportes-main') {
            // Alterna la visibilidad del submenú
            reportesSubmenu.classList.toggle('hidden');
            
            // Si se abrió, activa por defecto la primera opción de la lista
            if (!reportesSubmenu.classList.contains('hidden')) {
                submenuItems.forEach(item => item.classList.remove('active'));
                if (submenuItems.length > 0) {
                    submenuItems[0].classList.add('active');
                }
                activarContenidoCentral('tab-parciales');
            }
        } else {
            // Si hace clic en Registro o Usuario, oculta Reportes automáticamente
            reportesSubmenu.classList.add('hidden');
            const targetTabId = this.getAttribute('data-tab');
            activarContenidoCentral(targetTabId);
        }
    });
});

// INTERACCIÓN DE LAS OPCIONES INTERNAS DEL SUBMENÚ
submenuItems.forEach(item => {
    item.addEventListener('click', function() {
        submenuItems.forEach(si => si.classList.remove('active'));
        this.classList.add('active');
        
        const targetTabId = this.getAttribute('data-tab');
        activarContenidoCentral(targetTabId);
    });
});

// Cambiar visibilidad de las ventanas de información de forma limpia
function activarContenidoCentral(tabId) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.add('hidden'));
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.remove('hidden');
    }
}

// Renderizar la tabla con los datos del SIIA
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

// Botón de Cerrar Sesión
logoutBtn.addEventListener('click', function() {
    dashboardContainer.classList.add('hidden');
    loginPageContainer.classList.remove('hidden');
    loginForm.reset();
    loginError.textContent = "";
});
