import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //function to generate password
  const passwordgenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str+="1234567890";

    if(charAllowed) str += "~!@#$%^&*:<>/\|"

    for(let i = 1; i<=length; i++){
      let index = Math.floor(Math.random()*str.length+1)
      pass += str[index]
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  //to run password generator function at begining and on changing of length,
  // number and char allowed and re run of password generator function
  useEffect(()=>{
    passwordgenerator()
  }, [length, numberAllowed, charAllowed, passwordgenerator])

  //useRef hook
  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-2xl px-4 py-3 my-8 text-orange-400 bg-slate-800' >
      
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        ref={passwordRef}
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5'
        >Copy</button>
      </div>

      <div className=' flex text-sm gap-x-2 '>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={8}
          max={100}
          value={length}
          className=' cursor-pointer '
          onChange={(e)=> setLength(e.target.value)}
          />
          <label>length : {length}</label>
        </div>
        <div className=' flex items-center gap-x-1 '>
          <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChangeCapture={()=>setNumberAllowed((prev)=>!prev)}
          //m-2 to handle onclick
          // onChange={()=>{
          //   return (setNumberAllowed((prev)=>{
          //     return(!prev)
          //   }))
          // }} 
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className=' flex items-center gap-x-1 '>
          <input
          type="checkbox"
          defaultChecked={charAllowed}
          id='characterInput'
          onChangeCapture={()=>setCharAllowed((prev)=>!prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>

      </div>
      
    </div>
  )
}

export default App
  