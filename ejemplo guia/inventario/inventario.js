// 
// LÓGICA DE JAVASCRIPT PARA LA VISTA DE INVENTARIO
// Controla la apertura y cierre del panel lateral (drawer) de gestión de productos.
// 
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar iconos de Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ----------------------------------------------------------------------
    // 1. Lógica del Panel Lateral (Drawer) de Producto
    // ----------------------------------------------------------------------
    const openPanelBtn = document.getElementById('open-product-panel');
    const closePanelBtn = document.getElementById('close-product-panel');
    const cancelButton = document.getElementById('cancel-button');
    const modal = document.getElementById('product-panel-modal');
    const panel = document.getElementById('product-panel');
    const panelTitle = document.getElementById('panel-title');

    // Función para abrir el panel
    function openPanel(isEdit = false) {
        if (!modal) return;
        
        // Ajustar el título si es modo edición
        panelTitle.textContent = isEdit ? 'Editar Producto' : 'Nuevo Producto';

        modal.classList.remove('hidden');
        // Aplicar la opacidad y el desplazamiento después de un pequeño retraso
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100'); 
            panel.classList.remove('translate-x-full'); 
        }, 10); 
    }

    // Función para cerrar el panel
    function closePanel() {
        if (!modal) return;
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        panel.classList.add('translate-x-full');
        // Esperar que termine la transición (300ms) antes de ocultar completamente
        setTimeout(() => {
            modal.classList.add('hidden');
            // Opcional: limpiar formulario aquí
        }, 300); 
    }

    // Eventos para abrir el panel (Modo Nuevo Producto)
    if (openPanelBtn) {
        openPanelBtn.addEventListener('click', () => openPanel(false));
    }

    // Eventos para cerrar el panel
    if (closePanelBtn) closePanelBtn.addEventListener('click', closePanel);
    if (cancelButton) cancelButton.addEventListener('click', closePanel);
    
    // Eventos para abrir el panel en modo Edición (simulado)
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => openPanel(true));
    });

    // Cierre del modal haciendo click en el fondo (overlay)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'product-panel-modal') {
                closePanel();
            }
        });
    }
    
    // ----------------------------------------------------------------------
    // 2. Lógica para Guardar Producto (Simulación)
    // ----------------------------------------------------------------------
    const productForm = document.querySelector('#product-panel form');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Datos del producto listos para guardar o actualizar.");
            // Aquí iría la lógica de guardado/fetch a la API
            closePanel(); // Cerrar el panel después de (simular) guardar
        });
    }
});
