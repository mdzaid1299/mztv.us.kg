const checkValidData = (email,password,fullName) =>{
    const isEmailValid= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password);

    if(fullName.current){
        const isUserNameValid=/^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName.current.value);
        if(!isUserNameValid) return "Name is not Valid"
    }
    
    if(!isEmailValid){
        return "Invalid Email";
    }
    if(!isPasswordValid){
        return "Invalid Password";
    }

    return null;
};

export default checkValidData