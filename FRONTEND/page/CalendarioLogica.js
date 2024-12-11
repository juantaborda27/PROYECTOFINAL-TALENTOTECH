document.addEventListener('DOMContentLoaded', function(){
    // Initialize Lucide icons
    lucide.createIcons();

    const calendar = document.getElementById('calendar');
    const modal = document.getElementById('eventModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const eventForm = document.getElementById('eventForm');
    const eventList = document.getElementById('eventList');
    const addEventButton = document.getElementById('addEventButton');
    const eventDateInput = document.getElementById('eventDate');
    const cropNameInput = document.getElementById('cropName');
    const eventIdInput = document.getElementById('eventId');
    const cropDescriptionInput = document.getElementById('cropDescription');
    const cropTypeInput = document.getElementById('cropType');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const fertilizerInput = document.getElementById('fertilizer');
    const hectaresInput = document.getElementById('hectares');
    const seedlingsInput = document.getElementById('seedlings');
    const harvestInput = document.getElementById('harvest');
    const estimatedProductionInput = document.getElementById('estimatedProduction');
    const saveButton = document.getElementById('saveButton');
    const deleteButton = document.getElementById('deleteButton');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthElement = document.getElementById('currentMonth');

    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};

    function createCalendar() {
        calendar.innerHTML = '';
        const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        weekdays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.className = 'weekday';
            calendar.appendChild(dayElement);
        });

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        currentMonthElement.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

        for (let i = 0; i < startingDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day other-month';
            calendar.appendChild(dayElement);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            dayElement.className = 'day';
            const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            dayElement.setAttribute('data-date', date);
            dayElement.addEventListener('click', openModal);
            calendar.appendChild(dayElement);
        }

        const remainingDays = 7 - ((startingDay + daysInMonth) % 7);
        if (remainingDays < 7) {
            for (let i = 0; i < remainingDays; i++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'day other-month';
                calendar.appendChild(dayElement);
            }
        }

        updateCalendar();
        syncCalendarWithHabits();
    }

    function updateCalendar() {
        document.querySelectorAll('.day:not(.other-month)').forEach(day => {
            const date = day.getAttribute('data-date');
            day.innerHTML = day.textContent; // Limpia los indicadores existentes
            if (events[date] && events[date].length > 0) {
                day.classList.add('has-event');
                const eventCount = events[date].length;
                day.setAttribute('aria-label', `${day.textContent}, Tiene ${eventCount} evento${eventCount > 1 ? 's' : ''}`);
                for (let i = 0; i < Math.min(eventCount, 3); i++) {
                    const indicator = document.createElement('div');
                    indicator.className = 'event-indicator';
                    day.appendChild(indicator);
                }
            } else {
                day.classList.remove('has-event');
                day.removeAttribute('aria-label');
            }
        });
    }

    function openModal(e) {
        const date = e.target.getAttribute('data-date');
        eventDateInput.value = date;
        startDateInput.value = date; // Set the start date to the clicked date
        updateEventList(date);
        modal.style.display = 'block';
    }

    function updateEventList(date) {
        eventList.innerHTML = '';
        if (events[date] && events[date].length > 0) {
            events[date].forEach((event, index) => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item';
                eventItem.textContent = event.name;
                eventItem.addEventListener('click', () => editEvent(date, index));
                eventList.appendChild(eventItem);
            });
        } else {
            eventList.innerHTML = '<p>No hay cultivos para este día.</p>';
        }
        eventForm.style.display = 'none';
        addEventButton.style.display = 'block';
    }

    function editEvent(date, index) {
        const event = events[date][index];
        eventIdInput.value = index;
        cropNameInput.value = event.name;
        cropDescriptionInput.value = event.description || '';
        cropTypeInput.value = event.type || '';
        startDateInput.value = event.startDate || '';
        endDateInput.value = event.endDate || '';
        fertilizerInput.value = event.fertilizer || '';
        hectaresInput.value = event.hectares || '';
        seedlingsInput.value = event.seedlings || '';
        harvestInput.value = event.harvest || '';
        estimatedProductionInput.value = event.estimatedProduction || '';
        eventForm.style.display = 'block';
        addEventButton.style.display = 'none';
        deleteButton.style.display = 'block';
    }

    function saveCrop(date, cropData) {
        if (!events[date]) {
            events[date] = [];
        }
        events[date].push(cropData);
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        updateCalendar();
        updateEventList(date);
    }

    function addEventToHabits(event) {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        const newHabit = {
            id: Date.now(),
            name: event.title,
            description: event.description,
            time: event.time,
            frequency: event.frequency,
            reminder: event.reminder,
            streak: 0,
            progress: 0,
            completed: false,
            lastCompletedDate: null,
            fechaCreacion: new Date().toISOString()
        };
        habits.push(newHabit);
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function addCropFromCalendar(event) {
        let crops = JSON.parse(localStorage.getItem('crops')) || [];
        const newCrop = {
            id: Date.now(),
            name: event.title,
            description: event.description,
            type: 'Otro', // Default type, can be changed later
            startDate: event.date,
            endDate: '', // Can be set later
            fertilizer: 0,
            hectares: 0,
            seedlings: 0,
            harvest: 0,
            estimatedProduction: 0
        };
        crops.push(newCrop);
        localStorage.setItem('crops', JSON.stringify(crops));
        console.log('Nuevo cultivo añadido:', newCrop);
    }

    function syncCalendarWithHabits() {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        const calendarEvents = JSON.parse(localStorage.getItem('calendarEvents')) || {};

        // Crear un mapa de hábitos existentes por nombre para una búsqueda rápida
        const habitMap = new Map(habits.map(habit => [habit.name, habit]));

        // Iterar sobre todos los eventos del calendario
        Object.entries(calendarEvents).forEach(([date, dateEvents]) => {
            dateEvents.forEach(event => {
                if (!habitMap.has(event.title)) {
                    // Si el hábito no existe, créalo
                    const newHabit = {
                        id: Date.now() + Math.random(), // Asegura un ID único
                        name: event.title,
                        description: event.description,
                        time: event.time,
                        frequency: event.frequency,
                        reminder: event.reminder,
                        repeatDays: event.repeatDays,
                        streak: 0,
                        progress: 0,
                        completed: false,
                        lastCompletedDate: null,
                        fechaCreacion: new Date().toISOString()
                    };
                    habits.push(newHabit);
                    habitMap.set(event.title, newHabit);
                }
            });
        });

        // Guardar los hábitos actualizados
        localStorage.setItem('habits', JSON.stringify(habits));
        console.log('Hábitos sincronizados:', habits);

        // Actualizar la interfaz de usuario de "Mis Hábitos"
        // updateHabitsUI(habits);
    }


    addEventButton.onclick = function() {
        eventForm.reset();
        eventIdInput.value = '';
        eventForm.style.display = 'block';
        addEventButton.style.display = 'none';
        deleteButton.style.display = 'none';
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    eventForm.onsubmit = function(e) {
        e.preventDefault();
    }

    saveButton.addEventListener('click', function(e) {
        e.preventDefault();
        const date = eventDateInput.value;
        const cropData = {
            name: cropNameInput.value,
            description: cropDescriptionInput.value,
            type: cropTypeInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            fertilizer: parseFloat(fertilizerInput.value),
            hectares: parseFloat(hectaresInput.value),
            seedlings: parseInt(seedlingsInput.value),
            harvest: parseFloat(harvestInput.value),
            estimatedProduction: parseFloat(estimatedProductionInput.value)
        };

        const id = eventIdInput.value;
        if (id === '') {
            saveCrop(date, cropData);
        } else {
            // Update existing crop
            events[date][parseInt(id)] = cropData;
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            updateCalendar();
            updateEventList(date);
        }
        modal.style.display = 'none';
        console.log('Cultivo guardado:', cropData);
    });

    deleteButton.onclick = function() {
        const date = eventDateInput.value;
        const id = parseInt(eventIdInput.value);
        events[date].splice(id, 1);
        if (events[date].length === 0) {
            delete events[date];
        }
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        updateCalendar();
        updateEventList(date);
        modal.style.display = 'none';
    }

    prevMonthBtn.onclick = function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        createCalendar();
    }

    nextMonthBtn.onclick = function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        createCalendar();
    }

    createCalendar();

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
});

