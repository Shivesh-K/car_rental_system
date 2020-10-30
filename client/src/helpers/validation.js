const regex = {
    email: /^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i,
    name: /^\b[a-z\.\s]+\b/i,
    contactNo: /^[6-9]{1}\d{9}/,
    houseNo: /^\b\d{1,3}(\/\d{1,3})?[A-Z]?\b/i,
    street: /^\b[\w\,?\s]+\b/gi,
    city: /^\b[a-z]+\b/i,
    state: /^\b[a-z]+\b/i,
    zipcode: /^\b[0-9]{6}(-[0-9]{4})?\b/g,
    brand: /^\b[a-z]+\b/i,
    model: /^\b[a-z\-0-9\ ]+\b/i,
    registrationNo: /^\b[a-z]{2}\-\d{2}\-[a-z]{2}\-[a-z0-9]{4}\b/i,
    color: /([a-z]+\ ?)+/i
}

const validateEmail = (email) => {
    return regex.email.test(email)
}
const validatePassword = (password) => {
    return password.trim().length >= 8
}
const validateName = (name) => {
    return regex.name.test(name)
}
const validateContactNo = (contactNo) => {
    return regex.contactNo.test(contactNo)
}
const validateHouseNo = (houseNo) => {
    return regex.houseNo.test(houseNo)
}
const validateSreet = (street) => {
    return regex.street.test(street)
}
const validateCity = (city) => {
    return regex.city.test(city)
}
const validateState = (state) => {
    return regex.state.test(state)
}
const validateZipcode = (zipcode) => {
    return regex.zipcode.test(zipcode)
}

const validateBrand = (brand) => {
    return regex.brand.test(brand)
}

const validateModel = (model) => {
    return regex.model.test(model)
}

const validateRegistrationNo = (registrationNo) => {
    return regex.registrationNo.test(registrationNo)
}

const validateType = (type) => {
    return type != 0
}

const validateColor = (color) => {
    return regex.color.test(color)
}

export {
    validateEmail,
    validatePassword,
    validateName,
    validateContactNo,
    validateHouseNo,
    validateSreet,
    validateCity,
    validateState,
    validateZipcode,
    validateBrand,
    validateModel,
    validateRegistrationNo,
    validateColor,
    validateType
}