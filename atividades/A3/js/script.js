const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
        document.querySelector('.modal-overlay')
        .classList
        .add('active')
    },
    close() {
        // Fechar modal
        // Remover a class active ao modal
        document.querySelector('.modal-overlay')
        .classList
        .remove('active')
    }
}


const Storage = {
    get() {
        // transformar de string para array/objeto
        return JSON.parse(localStorage.getItem("dev.finances: transactions")) || []
    },

    set(transactions) {
        // transforma em string o meu Array
        localStorage.setItem("dev.finances: transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),

    add(transaction) {
        // push vai colocar dentro do array uma coisa
        Transaction.all.push(transaction)

        App.reload()
    }, 

    remove(index) {
        //splice = vai esperar a posicao do array e quantos elementos quero deletar
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        //Contrar as transacoes de entradas = Somar as estradas
        let income = 0;
        //pegar todas as transacoes
        Transaction.all.forEach((transactions) => {
        //para cada transacao, se ela for maior que zero
            if(transactions.amount > 0) {
                //somar a uma variavel e retornal a variavel
                income += transactions.amount;
            }
        })
        return income
       
    }, 

    expenses() {
        //somar as saídas
        let expense = 0;
        //pegar todas as transacoes
        Transaction.all.forEach((transactions) => {
        //para cada transacao, se ela for maior que zero
            if(transactions.amount < 0) {
                //somar a uma variavel e retornal a variavel
                expense += transactions.amount;
            }
        })
        return expense

    }, 
    
    total() {
        // entradas - saidas
       return Transaction.incomes() + Transaction.expenses();
    }
}

// document object model
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    }, 

    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

         //monstando a mascara, o html
        const html = `
            <tr>
                <td class="descriptions">${transaction.descriptions}</td>
                <td class="${CSSclass}"> ${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                     <img onclick ="Transaction.remove(${index})" src="/atividades/assets/minus.svg" alt="Remover Transação">
                 </td>
            </tr>
        `
        // uma funcao para que eu possa usar ela em outro lugar usa a palavra return 
        return html
    }, 

    updateBalance() {
        //mostrar pra gente os valores nos cards
        document
                .getElementById('incomeDisplay')
                .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document
                .getElementById('expenseDisplay')
                .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document
                .getElementById('totalDisplay')
                .innerHTML = Utils.formatCurrency(Transaction.total())
    }, 

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {

    formatAmount(value) {
        value = Number(value) * 100
        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-");
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        //só pega numero e não sinal de negativo ou positivo
        // \D = ache tudo que não é número
        value = String(value).replace(/\,\./g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
       
        return signal + value
    }
}

const Form = {
    descriptions: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    clearFields() {
        Form.descriptions.value = "", 
        Form.amount.value = "", 
        Form.date.value = ""
    },

    getValues() {
        return {
            descriptions: Form.descriptions.value,
            amount: Form.amount.value,
            date: Form.date.value
         }
    },

    validadeFields() {
        let { descriptions, amount, date } = Form.getValues()

        // trim = faz uma limpeza de espaços vazios de uma string
        if (descriptions.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === "") 
            {
                throw new Error("Por Favor, preencha todos os campos.")
            }
    },

    formatValues() {
        let { descriptions, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)
    
        return {
            descriptions, 
            amount, 
            date
        }
    },

    submit(event) {
        // para fazer as funcionalidades que eu quero antes de salvar
        event.preventDefault()

        try {
            // verificar se todas as informacoes foram preenchidas
           //Form.validadeFields()
            // format os dados para salvar
            const transaction = Form.formatValues()
            // salvar
            Transaction.add(transaction)
            // apagar o dados do formulário
            Form.clearFields()
            // modal feche
            Modal.close()
        } catch (error) {
            alert(error.message)
        }
    }
}


const App = {
    init() {

        Transaction.all.forEach(DOM.addTransaction)

        DOM.updateBalance()

        Storage.set(Transaction.all)
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()




