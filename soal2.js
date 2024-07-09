const source = require('./soal2.json')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const json = source

// test get data
// console.log(json.data[0].productName)
console.log(json.data[0].productCode)
// console.log(json.data[0].quantity)
// console.log(json.data[1].quantity)
// console.log(json.data[2].quantity)

// Fungsi untuk input product code atau nama produk
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

// Fungsi untuk konfirmasi lanjut atau tidak
const askToContinue = () => {
    rl.question(
        'Kamu mau menghitung Qty Product lainnya? (y/n): ',
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

// Fungsi untuk mendapatkan jumlah produk berdasarkan nama produk
const getQtyProductsByName = (name) => {
    const lengthOfProduct = json.data.length
    let sumOfQty = 0
    let productIsFound = false
    let productName = ''

    for (let i = 0; i < lengthOfProduct; i++) {
        // Regex pattern untuk mencocokkan kata secara tepat
        const regex = new RegExp(`\\b${name}\\b`, 'i')

        const currentProductName = json.data[i].productName

        const qty = json.data[i].quantity

        // if (currentProductName.toLowerCase() == name.toLowerCase()) {
        //     sumOfQty += qty
        //     productName = currentProductName
        //     productIsFound = true
        // }

        if (regex.test(currentProductName)) {
            sumOfQty += qty
            productName = currentProductName
            productIsFound = true
        }
    }

    if (productIsFound) {
        console.log(`Total Qty dari Product "${productName}" : ${sumOfQty} pcs`)
    } else {
        console.log('Maaf Product yang kamu cari tidak ditemukan!')
    }
}

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
        console.log('Maaf Product yang kamu cari tidak ditemukan!')
    }
}

const calculateProductQuantity = () => {
    console.log(
        `
    | Product Code    | Product Name         |
    |-----------------|----------------------|
    | FBR00040101     | FloBrand-DressBSPink |
        
    *🚀 ~ Hint: Silahkan Input keyword yang mau kamu cari
    `,
    )
    getInput('Input keyword yang mau kamu cari :', (searchTerm) => {
        // Cek apakah input adalah kode produk atau nama produk
        const searchType = isNaN(searchTerm) ? 'name' : 'productCode;'
        if (!isNaN(searchType === 'name')) {
            getQtyProductsByName(searchTerm)
        } else {
            getQtyProductsByCode(searchTerm)
        }
        askToContinue()
    })
}

calculateProductQuantity()
