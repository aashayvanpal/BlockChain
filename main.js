const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block(0, "21/11/2021", "Genesis Block", '')
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
            return true
        }
    }
}

let GoCoin = new Blockchain()
GoCoin.addBlock(new Block(1, "10/10/2020", {
    'TID': "100",
    'From': "Aashay",
    'To': "Pratik",
    'amount': "5000",
    'Time': "10:30 pm"
}))

GoCoin.addBlock(new Block(2, "15/7/2020", {
    'TID': "101",
    'From': "Pratik",
    'To': "Varsha",
    'amount': "4000",
    'Time': "07:00 am"
}))

console.log("is chain valid? ", GoCoin.isChainValid())

GoCoin.chain[1].data = {
    'TID': "101",
    'From': "Pratik",
    'To': "Varsha",
    'amount': "40000000",
    'Time': "07:00 am"
}

console.log("is chain valid? ", GoCoin.isChainValid())

// console.log(JSON.stringify(GoCoin, null, 4))