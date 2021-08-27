const productos = document.getElementById('items');
const templateCard = document.getElementById('template-productos').content;
const fragment = document.createDocumentFragment();
let totalcounter = 0;
const dataGroup = {
    "portatiles": [],
    "impresoras": [],
    "celulares": [],
    "audifonos": [],
};
// Array de Objetos de los items del producto 
const result = [
    {
        "id": 1,
        "model": "Alienware M15 R4",
        "amount": 18500.00,
        "counter": 0,
        "imgurl": "Imagenes/alienwarem15.png",
        "category": "portatiles"
    },
    {
        "id": 2,
        "model": "Dell 3000 15.6",
        "amount": 3800.00,
        "counter": 0,
        "imgurl": "Imagenes/dell3000.png",
        "category": "portatiles"
    },
    {
        "id": 3,
        "model": "Laptop Lenovo 1-14ast-05",
        "amount": 3000.00,
        "counter": 0,
        "imgurl": "Imagenes/lenovo_barata.png",
        "category": "portatiles"
    },
    {
        "id": 4,
        "model": "MSI GL66 15.6",
        "amount": 20000.00,
        "counter": 0,
        "imgurl": "Imagenes/msi_gl66.png",
        "category": "portatiles"
    },
	{
        "id": 5,
        "model": "Impresora Canon G6010",
        "amount": 2300.00,
        "counter": 0,
        "imgurl": "Imagenes/canon_g6010.png",
        "category": "impresoras"
    },
	{
        "id": 6,
        "model": "Impresora Canon G2160",
        "amount": 1500.00,
        "counter": 0,
        "imgurl": "Imagenes/impresora.png",
        "category": "impresoras"
    },
	{
        "id": 7,
        "model": "Impresora HP Smart Tank 515",
        "amount": 1500.00,
        "counter": 0,
        "imgurl": "Imagenes/hp_515.png",
        "category": "impresoras"
    },
	{
        "id": 8,
        "model": "Impresora HP LaserJet M404dw",
        "amount": 2500.00,
        "counter": 0,
        "imgurl": "Imagenes/hp_m404dw.png",
        "category": "impresoras"
    },
	{
        "id": 9,
        "model": "Samsung Galaxy S21 GRIS",
        "amount": 7500.00,
        "counter": 0,
        "imgurl": "Imagenes/Samsung_S21.png",
        "category": "celulares"
    },
	{
        "id": 10,
        "model": "Iphone 12 PRO MAX Pacif Blue",
        "amount": 12000.00,
        "counter": 0,
        "imgurl": "Imagenes/iphone12_promax.png",
        "category": "celulares"
    },
	{
        "id": 11,
        "model": "Xiaomi MI 10T 5G",
        "amount": 3700.00,
        "counter": 0,
        "imgurl": "Imagenes/xiaomi.png",
        "category": "celulares"
    },
	{
        "id": 12,
        "model": "Xiaomi Poco M3",
        "amount": 1700.00,
        "counter": 0,
        "imgurl": "Imagenes/m3.png",
        "category": "celulares"
    },
	{
        "id": 13,
        "model": "Samsung Galaxy Buds",
        "amount": 1600.00,
        "counter": 0,
        "imgurl": "Imagenes/SamsungGalaxyBuds.png",
        "category": "audifonos"
    },
	{
        "id": 14,
        "model": "Bose Soundlink Around Ear II",
        "amount": 1800.00,
        "counter": 0,
        "imgurl": "Imagenes/audifonosbose.png",
        "category": "audifonos"
    },
	{
        "id": 15,
        "model": "Corsair Void Elite",
        "amount": 800.00,
        "counter": 0,
        "imgurl": "Imagenes/Corsair7.1.png",
        "category": "audifonos"
    },
	{
        "id": 16,
        "model": "RedDragon Lamia",
        "amount": 400.00,
        "counter": 0,
        "imgurl": "Imagenes/lamia.png",
        "category": "audifonos"
    },
]


document.addEventListener('DOMContentLoaded', async () => {
    await mostrardatos();
 });


 async function mostrardatos() {
    result.forEach(async (Element) => {
        await MostrarDatosHTML(Element.model, Element.amount, Element.imgurl, Element.id, Element.category);
    });
    productos.appendChild(fragment);
 }

 function MostrarDatosHTML(modelo, amount, img, id, category) {
    templateCard.querySelector('h5').textContent = modelo;
    templateCard.querySelector('h6').textContent =  "Q"+amount;
    templateCard.querySelector('img').setAttribute("src", img);
    templateCard.querySelector('img').setAttribute("id", id);
    templateCard.querySelector('img').setAttribute("name", category);
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
}

