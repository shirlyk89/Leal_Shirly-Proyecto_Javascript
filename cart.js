
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

export function agregarAlCarrito(producto) {
  const item = carrito.find(p => p.id === producto.id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  renderizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function renderizarCarrito() {
  const lista = document.getElementById("cartItems");
  const total = document.getElementById("cartTotal");

  
  if (!lista || !total) return;

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach(item => {
    suma += item.price * item.cantidad;

    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <span>${item.title} x${item.cantidad}</span>
      <span>$${(item.price * item.cantidad).toFixed(2)}</span>
      <button class="remove-item">✕</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      eliminarDelCarrito(item.id);
    });

    lista.appendChild(li);
  });

  total.textContent = `$${suma.toFixed(2)}`;
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  renderizarCarrito();
}


export function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  alert("¡Compra realizada con éxito! =D");

  carrito = [];
  localStorage.removeItem("carrito");
  renderizarCarrito();
}
