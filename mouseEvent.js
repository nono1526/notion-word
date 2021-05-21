
document.removeEventListener('mouseup', onMouseup)

var onMouseup = async e => {
  const text = window.getSelection().toString()
  if (text.length > 0) {
    console.log(window.getSelection())
    const res = await fetch('http://localhost:8787/api/word')
    const data = await res.json()
    console.log(data)
  }
}

document.addEventListener('mouseup', onMouseup)
