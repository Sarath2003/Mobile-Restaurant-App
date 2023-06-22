import { menuArray } from "./data.js";

const orderDetails = document.getElementById('order-details')
const orderListEl = document.getElementById('order-list')
const orderPrice = document.getElementById('order-price')
const customerForm = document.getElementById('customer-form')
let cost = 0
let orderId = 0

document.addEventListener('click', function(e){
    if(e.target.dataset.addItem){
        purchaseItem(e.target.dataset.addItem)
    }
    if(e.target.dataset.removeItem){
        removeItem(e.target.dataset.removeItem)
    }
    if(e.target.id === 'order-btn'){
        document.getElementById('form-details').style.display = 'block'
    }
})

function purchaseItem(itemId){
    const item =  menuArray.filter(function(item){
        return itemId == item.id
    })[0]
    orderListEl.innerHTML += `
    <div class="order-item" id="order-item-${orderId}" data-price=${item.price}>
        <p class="title align-center">${item.name}</p>
        <p class="remove align-center" data-remove-item=${orderId}>remove</p>
        <p class="right-end">$${item.price}</p>
    </div>`

    cost += item.price
    orderPrice.textContent = "$" + cost
    if(cost >  0){
        orderDetails.classList.remove('hidden')
    }
    orderId++
}

function removeItem(target){
    let targetEl = document.getElementById(`order-item-${target}`)
    
    targetEl.style.display = 'none'
    cost -= targetEl.dataset.price
    if(cost ===  0){
        orderDetails.classList.add('hidden')
    }
    orderPrice.textContent = "$" + cost
}

customerForm.addEventListener('submit', function(e){
    e.preventDefault()
    const customerData = new FormData(customerForm)
    const fullName = customerData.get('fullName')
    
    const confirmMessage = document.getElementById('confirm-message')
    confirmMessage.innerHTML = `
    <p class="center">Thanks,${fullName}! Your order is on its way!</p>`

    document.getElementById('form-details').style.display = 'none'
    confirmMessage.style.display = 'block'
    orderListEl.innerHTML = ``
    cost = 0
    orderDetails.classList.add('hidden')  
    confirmMessage.style.display = 'block'
    document.getElementById('customer-form').reset()

    setTimeout(function(){
        confirmMessage.style.display = 'none'
    }, 5000)
})


function getItemsList(){
    let itemsList = ``
    
    menuArray.forEach(function(item){
        let ingredients = ''
        item.ingredients.forEach(function(ingredient){
            ingredients += ingredient + ", "
        })

        itemsList += `
        <div class="item">
            <p class="item-pic">${item.emoji}</p>
            <div class="item-details">
                <p class="title">${item.name}</p>
                <p class="light">${ingredients}</p>
                <p>$${item.price}</p>
            </div>
            <img src="images/add-btn.png" alt="add-to-cart" class="add-item right-end" data-add-item=${item.id}>
        </div>`
    })
    return itemsList
}

function render(){
    document.getElementById('menu').innerHTML = getItemsList()
}

render()


