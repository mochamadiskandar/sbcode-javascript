const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const getInputNumber = (prompt, callback) => {
    rl.question(prompt, (input) => {
        const number = parseFloat(input)
        if (isNaN(number)) {
            console.log(
                'Hanya bisa menerima input dalam bentuk angka. Silahkan Input kembali..',
            )
            getInputNumber(prompt, callback)
        } else {
            callback(number)
        }
    })
}

const askToContinue = () => {
    rl.question('Kamu mau menghitung lagi? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
            console.log('\n')
            performCalculation()
        } else {
            console.log('Exit Calculator. Goodbye!')
            rl.close()
        }
    })
}

function calculateSquareRoot(angka) {
    let hasil = Math.sqrt(angka)

    if (angka < 0) {
        console.log('Tidak bisa input bilangan negatif')
    } else if (angka % 2 == 1) {
        console.log('Tidak bisa input bilangan ganjil')
    } else {
        console.log(hasil)
    }
}

const performCalculation = () => {
    getInputNumber('Input Number :', (a) => {
        calculateSquareRoot(a)
        askToContinue()
    })
}

performCalculation()
