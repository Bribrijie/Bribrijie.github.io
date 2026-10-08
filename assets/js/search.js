// 站点搜索：加载首页 JSON 索引，用 Fuse.js 做模糊匹配
(function () {
  "use strict";

  var container = document.getElementById("search-container");
  var input = document.getElementById("search-input");
  var resultsEl = document.getElementById("search-results");
  var statusEl = document.getElementById("search-status");

  if (!container || !input || !resultsEl || typeof Fuse === "undefined") {
    return;
  }

  var indexUrl = container.getAttribute("data-index-url");
  var fuse = null;

  function setStatus(text) {
    if (!statusEl) return;
    if (text) {
      statusEl.textContent = text;
      statusEl.hidden = false;
    } else {
      statusEl.hidden = true;
    }
  }

  function countLabel(n) {
    return n + (n === 1 ? " entry" : " entries");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function render(matches) {
    resultsEl.innerHTML = "";
    if (!matches.length) {
      setStatus("No matching results.");
      return;
    }
    setStatus("");
    matches.forEach(function (match) {
      var item = match.item;
      var li = document.createElement("li");
      li.className = "search-result";
      li.innerHTML =
        '<a class="search-result__title" href="' +
        escapeHtml(item.permalink) +
        '">' +
        escapeHtml(item.title) +
        "</a>" +
        '<p class="search-result__summary">' +
        escapeHtml(item.summary || "") +
        "</p>";
      resultsEl.appendChild(li);
    });
  }

  fetch(indexUrl)
    .then(function (resp) {
      if (!resp.ok) throw new Error("HTTP " + resp.status);
      return resp.json();
    })
    .then(function (data) {
      fuse = new Fuse(data, {
        includeMatches: false,
        minMatchCharLength: 1,
        ignoreLocation: true,
        threshold: 0.35,
        keys: [
          { name: "title", weight: 0.5 },
          { name: "tags", weight: 0.2 },
          { name: "categories", weight: 0.15 },
          { name: "summary", weight: 0.1 },
          { name: "content", weight: 0.05 }
        ]
      });
      setStatus("Index loaded: " + countLabel(data.length) + ".");
    })
    .catch(function (err) {
      setStatus("Failed to load the search index: " + err.message);
    });

  input.addEventListener("input", function () {
    var query = input.value.trim();
    if (!fuse) {
      return;
    }
    if (!query) {
      resultsEl.innerHTML = "";
      setStatus("Index loaded: " + countLabel(fuse.getIndex().docs.length) + ".");
      return;
    }
    render(fuse.search(query).slice(0, 20));
  });
})();
