const currencyElement_1 = document.getElementById( 'currency-1' );
const currencyElement_2 = document.getElementById( 'currency-2' );
const amount_Element_1 = document.getElementById( 'amount-1' );
const amount_Element_2 = document.getElementById( 'amount-2' );

const rateEl = document.getElementById( 'rate' );

const swap = document.getElementById( 'swap' );

// fetch exchange rates and update the DOM
function calculate ()
{
    // Get the actual value of the select fields
    const currency_1 = currencyElement_1.value;
    const currency_2 = currencyElement_2.value;

    // Get the actual value of the input fields
    const amount_1 = amount_Element_1.value;
    const amount_2 = amount_Element_2.value;

    // Fetch API Method GET
    fetch( `https://prime.exchangerate-api.com/v5/c33d49386b53aaa8d5b846c9/latest/${ currency_1 }` )
        .then(
            res => res.json()
        )
        .then( data =>
        {
            // get the actual rate of currency as index
            const rate = data.conversion_rates[ currency_2 ];


            // Display the actual exchange rate
            rateEl.innerText = `1 ${ currency_1 } = ${ rate } ${ currency_2 }`;

            amount_Element_2.value = ( amount_Element_1.value * rate ).toFixed( 2 );

        } );
}


// Event Listeners
currencyElement_1.addEventListener( 'change', calculate );
currencyElement_2.addEventListener( 'change', calculate );
amount_Element_1.addEventListener( 'input', calculate );
amount_Element_2.addEventListener( 'input', calculate );
swap.addEventListener( 'click', () =>
{
    // Swap the tuw currency position using their values
    const temp = currencyElement_1.value;
    currencyElement_1.value = currencyElement_2.value;
    currencyElement_2.value = temp;
    calculate();
} );

calculate();