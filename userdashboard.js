// User Profile Data
const userData = {
    name: "demo",
    photo: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    greeting :"mr"
  
};

// Doctor Profiles
const doctors = [
    {
        name: "Dr. Joeylene",
        specialty: "Food Nutritionist",
        photo: "https://media.istockphoto.com/id/1372002650/photo/cropped-portrait-of-an-attractive-young-female-doctor-standing-with-her-arms-folded-in-the.jpg?s=612x612&w=0&k=20&c=o1QtStNsowOU0HSof6xQ_jZMglU8ZK565gHd655U6S4=",
        description: "Expert in designing personalized diet plans.",
        holidays: [5, 15],
        price: 500,
        holidayPrice: 300  // You might want a different price for holidays
    },
    {
        name: "Dr. Liana",
        specialty: "Psychologist",
        photo: "https://media.istockphoto.com/id/1298041587/photo/portrait-of-young-psychologist-wearing-glasses-in-office.jpg?s=612x612&w=0&k=20&c=IkvYgq7VhvE5vL5d8EOQ4cDZYhgOnBkwHeG5smsp5o4=",
        description: "Specialized in mental wellness and therapy.",
        holidays: [7, 17],
        price: 550,
        holidayPrice: 350
    }
];

// Initialize User Profile
document.getElementById('user-profile').innerHTML = `
    <img src="${userData.photo}" alt="User Photo" class="profile-img">
    <div>
       <p class="greeting">${userData.greeting} 
       <span id="username">${userData.name}</span></p>
    </div>
`;

// Initialize Doctor Profiles
let currentDoctorIndex = 0;
const doctorDisplay = document.getElementById('doctor-display');

function renderDoctorProfile() {
    const doctor = doctors[currentDoctorIndex];
    doctorDisplay.innerHTML = `
        <img src="${doctor.photo}" alt="${doctor.name}">
        <h1>${doctor.name}</h1>
        <h5>${doctor.specialty}</h5>
        <p>${doctor.description}</p>
        <button class="book-now">Book Now</button>
    `;
}

// Navigation Buttons
document.getElementById('next-doctor').addEventListener('click', () => {
    currentDoctorIndex = (currentDoctorIndex + 1) % doctors.length;
    renderDoctorProfile();
    renderCalendar();
});

document.getElementById('prev-doctor').addEventListener('click', () => {
    currentDoctorIndex = (currentDoctorIndex - 1 + doctors.length) % doctors.length;
    renderDoctorProfile();
    renderCalendar();
});

// Calendar Functionality
const calendarContainer = document.getElementById('calendar-container');
const totalCostDisplay = document.getElementById('total-cost-display');
let selectedDates = [];

function renderCalendar() {
    calendarContainer.innerHTML = '';
    for (let i = 1; i <= 31; i++) {
        const isHoliday = doctors[currentDoctorIndex].holidays.includes(i);
        const dateDiv = document.createElement('div');
        dateDiv.innerHTML = `${i}<br>${isHoliday ? "NA" : doctors[currentDoctorIndex].price}`;


        // Add classes for availability and holidays
        dateDiv.classList.add(isHoliday ? 'holiday' : 'available');
        dateDiv.classList.add('calendar-day'); // General class for styling

        // Add an event listener for the date click
        dateDiv.addEventListener('click', () => selectDate(i));

        calendarContainer.appendChild(dateDiv);
    }
}

function selectDate(date) {
    const isHoliday = doctors[currentDoctorIndex].holidays.includes(date);
    const dateDivs = calendarContainer.querySelectorAll('div');

    // Loop over all date divs and remove 'selected' class
    dateDivs.forEach(div => {
        // Remove the selected class if the date isn't selected
        if (!div.classList.contains('selected') && div.textContent.includes(date)) {
            div.classList.remove('selected');
        }
    });

    // Select the clicked date
    const selectedDiv = [...dateDivs].find(div => div.textContent.includes(date));
    selectedDiv.classList.toggle('selected');

    // Toggle date selection
    if (!selectedDates.includes(date)) {
        selectedDates.push(date);
    } else {
        selectedDates = selectedDates.filter(d => d !== date);
    }

    updateTotalCost();
}

function updateTotalCost() {
    const doctor = doctors[currentDoctorIndex];
    let total = 0;

    selectedDates.forEach(date => {
        const isHoliday = doctor.holidays.includes(date);
        if (isHoliday) {
            total += doctor.holidayPrice;
        } else {
            total += doctor.price;
        }
    });

    totalCostDisplay.textContent = `Total Cost: $${total}`;
}

// Initial render

const mealData = [
    {
        title: "Breakfast",
        description: "Classic Morning Delight: Oatmeal with almond milk, banana, honey, and eggs."
    },
    {
        title: "Lunch",
        description: "Grilled Chicken Salad: Grilled chicken breast with mixed greens, cherry tomatoes, avocado, cucumber, and a light olive oil vinaigrette dressing."
    },
    {
        title: "Snacks",
        description: "Hummus and Veggies: Sliced carrots, cucumbers, bell peppers, and celery served with a side of hummus for dipping."
    },
    {
        title: "Dinner",
        description: "Vegetarian Chili: A hearty vegetarian chili made with kidney beans, black beans, onions, and bell peppers."
    }
];

const mealPlanContainer = document.getElementById('meal-plan');

function renderMeals(data) {
    mealPlanContainer.innerHTML = '';
    data.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');

        mealCard.innerHTML = `
                    <h2>${meal.title}</h2>
                    <p>${meal.description}</p>
                    <div class="buttons">
                        <button class="edit-btn">Edit</button>
                        <button class="remove-btn">Remove</button>
                    </div>
                `;

        mealCard.querySelector('.remove-btn').addEventListener('click', () => {
            mealCard.remove();
        });

        mealCard.querySelector('.edit-btn').addEventListener('click', () => {
            alert(`Edit functionality for ${meal.title} coming soon!`);
        });

        mealPlanContainer.appendChild(mealCard);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const dashboardMenu = document.querySelector('#dashboard-menu');
    const submenu = dashboardMenu.querySelector('.submenu');

    dashboardMenu.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent navigation if necessary
        submenu.classList.toggle('show'); // Toggle the 'show' class
    });
});
const consultationList = document.getElementById('consultation-list');

const consultations = [
    { name: 'Erik Gunsel', avatar: 'https://i.pravatar.cc/40?img=3' },
    { name: 'Emily Smith', avatar: 'https://i.pravatar.cc/40?img=4' },
    { name: 'Arthur Adelk', avatar: 'https://i.pravatar.cc/40?img=5' },
];

function populateConsultations() {
    consultations.forEach(consultation => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${consultation.avatar}" alt="${consultation.name}">
            <span>${consultation.name}</span>
        `;
        consultationList.appendChild(listItem);
    });
}

populateConsultations();

renderDoctorProfile();
renderCalendar();
renderMeals(mealData);
