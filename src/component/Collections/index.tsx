import axios from 'axios';
import { ethers } from 'ethers';
import Image from 'next/image';
import React, { useMemo, useRef } from 'react';
import { useTable } from 'react-table';
import { v4 as uuid } from 'uuid';
import { Table, TableCell, TableHeader, TableRow } from '../table';

export default function Index({connectedAddress}: {connectedAddress: string}) {
    const [collectionRecord, setcollectionRecord] = React.useState<any>([])

    const handleRequestData = async() => {

        try{
            // test address: 0x768F2A7CcdFDe9eBDFd5Cea8B635dd590Cb3A3F1
            const response = await axios.get(`https://api.nftfi.com/projects`)
            const data = response.data.map((e:any)=>({...e,platform:'nftfi'}))
            data.sort((a:any,b:any)=>{
                let aRepayAmount = '0', bRepayAmount = '0'
                if(a.stats&&a.stats.previousSumMaximumRepaymentAmountWETH){
                    aRepayAmount = ethers.utils.formatEther(a.stats.previousSumMaximumRepaymentAmountWETH)
                }
                if(b.stats&&b.stats.previousSumMaximumRepaymentAmountWETH){
                    bRepayAmount = ethers.utils.formatEther(b.stats.previousSumMaximumRepaymentAmountWETH)
                }
                
                return parseFloat(bRepayAmount) - parseFloat(aRepayAmount)
            })
            
            setcollectionRecord(data)
            
        }catch(err){
            console.log(err)
            setcollectionRecord([])
        }
        
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-xl'> Collections </h1>
            <div>
                <button onClick={handleRequestData} className='m-2 px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal'> 
                    Get collection
                </button>
            </div>
            {collectionRecord.length>0?<p>{collectionRecord.length} record found </p>:null}
            <Table className='overflow-auto'>
                <thead>
                    <TableRow>
                    <TableHeader>Collection</TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Avg Loan Amount (eth)</TableHeader>
                    <TableHeader>Total Repay Amount (eth)</TableHeader>
                    <TableHeader>Avg Duration</TableHeader>
                    <TableHeader> Platform </TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {collectionRecord.length>0?(collectionRecord).map((item: any,index:number) => {
                        let prevAvgLoanAmount, prevSumRepayAmount,previousAvgLoanDurationWETH
                        if(item.stats){
                            if(item.stats.previousAvgLoanPrincipalAmountWETH){
                                prevAvgLoanAmount = ethers.utils.formatEther(item.stats.previousAvgLoanPrincipalAmountWETH)
                            }
                            if(item.stats.previousSumMaximumRepaymentAmountWETH){
                                prevSumRepayAmount = ethers.utils.formatEther(item.stats.previousSumMaximumRepaymentAmountWETH)
                            }
                            if(item.stats.previousAvgLoanDurationWETH){
                                previousAvgLoanDurationWETH = item.stats.previousAvgLoanDurationWETH
                            }
                        }
                       

                        return (
                            <TableRow key={uuid()} className={`p-1 ${index%2===1?'bg-gray-300':''}`}>
                                <TableCell> <Image alt={item.name} width={50} height={50} src={item.imgSrc}/> </TableCell>
                                <TableCell> {item.name} </TableCell>
                                <TableCell> {prevAvgLoanAmount?parseFloat(prevAvgLoanAmount).toFixed(2):0} </TableCell>
                                <TableCell> {prevSumRepayAmount?parseFloat(prevSumRepayAmount).toFixed(2):0} </TableCell>
                                <TableCell> {previousAvgLoanDurationWETH?(previousAvgLoanDurationWETH/ 86400).toFixed(2):0} days </TableCell>
                                <TableCell> {item.platform} </TableCell>
                            </TableRow>
                        )
                    }):<TableRow><TableCell>Click to refresh collection</TableCell></TableRow>}
                </tbody>
            </Table>

        </div>
    )
}
