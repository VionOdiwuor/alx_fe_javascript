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
  //function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.textContent = `"${quote.text}" - "${quote.category}"`;
  }
  //function to add a new quote
  
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").innerHTML;
    const newQuoteCategory = document.getElementById("newQuoteCategory").innerHTML;
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      showRandomQuote(); //TO display newly added quotes
    } else {
      alert("Please fill in all the fields");
    }
 }
 function createAddQuoteForm() {
    const form = document.getElementById("quoteForm").innerHTML;
  };
  document.getElementById("newQuote").addEventListener("click", addQuote);
  showRandomQuote();
  // function for displaying added quotes
});
