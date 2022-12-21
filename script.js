fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (articles) {
        articles.forEach((article) => {
            showAllArticles(article);
        });
    })
    .catch(function (err) {
        // Une erreur est survenue
        console.error(err);
    });

const items = document.getElementById("items");
// On créé chaques éléments html et on y ajoute les informations des produits
function showAllArticles(article) {
    const items = document.getElementById("items");
    const a = document.createElement("a");
    const container = document.createElement("article");
    const img = document.createElement("img");
    const title = document.createElement("h3");
    const description = document.createElement("p");

    a.href = "./product.html?id=" + article._id;
    img.src = article.imageUrl;
    img.alt = article.altTxt;
    title.classList.add("productName");
    title.textContent = article.name;
    description.classList.add("productDescription");
    description.textContent = article.description;

    items
        .appendChild(a)
        .appendChild(container)
        .appendChild(img)
        .parentNode.insertBefore(title, img.nextSibling) // Insérer le titre juste après l'image
        .parentNode.insertBefore(description, title.nextSibling);
}
