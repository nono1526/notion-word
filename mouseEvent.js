
document.removeEventListener('mouseup', onMouseup)

var onMouseup = async e => {
  const selection = window.getSelection()
  const selectionString = selection.toString()
  if (selection.toString().length === 0)  return
    const {
      x,
      y,
      width,
      height
    } = selection.getRangeAt(0).getBoundingClientRect()
    
    const $popup = createWindowPopup({
      x, y, width, height
    })
    
    $popup.addEventListener('click', async e => {
      const res = await writeNotionDatabase({en: selectionString})
      console.log(res)
    })

    document.body.appendChild($popup)

    // set remove listener in next event loop
    window.setTimeout(() => {
      const destroyPopup = e => {
        if (e.target === $popup) return
        $popup.remove()
        document.removeEventListener('click', destroyPopup)
      }
      document.addEventListener('click', destroyPopup)
    }, 0)
}

async function writeNotionDatabase (data) {
    const res = await fetch('http://localhost:8787/api/word', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    return json
}

function createWindowPopup ({x, y, width, height}) {
  const $popup = document.createElement('div')
  $popup.style.position = 'fixed'
  $popup.style.height = '30px'
  $popup.style.width = '30px'
  $popup.innerHTML = 'add'
  $popup.style.left = `${x - 35}px`
  $popup.style.top = `${y + (height - 30) / 2}px`
  $popup.style.backgroundColor = 'white'
  $popup.style.border = '1px solid #e7e7e7'
  $popup.style.borderRadius = '50%'
  $popup.style.display = 'flex'
  $popup.style.alignItems = 'center'
  $popup.style.justifyContent = 'center'
  $popup.style.cursor = 'pointer'


  return $popup
}

document.addEventListener('mouseup', onMouseup)
