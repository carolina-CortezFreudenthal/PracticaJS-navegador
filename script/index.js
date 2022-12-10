let transactions = [];

function fillSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
        if (transaction.type == "expense") totalExpense += transaction.amount;
        if (transaction.type == "income") totalIncome += transaction.amount;
    });
    //ahorro
    const savings = totalIncome - totalExpense;
    //Agrego al html
    document.getElementsByName("totalincome")[0].innerHTML = `$${totalIncome}`;
    document.getElementsByName("totalexpense")[0].innerHTML = `$${totalExpense}`;
    document.getElementsByName("savings")[0].innerHTML = `$${savings}`;
}

function fillTable() {
    const tableBody = document.getElementById("tablebody");
    tableBody.innerHTML = "";

    newHtml = "";
    for (let i = transactions.length - 1; i >= 0; i--) {
        const t = transactions[i];
        newHtml += `<tr>` + 
        `<td>${t.concept}</td>` + 
        `<td>${t.amount}</td>` + 
        `<td>${t.type}</td>` + 
        `<td><button class="deletebutton" onclick="deleteTransaction(${i})">Borrar</button></td>` +
        `</tr>\n`
    }
    tableBody.innerHTML = newHtml;
}

function validateForm (concept, amount) {
    if (!concept) {
        alert("El concepto es obligatorio");
        return false;
    }
    else if (amount <= 0) {
        alert("El monto tiene que ser mayor o igual a 0");
        return false;
    }
    return true;
}

function addTransaction(e) {
    e.preventDefault();

    const concept = e.target.elements[0].value;
    const transactionType = document.querySelector('input[name="transactiontype"]:checked').value;
    const amount = e.target.elements[3].value;

    const isValid = validateForm(concept, amount);
    
    // Si no es valido, luego detiene la funcion
    if (!isValid) return;

    // Ingresamos los datos de la trasaccion
    transactions.push({
        concept: concept,
        type: transactionType,
        amount: parseFloat(amount), 
    })

    // Agrega la transaction a la tabla
    fillTable();
    // actualiza el estado 
    fillSummary()
    // Va a local storage
    localStorage.setItem("transactions", JSON.stringify(transactions));
    // Reset form
    e.target.reset();
}

function deleteTransaction(id) {
    transactions = transactions.filter((t, i) => i !== id);

    // Agrego a la tabla
    fillTable();
    // actualizo el estado de las transacciones
    fillSummary()
    // va a  local storage
    localStorage.setItem("transactions", JSON.stringify(transactions));
}


// Cuando se recargue
window.onload = () => {
    // carga las trasactions del local storage
    transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // llenar tabla inicial 
    fillTable();

    // llenar  
    fillSummary();

    // a;ado el form una vez que se pulse btn
    const form = document.getElementById('transactionform');
    form.addEventListener(('submit'), addTransaction);
};

/////////
