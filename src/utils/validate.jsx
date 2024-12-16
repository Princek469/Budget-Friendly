export const checkValidateData = (email, password, name) => {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password)
    // const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name)

    if(!isEmailValid) return "Email ID  is not valid"
    if(!isPasswordValid) return "Password is Not Valid"
    // if(!isNameValid) return "Name is Not Valid"

    return null;
}