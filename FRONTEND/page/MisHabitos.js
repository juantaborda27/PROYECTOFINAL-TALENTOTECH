document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const habitsContainer = document.getElementById('habits-container');
    const newHabitBtn = document.getElementById('new-habit-btn');
    const modal = document.getElementById('modal');
    const habitForm = document.getElementById('habit-form');
    const cancelHabitBtn = document.getElementById('cancel-habit');
    const confirmDialog = document.getElementById('confirm-dialog');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    const confirmDeleteBtn = document.getElementById('confirm-delete');

    const categorias = ['Salud', 'Productividad', 'Ejercicio', 'Salud Mental', 'Autocuidado', 'Relaciones Sociales', 'Sueño'];

    let habits = [];
    let editingHabitId = null;
    let deletingHabitId = null;

    function loadHabits() {
        habits = JSON.parse(localStorage.getItem('habits')) || [];
        console.log('Hábitos cargados:', habits);
        renderHabits();
        scheduleReminders();
        inicializarContador();
        populateCategorySelect();
    }

    function saveHabits() {
        localStorage.setItem('habits', JSON.stringify(habits));
        console.log('Hábitos guardados:', habits);
        scheduleReminders();
    }

    function renderHabits() {
        habitsContainer.innerHTML = '';
        habits.forEach(habit => {
            const habitCard = document.createElement('div');
            habitCard.className = 'habit-card';
            const progress = (habit.streak / habit.repeatDays) * 100;
            habitCard.innerHTML = `
                <h3>${habit.name}</h3>
                <p>${habit.description}</p>
                <div class="habit-details">
                    <span>Categoría: ${habit.category || 'Null'}</span>
                    <span>Hora: ${habit.time}</span>
                    <span>Racha: ${habit.streak}/${habit.repeatDays} días</span>
                    <span>Creado: ${new Date(habit.fechaCreacion).toLocaleDateString('es-ES')}</span>
                </div>
                <div class="habit-progress">
                    <div class="habit-progress-bar" style="width: ${progress}%"></div>
                </div>
                <div class="habit-actions">
                    <button class="primary-button complete-habit" data-id="${habit.id}">Completar</button>
                    <div>
                        <span class="habit-badge ${habit.completed ? 'habit-badge-earned' : ''}" title="${habit.completed ? 'Hábito completado' : 'Hábito en progreso'}">
                            ${habit.completed ? '🏆' : '🎯'}
                        </span>
                        <button class="icon-button edit-habit"><i data-lucide="edit"></i></button>
                        <button class="icon-button delete-habit"><i data-lucide="trash-2"></i></button>
                        ${habit.reminder ? '<button class="icon-button"><i data-lucide="bell"></i></button>' : ''}
                    </div>
                </div>
            `;
            habitsContainer.appendChild(habitCard);

            habitCard.querySelector('.edit-habit').addEventListener('click', () => editHabit(habit.id));
            habitCard.querySelector('.delete-habit').addEventListener('click', () => showDeleteConfirmation(habit.id));
            habitCard.querySelector('.complete-habit').addEventListener('click', () => completeHabit(habit.id));
        });
        lucide.createIcons();
    }

    function populateCategorySelect() {
        const categorySelect = document.getElementById('habit-category');
        categorySelect.innerHTML = '<option value="">Selecciona una categoría</option>';
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            categorySelect.appendChild(option);
        });
    }

    function showModal(title) {
        document.getElementById('modal-title').textContent = title;
        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
        habitForm.reset();
        editingHabitId = null;
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    newHabitBtn.addEventListener('click', () => {
        showModal('Crear Nuevo Hábito');
        populateCategorySelect();
    });

    function editHabit(id) {
        const habit = habits.find(h => h.id === id);
        if (habit) {
            document.getElementById('habit-name').value = habit.name;
            document.getElementById('habit-description').value = habit.description;
            document.getElementById('habit-frequency').value = habit.frequency;
            document.getElementById('habit-time').value = habit.time;
            document.getElementById('habit-repeat-days').value = habit.repeatDays || 1;
            document.getElementById('habit-reminder').checked = habit.reminder;
            document.getElementById('habit-category').value = habit.category || '';
            editingHabitId = id;
            showModal('Editar Hábito');
        }
    }

    function showDeleteConfirmation(id) {
        deletingHabitId = id;
        confirmDialog.style.display = 'block';
    }

    function completeHabit(id) {
        const habitIndex = habits.findIndex(h => h.id === id);
        if (habitIndex !== -1) {
            const habit = habits[habitIndex];
            const today = new Date().toDateString();
            
            if (habit.lastCompletedDate === today) {
                showNotification("Ya has completado este hábito hoy. ¡Vuelve mañana!");
                return;
            }
    
            let totalHabitosCompletados = parseInt(localStorage.getItem('totalHabitosCompletados') || '0');
            totalHabitosCompletados++;
            localStorage.setItem('totalHabitosCompletados', totalHabitosCompletados);
    
            habit.streak += 1;
            habit.progress = Math.min(100, (habit.streak / habit.repeatDays) * 100);
            habit.lastCompletedDate = today;
            
            if (habit.streak >= habit.repeatDays) {
                habit.completed = true;
                showNotification(`¡Felicidades! Has completado el hábito "${habit.name}" durante ${habit.repeatDays} días.`);
            }
            
            saveHabits();
            renderHabits();
            showNotification(`¡Hábito "${habit.name}" completado! Racha: ${habit.streak}/${habit.repeatDays} días`);
    
            const habitoCompletadoEvent = new CustomEvent('habitoCompletado', {
                detail: { totalCompletados: totalHabitosCompletados }
            });
            window.dispatchEvent(habitoCompletadoEvent);
    
            const contadorElement = document.getElementById('habits-completed');
            if (contadorElement) {
                contadorElement.textContent = totalHabitosCompletados;
            }
    
            console.log('Total hábitos completados:', totalHabitosCompletados);
            console.log('Elemento en la interfaz:', contadorElement);
        }
    }
    
    function inicializarContador() {
        const totalHabitosCompletados = localStorage.getItem('totalHabitosCompletados') || '0';
        
        const contadorElement = document.getElementById('habits-completed');
        if (contadorElement) {
            contadorElement.textContent = totalHabitosCompletados;
        }
    }

    habitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const habitData = {
            name: document.getElementById('habit-name').value,
            description: document.getElementById('habit-description').value,
            frequency: document.getElementById('habit-frequency').value,
            time: document.getElementById('habit-time').value,
            repeatDays: parseInt(document.getElementById('habit-repeat-days').value),
            reminder: document.getElementById('habit-reminder').checked,
            category: document.getElementById('habit-category').value,
            streak: 0,
            progress: 0,
            completed: false,
            lastCompletedDate: null,
            fechaCreacion: new Date().toISOString()
        };

        if (editingHabitId) {
            habits = habits.map(h => h.id === editingHabitId ? {...h, ...habitData, fechaCreacion: h.fechaCreacion} : h);
        } else {
            habitData.id = Date.now();
            habits.push(habitData);
        }

        saveHabits();
        renderHabits();
        hideModal();
    });

    cancelHabitBtn.addEventListener('click', hideModal);

    confirmDeleteBtn.addEventListener('click', function() {
        habits = habits.filter(h => h.id !== deletingHabitId);
        saveHabits();
        renderHabits();
        confirmDialog.style.display = 'none';
    });

    cancelDeleteBtn.addEventListener('click', function() {
        confirmDialog.style.display = 'none';
    });

    function scheduleReminders() {
        habits.forEach(habit => {
            if (habit.reminder) {
                const [hours, minutes] = habit.time.split(':');
                const now = new Date();
                const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
                
                if (reminderTime > now) {
                    const timeUntilReminder = reminderTime - now;
                    setTimeout(() => {
                        showReminderNotification(habit);
                    }, timeUntilReminder);
                }
            }
        });
    }

    function showReminderNotification(habit) {
        const notification = document.createElement('div');
        notification.className = 'reminder-notification';
        notification.innerHTML = `
            <h3>¡Recordatorio de hábito!</h3>
            <p>Es hora de: ${habit.name}</p>
            <button class="close-notification">Cerrar</button>
        `;
        document.body.appendChild(notification);

        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.remove();
        });

        setTimeout(() => {
            notification.remove();
        }, 10000);
    }

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });

    function checkUncompletedHabits() {
        const today = new Date().toDateString();
        const uncompletedHabits = habits.filter(habit => 
            habit.lastCompletedDate !== today && 
            (habit.frequency === 'daily' || 
             (habit.frequency === 'weekly' && new Date().getDay() === 0) ||
             (habit.frequency === 'monthly' && new Date().getDate() === 1))
        );
    
        if (uncompletedHabits.length > 0) {
            showUncompletedHabitsNotification(uncompletedHabits);
        }
    }

    function showUncompletedHabitsNotification(uncompletedHabits) {
        const message = `No has completado ${uncompletedHabits.length} hábito(s) hoy: ${uncompletedHabits.map(h => h.name).join(', ')}`;
        showNotification(message, 10000); // Mostrar por 10 segundos
    }

    function scheduleUncompletedHabitsCheck() {
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        const timeUntilEndOfDay = endOfDay - now;
    
        setTimeout(() => {
            checkUncompletedHabits();
            // Programar la próxima verificación para el día siguiente
            scheduleUncompletedHabitsCheck();
        }, timeUntilEndOfDay);
    }

    function loadProfilePicture() {
        const profilePicture = localStorage.getItem('profilePicture');
        if (profilePicture) {
            document.getElementById('profile-picture').src = profilePicture;
        }
    }
    

    loadHabits();
    scheduleUncompletedHabitsCheck();
    loadProfilePicture();

});

// Ejecuta este código en la consola para ver los hábitos actuales
console.log('Hábitos actuales:', JSON.parse(localStorage.getItem('habits')));