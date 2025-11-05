// 1. Inicializar iconos de Lucide (Solo necesario en este entorno de demo)
lucide.createIcons();

// 2. Script para manejar la activación de la pestaña ANTES de navegar
const mobileTabs = document.querySelectorAll('.tab-item-mobile');
const desktopNavItems = document.querySelectorAll('.nav-item-desktop');


// --- FUNCIÓN UNIFICADA PARA MANEJO DE CLASE ACTIVE ---
function setActiveClass(targetTab) {
    // 1. Manejo de pestañas móviles
    mobileTabs.forEach(t => t.classList.remove('active'));
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // 2. Manejo de navegación de escritorio (si aplica)
    desktopNavItems.forEach(t => {
        t.classList.remove('bg-teal-50', 'text-teal-800', 'font-semibold', 'shadow-sm');
        t.classList.add('text-gray-600', 'hover:bg-gray-100');
    });
    // Nota: La lógica de 'active' en escritorio debe ser manejada
    // por la página de destino si estamos en navegación real.

    // Opcional: Esto ya no es necesario si cada módulo es una página separada,
    // pero lo dejamos como registro de la intención original.
    const tabName = targetTab ? targetTab.querySelector('span').textContent : 'Dashboard';
    console.log(`Activando pestaña: ${tabName}`);
}


// --- EVENT LISTENERS (AHORA PERMITEN LA NAVEGACIÓN) ---

// Listener para la navegación móvil (Bottom Tabs)
mobileTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        // *** IMPORTANTE: e.preventDefault() HA SIDO ELIMINADO ***
        
        // El navegador ahora seguirá el enlace 'href' después de ejecutar esto:
        
        // Opcional: Si quieres que el efecto 'active' se vea por un instante
        // antes de navegar (aunque la página de destino lo reescribirá).
        // Si el 'href' es '#' (como las pestañas no implementadas), mantenemos la clase 'active'.
        if (tab.getAttribute('href') === '#') {
             e.preventDefault();
             setActiveClass(tab);
        }
    });
});


// Listener para la navegación de escritorio (Sidebar)
desktopNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // *** IMPORTANTE: e.preventDefault() DEBE SER ELIMINADO AQUÍ TAMBIÉN SI EXISTÍA ***
        
        // Al igual que en móvil, al hacer clic en un enlace de escritorio,
        // el navegador navega a la URL especificada en 'href'.
    });
});

// 3. Inicializar el estado 'active' al cargar la página (Solo en el menú principal)
document.addEventListener('DOMContentLoaded', () => {
    // Si esta es la página agro_factura_menu.html, queremos que ningún tab esté activo
    // a menos que sea el dashboard/home, lo cual no tenemos tab inferior para ello.
    // Por lo tanto, no hacemos nada aquí para las bottom tabs, ya que deben estar inactivas.
});
