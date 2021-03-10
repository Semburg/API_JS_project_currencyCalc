const amount = document.getElementById('amount_to_calculate')
const result = document.getElementById("result")
const baseCurrency = document.getElementById("base_currency")
const targetCurrency = document.getElementById("target_currency")
const myApiKey = config.SECRET_API_KEY;

const landsOf = document.getElementById("lands_of")


var someLand;


fetch(`http://data.fixer.io/api/latest?access_key=${myApiKey}&format=1`)
    .then(response => response.json())
    .then(json => {

        console.log(json)
        console.log(json.base)

        console.log(json.rates)
        console.log(json.rates.EUR)
        console.log(json.rates.USD)


        // let counter = 0
        // for (let elm in json.rates){
        //     counter++
        //     console.log(elm)
        // }
        // console.log(counter)

    })


fetch(`http://data.fixer.io/api/symbols?access_key=${myApiKey}&format=1`)
    .then(response => response.json())
    .then(json => {

        console.log(json.symbols)
        console.log(json.length)
        console.log(json.symbols.AED)
        console.log(json.symbols.USD)
        console.log(json.symbols.length)


        let counter = 0
        for (let elm in json.symbols) {
            //! all elems in console:
            //console.log(elm)


            var option = document.createElement("option")
            option.innerHTML = elm + " - " + json.symbols[elm]
            // option.innerHTML = elm
            option.value = elm
            targetCurrency.appendChild(option)


            let curr = json.symbols.elm
            // console.log(json.symbols)
            // console.log(`${curr}`)
            // console.log(curr)
            // console.log(json.symbols[elm])
            counter++
        }
        console.log(counter)

        targetCurrency.addEventListener("change", function () {
            console.log("option changed to " + this.value)
            someLand = this.value
            landsOf.innerHTML = ""


            fetch(`http://data.fixer.io/api/latest?access_key=${myApiKey}&format=1`)
                .then(response => response.json())
                .then(json => {

                    console.log(json)
                    console.log(json.base)

                    console.log(json.rates.USD)
                    console.log(json.rates[someLand])

                    let baseValue = json.rates[someLand]
                    console.log(baseValue)
                    console.log(amount.value)

                    result.value = (Math.round(baseValue * amount.value)).toFixed(2)



                    console.log(`${json.rates.someLand}`)
                    console.log(someLand)
                    console.log("json.rates." + someLand)


                    // console.log(Object.entries(json.rates + "." + `${someLand}`))


                    //?  testing with rub 1 land and eur - 36 lands
                    let currencieLands = "https://restcountries.eu/rest/v2/currency/" + someLand
                    fetch(currencieLands)
                        .then(response => response.json())
                        .then(json => {


                            console.log(json)
                            // console.log(json.length)
                            // console.log(json.length)

                            for (let i = 0; i < json.length; i++) {
                                console.log(json.length)
                                console.log(json[i].name)
                                landsOf.innerHTML += '"' + json[i].name + '"' + ", "

                            }

                        })

                })

            // console.log(json.rates.someLand)
            // console.log(json.symbols+ "." + this.value)

            return someLand
        })
    })


let landsUrlFull = "https://restcountries.eu/rest/v2/all"

