const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById('loader')

// Loading Spinner Shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}



async function getQuote() {
    loading();
    const proxyURL = "https://cors-anywhere.herokuapp.com/"
    const api_url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyURL + api_url)
        const data = await response.json();
        if (data.quoteAuthor === "") {
            authorText.innerText = "Anonymous"
        } else {
            authorText.innerText = data.quoteAuthor
        }
        // Reduce FontSize for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote")
        } else {
            quoteText.classList.remove("long-quote")
        }
        quoteText.innerText = data.quoteText;
        complete()
    } catch (error) {
        // getQuote()
        console.log(error, "No Quote");
    }

}
// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Every Load
getQuote()