const url = new URL(window.location.href);
const id = url.searchParams.get("orderId");

let orderId = document.getElementById("orderId");
orderId.textContent = id;
