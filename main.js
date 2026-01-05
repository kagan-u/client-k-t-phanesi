const README_URL =
  "https://raw.githubusercontent.com/kagan-u/client-k-t-phanesi/main/README.md";

fetch(README_URL)
  .then(r => r.text())
  .then(text => {
    const container = document.getElementById("clients");
    text.split("\n").forEach(line => {
      const url = line.match(/https?:\/\/\S+/);
      if (!url) return;

      const name = line.replace(url[0], "").replace(/[-*]/g,"").trim();

      const btn = document.createElement("button");
      btn.textContent = name;
      btn.onclick = () => {
        location.href = `client.html?repo=${encodeURIComponent(url[0])}`;
      };

      container.appendChild(btn);
    });
  });
