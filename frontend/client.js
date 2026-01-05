const params = new URLSearchParams(location.search);
const repo = params.get("repo"); // KULLANICI/REPO
const api = `https://api.github.com/repos/${repo}`;

document.getElementById("title").textContent = repo;

const versions = document.getElementById("versions");
const downloadBtn = document.getElementById("download");

/* README */
fetch(`${api}/readme`, {
  headers: { Accept: "application/vnd.github.v3.raw" }
})
.then(r => r.text())
.then(md => {
  document.getElementById("readme").textContent = md;
});

/* Releases + assets */
let files = [];

fetch(`${api}/releases`)
.then(r => r.json())
.then(releases => {
  releases.forEach(rel => {
    rel.assets.forEach(asset => {
      files.push(asset);

      const opt = document.createElement("option");
      opt.value = asset.browser_download_url;
      opt.textContent = `${rel.tag_name} – ${asset.name}`;
      versions.appendChild(opt);
    });
  });
});

/* İNDİR */
downloadBtn.onclick = () => {
  const url = versions.value;

  // Direkt indir
  window.location.href = url;
};
