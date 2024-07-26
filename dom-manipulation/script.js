document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
      {
        text: "Be a leader not a follower.",
        category: "Leadership",
      },
      {
        text: "Be the change you want to see in the world.",
        category: "Leadership",
      },
      {
        text: "The only way to do great work is to love what you do.",
        category: "inspiration",
      },
    ];
    //function to retrieve existing quotes or initialize empty array
    const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    //function to display a random quote
    function showRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      const quoteDisplay = document.getElementById("quoteDisplay");
      quoteDisplay.textContent = `"${quote.text}" - "${quote.category}"`;
    };
    //function to add a new quote
    
 function addQuote() {
      const newQuoteText = document.getElementById("newQuoteText").value;
      const newQuoteCategory = document.getElementById("newQuoteCategory").value;
      
      if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        storedQuotes.push(newQuote);// only update stored quotes
        // save to local storage
        localStorage.setItem("quotes", JSON.stringify(storedQuotes));
        showRandomQuote(); //TO display newly added quotes
     
    } else {
        alert("Please fill in all the fields");
      }
   };
   
   function createAddQuoteForm() {
      const form = document.createElement("Form");
      form.innerHTML = "";
    };
   function displayQuotes() {
      quoteForm.innerHTML = " ";
      storedQuotes.forEach((QuoteObj, index) => {
        const newQuote = document.createElement("li");
        quoteForm.appendChild(newQuote);
      });
    }
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
    //functon for initial display of quotes
    showRandomQuote();
    addEventListener("click", addQuote);

    
  });