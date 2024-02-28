const setup = () => {
    const btn = document.getElementById("herbereken");
    btn.addEventListener("click", calc);
    calc();
}
const calc = () =>{
    const price = document.getElementsByClassName("price");
    const amounts = document.getElementsByClassName("amounts")
    const btw = document.getElementsByClassName("btw");
    const subtotals = document.getElementsByClassName("subtotal");

    for(let i = 0; i<amounts.length; i++){
        let sub = parseFloat(price[i].textContent) * parseFloat(amounts[i].value);
        subtotals[i].innerHTML = (sub + (parseInt(btw[i].textContent)/100.00)*sub).toFixed(2) + " Eur";
    }

    let totalCount = 0;
    const total = document.getElementById("total");
    for(let i = 0; i<subtotals.length; i++){
        totalCount += parseFloat(subtotals[i].textContent);
    }
    total.innerHTML = totalCount.toFixed(2) + " Eur";
}
window.addEventListener("load", setup);