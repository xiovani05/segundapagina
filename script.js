// Base de datos estática
const USUARIO_VALIDO = { matricula: "2025452046", password: "456" };

const MATERIAS_DATA = [
    { num: 1, docente: "GARDUÑO FLORES FRANCISCO ADRIÁN", materia: "FUNDAMENTOS DE PROGRAMACIÓN", p1: 70, p2: 70, p3: 95, grupo: "1ISC21" },
    { num: 2, docente: "RAMIREZ HIDALGO JUAN ALBERTO", materia: "ÁLGEBRA LINEAL", p1: 71, p2: 86, p3: 95, grupo: "2ISC11" },
    { num: 3, docente: "CRUZ MONTIEL MARIO", materia: "CÁLCULO INTEGRAL", p1: 72, p2: 94, p3: 95, grupo: "2ISC11" },
    { num: 4, docente: "ZAMORA TÉLLEZ MERCEDES DAMARIS", materia: "CONTABILIDAD FINANCIERA", p1: 74, p2: 80, p3: 100, grupo: "2ISC11" },
    { num: 5, docente: "MENDEZ CALVA JULIO CESAR", materia: "PROBABILIDAD Y ESTADÍSTICA", p1: 92, p2: 70, p3: 85, grupo: "2ISC11" },
    { num: 6, docente: "LLINAS PEREZ MARCO ANTONIO", materia: "PROGRAMACIÓN ORIENTADA A OBJETOS", p1: 90, p2: 85, p3: 100, grupo: "2ISC11" },
    { num: 7, docente: "SOLIS PEREZ SHARON", materia: "QUÍMICA", p1: 95, p2: 95, p3: 85, grupo: "2ISC11" }
];

// Login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const mat = document.getElementById('matricula').value.trim();
    const pass = document.getElementById('password').value;

    if (mat === USUARIO_VALIDO.matricula && pass === USUARIO_VALIDO.password) {
        document.getElementById('login-page-container').classList.add('hidden');
        document.getElementById('dashboard-container').classList.remove('hidden');
        
        // Carga por defecto parciales
        document.getElementById('reportes-submenu').classList.remove('hidden');
        resetearEstilosMenu();
        document.querySelector('[onclick="conmutarReportes()"]').classList.add('active');
        document.getElementById('sub-item-parciales').classList.add('active');
        
        mostrarSeccionContenido('tab-parciales');
        construirTablaGrd();
    } else {
        document.getElementById('login-error').textContent = "Matrícula o contraseña incorrectas. Inténtalo de nuevo.";
    }
});

// Navegación de botones raíz (Registro, Usuario)
function navegarALink(tabId) {
    document.getElementById('reportes-submenu').classList.add('hidden'); // Cierra reportes
    resetearEstilosMenu();
    
    // Ilumina el botón correspondiente
    const eventBtn = event.currentTarget;
    if(eventBtn) eventBtn.classList.add('active');
    
    mostrarSeccionContenido(tabId);
}

// Clic al botón raíz de Reportes
function conmutarReportes() {
    const submenu = document.getElementById('reportes-submenu');
    submenu.classList.toggle('hidden'); // Abre o cierra
    
    resetearEstilosMenu();
    document.querySelector('[onclick="conmutarReportes()"]').classList.add('active');
    document.getElementById('sub-item-parciales').classList.add('active');
    
    mostrarSeccionContenido('tab-parciales');
    construirTablaGrd();
}

// Clic a las opciones internas de Reportes
function navegarASubmenu(tabId, element) {
    const subItems = document.querySelectorAll('.submenu-item');
    subItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    
    resetearEstilosMenu();
    document.querySelector('[onclick="conmutarReportes()"]').classList.add('active');
    
    mostrarSeccionContenido(tabId);
}

// Limpiador de estilos de botones
function resetearEstilosMenu() {
    const btns = document.querySelectorAll('.menu-btn');
    btns.forEach(b => b.classList.remove('active'));
    const subItems = document.querySelectorAll('.submenu-item');
    subItems.forEach(s => s.classList.remove('active'));
}

// Alternar contenedores centrales
function mostrarSeccionContenido(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => t.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
}

// Renderizador de filas
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