///////////////////////////////////////////////////////////////////////
    // funciones del DRAG Y DROP    
    async function drag(ev) {
        await ev.dataTransfer.setData("ID", ev.target.id);
        await ev.dataTransfer.setData("CATEGORY", ev.target.name);
    }

    async function allowDrop(ev) {
        await ev.preventDefault();
    }

    async function drop(ev) {
        await ev.preventDefault();
        totalcounter += 1;
        document.getElementById("counter").innerHTML = totalcounter;
        var id = await ev.dataTransfer.getData("ID");
        var category = await ev.dataTransfer.getData("CATEGORY");
        switch (category) {
            case "portatiles":
                if (dataGroup.portatiles.length === 0) {
                    const response = result.find(E => E.id === parseInt(id));
                    await this.pushitemPortatiles(response.model, 1, response.amount, response.id, response.imgurl);
                } else {
                    const finds = dataGroup.portatiles.find(E => E.id === parseInt(id));
                    if (finds) {
                        const index = dataGroup.portatiles.indexOf(finds);
                        finds.counter = finds.counter + 1;
                        dataGroup.portatiles[index] = finds;
                    } else {
                        const response = result.find(E => E.id === parseInt(id));
                        await this.pushitemPortatiles(response.model, 1, response.amount, response.id, response.imgurl);
                    }
                }
                break;
            case "impresoras":
                if (dataGroup.impresoras.length === 0) {
                    const response = result.find(E => E.id === parseInt(id));
                    await this.pushitemImpresoras(response.model, 1, response.amount, response.id, response.imgurl);
                } else {
                    const finds = dataGroup.impresoras.find(E => E.id === parseInt(id));
                    if (finds) {
                        const index = dataGroup.impresoras.indexOf(finds);
                        finds.counter = finds.counter + 1;
                        dataGroup.impresoras[index] = finds;
                    } else {
                        const response = result.find(E => E.id === parseInt(id));
                        await this.pushitemImpresoras(response.model, 1, response.amount, response.id, response.imgurl);
                    }
                }  
                break;
            case "celulares":
                  if (dataGroup.celulares.length === 0) {
                    const response = result.find(E => E.id === parseInt(id));
                    await this.pushitemCelulares(response.model, 1, response.amount, response.id, response.imgurl);                     
                  } else {
                    const finds = dataGroup.celulares.find(E => E.id === parseInt(id));
                    if (finds) {
                        const index = dataGroup.celulares.indexOf(finds);
                        finds.counter = finds.counter + 1;
                        dataGroup.celulares[index] = finds;
                    } else {
                        const response = result.find(E => E.id === parseInt(id));
                        await this.pushitemCelulares(response.model, 1, response.amount, response.id, response.imgurl);
                    }
                  }  
                break;
            case "audifonos":
                if (dataGroup.audifonos.length === 0) {
                    const response = result.find(E => E.id === parseInt(id));
                    await this.pushitemAudifonos(response.model, 1, response.amount, response.id, response.imgurl);     
                } else {
                    const finds = dataGroup.audifonos.find(E => E.id === parseInt(id));
                    if (finds) {
                        const index = dataGroup.audifonos.indexOf(finds);
                        finds.counter = finds.counter + 1;
                        dataGroup.audifonos[index] = finds;
                    } else {
                        const response = result.find(E => E.id === parseInt(id));
                        await this.pushitemAudifonos(response.model, 1, response.amount, response.id, response.imgurl);
                    }
                }
                break;          
            default:
        }
    }


    // funciones para ingresar el objeto al array de la categoria correspondiente

    function pushitemPortatiles(model, counter, amount, id, img) {
        const data = {
            model: model,
            counter: counter,
            amount: amount,
            id: parseInt(id),
            imgurl: img,
        };
        dataGroup.portatiles.push(data);
    }

    function pushitemImpresoras(model, counter, amount, id, img) {
        const data = {
            model: model,
            counter: counter,
            amount: amount,
            id: parseInt(id),
            imgurl: img,
        };
        dataGroup.impresoras.push(data);
    }

    function pushitemCelulares(model, counter, amount, id, img) {
        const data = {
            model: model,
            counter: counter,
            amount: amount,
            id: parseInt(id),
            imgurl: img,
        };
        dataGroup.celulares.push(data);
    }


    function pushitemAudifonos(model, counter, amount,  id, img) {
        const data = {
            model: model,
            counter: counter,
            amount: amount,
            id: parseInt(id),
            imgurl: img,
        };
        dataGroup.audifonos.push(data);
    }
    



    // metodo de guardar
    function save() {
        console.log("holas");
        console.log(dataGroup);
        if ((dataGroup.portatiles.length || dataGroup.impresoras.length ||
             dataGroup.celulares.length || dataGroup.audifonos.length) === 0) {
            alert('No a escogido ningun producto');
        } else {
            console.log(dataGroup);
            localStorage.setItem('Items', JSON.stringify(dataGroup));
            window.location = "pagina3.html";
           // const response = localStorage.getItem('Items');
           // console.log(response);
           // var result = JSON.parse(response);
           // console.log(result);  
        }
    }