fetch("data/clients.json")
  .then(res => res.json())
  .then(clients => {
    const list = document.getElementById("client-list");

    clients.forEach(client => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2>${client.name}</h2>
        <button onclick="window.open('${client.url}', '_blank')">
          GitHub Reposuna Git
        </button>
      `;

      list.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Clientler yüklenemedi", err);
  });
