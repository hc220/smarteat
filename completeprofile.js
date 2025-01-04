const statesAndCities = {
    "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur", "Nellore"],
    "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
    "West Bengal": ["Kolkata", "Darjeeling", "Asansol", "Howrah"],
  };
  
  // Dropdown: State and City
  const stateDropdown = document.getElementById("state");
  const cityDropdown = document.getElementById("city");
  
  // Populate state dropdown
  Object.keys(statesAndCities).forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateDropdown.appendChild(option);
  });
  
  // Update city dropdown when state changes
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
  
  // Handle Profile Image Upload
  const profileImg = document.getElementById("profile-img");
  const profileUpload = document.getElementById("profile-upload");
  let profileImageBase64 = ""; // Store base64 profile image
  
  profileImg.addEventListener("click", () => profileUpload.click());
  
  profileUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImg.src = e.target.result; // Update profile image
        profileImageBase64 = e.target.result; // Store base64 image
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Handle Certificate Preview
  const certificateUpload = document.getElementById("certificate-upload");
  let certificateImageBase64 = ""; // Store base64 certificate image
  
  certificateUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const certificatePreview = document.createElement("img");
        certificatePreview.src = e.target.result;
        certificatePreview.style.maxWidth = "100%";
        certificatePreview.style.marginTop = "10px";
        const formRow = certificateUpload.parentElement;
        const existingPreview = formRow.querySelector("img");
        if (existingPreview) {
          existingPreview.remove(); // Remove old preview
        }
        formRow.appendChild(certificatePreview); // Add new preview
        certificateImageBase64 = e.target.result; // Store base64 certificate image
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Form submission handler
  document.getElementById("profile-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      specialties: document.getElementById("specialties").value,
      address: document.getElementById("address").value,
      contactNumber: document.getElementById("contact-number").value,
      state: document.getElementById("state").value,
      city: document.getElementById("city").value,
      profileImage: profileImageBase64, // Base64 profile image
      certificateImage: certificateImageBase64, // Base64 certificate image
    };
  
    console.log("Form Data:", JSON.stringify(formData, null, 2));
    alert("Profile saved successfully!");
  });
  