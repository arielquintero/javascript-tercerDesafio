const main = document.getElementById("main");
const elementosCarrito = document.querySelector(".element-cart");
const carro = document.querySelector(".cart");
const contenedor = document.createElement("contenedor");
contenedor.className = "conteiner-card";

// let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* Variable para manejar el input*/
let inputUsuario = document.createElement("input");
inputUsuario.className = "input";
inputUsuario.type = "text";
inputUsuario.name = "name";
inputUsuario.value = "";
inputUsuario.placeholder = "Tu nombre + Enter";
main.insertAdjacentElement("afterbegin", inputUsuario);

/* Variable para manejar el el div de "Su carrito esta vacio"*/
let liVacio = document.createElement("li");
liVacio.innerText = "Su carrito esta vacio";
liVacio.classList = "price-total empty";
carro.insertAdjacentElement("afterend",liVacio);



let carrito = [];
let cantidad = 0;


const bienvenido = () => {
    let entrada = document.querySelector(".input");
    let msjBienvenida = document.createElement("div");
    let tituloCard = document.querySelector(".title-card");
    msjBienvenida.className = "div-msj";
    tituloCard.insertAdjacentElement("beforebegin", msjBienvenida);
    entrada.addEventListener("keyup", function (ev) {
        if (ev.keyCode === 13) {
            msjBienvenida.innerText = `Bienvenido ${entrada.value} a nuestra web de productos de Electronica`;
            entrada.value = " ";
        }
    });
};

const leerLocalStorage = () => {
    if (localStorage.getItem("carrito") !== []) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
    }
};

main.insertBefore(contenedor, carro);

bienvenido();

for (const producto of productos) {
    let div = document.createElement("div");
    let boton = document.createElement("button");
    div.className = "card-grid";
    div.innerHTML = `
        <img class="img-card" src="${producto.img}" alt="${producto.nombre}" />
        <h3 class="product-card">${producto.nombre}</h3>
        <p class="stock-card">Precio: $ ${producto.precio}</p>
        <p class="price-card">Stock: ${producto.stock}</p>
        `;
    boton.className = `button-card button-id-${producto.id}`;
    boton.innerText = "COMPRAR";
    div.append(boton);
    boton.addEventListener("click", () => carritoAgregar(producto.id));
    contenedor.append(div);
}

const carritoAgregar = (itemId) => {

    liVacio.style.display = "none";

    let seRepite = carrito.some((prod) => prod.id === itemId);

    if (seRepite) {
        carrito.map((el) => {
            el.id === itemId && el.cantidad++;
        });
    } else {
        let itemProd = productos.find((prod) => prod.id === itemId);
        cantidad++;
        itemProd["cantidad"] = cantidad;
        carrito.push(itemProd);
    }
    guardarLocalStorage();
    actualizarCarrito();
    cantidad = 0;
};

const actualizarCarrito = () => {
    elementosCarrito.innerHTML = "";
    let total = carrito.reduce(
        (acc, el) => acc + parseFloat(el.precio) * parseInt(el.cantidad),
        0
    );
    carrito.forEach((items) => {
        // console.log(items)
        const productosEnCarrito = document.createElement("li");
        let botonBorrar = document.createElement("button");
        let subTotal = parseFloat(items.precio) * parseInt(items.cantidad);
        productosEnCarrito.className = "prod-in-cart";
        productosEnCarrito.innerHTML = `
        <p class="name">${items.nombre}</p>
        <p class="price">Precio: $ ${items.precio}</p>
        <p class="quanty">Cantidad: ${items.cantidad}</p>
        <p class="total">Subtotal: $ ${subTotal}</p>`;
        botonBorrar.classList.add("erase-product");
        botonBorrar.setAttribute("id", `${items.id}`);
        botonBorrar.addEventListener("click", eliminarProducto);
        botonBorrar.innerText = "X";
        productosEnCarrito.appendChild(botonBorrar);
        elementosCarrito.append(productosEnCarrito);
        console.log(productos);
    });

    const precioFinal = document.createElement("li");
    precioFinal.className = "price-total";
    precioFinal.innerHTML = `
    <p class="total-total">TOTAL:</p>
    <p></p>
    <p></p>
    <p class="total-total">$ ${total}</p>
    <button class="button-empty" id="button-empty">Vaciar</button>`;
    elementosCarrito.appendChild(precioFinal);

    if (carrito.length === 0) {
        precioFinal.style.display = "none";
        liVacio.style.display = "block";
    }
    vaciarCarrito();
    leerLocalStorage();
};

const vaciarCarrito = () => {
    let botonVaciarCarrito = document.getElementById("button-empty");
    let todos = document.querySelector(".element-cart");
    let liVacio = document.querySelector(".empty");
    botonVaciarCarrito.addEventListener("click", () => {
        carrito.length = 0;
        if(carrito.length === 0){(liVacio.style.display = "block")};
        todos.innerHTML = "";
        guardarLocalStorage();
    });
};

const eliminarProducto = (e) => {
    console.log("entre a eliminar");
    let idBorrar = e.target.id;
    // console.log(idBorrar);
    // console.log(carrito);
    carrito = carrito.filter((el) => el.id != idBorrar);
    console.log(carrito);
    carrito.length === 0 && vaciarCarrito();
    guardarLocalStorage();
    actualizarCarrito();
};

const guardarLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

leerLocalStorage();
actualizarCarrito();
