import { useState } from 'react' //guarda o estato de uma determinada variável



export function Counter() {
    //São imutabilidade = Seu valor não pode ser alterado
    const [counter, setCounter] = useState(0); //definindo o valor como zero e retorna um Array de dois elementos

    function increment() {
        setCounter(counter + 1) //Criando uma nova variável em um espaço de memória
    }
    return(
        <div>
            <h2>{counter}</h2>
            <button type="button" onClick={increment}>Incrementar</button>
        </div>
    )
}