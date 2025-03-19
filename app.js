const productos = [ 
    { id: 1, nombre: 'Llama Burger', precio: 7000 },
    { id: 2, nombre: 'Warmi Burger', precio: 9000 },
    { id: 3, nombre: 'Cheese Burger', precio: 5000 }
];

let pedido = [];
let total = 0;

const menuDiv = document.getElementById("menu");
const pedidoTabla = document.getElementById("pedido");
const totalSpan = document.getElementById("total");
const finalizarBtn = document.getElementById("finalizar");

const actualizarCarrito = () => {
    pedidoTabla.innerHTML = "";
    total = 0;

    pedido.forEach(item => {
        total += item.subtotal;
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${item.subtotal}</td>
        `;
        pedidoTabla.appendChild(fila);
    });

    totalSpan.textContent = total;
    finalizarBtn.classList.toggle("hidden", pedido.length === 0);
};

const agregarAlCarrito = (producto) => {
    let item = pedido.find(p => p.id === producto.id);

    if (item) {
        item.cantidad++;
        item.subtotal = item.cantidad * producto.precio;
    } else {
        pedido.push({ ...producto, cantidad: 1, subtotal: producto.precio });
    }

    actualizarCarrito();
};

const cargarMenu = () => {
    productos.forEach(prod => {
        let div = document.createElement("div");
        div.classList.add("menu-item");
        div.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>Precio: $${prod.precio}</p>
            <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
        `;

        menuDiv.appendChild(div);
    });
};

finalizarBtn.addEventListener("click", () => {
    alert(`Compra finalizada. Total a pagar: $${total}. Gracias por tu compra`);
    pedido = [];
    actualizarCarrito();
});

cargarMenu();