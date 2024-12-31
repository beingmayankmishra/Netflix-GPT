
const checkValidData = (email, passwords) =>{

    const isemailvalid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const ispasswordvalid =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwords);

    if(!isemailvalid) return "Email is not valid";
    if(!ispasswordvalid) return "Password is not valid"
  
    return null ;



}

export default checkValidData;