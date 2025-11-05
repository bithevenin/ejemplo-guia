// 1. Inicializar iconos de Lucide (Siempre necesario en cada página)
lucide.createIcons();

// 2. Lógica para abrir y cerrar el Panel Lateral (Drawer) de Creación/Edición

document.addEventListener('DOMContentLoaded', () => {
    const btnNuevaUbicacion = document.getElementById('btn-nueva-ubicacion');
    const btnCerrarDrawer = document.getElementById('btn-cerrar-drawer');
    const btnCancelarDrawer = document.getElementById('btn-cancelar-drawer');
    const drawer = document.getElementById('ubicacion-drawer');
    const overlay = document.getElementById('drawer-overlay');

    const openDrawer = () => {
        // Muestra el drawer
        drawer.classList.add('drawer-open');
        
        // Muestra el overlay y lo hace visible con una transición de opacidad
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('visible'), 10); 
    };

    const closeDrawer = () => {
        // Oculta el drawer
        drawer.classList.remove('drawer-open');
        
        // Oculta el overlay con una transición de opacidad y luego lo esconde
        overlay.classList.remove('visible');
        setTimeout(() => overlay.classList.add('hidden'), 300); 
    };

    // Evento para abrir el drawer al hacer clic en "Crear Ubicación"
    if (btnNuevaUbicacion) {
        btnNuevaUbicacion.addEventListener('click', openDrawer);
    }

    // Eventos para cerrar el drawer
    if (btnCerrarDrawer) {
        btnCerrarDrawer.addEventListener('click', closeDrawer);
    }
    if (btnCancelarDrawer) {
        btnCancelarDrawer.addEventListener('click', closeDrawer);
    }
    // Cerrar al hacer clic en el overlay (fondo oscuro)
    if (overlay) {
        overlay.addEventListener('click', closeDrawer);
    }
});