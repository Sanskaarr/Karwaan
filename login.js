function adminlogin() {
    const email = document.getElementById("email").value;
    if (email == null || email == "") {
      alert("Please enter your Email");
      return false;
    }
    else if(email != '@'){
      alert("Email should have an @");
      return false;
    }
  
    const password = document.getElementById("password").value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=_-]).{5,10}$/;
    if (password == null || password == "") {
      alert("Please Enter Password");
      return false;
    } 
    
    else if (!password.match(pattern)) {
      alert(
        "Password Must Contain: -" +
          "\n" +
          "One Lowecase Alphabet" +
          "\n" +
          "One Uppercase Alphabet" +
          "\n" +
          "A Numerical Value" +
          "\n" +
          "A Special Character" +
          "\n" +
          "And Must be between 5-10 Characters !"
      );
      return false;
    }
  }
  
