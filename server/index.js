
const express = require('express');
const app = express();
const port = 5000;
const {Web3} = require('web3');
const contractABI = require('./dracoCoinFlip.json');
const {inits} = require('node-db-init')

const web3 = new Web3('https://eth-pokt.nodies.app/');

async function getPause(){
    const DracoCoinFlipAddress = '0x85f4A8A66c9a9Bc0Fbf2917a13C137846e7C820f';
    const DracoCoinFlipContract = new web3.eth.Contract(contractABI,DracoCoinFlipAddress);
    const pause = await DracoCoinFlipContract.methods.pause().call();
    console.log("pause",pause);    

    return {pause:pause}
}
async function getRefundDelay(){
    const DracoCoinFlipAddress = '0x85f4A8A66c9a9Bc0Fbf2917a13C137846e7C820f';
    const DracoCoinFlipContract = new web3.eth.Contract(contractABI,DracoCoinFlipAddress);
    const refundDelay = await DracoCoinFlipContract.methods.refundDelay().call();
    console.log("refundDelay",refundDelay);    

    return {refundDelay:refundDelay}
}

async function getInitDats(){
    const DracoCoinFlipAddress = '0x85f4A8A66c9a9Bc0Fbf2917a13C137846e7C820f';
    const DracoCoinFlipContract = new web3.eth.Contract(contractABI,DracoCoinFlipAddress);
    const minBet = await DracoCoinFlipContract.methods.minBet().call();
    const maxBet = await DracoCoinFlipContract.methods.maxBet().call();
    inits().then();
    console.log("minBet",minBet);    
    console.log("maxBet",maxBet); 

    return {minBet:minBet.toString(),maxBet:maxBet.toString()}
}

async function addressToFlip(userAddress){
    const DracoCoinFlipAddress = '0x85f4A8A66c9a9Bc0Fbf2917a13C137846e7C820f';
    const DracoCoinFlipContract = new web3.eth.Contract(contractABI,DracoCoinFlipAddress);
    const gameId = await DracoCoinFlipContract.methods.addressToFlip().call();
    console.log("gameId",gameId);

    return {gameId:gameId}

}
async function flipToAddress(userAddress){
    const DracoCoinFlipAddress = '0x85f4A8A66c9a9Bc0Fbf2917a13C137846e7C820f';
    const DracoCoinFlipContract = new web3.eth.Contract(contractABI,DracoCoinFlipAddress);
    const flipToAddress = await DracoCoinFlipContract.methods.flipToAddress().call();
    console.log("flipToAddress",flipToAddress);

    return {flipToAddress:flipToAddress}

}
getInitDats()

app.use(express.json());

app.get('/api/datas',async (req,res)=>{

    const result = await getInitDats();
    console.log(result)
    res.json(result);
})
app.get('/api/getpause',async (req,res)=>{
    const result = await getPause();
    console.log(result)
    res.json(result);
})
app.get('/api/addressToFlip',async (req,res)=>{

    const address = req.query.address;
    const result = await addressToFlip(address);
    console.log(result)
    res.json(result);
    
})

app.get('/api/flipToAddress',async (req,res)=>{

    const gameId = req.query.gameId;
    const result = await flipToAddress(gameId);
    console.log(result)
    res.json(result);
    
})


app.get('/api/refundDelay',async (req,res)=>{
    const result = await getRefundDelay();
    console.log(result)
    res.json(result);
})

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})