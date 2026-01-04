const params = new URLSearchParams(location.search);
const repoUrl = params.get("repo");
const apiRepo = repoUrl.replace("https://github.com/", "https://api.github.com/repos/");

const title = document.getElementById("title");
const readmeDiv = document.getElementById("readme");
const versions = document.getElementById("versions");
const downloadBtn = document.getElementById("download");

title.textContent = repoUrl.split("/").pop();

/* README */
fetch(apiRepo + "/readme", {
  headers: { Accept: "application/vnd.github.v3.raw" }
})
.then(r => r.text())
.then(md => readmeDiv.textContent = md);

/* Releases */
let assets = [];

fetch(apiRepo + "/releases")
  .then(r => r.json())
  .then(data => {
    data.forEach(rel => {
      rel.assets.forEach(a => {
        assets.push(a);
        const opt = document.createElement("option");
        opt.value = a.browser_download_url;
        opt.textContent = `${rel.tag_name} - ${a.name}`;
        versions.appendChild(opt);
      });
    });
  });

downloadBtn.onclick = () => {
  const url = versions.value;

  if (confirm("AntiVirüs taraması ister misiniz?")) {
    fetch("https://SENIN-BACKEND/scan-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    })
    .then(r => r.json())
    .then(d => {
      const vt =
        "https://www.virustotal.com/gui/url/" + d.data.id;
      window.open(vt, "_blank");
    });
  } else {
    window.open(url, "_blank");
  }
};
