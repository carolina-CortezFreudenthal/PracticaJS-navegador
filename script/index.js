let transactions = [];

function fillTable() {
    const tableBody = document.getElementById("tablebody");
    tableBody.innerHTML = "";

    newHtml = "";
    for (let i = 0; i< transactions.length; i++) {
        const t = transactions[i];
        newHtml += `<tr>` + 
        `<td>${t.concept}</td>` + 
        `<td>${t.amount}</td>` + 
        `<td>${t.type}</td>` + 
        `<td><button class="deleteButton" onclick="deleteTransaction(${i})">Borrar</button></td>` +
        `</tr>\n`
    }
    tableBody.innerHTML = newHtml;
}

function deleteTransaction(id) {
    transactions = transactions.filter((_t, i) => i !== id);
    fillTable();
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

function addTransaction() {
    const concept = document.getElementById("inputconcept").value;
    const transactionType = document.querySelector('input[name="transactiontype"]:checked').value;
    const amount = document.getElementById("inputamount").value;

    const isValid = validateForm(concept, amount);
    
    // If not valid, then let's break execution of the function
    if (!isValid) return;

    // Push into our state in which we store the transaction
    transactions.push({
        concept: concept,
        type: transactionType,
        amount: parseFloat(amount), 
    })

    // Clean the form
    document.getElementById("inputconcept").value = "";
    document.getElementById("inputamount").value = "";

    // Append the transactions into the table
    fillTable();
}