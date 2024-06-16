class Storage {
  static addFilmToStorage(film) {
    //storageden tüm filmleri bir diziye al
    let films = this.getFilmsFromStorage();
    //dizi içerisine yeni filmi ekle
    films.push(film);
    //dizinin son halini localstoragee tekrar yaz
    localStorage.setItem("films", JSON.stringify(films));
  }
  static updateFilmInStorage(film) {
    let films = JSON.parse(localStorage.getItem("films"));
    console.log("updateFilmInStorage1");
    films[updateIndex] = film;
    console.log("updateFilmInStorage2");
    localStorage.setItem("films", JSON.stringify(films));
    console.log("updateFilmInStorage3");
    UI.clearAllFilmsFromUI();
    console.log("updateFilmInStorage4");
    UI.loadAllFilms(films);
    console.log("updateFilmInStorage5");
  }

  static getFilmsFromStorage() {
    let films;
    if (localStorage.getItem("films") === null) {
      films = [];
    } else {
      films = JSON.parse(localStorage.getItem("films"));
    }
    return films;
  }
  static clearAllFilmsFromStorage() {
    localStorage.removeItem("films");
  }
  static deleteFilmFromStorage(filmTitle) {
    let films = this.getFilmsFromStorage();
    films.forEach(function (film, index) {
      if (film.title === filmTitle) {
        films.splice(index, 1);
      }
    });

    localStorage.setItem("films", JSON.stringify(films));
  }
}
