"use strict";

// Event listener - dugme za pretraživanje
document.getElementById("searchButton").addEventListener("click", searchSongs);

// Funkcija za pretraživanje pjesama i izvođača
function searchSongs() {
  var searchTerm = document.getElementById("searchInput").value.trim();
  var resultsDiv = document.getElementById("results");
  var loader = document.getElementById("loader");

  // Prikazujemo loader dok se podaci učitavaju
  loader.style.display = "block";
  resultsDiv.innerHTML = "";

  // Provjera je li pojam za pretraživanje prazan
  if (searchTerm === "") {
    resultsDiv.innerHTML = "<p><strong>Molimo unesite pojam za pretraživanje</strong></p>";
    loader.style.display = "none";
    return;
  }

  // Postavljanje URL-a za pretragu na iTunesu
  var url =
    "https://itunes.apple.com/search?term=" + encodeURIComponent(searchTerm) + "&entity=musicTrack";

  // Slanje HTTP GET zahtjeva prema iTunes API-ju
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Sakrij loader
      loader.style.display = "none";

      // Ispis podataka u konzolu za provjeru
      console.log(data);

      // Provjera jesu li dobiveni rezultati
      if (data.results.length === 0) {
        resultsDiv.innerHTML = '<p>Nema rezultata za "' + searchTerm + '".</p>';
      } else {
        // Stvaranje tablice rezultata
        var table = "<table><tr><th>Ime pjesme</th><th>Izvođač</th></tr>";
        data.results.forEach(function (song) {
          table += "<tr><td>" + song.trackName + "</td><td>" + song.artistName + "</td></tr>";
        });
        table += "</table>";
        resultsDiv.innerHTML = table;
      }
    })
    .catch(function (error) {
      // Sakrij loader i prikaži poruku o grešci
      loader.style.display = "none";
      resultsDiv.innerHTML =
        "<p>Došlo je do greške prilikom preuzimanja podataka. Pokušajte ponovno kasnije.</p>";
      console.error("Error:", error);
    });
}
