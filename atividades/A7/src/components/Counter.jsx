import { useState } from 'react' //guarda o estato de uma determinada variável



export function Counter() {
    const [counter, setCounter] = useState(0); //definindo o valor como zero e retorna um Array de dois elementos

    function increment() {
        setCounter(counter + 1)
    }
    return(
        <div>
            <h2>{counter}</h2>
            <button type="button" onClick={increment}>Incrementar</button>
        </div>
    )
}