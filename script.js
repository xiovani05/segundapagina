// Base de datos de acceso autorizada
const USUARIO_VALIDO = {
    matricula: "2025452046",
    password: "1223"
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

// PROCESO DE LOGUEO DIRECTO (SIN DOMCONTENTLOADED)
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputMatricula = document.getElementById('matricula').value.trim();
        const inputPassword = document.getElementById('password').value;

        if (inputMatricula === USUARIO_VALIDO.matricula && inputPassword === USUARIO_VALIDO.password) {
            // Ocultar login y mostrar dashboard
            document.getElementById('login-page-container').classList.add('hidden');
            document.getElementById('dashboard-container').classList.remove('hidden');
            
            // Configurar menú inicial
            document.getElementById('reportes-submenu').classList.remove('hidden');
            resetearEstilosMenu();
            
            document.getElementById('btn-reportes-main').classList.add('active');
            document.getElementById('sub-item-parciales').classList.add('active');
            
            mostrarSeccionContenido('tab-parciales');
            construirTablaGrd();
        } else {
            document.getElementById('login-error').textContent = "Matrícula o contraseña incorrectas. Inténtalo de nuevo.";
        }
    });
}

// Navegación principal lateral
function navegarALink(tabId) {
    document.getElementById('reportes-submenu').classList.add('hidden');
    resetearEstilosMenu();
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    mostrarSeccionContenido(tabId);
}

// Clic al menú raíz Reportes
function conmutarReportes() {
    const submenu = document.getElementById('reportes-submenu');
    submenu.classList.toggle('hidden');
    
    resetearEstilosMenu();
    document.getElementById('btn-reportes-main').classList.add('active');
    document.getElementById('sub-item-parciales').classList.add('active');
    
    mostrarSeccionContenido('tab-parciales');
    construirTablaGrd();
}

// Clic a las subopciones de Reportes
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
    document.getElementById('login-form').reset();
    document.getElementById('login-error').textContent = "";
}
