export const checkValidateData = (email, password)=>{
    const isEmailValidate = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email)
    const isPasswordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    if(!isEmailValidate) return "Invalid Email"

    if(!isPasswordValidate) return "Invalid Password"

    return null
}