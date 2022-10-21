const main = document.getElementById("main");
const elementosCarrito = document.querySelector(".element-cart");
const carro = document.querySelector(".cart");
const contenedor = document.createElement("contenedor");
contenedor.className = "conteiner-card";

let carrito = [];
let cantidad = 0;


main.insertBefore(contenedor, carro);
leerLocalStorage()
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
    // actualizarStock();
    guardarLocalStorage();
    actualizarCarrito();
    cantidad = 0;
};




const actualizarCarrito = () => {
    elementosCarrito.innerHTML = "";
    leerLocalStorage();
    let total = carrito.reduce(
        (acc, el) => acc + parseFloat(el.precio) * parseInt(el.cantidad),
        0
    );
    carrito.forEach((items) => {
        // console.log(items)
        const li = document.createElement("li");
        let botonBorrar = document.createElement("button");
        let subTotal = parseFloat(items.precio) * parseInt(items.cantidad);
        li.className = "prod-in-cart";
        li.innerHTML = `
        <p class="name">${items.nombre}</p>
        <p class="price">Precio: $ ${items.precio}</p>
        <p class="quanty">Cantidad: ${items.cantidad}</p>
        <p class="total">Subtotal: $ ${subTotal}</p>`;
        botonBorrar.classList.add("erase-product");
        botonBorrar.setAttribute("id", `${items.id}`);
        botonBorrar.addEventListener("click", eliminarProducto);
        botonBorrar.innerText = "X";
        li.appendChild(botonBorrar);
        elementosCarrito.append(li);
       
        console.log(productos);
    });
    
    const li = document.createElement("li");
    li.className = "price-total";
    li.innerHTML = `
    <p class="total-total">TOTAL:</p>
    <p></p>
    <p></p>
    <p class="total-total">$ ${total}</p>
    <button class="button-empty" id="button-empty">Vaciar</button>`;
    elementosCarrito.appendChild(li);
    
    vaciarCarrito();
};

const vaciarCarrito = () => {
    let botonVaciarCarrito = document.getElementById("button-empty");
    let todos = document.querySelector(".element-cart");
    botonVaciarCarrito.addEventListener("click", () => {
        carrito.length = 0;
        todos.innerHTML = "";
    });
    guardarLocalStorage()
};

const eliminarProducto = (e) => {
    console.log("entre a eliminar");
    let idBorrar = e.target.id;
    console.log(idBorrar);
    console.log(carrito);
    carrito = carrito.filter((el) => el.id != idBorrar);
    console.log(carrito);
    carrito.length === 0 && vaciarCarrito();

    actualizarCarrito();
};

const guardarLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const leerLocalStorage = () => {
    let estado = JSON.parse(localStorage.getItem("carrito"));
    // if(localStorage.getItem("carrito") != []){
    //     carrito = JSON.parse(localStorage.getItem("carrito"))
    // }
    estado || [] && (carrito = estado);
}