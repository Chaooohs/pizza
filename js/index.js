//==========================================================================
import { isEmail, setForm, resetForm, isName, isPhone, submitLight } from "./function.js"

const el = (selector) => document.querySelector(selector);
const all = (selector) => document.querySelectorAll(selector);
const userName = el('#name')
const userPhone = el('#phone')
const userEmail = el('#email')
const reset = el('input[type="reset"]')
const draggable = all('.draggable')


// import of a file with a product catalog
async function request(url) {
  const data = await fetch(url)
  return await data.json()
}

// import of a file with a product catalog
request('./public/product-list.json')
  .then((json) => outJson(json))
  .catch((e) => console.error('error'))


let product = []

function outJson(json) {
  product = json
}


// object with ingredients
const choiceUser = {
  size: '',
  sauce: [],
  topping: [],
  price: '0'
}


// choise of size
el('#pizza').addEventListener('click', function (e) {
  if (e.target.classList.contains('radioin')) {
    selectUser(e.target)
  }
})


// filter of ingredients
function selectUser(choise) {
  if (choise.name === 'size') choiceUser.size = product.size.find((item) => item.productSize === choise.value)
  if ('sauceClassicsauceBBQsauceRikotta'.includes(choise)) choiceUser.sauce.push(product.sauce.find((item) => item.productID === choise))
  if ('moc1moc2moc3telyavetch1vetch2'.includes(choise)) choiceUser.topping.push(product.topping.find((item) => item.productID === choise))
  calculate(choiceUser)
}


// cost calculation
function calculate(elem) {
  let price = 0

  if (elem.size !== '') {
    price += elem.size.productCost
  }
  if (elem.sauce.length > 0) {
    for (let key of elem.sauce) {
      price += key.productCost
    }
  }
  if (elem.topping.length > 0) {
    for (let key of elem.topping) {
      price += key.productCost
    }
  }
  choiceUser.price = price
  showCost(choiceUser.price)
}

// price display on screen
const showCost = (num) => el('#price').innerText = num + ' грв'
showCost(choiceUser.price)


// movable element
draggable.forEach((item) => {
  item.addEventListener('dragstart', function (e) {
    e.dataTransfer.setData('id', e.target.id)
    e.dataTransfer.setData('name', e.target.dataset.name)
    e.dataTransfer.setData('sauce', e.target.dataset.sauce)
    e.dataTransfer.setData('topping', e.target.dataset.topping)
  })
})

// override default action for parent
el('.table').addEventListener('dragover', function (e) {
  e.preventDefault()
  // changing the mouse cursor
  e.dataTransfer.dropEffect = 'move';
})

// element release
el('.table').addEventListener('drop', function (e) {
  let id = e.dataTransfer.getData('id')
  let name = e.dataTransfer.getData('name')
  let sauce = e.dataTransfer.getData('sauce')
  let topping = e.dataTransfer.getData('topping')

  this.appendChild(document.getElementById(id))
  // this.appendChild(document.getElementById(id).cloneNode(true))

  selectUser(id)

  if (sauce === 'sauce') {
    el('#sauce').insertAdjacentHTML('beforeend', `
        <div class="result__list" id="${id}">
            <span class="result__item">${name}</span>
            <img class="result__img" src="/img/close-gray.svg" alt="del">
        </div>
    `)
    del()
  }

  if (topping === 'topping') {
    el('#topping').insertAdjacentHTML('beforeend', `
        <div class="result__list" id="${id}">
            <span class="result__item">${name}</span>
            <img class="result__img" src="/img/close-gray.svg" alt="del">
        </div>
    `)
    del()
  }
})


// function to remove from the list of toppings
function del() {
  el('.result').addEventListener('click', (e) => {
    if (e.target.closest('.result__img')) {
      const b = e.target.closest('.result__list')
      choiceUser.sauce = choiceUser.sauce.filter((item) => item.productID !== b.id)
      choiceUser.topping = choiceUser.topping.filter((item) => item.productID !== b.id)
      b.remove()
      calculate(choiceUser)
      removeImg(b.id)
    }
  })
}


// function to remove elements from pizza
function removeImg(b) {
  all('img').forEach((img) => {
    if (img.closest('.table')) {
      if (b === 'sauceClassic' && img.id === 'sauceClassic') {
        el('#a').insertAdjacentElement('afterBegin', img);
      }
      else if (b === 'sauceBBQ' && img.id === 'sauceBBQ') {
        el('#b').insertAdjacentElement('afterBegin', img);
      }
      else if (b === 'sauceRikotta' && img.id === 'sauceRikotta') {
        el('#c').insertAdjacentElement('afterBegin', img);
      }
      else if (b === 'moc1' && img.id === 'moc1') {
        el('#d').insertAdjacentElement('afterBegin', img);
      }
      else if (b === 'moc2' && img.id === 'moc2') {
        el('#e').insertAdjacentElement('afterBegin', img);
      }
      else if (b === 'moc3' && img.id === 'moc3') {
        el('#f').insertAdjacentElement('afterBegin', img);
      }
      else if (b === 'telya' && img.id === 'telya') {
        el('#g').insertAdjacentElement('afterBegin', img);
      }
      else if (b === 'vetch1' && img.id === 'vetch1') {
        el('#h').insertAdjacentElement('afterBegin', img);
      }
      else if (b === 'vetch2' && img.id === 'vetch2') {
        el('#i').insertAdjacentElement('afterBegin', img);
      }
    }
  })
}


// verification of form
userName.addEventListener('input', isName)
userPhone.addEventListener('input', isPhone)
userEmail.addEventListener('input', isEmail)
submitLight('')

// reset of form
reset.addEventListener('click', resetForm)

// set of form
el('#btnSubmit').addEventListener('click', setForm)


// moving banner
el('#banner').addEventListener('mouseover', function (e) {
  e.target.style.left = e.target.offsetWidth + Math.ceil(Math.random() * (document.body.offsetWidth/2)) + 'px';
  e.target.style.top = e.target.offsetHeight + Math.ceil(Math.random() * (document.body.offsetHeight/2)) + 'px';
})





