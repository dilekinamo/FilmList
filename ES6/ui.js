class UI {
  static clearInputs() {
    for (let i = 0; i < arguments.length; i++) {
      // console.log(arguments[i]);
      arguments[i].value = "";
    }
  }
  static addFilmToUI(film) {
    //console.log(film);

    const filmList = document.getElementById("films");
    filmList.innerHTML += `<tr>
            <td><img src="${film.url}"  class="img-fluid img-thumbnail poster-img"></td>
            <td>${film.title}</td>
            <td>${film.director}</td>
            <td><a href="#" class="btn btn-danger">Filmi Sil</a></td>
            <td><a href="#" class="btn btn-info">Güncelle</a></td>
            </tr>`;
  }

  static loadAllFilms(films) {
    const filmList = document.getElementById("films");
    films.forEach(function (film) {
      filmList.innerHTML += `<tr>
            <td><img src="${film.url}"  class="img-fluid img-thumbnail poster-img"></td>
            <td>${film.title}</td>
            <td>${film.director}</td>
            <td><a href="#" class="btn btn-danger">Filmi Sil</a></td>
            <td><a href="#" class="btn btn-info">Güncelle</a></td>
            </tr>`;
    });
  }

  static displayMessage(message, type) {
    const cardBody = document.querySelector(".card-body");

    /*
        <div class="alert alert-success" role="alert">
            alert mesajı buraya yazılacak
        </div>
        */

    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;

    //card body içerisine çocuk element olarak ekliyoruz
    cardBody.appendChild(div);

    //zamanlayıcı kuralım
    setTimeout(function () {
      div.remove();
    }, 3000);
  }
  static clearAllFilmsFromUI() {
    const filmList = document.getElementById("films");
    //1. yöntem
    //filmList.innerHTML = '';

    //2.yöntem
    while (filmList.firstElementChild !== null) {
      filmList.firstElementChild.remove();
    }
  }
  static deleteFilmFromUI(element) {
    element.remove();
  }
  static updateFilm(film) {
    //Fill input fields of selected film
    //console.log("updateFilm " + document.querySelector("#url").value + " Film");
    updateMode = true;
    document.querySelector("#url").value =
      film.firstElementChild.firstElementChild.getAttribute("src");
    document.querySelector("#title").value =
      film.firstElementChild.nextSibling.nextSibling.textContent;
    document.querySelector("#director").value =
      film.firstElementChild.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
  }
}
