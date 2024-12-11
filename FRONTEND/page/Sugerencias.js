document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const suggestionHabits = [
        { 
            name: "Maíz", 
            description: "Cereal básico para alimentación", 
            type: "Cereales",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 5)).toISOString().split('T')[0],
            fertilizer: 200,
            hectares: 10,
            seedlings: 50000,
            harvest: 80000,
            estimatedProduction: 100000
        },
        { 
            name: "Tomate", 
            description: "Hortaliza versátil y nutritiva", 
            type: "Hortalizas",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString().split('T')[0],
            fertilizer: 150,
            hectares: 5,
            seedlings: 20000,
            harvest: 60000,
            estimatedProduction: 75000
        },
        {
            name: "Arroz",
            description: "Principal alimento en muchas culturas",
            type: "Cereales",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
            fertilizer: 250,
            hectares: 15,
            seedlings: 80000,
            harvest: 100000,
            estimatedProduction: 120000
        },
        {
            name: "Papa",
            description: "Tubérculo nutritivo y versátil",
            type: "Tubérculos",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
            fertilizer: 180,
            hectares: 8,
            seedlings: 30000,
            harvest: 50000,
            estimatedProduction: 60000
        },
        {
            name: "Caña de Azúcar",
            description: "Fuente principal de azúcar y derivados",
            type: "Cereales",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 10)).toISOString().split('T')[0],
            fertilizer: 300,
            hectares: 20,
            seedlings: 100000,
            harvest: 150000,
            estimatedProduction: 200000
        },
        {
            name: "Café",
            description: "Grano esencial para bebidas estimulantes",
            type: "Frutales",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 12)).toISOString().split('T')[0],
            fertilizer: 100,
            hectares: 7,
            seedlings: 15000,
            harvest: 20000,
            estimatedProduction: 30000
        },
        {
            name: "Frijol",
            description: "Leguminosa rica en proteínas",
            type: "Legumbres",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
            fertilizer: 120,
            hectares: 6,
            seedlings: 25000,
            harvest: 40000,
            estimatedProduction: 50000
        },
        {
            name: "Banano",
            description: "Fruta tropical de alto consumo",
            type: "Frutales",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 9)).toISOString().split('T')[0],
            fertilizer: 250,
            hectares: 12,
            seedlings: 40000,
            harvest: 80000,
            estimatedProduction: 100000
        },
        {
            name: "Manzana",
            description: "Fruta ideal para climas templados",
            type: "Frutales",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 11)).toISOString().split('T')[0],
            fertilizer: 200,
            hectares: 10,
            seedlings: 30000,
            harvest: 60000,
            estimatedProduction: 75000
        },
        {
            name: "Zanahoria",
            description: "Hortaliza rica en vitamina A",
            type: "Hortalizas",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0],
            fertilizer: 100,
            hectares: 4,
            seedlings: 15000,
            harvest: 30000,
            estimatedProduction: 35000
        },
        {
            name: "Cebolla",
            description: "Base esencial para muchas recetas",
            type: "Hortalizas",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
            fertilizer: 140,
            hectares: 6,
            seedlings: 18000,
            harvest: 35000,
            estimatedProduction: 40000
        },
        {
            name: "Trigo",
            description: "Cereal clave para panificación",
            type: "Cereales",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 7)).toISOString().split('T')[0],
            fertilizer: 220,
            hectares: 18,
            seedlings: 60000,
            harvest: 90000,
            estimatedProduction: 110000
        }
    ];
    

    let currentFilter = 'Todas';

    function renderSuggestions(filter = 'Todas') {
        const suggestionsGrid = document.getElementById('suggestions-grid');
        suggestionsGrid.innerHTML = '';

        const filteredHabits = filter === 'Todas' 
            ? suggestionHabits 
            : suggestionHabits.filter(habit => habit.type === filter);

        filteredHabits.forEach((habit, index) => {
            const card = document.createElement('div');
            card.className = 'suggestion-card';
            card.innerHTML = `
                <h3>${habit.name}</h3>
                <p>${habit.description}</p>
                <div class="suggestion-details">
                    <p><i data-lucide="tag"></i> Tipo: ${habit.type}</p>
                    <p><i data-lucide="calendar"></i> Inicio: ${habit.startDate}</p>
                    <p><i data-lucide="calendar"></i> Fin: ${habit.endDate}</p>
                    <p><i data-lucide="droplets"></i> Fertilizante: ${habit.fertilizer} kg</p>
                    <p><i data-lucide="maximize"></i> Hectáreas: ${habit.hectares}</p>
                    <p><i data-lucide="seed"></i> Plántulas: ${habit.seedlings}</p>
                    <p><i data-lucide="leaf"></i> Cosecha: ${habit.harvest} kg</p>
                    <p><i data-lucide="trending-up"></i> Producción estimada: ${habit.estimatedProduction} kg</p>
                </div>
                <button class="add-suggestion-btn" data-index="${index}">
                    <i data-lucide="plus-circle"></i> Agregar Cultivo
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
        
        showNotification(`Cultivo "${habit.name}" añadido con éxito`);
        
        suggestionHabits.splice(index, 1);
        renderSuggestions(currentFilter);
    }

    function addHabitToStorage(habit) {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        const newHabit = {
            id: Date.now(),
            name: habit.name,
            description: habit.description,
            type: habit.type,
            startDate: habit.startDate,
            endDate: habit.endDate,
            fertilizer: habit.fertilizer,
            hectares: habit.hectares,
            seedlings: habit.seedlings,
            harvest: habit.harvest,
            estimatedProduction: habit.estimatedProduction
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
        const categories = ['Todas', 'Cereales', 'Hortalizas', 'Legumbres', 'Tubérculos'];
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

