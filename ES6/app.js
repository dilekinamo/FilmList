const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const urlElement = document.querySelector("#url");
const directorElement = document.querySelector("#director");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
var updateMode = false;
var updateIndex = 0;

eventListener();
function eventListener() {
  //Formun submit olayı için event listener ekledik
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    //storageden filmleri yükle
    let films = Storage.getFilmsFromStorage();
    //UI da tüm filmleri göster
    UI.loadAllFilms(films);
  });

  cardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}
function addFilm(e) {
  e.preventDefault();

  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (updateMode === false) {
    console.log("updateMode: " + updateMode);
    if (title === "" || url === "" || director === "") {
      //hata mesajı göster
      UI.displayMessage("Tüm alanları doldurduğunuzdan emin olun!", "danger");
    } else {
      //yeni bir film oluştur
      const newFilm = new Film(title, director, url);
      //Yeni filmi arayüze ekle
      UI.addFilmToUI(newFilm);
      //Yeni filmi storage ekle
      Storage.addFilmToStorage(newFilm);
      //mesaj göster
      UI.displayMessage("Film başarı ile eklendi!", "success");
    }
    //inputları temizle
    UI.clearInputs(titleElement, directorElement, urlElement);
  } else {
    if (title === "" || url === "" || director === "") {
      //hata mesajı göster
      UI.displayMessage("Tüm alanları doldurduğunuzdan emin olun!", "danger");
    } else {
      //yeni bir film oluştur
      const newFilm = new Film(title, director, url);

      //Update Film in Storage
      Storage.updateFilmInStorage(newFilm);

      //mesaj göster
      UI.displayMessage("Film başarı ile eklendi!", "success");

      updateMode = false;
    }
    //inputları temizle
    UI.clearInputs(titleElement, directorElement, urlElement);
  }
}
function deleteFilm(e) {
  e.preventDefault();
  //console.log('tıklandı --> ' + e.target);
  if (e.target.className === "btn btn-danger") {
    //UI da filmi sil
    UI.deleteFilmFromUI(e.target.parentElement.parentElement);
    //storageden filmi sil
    Storage.deleteFilmFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
  }
  //update of Film
  if (e.target.className === "btn btn-info") {
    //console.log("Güncelle clicked");
    updateMode = true;
    UI.updateFilm(e.target.parentElement.parentElement);
    //
    let films = localStorage.getItem("films");
    JSON.parse(films).forEach(function (film, index) {
      if (
        e.target.parentElement.parentElement.firstElementChild.nextSibling
          .nextSibling.textContent === film.title
      ) {
        updateIndex = index;
      }
    });
  }
}

function clearAllFilms(e) {
  e.preventDefault();
  if (confirm("Emin misiniz?")) {
    //ui dan temizle
    UI.clearAllFilmsFromUI();
    //storageden temizle
    Storage.clearAllFilmsFromStorage();
  }
}
