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
      const allQuotes= [...quotes, ...storedQuotes]//include stored quotes
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = allQuotes[randomIndex];
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
     
      document.body.appendChild(form);// to append the form to the body
    };
   function displayQuotes() {
      storedQuotes.forEach((QuoteObj, index) => {
        const newQuote = document.createElement("li");
        quoteForm.appendChild(newQuote);
      });
    }
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
    //functon for initial display of quotes
    showRandomQuote();
    document.getElementById("addQuote").addEventListener("click", addQuote);
    createAddQuoteForm();
    //display initial quotes
    showRandomQuote();
    
    
    
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
          const importedQuotes = JSON.parse(event.target.result);
          quotes.push(...importedQuotes);
          saveQuotes();
          alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
      }
    
  });