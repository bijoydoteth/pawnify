import axios from 'axios';
import { ethers } from 'ethers';
import Image from 'next/image';
import React, { useMemo, useRef } from 'react';
import { useTable } from 'react-table';
import { v4 as uuid } from 'uuid';
import { Table, TableCell, TableHeader, TableRow } from '../table';

export default function Index({connectedAddress}: {connectedAddress: string}) {
    const [lendRecord, setlendRecord] = React.useState<any>({address:'',data:[]})
    const lenderAddressRef = useRef<HTMLInputElement>(null)

    const handleRequestData = async() => {
        // console.log(`Checking record`);
        
        const isValidEthereumAddress = (address:string|undefined) => {
            if (!address||!address.match(/^0x[a-fA-F0-9]{40}$/)) return false
            return true;
        }
        
        let lenderAddress = lenderAddressRef.current?.value
        if(!lenderAddress){
            lenderAddress = connectedAddress
        }
        
        if(!isValidEthereumAddress(lenderAddress)){
            alert("Invalid Ethereum Address")
            return
        }

        try{
            // test address: 0x768F2A7CcdFDe9eBDFd5Cea8B635dd590Cb3A3F1
            const response = await axios.get(`https://api.nftfi.com/loans/lender/${lenderAddress}`)
            const data = response.data.map((e:any)=>({...e,platform:'nftfi'}))
            // console.log(data);
            
            setlendRecord({address:lenderAddress,data})
            
        }catch(err){
            console.log(err)
            setlendRecord({address:lenderAddress,data:[]})
        }
        
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-xl'> Lend Record </h1>
            <div>
                <input type="text" placeholder="Enter lender address" className='p-2 w-[400px]' ref={lenderAddressRef} />
                <button onClick={handleRequestData} className='m-2 px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal'> 
                    Check Record
                </button>
            </div>
            {lendRecord.data.length>0?<p>{lendRecord.data.length} record found </p>:null}
            <Table className='overflow-auto'>
                <thead>
                    <TableRow>
                    <TableHeader>NFT</TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Platform</TableHeader>
                    <TableHeader>Loan Amount (eth)</TableHeader>
                    <TableHeader>Repay Amount (eth)</TableHeader>
                    <TableHeader>Duration</TableHeader>
                    <TableHeader>Due Date</TableHeader>
                    <TableHeader>Status</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {lendRecord.data.length>0?(lendRecord.data).map((item: any,index:number) => {
                        const loanAmount = ethers.utils.formatEther(item.loanPrincipalAmount.toString())
                        const repayAmount = ethers.utils.formatEther(item.maximumRepaymentAmount.toString())

                        return (
                            <TableRow key={uuid()} className={`p-1 ${index%2===1?'bg-gray-300':''}`}>
                                <TableCell> <Image alt={item.assetName} width={50} height={50} src={item.imageUrl} /> </TableCell>
                                <TableCell> {item.assetName} ({item.assetCategory}) </TableCell>
                                <TableCell> {item.platform} </TableCell>
                                <TableCell> {parseFloat(loanAmount).toFixed(2)} </TableCell>
                                <TableCell> {parseFloat(repayAmount).toFixed(2)} </TableCell>
                                <TableCell> {Math.floor(item.loanDuration / 86400)} days </TableCell>
                                <TableCell> {new Date(item.loanDueTime).toLocaleString()} </TableCell>
                                <TableCell> {item.liquidated?'liquidated':(item.repaid?'repaid':'not repaid')} </TableCell>
                            </TableRow>
                        )
                    }):<TableRow><TableCell>{lendRecord.address===''?'Enter Address':`No record found for address: ${lendRecord.address}`}</TableCell></TableRow>}
                </tbody>
            </Table>

        </div>
    )
}
