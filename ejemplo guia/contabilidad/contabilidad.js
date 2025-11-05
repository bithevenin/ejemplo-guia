document.addEventListener('DOMContentLoaded', () => {

    // 1. Inicializar iconos de Lucide (Si no se cargan automáticamente)
    // Es posible que necesites llamarlo si los iconos no aparecen en el panel
    // lucide.createIcons(); 

    // 2. Referencias a elementos del DOM para el panel de transacciones
    const panelContainer = document.getElementById('transaction-panel');
    const panelContent = document.getElementById('transaction-panel-content');
    const overlay = document.getElementById('transaction-panel-overlay');
    const openBtn = document.getElementById('open-panel-btn');
    const closeBtn = document.getElementById('close-panel-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    // 3. Función para abrir el panel
    const openPanel = () => {
        if (panelContainer) {
            panelContainer.classList.add('open');
            // Re-inicializar iconos por si acaso (especialmente para el panel)
            lucide.createIcons();
        }
    };

    // 4. Función para cerrar el panel
    const closePanel = () => {
        if (panelContainer) {
            panelContainer.classList.remove('open');
        }
    };

    // 5. Asignar Eventos
    if (openBtn) {
        openBtn.addEventListener('click', openPanel);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closePanel);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closePanel);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closePanel);
    }

    // 6. Lógica para los botones de tipo de transacción (Ingreso/Egreso)
    const radioButtons = document.querySelectorAll('.form-radio-button');
    radioButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar 'active' de todos
            radioButtons.forEach(btn => btn.classList.remove('active'));
            // Poner 'active' solo en el clickeado
            button.classList.add('active');
        });
    });

});