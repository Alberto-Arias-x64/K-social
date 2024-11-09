const inputSearch = document.querySelector("#search");
const loader = document.querySelector(".loader");
const more = document.querySelector("#more");

document.querySelector("#search-form").addEventListener("submit", getData);

function template(data) {
  return `
    <div class="result">
      <img src="./assets/placeholder.png" alt="organizacion">
      <div>
        <strong>${data.nombre}</strong>
        <p class="info">${data.tipo}</p>
        <p class="info">${data.num_seguidores} Seguidores</p>
        <p>${data.descripcion}</p>
      </div>
      <button>Ver</button>
    </div>
  `;
}

function getData(e) {
  if (e) e.preventDefault();
  document.querySelector("#results").innerHTML = "";
  loader.style.display = "flex";
  more.style.display = "none";
  const search = inputSearch.value;
  fetch("./dataBase.json")
    .then((res) => res.json())
    .then((data) => {
      const results = data.filter(
        (item) =>
          item.nombre.toLowerCase().includes(search.toLowerCase()) ||
          item.descripcion.toLowerCase().includes(search.toLowerCase()) ||
          item.tipo.toLowerCase().includes(search.toLowerCase())
      );
      setTimeout(() => {
        loader.style.display = "none";
        if (results.length > 0) {
          more.style.display = "block";
          results.forEach((item) => {
            document.querySelector("#results").innerHTML += template(item);
          });
        } else {
          if (results.length === 0) {
            document.querySelector(
              "#results"
            ).innerHTML = `<h3>No se encontraron resultados</h3>`;
          }
        }
      }, 1000);
    })
    .catch((err) => console.log(err));
}

getData();
