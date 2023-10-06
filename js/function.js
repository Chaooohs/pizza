//====================================================
import { choiceUser } from "./index.js"

const el = (selector) => document.querySelector(selector);
const all = (selector) => document.querySelectorAll(selector);
const userName = el('#name')
const userPhone = el('#phone')
const userEmail = el('#email')
const submit = el('#btnSubmit')
const [...entry] = all('#info input[name="entry"]')


// regular expression of name
function regName(name) {
  let rgx = /^[а-яiїє'-]+$/ig;
  return rgx.test(name);
}

// regular expression of phone
function regPhone(phone) {
  let rgx = /^\+380\d{9}/ig;
  return rgx.test(phone);
}

// regular expression of email
function regEmail(email) {
  let rgx = /^[a-z0-9_.-]+@[a-z]+\.[a-z]+[a-z.]*$/ig;
  return rgx.test(email);
}

// name verification
export const isName = () => {
  if (userName.value === '') {
    userName.classList.remove('success')
    userName.classList.remove('error')
    submit.disabled = true
  }
  else if (regName(userName.value)) {
    userName.classList.remove('error')
    userName.classList.add('success')
    submitLight(userName.value)
  }
  else {
    userName.classList.remove('success')
    userName.classList.add('error')
    submit.disabled = true
  }
}

// phone verification
export const isPhone = () => {
  if (userPhone.value === '') {
    userPhone.classList.remove('success')
    userPhone.classList.remove('error')
    submit.disabled = true
  }
  else if (regPhone(userPhone.value)) {
    userPhone.classList.remove('error')
    userPhone.classList.add('success')
    submitLight(userPhone.value)
  }
  else {
    userPhone.classList.remove('success')
    userPhone.classList.add('error')
    submit.disabled = true
  }
}

// email verification
export const isEmail = () => {
  if (userEmail.value === '') {
    userEmail.classList.remove('success')
    userEmail.classList.remove('error')
    submit.disabled = true
  }
  else if (regEmail(userEmail.value)) {
    userEmail.classList.remove('error')
    userEmail.classList.add('success')
    submitLight(userEmail.value)
  }
  else {
    userEmail.classList.remove('success')
    userEmail.classList.add('error')
    submit.disabled = true
  }
}

// light of button submit
export function submitLight(...item) {
  item.forEach(() => {
    if (userPhone.value && userPhone.value && userEmail.value) {
      submit.disabled = false
      checkingForСake(choiceUser.size)
    }
    else submit.disabled = true
  })
}

// set of form
export const setForm = () => {
  entry.forEach(() => {
    if (regName(userName.value) && regPhone(userPhone.value) && regEmail(userEmail.value)) {
      window.location.href = "/thank-you/index.html";
    }
    else {
      console.error('The field is not filled')
    }
  })
}

// reset of form
export const resetForm = () => {
  entry.forEach((item) => {
    item.classList.remove('success')
    item.classList.remove('error')
  })
}


// checking for cake
export function checkingForСake(size) {
  if (size === '') alert('Будь ласкаб оберiть корж 🍕')
}