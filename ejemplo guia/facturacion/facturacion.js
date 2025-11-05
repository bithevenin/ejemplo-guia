// 
// LÓGICA DE JAVASCRIPT PARA LA VISTA DE FACTURACIÓN
// En una aplicación Ionic real, esta lógica se manejaría en el componente .ts
// 
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar iconos de Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ----------------------------------------------------------------------
    // 1. Lógica del Modal/Panel Lateral de Nueva Factura
    // ----------------------------------------------------------------------
    const openModalBtn = document.getElementById('open-new-invoice-modal');
    const closeModalBtn = document.getElementById('close-new-invoice-modal');
    const closeModalFooterBtn = document.getElementById('close-modal-footer');
    const modal = document.getElementById('new-invoice-modal');
    const panel = document.getElementById('invoice-panel');
    const addProductButton = document.querySelector('.add-product-btn');

    // Función para abrir el modal (Panel Lateral)
    function openModal() {
        if (!modal) return;
        modal.classList.remove('hidden');
        // Aplicar la opacidad y el desplazamiento después de un pequeño retraso
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100'); // Muestra el fondo
            panel.classList.remove('translate-x-full'); // Muestra el panel deslizándolo
        }, 10); 
    }

    // Función para cerrar el modal (Panel Lateral)
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        panel.classList.add('translate-x-full');
        // Esperar que termine la transición (300ms) antes de ocultar completamente el modal
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300); 
    }

    // Asignar eventos a los botones de control del modal
    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (closeModalFooterBtn) closeModalFooterBtn.addEventListener('click', closeModal);
    
    // Cierre del modal haciendo click en el fondo (overlay)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'new-invoice-modal') {
                closeModal();
            }
        });
    }

    // ----------------------------------------------------------------------
    // 2. Lógica para Agregar Productos (Simulación de Interacción del Formulario)
    // ----------------------------------------------------------------------
    if(addProductButton) {
        addProductButton.addEventListener('click', () => {
            const productContainer = addProductButton.parentElement;
            const newProductRowHTML = `
                <div class="product-row bg-white p-3 rounded-lg shadow-sm mb-3">
                    <div class="grid grid-cols-4 gap-3 text-sm items-center">
                        <div class="col-span-4 sm:col-span-2">
                            <label class="block text-gray-500">Producto</label>
                            <p class="font-medium text-gray-900">Fertilizante (Ubicación: Galpón F2)</p>
                        </div>
                        <div class="col-span-1">
                            <label class="block text-gray-500">Cant.</label>
                            <input type="number" value="5" class="w-full text-center border-b border-gray-300 focus:border-teal-500 focus:outline-none">
                        </div>
                        <div class="col-span-1">
                            <label class="block text-gray-500">Total</label>
                            <p class="font-medium text-gray-900">$150.00</p>
                        </div>
                    </div>
                </div>
            `;
            // Insertar la nueva fila antes del botón "Agregar Producto"
            productContainer.insertBefore(
                document.createRange().createContextualFragment(newProductRowHTML), 
                addProductButton
            );
        });
    }
});