// Dom Elements
const registerForm = document.getElementById('register-form');
const nameInp = document.getElementById('name');
const emailInp = document.getElementById('email');
const passInp = document.getElementById('password');
const confirmPassInp = document.getElementById('confirm');
const registerBtn = document.getElementById('submit-btn');
const allInputs = document.querySelectorAll('.box input');


registerForm.addEventListener('submit',function(e){
    // prevent reloading page
    e.preventDefault();
    
    // check if the All inputs are filled or empty
    if(!checkRequired()) return;
    
    // check if inputs are vaild
    const validName = checkLength(nameInp,3,18);
    const validPass = checkLength(passInp,5,12);
    const validEmail = checkEmail(emailInp)
    const validConfirmPass = checkConfirmPass();
    
    if(validName && validPass && validEmail && validConfirmPass) {
        alert('Registration completed successfully!');
        registerForm.reset();
        allInputs.forEach( input => {
            input.parentElement.className = 'box';
            input.nextElementSibling.textContent = '';
        })
    }
})

function checkLength(input,min,max){

  
    if(input.value.trim().length < min){
        showError(input,`${getInputName(input)} must has ${min} chars at least`);
        return false;
    }

    else if(input.value.trim().length > max){
        showError(input,`${getInputName(input)} cannot include more than ${max} chars`);
        return false;
    }
    
    else {
        showSuccess(input);
        return true;
    }
    
}

function checkEmail(emailInp){
    const validEmail = /^\w+\.?\w+@\w{2,}\.\w{2,}/i.test(emailInp.value.trim())
    if(!validEmail){
        showError(emailInp,`${getInputName(emailInp)} is not valid`);
        return false;
    }
        showSuccess(emailInp);
        return true;
}

function checkConfirmPass(){
    if(confirmPassInp.value.trim() === passInp.value.trim()){
        showSuccess(confirmPassInp);
        return true
    }
    else{
        showError(confirmPassInp,`Passwords are not matched`);
        return false
    }
}
// check from Inputs => empty? or Not
function checkRequired(){

    let isValid = true;

    allInputs.forEach( input => {
        if(input.value.trim() === ''){
            // show Error Message and false Checked input
            showError(input,`${getInputName(input)} is required`);
            isValid = false;
        }else {
            // checked input is true
            showSuccess(input);
        }
    })

    return isValid;
    
}

// show the input Error Message
function showError(input , errMsg){
    input.nextElementSibling.textContent = errMsg;
    input.parentElement.className = 'box error'
}

// add success to the input box
function showSuccess(input){
    input.parentElement.className = 'box success'
}

// get Input Name starts with capital letter
function getInputName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}