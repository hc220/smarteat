// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx_3GD5YqjQ1ASpLwDicetR8eeIw3rFik",
  authDomain: "loginform-f3b1d.firebaseapp.com",
  databaseURL: "https://loginform-f3b1d-default-rtdb.firebaseio.com",
  projectId: "loginform-f3b1d",
  storageBucket: "loginform-f3b1d.appspot.com",
  messagingSenderId: "165308125826",
  appId: "1:165308125826:web:9acf46dc430f4f4a3f5a9b",
  measurementId: "G-705DPZW9CT",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Realtime Database reference
const database = firebase.database().ref("Doctor-Profile");

// Handle File Upload and Convert to Base64
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]); // Remove metadata
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Dropdown: State and City
const statesAndCities = {
  "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur", "Nellore"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
  "West Bengal": ["Kolkata", "Darjeeling", "Asansol", "Howrah"],
};

// Populate state dropdown
const stateDropdown = document.getElementById("state");
const cityDropdown = document.getElementById("city");

Object.keys(statesAndCities).forEach((state) => {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateDropdown.appendChild(option);
});

stateDropdown.addEventListener("change", (event) => {
  const selectedState = event.target.value;
  cityDropdown.innerHTML = '<option value="">Select a City</option>';
  if (selectedState && statesAndCities[selectedState]) {
    statesAndCities[selectedState].forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      cityDropdown.appendChild(option);
    });
  }
});

// Profile image and certificate handlers
const profileImg = document.getElementById("profile-img");
const profileUpload = document.getElementById("profile-upload");
let profileImageFile = null;

profileImg.addEventListener("click", () => profileUpload.click());

profileUpload.addEventListener("change", (event) => {
  profileImageFile = event.target.files[0];
  if (profileImageFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImg.src = e.target.result; // Preview image
    };
    reader.readAsDataURL(profileImageFile);
  }
});

const certificateUpload = document.getElementById("certificate-upload");
let certificateImageFile = null;

certificateUpload.addEventListener("change", (event) => {
  certificateImageFile = event.target.files[0];
  if (certificateImageFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const certificatePreview = document.createElement("img");
      certificatePreview.src = e.target.result;
      certificatePreview.style.maxWidth = "100%";
      certificatePreview.style.marginTop = "10px";
      const formRow = certificateUpload.parentElement;
      const existingPreview = formRow.querySelector("img");
      if (existingPreview) existingPreview.remove();
      formRow.appendChild(certificatePreview);
    };
    reader.readAsDataURL(certificateImageFile);
  }
});

// Form submission
document.getElementById("profile-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  clearErrors()

 
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const contactNumber = document.getElementById("contact-number").value;
  const certificateFile = certificateUpload.files[0]; // Uploaded certificate file
  let isValid = true; // Track validation status
  const imageInput = document.getElementById('profile-upload');

    // State Validation
    if (!state) {
      displayError("state", "Please select a state.");
      isValid = false;
    }
  
    // City Validation
    if (!city) {
      displayError("city", "Please select a city.");
      isValid = false;
    }
  
      // Check if no file is selected
      if (!imageInput.files.length) {
        
        displayError("profile-upload", "Please select profile photo")
        isValid = false; 
    }
    
  
    // Certificate Upload Validation
    if (!certificateImageFile) {
      displayError("certificate-upload", "Please upload a certificate.");
      isValid = false;
    }
  
    // If validation fails, stop form submission
    if (!isValid) {
      return;
    }
  

  const formData = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    specialties: document.getElementById("specialties").value,
    address: document.getElementById("address").value,
    contactNumber: document.getElementById("contact-number").value,
    state: document.getElementById("state").value,
    city: document.getElementById("city").value,
  };

 
  try {
    // Convert images to Base64
    if (profileImageFile) {
      formData.profileImage = await convertFileToBase64(profileImageFile);
    }

    if (certificateImageFile) {
      formData.certificateImage = await convertFileToBase64(certificateImageFile);
    }

    // Save data to Firebase Realtime Database
    await database.push(formData);

    // Show success message
    alert("Profile saved successfully!");
    console.log("Profile data:", JSON.stringify(formData, null, 2));

    // Reset the form and preview images
    const form = document.getElementById("profile-form");
    form.reset(); // Resets all form inputs

    // Reset preview images
    profileImg.src = "default-profile-image.png"; // Replace with your default profile image path
    const certificatePreview = certificateUpload.parentElement.querySelector("img");
    if (certificatePreview) certificatePreview.remove();

    // Clear file variables
    profileImageFile = null;
    certificateImageFile = null;

    clearErrors();
  } catch (error) {
    console.error("Error saving profile:", error);
    alert("Failed to save profile. Please try again.");
  }
});

// Function to display error messages
function displayError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorText = document.createElement("p");
  errorText.textContent = message;
  errorText.className = "error-text"; // Add a class for styling
  errorText.style.color = "red"; // Style in red
  errorText.style.margin = "5px 0 0";
  field.parentElement.appendChild(errorText);
}
function clearErrors()
{
    const errorsTexts = document.querySelectorAll('.error-text')
    errorsTexts.forEach(errorText => errorText.remove())
}
