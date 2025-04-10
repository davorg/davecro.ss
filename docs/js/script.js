document.addEventListener("DOMContentLoaded", () => {
  const url = "https://davecross.co.uk/books/books.json";

  // Fetch the JSON file
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(books => {
      // Filter for non-children tech books
      const filteredBooks = books.filter(book =>
        book.tags.includes("tech") && !book.tags.includes("children")
      );

      // Generate HTML
      const html = filteredBooks.map(book => `
        <a href="https://davecross.co.uk/books/#${book.id}">
          <img class="cover"
            title="${book.title}"
            src="${book.image_url}"
            alt="${book.title}"
          />
        </a>
      `).join("");

      // Insert HTML into the page
      document.getElementById("book-list").innerHTML = `<p>${html}</p>`;
    })
    .catch(error => {
      console.error("Error fetching the JSON file:", error);
    });
});
