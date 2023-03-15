import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import Navbar from '../component/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  const [lightMode, setLightMode] = useState(true)
  const [connectedAddress, setAddress] = useState('')

  return (
    <div className={`${lightMode?'bg-white':'bg-black text-white'}`}>
      <Navbar lightMode={lightMode} setLightMode={setLightMode} connectedAddress={connectedAddress} setAddress={setAddress} />
      <Component {...pageProps} />
    </div>
  )
}
