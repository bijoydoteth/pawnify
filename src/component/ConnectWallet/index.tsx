import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export default function Index({connectedAddress, setAddress}: {connectedAddress: string, setAddress: any}) {
    
    const connectWallet = async()=>{
        
        if (typeof window.ethereum !== 'undefined') {
            if (connectedAddress) {
                setAddress(connectedAddress);
            } else {
                if (typeof window.ethereum !== 'undefined') {
                    try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const chainId = await provider.getNetwork().then(network => network.chainId);
                    if (chainId === 1) {
                      await provider.send('eth_requestAccounts', []);
                      const signer = provider.getSigner();
                      const address = await signer.getAddress();
                      setAddress(address);
                    }else{
                      alert('Please switch wallet to mainnet');
                    }
                    
                    } catch (error) {
                    console.error(error);
                    alert('Failed to connect to wallet');
                    }
                } else {
                    alert('Please install MetaMask to use this feature');
                }
            }
        } else {
            alert('Please install MetaMask to use this feature');
        }
   }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      window.ethereum.on('accountsChanged', async (accounts:any[]) => {
        if(accounts.length > 0){
            setAddress(await signer.getAddress());
        } else {
            setAddress(null);
        }
      });
    }
  }, [setAddress]);

  return (

    <div className='font-normal text-base leading-4 top-2  w-full rounded shadow-md'>
      <div className='px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal'>
      {connectedAddress ? (
        <div>{connectedAddress.substring(0, 4) + '...' + connectedAddress.substring(38)}</div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      </div>
    </div>
  );
}
