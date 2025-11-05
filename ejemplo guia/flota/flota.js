// Datos de Flota de Camiones (Mock Data)
const mockTrucks = [
    { id: 'AF-101', plate: 'PQR-789', model: 'Freightliner M2', status: 'In Transit', driver: 'Juan Pérez', nextService: '2025-12-01' },
    { id: 'AF-102', plate: 'ABC-123', model: 'Volvo VNL 860', status: 'Available', driver: 'Laura Gómez', nextService: '2025-11-15' },
    { id: 'AF-103', plate: 'XYZ-456', model: 'Kenworth T680', status: 'In Transit', driver: 'Carlos Ruiz', nextService: '2026-01-20' },
    { id: 'AF-104', plate: 'DEF-012', model: 'Volvo VNL 860', status: 'Available', driver: 'María López', nextService: '2025-11-05' },
    { id: 'AF-105', plate: 'GHI-345', model: 'International LT625', status: 'Maintenance', driver: 'Pedro Díaz', nextService: '2025-11-08' },
    { id: 'AF-106', plate: 'JKL-678', model: 'Freightliner M2', status: 'Available', driver: 'Ana Torres', nextService: '2026-02-10' },
    { id: 'AF-107', plate: 'MNO-901', model: 'Peterbilt 579', status: 'In Transit', driver: 'Ricardo Soto', nextService: '2025-12-25' },
    { id: 'AF-108', plate: 'STU-234', model: 'Kenworth T680', status: 'Available', driver: 'Elena Vega', nextService: '2026-03-01' },
    { id: 'AF-109', plate: 'VWX-567', model: 'International LT625', status: 'Available', driver: 'Felipe Núñez', nextService: '2025-12-05' },
];

/**
 * Función para simular un retardo asíncrono (como una llamada a API).
 * @param {number} ms - Milisegundos de retardo.
 * @returns {Promise<void>}
 */
const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Determina las clases de Tailwind CSS para el color del estado.
 * @param {string} status - El estado del camión ('In Transit', 'Available', 'Maintenance').
 * @returns {string} Clases CSS para el estado.
 */
function getStatusClasses(status) {
    switch (status) {
        case 'In Transit':
            return 'bg-yellow-100 text-yellow-800';
        case 'Available':
            return 'bg-green-100 text-green-800';
        case 'Maintenance':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

/**
 * Renderiza dinámicamente las filas de camiones en el cuerpo de la tabla.
 * @param {Array<Object>} trucks - La lista de objetos camión a renderizar.
 */
function renderTrucks(trucks) {
    const tbody = document.getElementById('truck-list-body');
    if (!tbody) return;

    // Limpiar contenido anterior
    tbody.innerHTML = '';

    trucks.forEach(truck => {
        const statusClasses = getStatusClasses(truck.status);
        const nextServiceDate = new Date(truck.nextService);
        const today = new Date();
        // Calcula la diferencia en días
        const diffDays = Math.ceil((nextServiceDate - today) / (1000 * 60 * 60 * 24));

        let serviceClass = 'text-gray-600';
        let serviceText = truck.nextService;
        
        if (diffDays <= 7 && diffDays >= 0) {
            serviceClass = 'text-yellow-600 font-semibold'; // Próximo
            serviceText += ' (Próximo)';
        } else if (diffDays < 0) {
            serviceClass = 'text-red-600 font-bold'; // Vencido
            serviceText += ' (Vencido)';
        }

        const row = document.createElement('tr');
        // Usa la clase 'truck-row' definida en flota.css para la responsividad móvil
        row.className = 'truck-row';
        
        // Creamos las celdas y usamos el atributo data-label para la vista móvil
        row.innerHTML = `
            <td data-label="Placa" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${truck.plate}</td>
            <td data-label="Modelo" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${truck.model}</td>
            <td data-label="Estado" class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses}">
                    ${truck.status}
                </span>
            </td>
            <td data-label="Conductor" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${truck.driver}</td>
            <td data-label="Próx. Servicio" class="px-6 py-4 whitespace-nowrap text-sm ${serviceClass}">
                ${serviceText}
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Actualiza los contadores de las tarjetas de resumen.
 * @param {Array<Object>} trucks - La lista de objetos camión para calcular estadísticas.
 */
function updateStats(trucks) {
    const totalTrucks = trucks.length;
    const availableTrucks = trucks.filter(t => t.status === 'Available').length;
    const inTransitTrucks = trucks.filter(t => t.status === 'In Transit').length;
    const maintenanceTrucks = trucks.filter(t => t.status === 'Maintenance').length;

    document.getElementById('total-trucks-stat').textContent = totalTrucks;
    document.getElementById('available-trucks-stat').textContent = availableTrucks;
    document.getElementById('in-transit-stat').textContent = inTransitTrucks;
    document.getElementById('maintenance-stat').textContent = maintenanceTrucks;
}

/**
 * Inicializa el dashboard: carga los datos y configura los eventos.
 */
async function initDashboard() {
    // Simular carga de datos con un retardo para la UX (ej. spinner de Ionic)
    await delay(500); 
    
    // 1. Renderizar la lista y estadísticas
    renderTrucks(mockTrucks);
    updateStats(mockTrucks);

    // 2. Configurar el toggle del menú para móviles
    setupMenuToggle();
}

/**
 * Configura los event listeners para el menú lateral en dispositivos móviles.
 */
function setupMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            // Toggle de clases para mostrar/ocultar el sidebar en móvil
            if (sidebar.classList.contains('hidden')) {
                sidebar.classList.remove('hidden');
                // Posicionar el sidebar de forma absoluta para que cubra la pantalla
                sidebar.classList.add('absolute', 'top-0', 'left-0', 'h-full', 'z-20', 'shadow-2xl');
            } else {
                sidebar.classList.add('hidden');
                sidebar.classList.remove('absolute', 'top-0', 'left-0', 'h-full', 'z-20', 'shadow-2xl');
            }
        });

        // Ocultar el menú si se hace clic fuera de él (útil en móvil)
        document.addEventListener('click', function(event) {
            // Comprobamos si estamos en móvil y si el menú está abierto
            if (!sidebar.classList.contains('hidden') && window.innerWidth < 1024) {
                // Si el clic no fue en el sidebar ni en el botón de toggle
                if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                    sidebar.classList.add('hidden');
                    sidebar.classList.remove('absolute', 'top-0', 'left-0', 'h-full', 'z-20', 'shadow-2xl');
                }
            }
        });
    }
}

// Inicializar el dashboard al cargar el DOM
window.onload = initDashboard;
