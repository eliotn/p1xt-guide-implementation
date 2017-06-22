const TAX_RATE = number_prompt("What is the tax rate (as a percent number)?")/100;//0.08;
const PHONE_PRICE = number_prompt("What is the phone price?");//150.00;
const ACCESSORY_PRICE = number_prompt("What is the accessory price?");//8.00;
const BUDGET = number_prompt("What is your budget?");//600.00
const BANK_ACCOUNT_BALANCE = number_prompt("What is your bank account balance?");

//every price should be non_zero and not NaN
function number_prompt(prompt_text) {
    do {
        var value = Number(prompt(prompt_text));
    } while (isNaN(value) || value < 0);
    return value;
}

function amountToSpend() {
    //assuming phones are bought first
    /*var phones = Math.floor(BUDGET/(PHONE_PRICE));
    var costs = phones*PHONE_PRICE
    var accessories = Math.min(Math.floor(
        (BUDGET-costs)/ACCESSORY_PRICE), phones);
    costs += accessories*ACCESSORY_PRICE;
    return costs;*/
    //assuming phones are always bought with accessories
    var phones = Math.floor(BUDGET/(PHONE_PRICE + ACCESSORY_PRICE));
    var costs = phones*(PHONE_PRICE + ACCESSORY_PRICE);
    var phonesonly = Math.floor((BUDGET-costs)/PHONE_PRICE);
    costs += phonesonly*PHONE_PRICE;
    return costs;
}

function priceFormat(price) {
    return '$' + price.toFixed(2);
}

function calculateTax(price) {
    return (TAX_RATE * price);
}

var total = amountToSpend() + calculateTax(amountToSpend());
console.log(priceFormat(total));
console.log((total <= BANK_ACCOUNT_BALANCE)?"CAN AFFORD":"CAN'T AFFORD");