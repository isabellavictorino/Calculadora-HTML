const result = document.querySelector('.result'); //pegar resultado
const buttons = document.querySelectorAll('.buttons button'); // todos os botoes

//variaveis
let currentNumber = ""; //numero atual
let firstOpe = null; //primeiro numero
let operador = null; 
let restart = false;

//funcoes
function updateResultado(originClear = false){
    result.innerText = originClear ? 0 : currentNumber.replace(".",",");
}

function addDigit(digit){ //add o digito no visor
    if(addDigit === "," && (currentNumber.includes(",") || !currentNumber)) //ver se tem virgula ou algo digitado
    return;

    if(restart){
        currentNumber = digit;
        restart = false; //se tornara true apenas quando houver calculo
    }else{
        currentNumber += digit; //segue concatenando um numero no outro (123...)
    }
    
    updateResultado();
}

function setOperator(newOpe){ 
    if(currentNumber){ //verifica se tem um numero atual
        calculate();
        firstOpe = parseFloat(currentNumber.replace(",","."));
        currentNumber = "";
    }
    operador = newOpe;
}

function calculate(){
    if(operador === null || firstOpe === null) result;
    let secondOpe = parseFloat(currentNumber.replace(",","."));
    let valorFinal; //resultado

    //switch
    switch(operador){
        case "+":
            valorFinal = firstOpe + secondOpe;
            break;
        case "-":
            valorFinal = firstOpe - secondOpe;
            break;
        case "x":
            valorFinal = firstOpe * secondOpe;
            break;
        case "÷":
            valorFinal = firstOpe / secondOpe;
            break;
        default:
            return;
    }
    // resultado tem + 5 casas decimais
    if(valorFinal.toString().split(".")[1]?.length > 5){
        currentNumber = parseFloat(valorFinal.toFixed(5).toString())
    }else{
        currentNumber = valorFinal.toString();
    }

    operador = null;
    firstOpe = null;
    restart = true;
    updateResultado();
}

function clearCalculator(){
    currentNumber = "";
    firstOpe = null;
    operador = null;
    updateResultado(true);
}

function setPercentage(){
    let result = parseFloat(currentNumber) / 100
    if(["+","-"].includes(operador)){
        result = result * (firstOpe || 1);
    }
    if(result.toString().split(".")[1]?.length > 5){
        result = result.toFixed(5).toString();
    }
    currentNumber = result.toString();
    updateResultado();
}

//botoes
buttons.forEach((button) => {
    button.addEventListener("click", () =>{
        const textoBotao = button.innerText;
        if(/^[0-9]+$/.test(textoBotao)){
            addDigit(textoBotao);
        }else if(["+","-","x","÷"].includes(textoBotao)){ //operadores em um array, verifica se o botao é um operador
            setOperator(textoBotao);
        }else if(textoBotao === "="){
            calculate();
        }else if(textoBotao === "C"){
            clearCalculator(); //limpar visor
        }else if(textoBotao === "±"){
            currentNumber = (
                parseFloat(currentNumber || firstOpe) * -1
            ).toString();
            updateResultado();
        }else if(textoBotao === "%"){
            setPercentage();
        }
    })
})