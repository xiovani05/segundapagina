// Base de datos de acceso autorizada
const USUARIO_VALIDO = {
    matricula: "2025452046",
    password: "alumno123"
};

// Matriz de materias oficiales del SIIA
const MATERIAS_DATA = [
    { num: 1, docente: "GARDUÑO FLORES FRANCISCO ADRIÁN", materia: "FUNDAMENTOS DE PROGRAMACIÓN", p1: 70, p2: 70, p3: 95, grupo: "1ISC21" },
    { num: 2, docente: "RAMIREZ HIDALGO JUAN ALBERTO", materia: "ÁLGEBRA LINEAL", p1: 71, p2: 86, p3: 95, grupo: "2ISC11" },
    { num: 3, docente: "CRUZ MONTIEL MARIO", materia: "CÁLCULO INTEGRAL", p1: 72, p2: 94, p3: 95, grupo: "2ISC11" },
    { num: 4, docente: "ZAMORA TÉLLEZ MERCEDES DAMARIS", materia: "CONTABILIDAD FINANCIERA", p1: 74, p2: 80, p3: 100, grupo: "2ISC11" },
    { num: 5, docente: "MENDEZ CALVA JULIO CESAR", materia: "PROBABILIDAD Y ESTADÍSTICA", p1: 92, p2: 70, p3: 85, grupo: "2ISC11" },
    { num: 6, docente: "LLINAS PEREZ MARCO ANTONIO", materia: "PROGRAMACIÓN ORIENTADA A OBJETOS", p1: 90, p2: 85, p3: 100, grupo: "2ISC11" },
    { num: 7, docente: "SOLIS PEREZ SHARON", materia: "QUÍMICA", p1: 95, p2: 95, p3: 85, grupo: "2ISC11" }
];

// FUNCIÓN GLOBAL INVOCADA POR EL BOTÓN DIRECTAMENTE
function intentarAccederAlSIIA() {
    const inputMatricula = document.getElementById('matricula').value.trim();
    const inputPassword = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    if (inputMatricula === USUARIO_VALIDO.matricula && inputPassword === USUARIO_VALIDO.password) {
        // Acceso aprobado: Cambiar visibilidad de paneles
        document.getElementById('login-page-container').classList.add('hidden');
        document.getElementById('dashboard-container').classList.remove('hidden');
        
        // Desplegar menú de reportes y activar pestaña de parciales por defecto
        document.getElementById('reportes-submenu').classList.remove('hidden');
        resetearEstilosMenu();
        
        document.getElementById('btn-reportes-main').classList.add('active');
        
        const subPar = document.getElementById('sub-item-parciales');
        if (subPar) subPar.classList.add('active');
        
        mostrarSeccionContenido('tab-parciales');
        construirTablaGrd();
        if (loginError) loginError.textContent = "";
    } else {
        // Acceso rechazado
        if (loginError) {
            loginError.textContent = "Matrícula o contraseña incorrectas. Inténtalo de nuevo.";
        }
    }
}

// Navegación principal de la barra lateral verde
function navegarALink(tabId) {
    document.getElementById('reportes-submenu').classList.add('hidden');
    resetearEstilosMenu();
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
    mostrarSeccionContenido(tabId);
}

// Conmutar apertura/cierre de la pestaña de Reportes
function conmutarReportes() {
    const submenu = document.getElementById('reportes-submenu');
    submenu.classList.toggle('hidden');
    
    resetearEstilosMenu();
    document.getElementById('btn-reportes-main').classList.add('active');
    
    const subPar = document.getElementById('sub-item-parciales');
    if (subPar) subPar.classList.add('active');
    
    mostrarSeccionContenido('tab-parciales');
    construirTablaGrd();
}

// Seleccionar un sub-element dentro del acordeón de reportes
function navegarASubmenu(tabId, element) {
    const subItems = document.querySelectorAll('.submenu-item');
    subItems.forEach(item => item.classList.remove('active'));
    if (element) element.classList.add('active');
    
    resetearEstilosMenu();
    document.getElementById('btn-reportes-main').classList.add('active');
    
    mostrarSeccionContenido(tabId);
}

function resetearEstilosMenu() {
    const btns = document.querySelectorAll('.menu-btn');
    btns.forEach(b => b.classList.remove('active'));
    const subItems = document.querySelectorAll('.submenu-item');
    subItems.forEach(s => s.classList.remove('active'));
}

function mostrarSeccionContenido(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => t.classList.add('hidden'));
    const target = document.getElementById(tabId);
    if (target) target.classList.remove('hidden');
}

function construirTablaGrd() {
    const tbody = document.getElementById('grades-table-body');
    if (!tbody) return;
    tbody.innerHTML = "";
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
        tbody.appendChild(fila);
    });
}

function cerrarSesionPortal() {
    document.getElementById('dashboard-container').classList.add('hidden');
    document.getElementById('login-page-container').classList.remove('hidden');
    document.getElementById('matricula').value = "";
    document.getElementById('password').value = "";
    const loginError = document.getElementById('login-error');
    if (loginError) loginError.textContent = "";
}
