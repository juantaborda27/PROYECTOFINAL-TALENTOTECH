document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const cropsContainer = document.getElementById('habits-container');
    const newCropBtn = document.getElementById('new-crop-btn');
    const modal = document.getElementById('modal');
    const cropForm = document.getElementById('crop-form');
    const cancelCropBtn = document.getElementById('cancel-crop');
    const confirmDialog = document.getElementById('confirm-dialog');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    const confirmDeleteBtn = document.getElementById('confirm-delete');

    let crops = [];
    let editingCropId = null;
    let deletingCropId = null;

    function loadCrops() {
        crops = JSON.parse(localStorage.getItem('crops')) || [];
        console.log('Cultivos cargados:', crops);
        renderCrops();
        checkForSuggestedCrops(); // Add this line
    }

    function saveCrops() {
        localStorage.setItem('crops', JSON.stringify(crops));
        console.log('Cultivos guardados:', crops);
    }

    function renderCrops() {
        cropsContainer.innerHTML = '';
        crops.forEach(crop => {
            const cropCard = document.createElement('div');
            cropCard.className = 'habit-card';
            cropCard.innerHTML = `
                <h3>${crop.name}</h3>
                <p>${crop.description}</p>
                <div class="crop-details">
                    <span>Tipo: ${crop.type}</span>
                    <span>Inicio: ${new Date(crop.startDate).toLocaleDateString('es-ES')}</span><br>
                    <span>Fin: ${new Date(crop.endDate).toLocaleDateString('es-ES')}</span><br>
                    <span>Fertilizante: ${crop.fertilizer} kg</span><br>
                    <span>Hectáreas: ${crop.hectares}</span><br>
                    <span>Plántulas: ${crop.seedlings}</span><br>
                    <span>Cosecha: ${crop.harvest} kg</span>
                    <span>Producción estimada: ${crop.estimatedProduction} kg</span>
                </div>
                <div class="crop-actions">
                    <button class="icon-button edit-crop"><i data-lucide="edit"></i></button>
                    <button class="icon-button delete-crop"><i data-lucide="trash-2"></i></button>
                </div>
            `;
            cropsContainer.appendChild(cropCard);

            cropCard.querySelector('.edit-crop').addEventListener('click', () => editCrop(crop.id));
            cropCard.querySelector('.delete-crop').addEventListener('click', () => showDeleteConfirmation(crop.id));
        });
        lucide.createIcons();
    }

    function showModal(title) {
        document.getElementById('modal-title').textContent = title;
        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
        cropForm.reset();
        editingCropId = null;
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    newCropBtn.addEventListener('click', () => {
        showModal('Crear Nuevo Cultivo');
    });

    function editCrop(id) {
        const crop = crops.find(c => c.id === id);
        if (crop) {
            document.getElementById('crop-name').value = crop.name;
            document.getElementById('crop-description').value = crop.description;
            document.getElementById('crop-type').value = crop.type;
            document.getElementById('crop-start-date').value = crop.startDate;
            document.getElementById('crop-end-date').value = crop.endDate;
            document.getElementById('crop-fertilizer').value = crop.fertilizer;
            document.getElementById('crop-hectares').value = crop.hectares;
            document.getElementById('crop-seedlings').value = crop.seedlings;
            document.getElementById('crop-harvest').value = crop.harvest;
            document.getElementById('crop-estimated-production').value = crop.estimatedProduction;
            editingCropId = id;
            showModal('Editar Cultivo');
        }
    }

    function showDeleteConfirmation(id) {
        deletingCropId = id;
        confirmDialog.style.display = 'block';
    }

    cropForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const cropData = {
            name: document.getElementById('crop-name').value,
            description: document.getElementById('crop-description').value,
            type: document.getElementById('crop-type').value,
            startDate: document.getElementById('crop-start-date').value,
            endDate: document.getElementById('crop-end-date').value,
            fertilizer: parseFloat(document.getElementById('crop-fertilizer').value),
            hectares: parseFloat(document.getElementById('crop-hectares').value),
            seedlings: parseInt(document.getElementById('crop-seedlings').value),
            harvest: parseFloat(document.getElementById('crop-harvest').value),
            estimatedProduction: parseFloat(document.getElementById('crop-estimated-production').value)
        };

        if (editingCropId) {
            crops = crops.map(c => c.id === editingCropId ? {...c, ...cropData} : c);
        } else {
            cropData.id = Date.now();
            crops.push(cropData);
        }

        saveCrops();
        renderCrops();
        hideModal();
        showNotification(editingCropId ? 'Cultivo actualizado con éxito' : 'Nuevo cultivo agregado con éxito');
    });

    cancelCropBtn.addEventListener('click', hideModal);

    confirmDeleteBtn.addEventListener('click', function() {
        crops = crops.filter(c => c.id !== deletingCropId);
        saveCrops();
        renderCrops();
        confirmDialog.style.display = 'none';
        showNotification('Cultivo eliminado con éxito');
    });

    cancelDeleteBtn.addEventListener('click', function() {
        confirmDialog.style.display = 'none';
    });

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });

    function loadProfilePicture() {
        const profilePicture = localStorage.getItem('profilePicture');
        if (profilePicture) {
            document.getElementById('profile-picture').src = profilePicture;
        }
    }

    function checkForSuggestedCrops() {
        const suggestedCrops = JSON.parse(localStorage.getItem('habits')) || [];
        if (suggestedCrops.length > 0) {
            crops = [...crops, ...suggestedCrops];
            localStorage.setItem('crops', JSON.stringify(crops));
            localStorage.removeItem('habits');
            renderCrops();
            showNotification(`Se han añadido ${suggestedCrops.length} cultivos sugeridos`);
        }
    }

    loadCrops();
    loadProfilePicture();
});

// Ejecuta este código en la consola para ver los cultivos actuales
console.log('Cultivos actuales:', JSON.parse(localStorage.getItem('crops')));

