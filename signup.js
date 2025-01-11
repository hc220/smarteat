 //JavaScript for Connection and Data Storing 

 const firebaseConfig = {
    apiKey: "AIzaSyBx_3GD5YqjQ1ASpLwDicetR8eeIw3rFik",
    authDomain: "loginform-f3b1d.firebaseapp.com",
    databaseURL: "https://loginform-f3b1d-default-rtdb.firebaseio.com",
    projectId: "loginform-f3b1d",
    storageBucket: "loginform-f3b1d.firebasestorage.app",
    messagingSenderId: "165308125826",
    appId: "1:165308125826:web:9acf46dc430f4f4a3f5a9b",
    measurementId: "G-705DPZW9CT"
  };

  firebase.initializeApp(firebaseConfig)

  //reference to database

  var database = firebase.database().ref('Nutrition')
  var messagesRef = firebase.database().ref("Sign-up");

  document.getElementById('signup-form').addEventListener("submit", submitForm)

  function submitForm(e)
  {
    e.preventDefault()

    var name = getElementVal('full-name')
    var email = getElementVal('email')
    var password = getElementVal('password')
    var role = document.querySelector('input[name="role"]:checked').value

    saveMessage(name,email,password,role)

    clearErrors()
  }

  function  saveMessage(name,email,password,role)
  {
    messagesRef.push({

      name:name,
      email:email,
      password:password,
      role:role
      

    })

    alert("Form submitted successfully")
  }

  const getElementVal = (id) =>{

    return document.getElementById(id).value
  } 


  function validateFields(name,password,role)
  {
    let isValid = true

    //Email Validation
    if(!email)
    {
        showError('email','Email is required')
        isValid = false
    }
    else if (!validateEmail(email))
    {
        showError('email','Please enter a valid email address')
        isValid = false
    }

    //Password Validation
    if(!password)   
    {
        showError('password','Password is required')
        isValid = false
    }
    else if(!validatePassword(password))
    {
        showError('password','Password must be at least 6 characters long')
        isValid = false
    }

    //Role Validation

    if(!role)
    {
        showError('role','Role is required')
        isValid = false
    }
     return isValid
    }

    function showError(id,message)
    {
        const element = document.getElementById(id)
        const errorElement = document.createElement('div')

        errorElement.className = 'error-text'
        errorElement.innerText = message
        element.parentElement.appendChild(errorElement)
    }

    function clearErrors()
    {
        const errorsTexts = document.querySelectorAll('.error-text')
        errorsTexts.forEach(errorText => errorText.remove())
    }

    function validateEmail(email)
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    function validatePassword(password)
    {
        if(password.length < 6)
        {
            return false
        }

        const letter = /[A-Zaz]/.text(password)
        const number = /[0-9]/.test(password)
        const specialChar = /[@$!%*?&]/.test(password)

        return letter && number && specialChar
    }

   //Google Sign-in 
   document.getElementById('google-signin').addEventListener('click', () => {

    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth()
    .signInWithPopup(provider)
    .then((result)=>{

        //Retrieve the OAuth credential

        const credential = result.credential

        //this gives you a Google Access Token
        const token = credential.accessToken

        //this signed=in user's information
        const user = result.user

        //save user information to Firebase Database
        saveMessage(
            user.displayName || "Unknown",
            user.email || "Unknown",
            "Google Sign-In",
            "N/A"

        )

        //Notify user of successful sign-in 
        alert("Google Sign-In Successful")
    })

    .catch((error)=>{

        //Handle Errors
        alert("Google Sign-In Failed:" + error.message)
    })
   })