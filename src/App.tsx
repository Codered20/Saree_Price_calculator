import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [sareeCode, setSareeCode] = useState<string>("")
  const [originalPrice, setOriginalPrice] = useState<number>(0)

  const hashmap: Record<string, number> = {
    'M': 1, 'A': 2, 'K': 3, 'E': 4, 'P': 5,
    'R': 6, 'O': 7, 'F': 8, 'I': 9, 'T': 0
  }

  const calculateSareePrice = () => {
    let priceStr = ""
    for (let char of sareeCode.toUpperCase()) {
      if (hashmap[char] !== undefined) {
        priceStr += hashmap[char]
      }
    }
    setOriginalPrice(priceStr ? Number(priceStr) : 0)
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Enter the saree code</h1>
          <input 
            type="text" 
            value={sareeCode} 
            onChange={(e) => setSareeCode(e.target.value)} 
          />
        </div>
        <button
          type="button"
          className="counter"
        >
          Original Price is {originalPrice}
        </button>

        <button 
          type="button" 
          className="counter" 
          onClick={calculateSareePrice}
        >
          Calculate
        </button>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App