document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const suggestionHabits = [
        { name: "Beber agua", description: "Beber 8 vasos de agua al día", time: "08:00", frequency: "daily", reminder: true, category: "Salud", fechaCreacion: new Date().toISOString()},
        { name: "Leer", description: "Leer 30 minutos al día", time: "21:00", frequency: "daily", reminder: true, category: "Productividad", fechaCreacion: new Date().toISOString()},
        { name: "Caminar", description: "Caminar 30 minutos al aire libre", time: "18:00", frequency: "daily", reminder: true, category: "Ejercicio", fechaCreacion: new Date().toISOString()},
        { name: "Practicar gratitud", description: "Escribir 3 cosas por las que estás agradecido", time: "22:00", frequency: "daily", reminder: true, category: "Salud mental", fechaCreacion: new Date().toISOString()},
        { name: "Meditar", description: "Meditar durante 10 minutos", time: "07:00", frequency: "daily", reminder: true, category: "Salud mental", fechaCreacion: new Date().toISOString()},
        { name: "Ejercicio", description: "Hacer 30 minutos de ejercicio", time: "06:30", frequency: "daily", reminder: true, category: "Ejercicio", fechaCreacion: new Date().toISOString()},
        { name: "Leer", description: "Leer 20 páginas de un libro", time: "20:00", frequency: "daily", reminder: true, category: "Productividad", fechaCreacion: new Date().toISOString()},
        { name: "Beber Agua", description: "Beber 8 vasos de agua", time: "08:00", frequency: "daily", reminder: true, category: "Salud", fechaCreacion: new Date().toISOString()},
        { name: "Planificar el Día", description: "Revisar la lista de tareas del día", time: "08:30", frequency: "daily", reminder: true, category: "Productividad", fechaCreacion: new Date().toISOString()},
        { name: "Escribir en Diario", description: "Escribir reflexiones diarias", time: "21:00", frequency: "daily", reminder: true, category: "Salud mental", fechaCreacion: new Date().toISOString()},
        { name: "Estudiar Idioma", description: "Practicar inglés durante 15 minutos", time: "19:00", frequency: "daily", reminder: true, category: "Productividad", fechaCreacion: new Date().toISOString()},
        { name: "Agradecer", description: "Escribir 3 cosas por las que estoy agradecido", time: "22:00", frequency: "daily", reminder: true, category: "Salud mental", fechaCreacion: new Date().toISOString()},
        { name: "Aprender", description: "Ver un video educativo", time: "12:00", frequency: "daily", reminder: true, category: "Productividad", fechaCreacion: new Date().toISOString() },
        { name: "Dormir Bien", description: "Acostarse temprano para dormir 8 horas", time: "22:30", frequency: "daily", reminder: true, category: "Sueño", fechaCreacion: new Date().toISOString()},
        { name: "Organizar Espacio", description: "Ordenar el escritorio al final del día", time: "18:00", frequency: "daily", reminder: true, category: "Autocuidado", fechaCreacion: new Date().toISOString()},
        { name: "Hacer Yoga", description: "Realizar 20 minutos de yoga", time: "06:00", frequency: "daily", reminder: true, category: "Ejercicio", fechaCreacion: new Date().toISOString() },
        { name: "Cuidar Plantas", description: "Regar y cuidar las plantas", time: "09:00", frequency: "daily", reminder: true, category: "Autocuidado", fechaCreacion: new Date().toISOString() },
        { name: "Estudiar Programación", description: "Practicar algoritmos durante 1 hora", time: "16:00", frequency: "daily", reminder: true, category: "Educación", fechaCreacion: new Date().toISOString() },
        { name: "Cocinar Saludable", description: "Preparar una comida balanceada", time: "13:00", frequency: "daily", reminder: true, category: "Salud", fechaCreacion: new Date().toISOString() },
        { name: "Practicar Instrumento", description: "Tocar un instrumento musical durante 30 minutos", time: "17:30", frequency: "daily", reminder: true, category: "Creatividad", fechaCreacion: new Date().toISOString() },
        { name: "Aprender algo nuevo", description: "Investigar un tema desconocido", time: "14:00", frequency: "daily", reminder: true, category: "Educación", fechaCreacion: new Date().toISOString() },
        { name: "Practicar Respeto", description: "Dar un elogio sincero a alguien", time: "12:30", frequency: "daily", reminder: true, category: "Relaciones", fechaCreacion: new Date().toISOString() },
        { name: "Evitar Redes Sociales", description: "Estar 1 hora sin redes sociales", time: "19:30", frequency: "daily", reminder: true, category: "Productividad", fechaCreacion: new Date().toISOString() },
        { name: "Practicar Mindfulness", description: "Conciencia plena durante 10 minutos", time: "08:15", frequency: "daily", reminder: true, category: "Salud mental", fechaCreacion: new Date().toISOString() },
        { name: "Limpiar", description: "Hacer una limpieza rápida del hogar", time: "20:30", frequency: "daily", reminder: true, category: "Autocuidado", fechaCreacion: new Date().toISOString() },
        { name: "Técnica Pomodoro", description: "Usar la técnica Pomodoro durante el trabajo", time: "10:00", frequency: "daily", reminder: true, category: "Productividad", fechaCreacion: new Date().toISOString() },
        { name: "Caminar descalzo", description: "Caminar descalzo para estimular los pies", time: "07:30", frequency: "daily", reminder: true, category: "Salud", fechaCreacion: new Date().toISOString() },
        { name: "Agradecer al final del día", description: "Reflexionar sobre las cosas positivas del día", time: "23:00", frequency: "daily", reminder: true, category: "Salud mental", fechaCreacion: new Date().toISOString() },
        { name: "Revisar Finanzas", description: "Checar ingresos y gastos diarios", time: "21:30", frequency: "daily", reminder: true, category: "Finanzas", fechaCreacion: new Date().toISOString() },
        { name: "Escuchar Música", description: "Escuchar música relajante durante 15 minutos", time: "18:45", frequency: "daily", reminder: true, category: "Relajación", fechaCreacion: new Date().toISOString() }
    ];

    let currentFilter = 'Todas';

    function renderSuggestions(filter = 'Todas') {
        const suggestionsGrid = document.getElementById('suggestions-grid');
        suggestionsGrid.innerHTML = '';

        const filteredHabits = filter === 'Todas' 
            ? suggestionHabits 
            : suggestionHabits.filter(habit => habit.category === filter);

        filteredHabits.forEach((habit, index) => {
            const card = document.createElement('div');
            card.className = 'suggestion-card';
            card.innerHTML = `
                <h3>${habit.name}</h3>
                <p>${habit.description}</p>
                <div class="suggestion-details">
                    <p><i data-lucide="clock"></i> Hora: ${habit.time}</p>
                    <p><i data-lucide="repeat"></i> Frecuencia: ${habit.frequency}</p>
                    <p><i data-lucide="tag"></i> Categoría: ${habit.category}</p>
                    <p><i data-lucide="calendar"></i> Fecha Creación: ${new Date(habit.fechaCreacion).toLocaleDateString()}</p>
                </div>
                <button class="add-suggestion-btn" data-index="${index}">
                    <i data-lucide="plus-circle"></i> Agregar Hábito
                </button>
            `;
            suggestionsGrid.appendChild(card);
        });

        lucide.createIcons();

        document.querySelectorAll('.add-suggestion-btn').forEach(button => {
            button.addEventListener('click', addSuggestedHabit);
        });
    }

    function addSuggestedHabit(event) {
        const index = event.currentTarget.getAttribute('data-index');
        const habit = suggestionHabits[index];
        
        addHabitToStorage(habit);
        
        showNotification(`Hábito "${habit.name}" añadido con éxito`);
        
        suggestionHabits.splice(index, 1);
        renderSuggestions(currentFilter);
    }

    function addHabitToStorage(habit) {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        const newHabit = {
            id: Date.now(),
            name: habit.name,
            description: habit.description,
            time: habit.time,
            frequency: habit.frequency,
            reminder: habit.reminder,
            streak: 0,
            progress: 0,
            category: habit.category,
            fechaCreacion: new Date().toISOString()
        };
        habits.push(newHabit);
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    function setupCategoryFilters() {
        const categories = ['Todas', 'Salud', 'Productividad', 'Ejercicio', 'Salud mental', 'Autocuidado', 'Relaciones sociales', 'Sueño'];
        const filterContainer = document.getElementById('category-filters');

        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.className = 'category-filter-btn';
            button.addEventListener('click', () => {
                currentFilter = category;
                document.querySelectorAll('.category-filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderSuggestions(category);
            });
            filterContainer.appendChild(button);
        });

        // Set 'Todas' as active by default
        filterContainer.querySelector('.category-filter-btn').classList.add('active');
    }

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });

    function loadProfilePicture() {
        const profilePicture = localStorage.getItem('profilePicture');
        const profilePictureElement = document.getElementById('profile-picture');
        if (profilePicture && profilePictureElement) {
            profilePictureElement.src = profilePicture;
        } else if (profilePictureElement) {
            profilePictureElement.src = 'path/to/default-profile-picture.jpg';
        }
    }

    loadProfilePicture();
    setupCategoryFilters();
    renderSuggestions();
});