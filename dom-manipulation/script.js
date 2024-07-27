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
    const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Simulated server URL



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
   
     // Function to fetch data from the server
     function fetchFromServer() {
      fetch(SERVER_URL)
          .then(response => response.json())
          .then(data => {
              const serverQuotes = data.map(post => ({ text: post.title, category: "inspiration" })); // Example transformation
              syncQuotes(serverQuotes);
          })
          .catch(error => console.error('Error fetching data from server:', error));
  }

  // Function to sync local quotes with server quotes
  function syncQuotes(serverQuotes) {
      // Conflict resolution: Server data takes precedence
      storedQuotes.forEach(storedQuote => {
          if (!serverQuotes.some(serverQuote => serverQuote.text === storedQuote.text)) {
              serverQuotes.push(storedQuote);
          }
      });

      localStorage.setItem("quotes", JSON.stringify(serverQuotes));
      showRandomQuote();
  }

  // Periodically fetch data from the server
  setInterval(fetchFromServer, 60000); // Fetch every 60 seconds
   

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
    //function to updateCategoriesDropdown
    function populateCategories(){
      const dropdown = documents.getElementById("categoryFilter");
      const allQuotes = [...quotes, ...storedQuotes];
      const categories = new Set(allQuotes.map(quote => quote.category));
      // clear existing options
      dropdown.innerHTML = "";
      //add default option
      const defaultOption = document.createElement("option");
      defaultOption.value = "all";
      defaultOption.textContent = "All Categories";
      dropdown.appendChild(defaultOption);

 // Add new categories
 categories.forEach(category => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  dropdown.appendChild(option);



    });
  // Restore last selected category
  const lastCategory = localStorage.getItem("lastCategory") || "all";
  dropdown.value = lastCategory;
  filterQuotes(lastCategory);
}

// Function to filter quotes based on selected category
function filterQuotes(category) {
  const filteredQuotes = (category === "all")
      ? [...quotes, ...storedQuotes]
      : [...quotes, ...storedQuotes].filter(q => q.category === category);

  const quoteList = document.getElementById("quoteList");
  quoteList.innerHTML = "";
  
  filteredQuotes.forEach(quote => {
      const listItem = document.createElement("li");
      listItem.textContent = `"${quote.text}" - ${quote.category}`;
      quoteList.appendChild(listItem);
  });
}

// Function to handle category dropdown change
function onCategoryChange(event) {
  const selectedCategory = event.target.value;
  localStorage.setItem("lastCategory", selectedCategory);
  filterQuotes(selectedCategory);
}


   function displayQuotes() {
      storedQuotes.forEach((QuoteObj, index) => {
        const newQuote = document.createElement("li");
        quoteForm.appendChild(newQuote);
      });
    }
    
    // Assume you have an array of quotes (storedQuotes) from local storage

// Function to export quotes to a JSON file
function exportQuotes() {
    const jsonStr = JSON.stringify(storedQuotes);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    // Create a download link
    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json"; // Set the desired file name
  
    // Trigger the download
    link.click();
  
    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
  }
  
  // Example usage: Call exportQuotes() when the user clicks a button
  // For example, add an event listener to a button with id "exportButton"
  document.getElementById("exportButton").addEventListener("click", exportQuotes);
  
    
    
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
      //event listeners
      document.getElementById("newQuote").addEventListener("click", showRandomQuote);
      //functon for initial display of quotes
      showRandomQuote();
      document.getElementById("addQuote").addEventListener("click", addQuote);
      createAddQuoteForm();
      populateCategories();
      document.getElementById("categoryFilter").addEventListener("change", onCategoryChange);
      displayQuotes();





  });