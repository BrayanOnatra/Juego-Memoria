//INICIALIZACIÓN DE VARIABLES
let tarjetasDestapadas = 0;
let tarjetaUno = null
let tarjetaDos = null
let primerResultado = null
let segundoResultado = null
let movimientos = 0
let aciertos = 0
let temporizador = false
let timer = 38
let timerInicial = timer
let tiempoDecendente = null

//VARIABLES DE AUDIO
let Presionar = new Audio("./Sonidos/click.wav")
let loseAudio = new Audio("./Sonidos/lose.wav")
let winAudio = new Audio("./Sonidos/win.wav")
let ParIncorrecto = new Audio("./Sonidos/incorrecto.wav")
let parCorrecto = new Audio("./Sonidos/parCorrecto.wav")


//APUNTANDO A DOCUMENTO HTML
let mostrarMovimientos = document.getElementById('movimientos')
let mostrarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('tiempo')

let ocultarBoton = document.getElementById('reinicio')
ocultarBoton.style.display = 'none'

//NUMEROS ALEATORIOS
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 })
console.log(numeros)


//FUNCIONES 
function reiniciarJuego(){
  location.reload()
}

function contarTiempo(){
 tiempoDecendente = setInterval(()=>{
  timer--;
  mostrarTiempo.innerHTML = `Tiempo: ${timer} seg`
  if( timer == 0){
   clearInterval (tiempoDecendente)
   bloquearTarjetas()
   
  }
 
 },800);
}
function bloquearTarjetas(){
  for (let index = 0; index <= 16; index++) {
    let tarjetaBloqueada = document.getElementById(index) 
    tarjetaBloqueada.innerHTML = `<img src = "./imagenes/${numeros[index]}.png" alt = " ">`;
    tarjetaBloqueada.disabled = true
    mostrarTiempo.innerHTML = ` Perdiste 😩 vuelve a intentarlo 🤗.`
    ocultarBoton.style.display = 'block'
    loseAudio.play()
    ocultarBoton.addEventListener('click',reiniciarJuego)
  }
}

//FUNCIÓN PRINCIPAL
function destapar(id) {
   let ocultarBoton = document.getElementById('reinicio')
    ocultarBoton.style.display = 'none'
   if( temporizador == false){
      contarTiempo()
      temporizador = true
   }

  tarjetasDestapadas++
  console.log(tarjetasDestapadas)

  if (tarjetasDestapadas == 1) {
    //MOSTRAR PRIMER NUMERO
    tarjetaUno = document.getElementById(id)
    primerResultado = numeros[id]
    tarjetaUno.innerHTML = `<img src = "./imagenes/${primerResultado}.png" alt = " ">`;
    Presionar.play()
    //DESHABILITAR PRIMER BOTON
    tarjetaUno.disabled = true
  } else if (tarjetasDestapadas == 2) {
    //MOSTRAR SEGUNDO NUMERO
    tarjetaDos = document.getElementById(id)
    segundoResultado = numeros[id]
    tarjetaDos.innerHTML = `<img src = "./imagenes/${segundoResultado}.png" alt = " ">`;
    //DESHABILITAR PRIMER BOTON
    tarjetaDos.disabled = true
    //INCREMENTAR MOVIMIENTOS
    movimientos++
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`

    if (primerResultado == segundoResultado) {
      //ENCERAR CONTADOR TARJETAS DESTAPADAS
      tarjetasDestapadas = 0
      // AGREGAR LOS ACIERTOS
      aciertos++
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`
      parCorrecto.play()
    } else {
      ParIncorrecto.play()
      //MOSTRAR VALORES MOMENTANEAMENTE Y VOLVER A TAPAR
      setTimeout(() => {
        tarjetaUno.innerHTML = ' ';
        tarjetaDos.innerHTML = ' ';
        tarjetaUno.disabled = false;
        tarjetaDos.disabled = false;
        tarjetasDestapadas = 0;
      }, 1000);
    }
    if (aciertos == 8) {
      winAudio.play()
      clearInterval(tiempoDecendente)
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😎.`
      mostrarTiempo.innerHTML = `Fantastico solo demoraste ${timerInicial - timer} segundos 😎😎.`
      mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🥴.`
      ocultarBoton.style.display = 'block'
      ocultarBoton.addEventListener('click',reiniciarJuego)
    }

  }
}
