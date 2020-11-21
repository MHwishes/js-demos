import React from 'react'

const HelloWorld=()=>{
    return (
      <div>
        <h1>HelloWorld</h1>
        <button onClick={()=>{alert('click')}}>click me</button>  
      </div>
    )
}

export default HelloWorld;