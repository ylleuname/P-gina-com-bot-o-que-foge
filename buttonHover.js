const botao = document.getElementById('botaoQueFoge')
const OFFSET = 100

botao.addEventListener('click', () => {
  alert('Hey, believe in yourself!')
  window.close()
})

document.addEventListener('mousemove', (e) => {
  //obtemos as coordenadas do mouse
  const x = e.pageX
  const y = e.pageY
  const xBotao = botao.getBoundingClientRect()

  //mapeamos a localização do botão
  const distanciaHorizontal = distanciaDoCentro(xBotao.x, x, xBotao.width)
  const distanciaVertical = distanciaDoCentro(xBotao.y, y, xBotao.height)
  const deslocamentoHorizontal = xBotao.width / 2 + OFFSET
  const deslocamentoVertical = xBotao.height / 2 + OFFSET
  
  //mudamos a posicao do botão de acordo com a proximidade do mouse
  if (Math.abs(distanciaHorizontal) <= deslocamentoHorizontal && Math.abs(distanciaVertical) <= deslocamentoVertical) {
    mudaPosicao(
      xBotao.x + deslocamentoHorizontal / distanciaHorizontal * 10,
      xBotao.y + deslocamentoVertical / distanciaVertical * 10
    )
  }
})

function mudaPosicao(left, top) {
  const windowBox = document.body.getBoundingClientRect()
  const xBotao = botao.getBoundingClientRect()
  
  //limitamos o movimento do botão conforme o tamanho da janela do navegador
  if(distanciaDoCentro(left, windowBox.left, xBotao.width) < 0) {
    left = windowBox.right - xBotao.width - OFFSET
  }
  if(distanciaDoCentro(left, windowBox.right, xBotao.width) > 0) {
    left = windowBox.left + OFFSET
  }
  if(distanciaDoCentro(top, windowBox.top, xBotao.height) < 0) {
    top = windowBox.bottom - xBotao.height - OFFSET
  }
  if(distanciaDoCentro(top, windowBox.bottom, xBotao.height) > 0) {
    top = windowBox.top + OFFSET
  }

  botao.style.left = `${left}px`
  botao.style.top = `${top}px`
}

function distanciaDoCentro(posicaoBotao, posicaoMouse, tamanhoBotao) {
  return posicaoBotao - posicaoMouse + tamanhoBotao / 2
}