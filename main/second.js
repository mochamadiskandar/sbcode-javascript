const source = require('./second-data.json')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const json = source

// test direct get data from json
// console.log(json.data[0].productName)
// console.log(json.data[0].productCode)
// console.log(json.data[0].quantity)

// function untuk input
const getInput = (prompt, callback) => {
    rl.question(prompt, (input) => {
        const searchTerm = input.trim() //clear unused space
        if (!searchTerm) {
            console.log('Input tidak boleh kosong. Silahkan input kembali..')
            getInput(prompt, callback)
        } else {
            callback(searchTerm)
        }
    })
}

// function untuk konfirmasi lanjut atau tidak
const askToContinue = () => {
    rl.question(
        'anda mau menghitung Qty Product lainnya? (y/n): ',
        (answer) => {
            if (
                answer.toLowerCase() === 'yes' ||
                answer.toLowerCase() === 'y'
            ) {
                console.log('\n')
                calculateProductQuantity()
            } else {
                console.log('Exit. Goodbye!')
                rl.close()
            }
        },
    )
}

// function untuk mendapatkan jumlah produk berdasarkan productCode
const getQtyProductsByCode = (productCode) => {
    const lengthOfProduct = json.data.length
    let sumOfQty = 0
    let productIsFound = false
    let productName = ''
    let storageId = []

    for (let i = 0; i < lengthOfProduct; i++) {
        const currentProductCode = json.data[i].productCode
        const currentStorageId = json.data[i].storageId
        const qty = json.data[i].quantity

        if (currentProductCode.toLowerCase() == productCode.toLowerCase()) {
            sumOfQty += qty
            productName = json.data[i].productName
            storageId.push(currentStorageId)
            productIsFound = true
        }
    }

    if (productIsFound) {
        console.log(
            '\n====== Product Search Result ======\n' +
                `Total Quantity : ${sumOfQty} pcs\n` +
                `Product Name   : ${productName}\n` +
                `Storage Count  : ${storageId.length}\n`,
        )
    } else {
        console.log('Maaf Product yang anda cari tidak ditemukan!')
    }
}

const calculateProductQuantity = () => {
    console.log(
        `
    | Product Code    | Product Name         |
    |-----------------|----------------------|
    | FBR00040101     | FloBrand-DressBSPink |
        
    *🚀 ~ Hint: Above is the tabel of products
    `,
    )
    getInput('Input keyword yang mau anda cari :', (searchTerm) => {
        getQtyProductsByCode(searchTerm)

        askToContinue()
    })
}

calculateProductQuantity()
