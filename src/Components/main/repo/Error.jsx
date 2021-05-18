import React from 'react'

function Error(props) {
  return (
    <div style={{textAlign: "center"}}>
      <button onClick={() => props.history.push('/')}>переидти на главную страницу</button>

      ОШИБКА!!!
    </div>
  )
}

export default Error
