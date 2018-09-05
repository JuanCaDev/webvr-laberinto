// 0 = nada
    // 1 = muro
    // 2 = jugador
    // 3 = premio
    let mapa = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 3, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 2, 0, 3, 1, 0],
      [0, 1, 1, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 0, 0, 3, 0, 1, 1, 0, 0],
      [0, 1, 3, 0, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 0]
    ];

    const TAMANO_PARED = 5;
    const ALTO_PARED = 5;
    let muro, premio;
    let muros = document.querySelector('#muros');
    let premios = document.querySelector('#premios');
    let scoreElement = document.querySelector('#score');
    let ganador = document.querySelector('#ganador');
    
    for (let x = 0; x < mapa.length; x++) {
      for (let y = 0; y < mapa[x].length; y++) {
        console.log(`x[${x}] = ${x}`);
        console.log(`y[${y}] = ${y}`);
        console.log('mapa[x].length = ' + mapa[x].length)
        console.log('-- POSICIÓN --');
        let posicion = (x - mapa.length / 2) * TAMANO_PARED + ' ' +
                       1.5 + ' ' +
                       (y - mapa[x].length / 2) * TAMANO_PARED;
        
        console.log('(x - mapa.length / 2) =' + (x - mapa.length / 2));
        console.log('(x - mapa.length / 2) = * TAMANO_PARED =' + (x - mapa.length / 2) * TAMANO_PARED);
        console.log('(y - mapa[x].length / 2) = ' + (y - mapa[x].length / 2));
        console.log('(y - mapa[x].length / 2) * TAMANO_PARED =' + (y - mapa[x].length / 2) * TAMANO_PARED);

        if (mapa[x][y] == 0) {
          continue
        } else if (mapa[x][y] == 1) {
          // Muro
          muro = document.createElement('a-box');
          muros.appendChild(muro);
          
          muro.setAttribute('color', '#fff')
          muro.setAttribute('material', 'src: #pared')
          muro.setAttribute('width', TAMANO_PARED)
          muro.setAttribute('depth', TAMANO_PARED)
          muro.setAttribute('height', ALTO_PARED)
          muro.setAttribute('position', posicion)
          muro.setAttribute('static-body', '')
        } else if (mapa[x][y] == 2) {
          // Jugador
          document.querySelector('#jugador')
            .setAttribute('position', posicion)
        } else if (mapa[x][y] == 3) {
          // Premio
          premio = document.createElement('a-sphere')
          premios.appendChild(premio)

          premio.setAttribute('position', posicion)
          premio.setAttribute('class', 'premio')
          premio.setAttribute('color', 'tomato')
          premio.setAttribute('radio', '1')
        }
      }
    }

    let premiosArray = Array.from(document.querySelectorAll('.premio'))
    let score = premiosArray.length
    let sonido = document.querySelector('[sound]')

    scoreElement.setAttribute('value', 'Total: ' + score)

    premiosArray.forEach(function(premio) {
      premio.addEventListener('click', function() {
        premio.setAttribute('visible', 'false')
        score = score - 1
        sonido.components.sound.playSound()
        scoreElement.setAttribute('value', 'Faltan: ' + score)

        if (score <= 0) {
          ganador.setAttribute('value', '¡Ganaste!')
          ganador.setAttribute('visible', 'true')
        }
      })
    })