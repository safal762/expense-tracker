// getting html nodes
const amount = document.querySelector('.amount')
const income = document.querySelector('.incomeAmt')
const expense = document.querySelector('.expenseAmt')
const form = document.querySelector('form')
const desc = document.getElementById('des')
const amt = document.getElementById('amt')
const button = document.querySelector('.add')
let itemPlus = document.querySelector('.pluss')
let itemMinus = document.querySelector('.minuss')
let transaction = document.querySelector('.transactions')

// getting value from local storage 
let getData = JSON.parse(localStorage.getItem('transaction')) || [] // gets values from local storage using keys 
// initilizing variable 
let  totalBalance=60000
add=0
minus=0
amount.textContent = `$ ${totalBalance}`

form.addEventListener('submit', function (e) {
    e.preventDefault()
    let description = desc.value.trim()// removes the white space in both ends
    let amount = parseFloat(amt.value)

    getData.push({
        id: Date.now(),
        descrip: description,
        amt: amount,
        totalAmount: totalBalance,
    })

    localStorage.setItem('transaction', JSON.stringify(getData)) // sets value and key in local storage
    sortData(getData.totalBalance)
    incomeGain(amount)
})

function sortData(value) {
    itemPlus.innerHTML = ''
    itemMinus.innerHTML = ''
    getData.forEach(function (e) {


        let divPlus = document.createElement('div')
        divPlus.classList.add('history-item', 'plus')
        let divMinus = document.createElement('div')
        divMinus.classList.add('history-item', 'minus')

        let span = document.createElement('span')
        let desSpan = document.createElement('span')
        if (e.amt > 0) {
            desSpan.textContent = e.descrip
            span.textContent = e.amt
            divPlus.append(desSpan, span)
            itemPlus.appendChild(divPlus)

        }
        else {
            desSpan.textContent = e.descrip
            span.textContent = e.amt
            divMinus.append(desSpan, span)// append can append more than one 1 html element
            itemMinus.appendChild(divMinus)
            amount.textContent = `$ ${value}`
        }

        amount.textContent = `$ ${totalBalance}`

    })

}

function incomeGain(value) {
    if (value > 0) {
        add += value
        income.textContent = `$ ${add}`
        totalBalance += value
        amount.textContent = `$ ${totalBalance}`

    } else {
        minus += value
        expense.textContent = `$ ${minus}`
        totalBalance += value
        amount.textContent = `$ ${totalBalance}`
    }
}


sortData()