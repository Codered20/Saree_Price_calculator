import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'decode' | 'encode'>('decode')

  // Tab 1 state: Code -> Price
  const [sareeCode, setSareeCode] = useState<string>("")
  const [originalPrice, setOriginalPrice] = useState<number>(0)

  // Tab 2 state: Price -> Code (+20%)
  const [inputPrice, setInputPrice] = useState<string>("")
  const [generatedCode, setGeneratedCode] = useState<string>("")
  const [finalCalculatedPrice, setFinalCalculatedPrice] = useState<number>(0)

  // Mappings
  const charToDigitMap: Record<string, number> = {
    'M': 1, 'A': 2, 'K': 3, 'E': 4, 'P': 5,
    'R': 6, 'O': 7, 'F': 8, 'I': 9, 'T': 0
  }

  const digitToCharMap: Record<string, string> = {
    '1': 'M', '2': 'A', '3': 'K', '4': 'E', '5': 'P',
    '6': 'R', '7': 'O', '8': 'F', '9': 'I', '0': 'T'
  }

  // Tab 1 Logic
  const calculateSareePrice = () => {
    let priceStr = ""
    for (let char of sareeCode.toUpperCase()) {
      if (charToDigitMap[char] !== undefined) {
        priceStr += charToDigitMap[char]
      }
    }
    setOriginalPrice(priceStr ? Number(priceStr) : 0)
  }

  // Tab 2 Logic (+20% and convert to Code)
  const calculateSareeCode = () => {
    const priceNum = Number(inputPrice)
    if (isNaN(priceNum) || priceNum <= 0) {
      setGeneratedCode("")
      setFinalCalculatedPrice(0)
      return
    }

    const priceWithMargin = Math.round(priceNum * 1.20)
    setFinalCalculatedPrice(priceWithMargin)

    let codeStr = ""
    for (let digit of priceWithMargin.toString()) {
      if (digitToCharMap[digit]) {
        codeStr += digitToCharMap[digit]
      }
    }
    setGeneratedCode(codeStr)
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        {/* Tab Navigation Controls */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            type="button" 
            className={activeTab === 'decode' ? 'counter active' : 'counter'}
            onClick={() => setActiveTab('decode')}
          >
            Price Calculator
          </button>
          <button 
            type="button" 
            className={activeTab === 'encode' ? 'counter active' : 'counter'}
            onClick={() => setActiveTab('encode')}
          >
            Code Calculator
          </button>
        </div>

        {/* Tab 1: Code to Price */}
        {activeTab === 'decode' && (
          <div>
            <h1>Enter the saree code</h1>
            <input 
              type="text" 
              value={sareeCode} 
              onChange={(e) => setSareeCode(e.target.value)} 
              placeholder="e.g. MAKE"
            />
            <div style={{ marginTop: '15px' }}>
              <button type="button" className="counter">
                Original Price is ₹{originalPrice}
              </button>
              <button 
                type="button" 
                className="counter" 
                onClick={calculateSareePrice}
              >
                Calculate Price
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Price to Code (+20%) */}
        {activeTab === 'encode' && (
          <div>
            <h1>Enter original price</h1>
            <input 
              type="number" 
              value={inputPrice} 
              onChange={(e) => setInputPrice(e.target.value)} 
              placeholder="e.g. 1000"
            />
            <div style={{ marginTop: '15px' }}>
              <button type="button" className="counter">
                Price (+20%): ₹{finalCalculatedPrice} | Code: {generatedCode || 'N/A'}
              </button>
              <button 
                type="button" 
                className="counter" 
                onClick={calculateSareeCode}
              >
                Generate Code
              </button>
            </div>
          </div>
        )}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App