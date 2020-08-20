let email = {}, signInButton

const isValidEmailAddress = function(emailAddress) {
    // Basis manier om e-mailadres te checken.
    console.log(emailAddress);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const addErrors = function(obj){
    obj.field.classList.add('has-error');
  };

const removeErrors = function(obj){
    obj.field.classList.remove('has-error');
  };

const checkEmail = function(){
   if(isValidEmailAddress(email.input.value)){
        email.errorMessage.style.display = "none";
        removeErrors(email);
        email.input.removeEventListener('input', doubleCheckEmailAddress);
    }else {
        email.errorMessage.style.display = "block";
        email.errorMessage.innerHTML = "Invalid emailadress";
        addErrors(email);
    }
  };

  const doubleCheckEmailAddress = function(){
    checkEmail();
  };

  const enableListeners = function() {
    email.input.addEventListener('blur', function(){
      email.input.addEventListener('input', doubleCheckEmailAddress);
      checkEmail();
    });
}



    const getDOMElements = function() {
        
      
        email.errorMessage =  document.querySelector(".js-email-error-message");
        email.input = document.querySelector(".js-email-input");
        signInButton = document.querySelector(".js-sign-in-button");
    //    email.field = document.querySelector(".js-form-field__email");
      
      
      
      //  signInButton = document.querySelector(".js-sign-in-button");
      
        enableListeners();
      };

      document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM geladen');
        getDOMElements();
        
      });
    