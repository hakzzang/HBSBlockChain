import * as crypto from 'crypto-js';

class Block{
	static index = 0;//coin의 블록
	private key = 0;
	public hash;
	private timestamp;//시간 저장
	private data;
	public previousHash='';	

	constructor(private message){
		Block.index += Block.index;
		this.timestamp = new Date();
		this.data = 
			Block.index
			+this.timestamp
			+this.message
			+this.previousHash
	};

	createHash = function(){
		return crypto.HmacSHA256(this.message, this.key.toString());
		//SHA256 해시를 써서 메시지와 key로 맵핑.
	}

	mining(zeros){
	//zeros는 0의 개수
		while(this.hash.toString().substring(0,zeros)!==Array(zeros+1).join("0")){
			
			this.key++;
			this.hash = crypto.HmacSHA256(this.data, this.key.toString());
		}
		console.log(this.hash.toString().substring(0,zeros));
	}	

};

class Blockchain{
	public chain: Array<Block> = [];
	static previousHash = '';

	addBlock(block: Block){
		block.previousHash = Blockchain.previousHash;
		block.hash = block.createHash();
		Blockchain.previousHash = block.hash;

		this.chain.push(block);
	}

	isValid(){
		for(let i=1; i<this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];

			if(currentBlock.previousHash.toString() != previousBlock.hash.toString()){
				return 'It is a fake coin';
			}
			return 'It is a real coin'
		}
	}


};

let genesis = new Block("I am Genesis");
let tinyCoin = new Blockchain();
let superman = new Block("Superman give 10 coin to Batman.");

tinyCoin.addBlock(genesis);
tinyCoin.addBlock(superman);
tinyCoin.addBlock(superman);
console.log(tinyCoin.chain[0].hash.toString());
console.log(tinyCoin.chain[1].hash.toString());
console.log(tinyCoin.chain[2].hash.toString());
console.log(tinyCoin.isValid())
console.log("마이닝 시작!");
superman.mining(4);
//console.log(genesis.createHash().toString());