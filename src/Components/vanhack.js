import React, { useState } from "react";

const BookSearch = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");

  // TODO your code here
  const books = [
    {
      author: "Chinua Achebe",
      country: "Nigeria",
      language: "English",
      pages: 209,
      title: "Things Fall Apart",
      year: 1958,
    },
    {
      author: "Dante Alighieri",
      country: "Italy",
      language: "Italian",
      pages: 928,
      title: "The Divine Comedy",
      year: 1315,
    },

    {
      author: "Virginia Woolf",
      country: "United Kingdom",
      language: "English",
      pages: 209,
      title: "To the lighthouse",
      year: 1927,
    },
    {
      author: "Virginia Woolf",
      country: "United Kingdom",
      language: "English",
      pages: 216,
      title: "Mr Dalloway",
      year: 1925,
    },
  ];

  const filteredSearch = books.filter((p) =>
    year.length > 3
      ? p.year == year
      : (p.author.toLowerCase().includes(author) || p.author.includes(author)) &
        (p.title.toLowerCase().startsWith(title) || p.author.includes(title)) &
        (p.country.toLowerCase().startsWith(country) ||
          p.author.includes(country)) &
        (p.language.toLowerCase().startsWith(language) ||
          p.author.includes(language))
  );

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <div style={{ display: "flex", gap: "1.6rem" }}>
          author{" "}
          <input
            data-testid="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "2.6rem" }}>
          title{" "}
          <input
            data-testid="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "1.1rem" }}>
          country{" "}
          <input
            data-testid="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          language{" "}
          <input
            data-testid="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          year{" "}
          <input
            data-testid="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.2rem",
          }}
        >
          {filteredSearch.map((item, i) => (
            <div>
              <div style={{ display: "flex", gap: "2.5rem" }}>
                {" "}
                author
                <div testid="author">{item.author}</div>
              </div>
              <div style={{ display: "flex", gap: "2.5rem" }}>
                {" "}
                country
                <div testid="country">{item.country}</div>
              </div>
              <div style={{ display: "flex", gap: "2.5rem" }}>
                {" "}
                language
                <div testid="book">{item.language}</div>
              </div>
              <div style={{ display: "flex", gap: "2.5rem" }}>
                {" "}
                pages
                <div data-testid="book">{item.pages}</div>
              </div>

              <div style={{ display: "flex", gap: "2.5rem" }}>
                {" "}
                title
                <div data-testid="book">{item.title}</div>
              </div>

              <div style={{ display: "flex", gap: "2.5rem" }}>
                {" "}
                year
                <div data-testid="book">{item.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
