const url = new URL(window.location.href);
const id = url.searchParams.get("id");

fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (article) {
        showArticle(article);
    })
    .catch(function (err) {
        // Une erreur est survenue
        console.error(err);
    });

function showArticle(article) {
    const img_container = document.querySelector(".item .item__img");
    const img = document.createElement("img");
    const imgAlt = article.altTxt;
    img.alt = imgAlt;
    img.src = article.imageUrl;
    img_container.appendChild(img);

    const title = document.getElementById("title");
    title.textContent = article.name;
    document.title = article.name;

    const price = document.getElementById("price");
    price.textContent = article.price;

    const description = document.getElementById("description");
    description.textContent = article.description;

    const select = document.getElementById("colors");
    const colors = article.colors;

    gen_colors(select, colors);

    const quantity = document.getElementById("quantity");
}

function gen_colors(select, colors) {
    // Boucle sur l array de couleurs présent dans la requête json et créé de nouveaux enfants à chaque boucle
    colors.forEach(function (color) {
        const balise = document.createElement("option");
        balise.text = color;
        balise.value = color;

        select.appendChild(balise);
    });
}

// LE CLIC AJOUT AU PANIER

const button = document.getElementById("addToCart"); // On récupère l'élément sur lequel on veut détecter le clic
button.addEventListener("click", function (event) {
    // On écoute l'événement click
    event.preventDefault(); // On utilise la fonction preventDefault de notre objet event pour empêcher le comportement par défaut de cet élément lors du clic de la souris
    let quantity = document.getElementById("quantity").value;
    const select = document.getElementById("colors");
    const color = select.options[select.selectedIndex].value;
    // On test les inputs, si tout est ok on lance addCart()
    if (color == "") alert("Veuillez choisir la couleur du produit");
    else if (quantity < 1)
        alert("La quantité doit être définie à 1 au minimum");
    else if (quantity > 100)
        alert("La quantité ne doit pas dépasser 100 articles");
    else addCart(id, quantity, color);
});
// On ajoute un produit dans le localstorage
function addCart(id, quantity, color) {
    let currentCart = getCart();
    let index = currentCart.findIndex(
        (item) => item.id === id && item.color === color
    );

    if (index == -1) {
        // S'il n'existe pas d'article similaire dans le localStorage
        currentCart.push({
            id: id,
            quantity: quantity,
            color: color,
        });
    } else {
        // Sinon on additionne la quantité à la précédente
        quantity = Number(currentCart[index]["quantity"]) + Number(quantity);
        currentCart[index]["quantity"] = quantity;
    }
    store(currentCart);
    alert("Produit ajouté avec succès !");
}

function store(cart) {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function getCart() {
    let currentCart = localStorage.getItem("shoppingCart");
    if (currentCart == null) {
        return [];
    } else {
        return JSON.parse(currentCart);
    }
}
