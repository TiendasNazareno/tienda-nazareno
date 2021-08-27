const response = localStorage.getItem('Items');
const items = JSON.parse(response);
const productos = document.getElementById('itemscomprar');
const templateCard = document.getElementById('template-productos').content;
const fragment = document.createDocumentFragment();
var total = 0;
window.onbeforeunload = function() {
    return "¿Desea recargar la página web?";
  };
document.addEventListener('DOMContentLoaded', async () => {
  await cargarproductos();
 // document.querySelector("#totals").innerHTML = total;
});

// window.onload = function() {
  //  document.querySelector("#totals").innerHTML = total;
// }

document.addEventListener('click', async (ev) => {
    edit(ev);
});

async function cargarproductos() {
    productos.innerHTML = '';
    const bandpor = await Portatiles(items.portatiles);
    const bandaud = await Audifonos(items.audifonos);
    const bandcel =  await Celulares(items.celulares);
    const bandimpre = await Impresoras(items.impresoras);
    if (bandpor === false && bandaud === false && bandimpre === false && bandcel === false) {
        document.querySelector("#titulocompra").innerHTML = "Carretilla Vacia";
    }
    document.querySelector("#totals").innerHTML ="Q" + total;
}

const Portatiles = async (portatiles) => {
    if (portatiles.length > 0) {
      Object.values(portatiles).forEach(async (pd) => {
        await  this.MostrarDatos(pd.model, pd.amount, pd.counter, pd.imgurl, pd.id,'portatiles'); 
      });
      productos.appendChild(fragment);
    } else {
        return false;
    }
}

const Audifonos = async  (audifonos) => {
    if (audifonos.length > 0) {
        Object.values(audifonos).forEach(async (pd) => {
            await  this.MostrarDatos(pd.model, pd.amount, pd.counter, pd.imgurl, pd.id,'audifonos'); 
          });
        productos.appendChild(fragment);
    } else {
        return false;
    }
}

const Celulares = async (celulares) => {
    if (celulares.length > 0) {
        Object.values(celulares).forEach(async (pd) => {
            await  this.MostrarDatos(pd.model, pd.amount, pd.counter, pd.imgurl, pd.id,'celulares'); 
          });
        productos.appendChild(fragment);
    } else {
        return false;
    }
}

const Impresoras = async (impresoras) => {
    if (impresoras.length > 0) {
        Object.values(impresoras).forEach(async (pd) => {
            await  this.MostrarDatos(pd.model, pd.amount, pd.counter, pd.imgurl, pd.id,'impresoras'); 
          });
        productos.appendChild(fragment);
    } else {
        return false;
    }
}

// funcion de mostrar datos

function MostrarDatos(modelo, amount, counter, img, id, categoria) {
    templateCard.querySelector('h5').textContent = "Producto: " + modelo;
    templateCard.querySelector('h6').textContent = "Precio: Q" + amount;
    templateCard.querySelector('h3').textContent = "Cantidad: " + counter;
    templateCard.querySelector('p').textContent = "Total del producto: Q" + parseInt(amount) * counter;
    templateCard.querySelector('img').setAttribute("src", img);
    templateCard.querySelectorAll('i')[0].setAttribute("id" , id);
    templateCard.querySelectorAll('i')[0].setAttribute("title" , categoria);
    templateCard.querySelectorAll('i')[1].setAttribute("id" , id);
    templateCard.querySelectorAll('i')[1].setAttribute("title" , categoria);
    templateCard.querySelectorAll('i')[2].setAttribute("id" , id);
    templateCard.querySelectorAll('i')[2].setAttribute("title" , categoria);
    total = total + (parseInt(amount) * counter);
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
}


// funcion de edicion

async function edit(ev) {
    var arrayprod = [];
    var category = ev.target.title;
    var id = ev.target.id;
    arrayprod = await validatecategory(category); 
    if (ev.target.classList.contains('fa-plus') && id !== '') {
        const response = arrayprod.find(E => E.id === parseInt(id));
        response.counter += 1;
        total = 0;
        await this.cargarproductos();
    } else if (ev.target.classList.contains('fa-minus') && id !== '') {
        const response = arrayprod.find(E => E.id === parseInt(id));
        response.counter -= 1;
        total = 0;
        response.counter < 0 ? response.counter = 0 : 0; 
        await this.cargarproductos();
    } else if (ev.target.classList.contains('fa-trash') && id !== '') {
        const response = arrayprod.find(E => E.id === parseInt(id));
        const index = arrayprod.indexOf(response);
        arrayprod.splice(index, 1);
        await this.Category(category, arrayprod);
    }    
}


// funcion del array de categoria

function validatecategory(categoria) {
    switch (categoria) {
        case "portatiles":
            return items.portatiles;
        break;
        case "audifonos":
            return items.audifonos;
        break;
        case "celulares":
            return items.celulares;
        break;
        case "impresoras":
            return items.impresoras;
        break;
      default:     
    }
}

// funcion para eliminar eliminar el array de la posicion

async function Category(categoria, arregloprod) {
    total = 0;
    switch (categoria) {
        case "portatiles":
            items.portatiles = arregloprod.slice();
            await this.cargarproductos();
        break;
        case "audifonos":
            items.audifonos = arregloprod.slice();
            await this.cargarproductos();
        break;
        case "celulares":
            items.celulares = arregloprod.slice();
            await this.cargarproductos();
        break;
        case "impresoras":
            items.impresoras = arregloprod.slice();
            await this.cargarproductos();
        break;
      default:     
    }
}

function confirmar(){
    if(items.portatiles.length ===0 && items.audifonos.length === 0 && items.celulares.length === 0 && items.impresoras.length === 0){
        alert('No tiene ningun producto en la carretilla');
        window.location="pagina2.html";
    }
    else{
    alert('Gracias Por su compra vuelva pronto.');        
    }
}
