import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

export default function borrow({connectedAddress}: {connectedAddress: string}) {
  
  return (
    <>
      <Head>
        <title>Pawnify</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='p-4'>
          My Offers
        </div>
      </main>
    </>
  )
}
