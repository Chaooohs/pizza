//==========================================================================
import { isEmail, setForm, resetForm, isName, isPhone, submitLight,  } from "./function.js"

const el = (selector) => document.querySelector(selector);
const all = (selector) => document.querySelectorAll(selector);
const userName = el('#name')
const userPhone = el('#phone')
const userEmail = el('#email')
const reset = el('input[type="reset"]')


class Cost {
  constructor(price) {
    this.price = price
  }

  sizePrice() {
    el('#price').innerText = this.price + ' грв'
  }
}


const sauceClassic = new Cost(25)
const sauceBBQ = new Cost(25)
const sauceRikotta = new Cost(25)
const moc1 = new Cost(30)
const moc2 = new Cost(35)
const moc3 = new Cost(40)
const telya = new Cost(50)
const vetch1 = new Cost(15)
const vetch2 = new Cost(30)


el('#small').addEventListener('click', function (e) {
  const small = new Cost(50)
  small.sizePrice()
})
el('#mid').addEventListener('click', function (e) {
  const mid = new Cost(75)
  mid.sizePrice()
})
el('#big').addEventListener('click', function (e) {
  const big = new Cost(100)
  big.sizePrice()
})


// verification of form
userName.addEventListener('input', isName)
userPhone.addEventListener('input', isPhone)
userEmail.addEventListener('input', isEmail)
submitLight('')

// reset of form
reset.addEventListener('click', resetForm)
// set of form
el('#btnSubmit').addEventListener('click', setForm)