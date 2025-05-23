document.addEventListener("mouseup", async function () {
    const selection = window.getSelection().toString().trim();

    // Exit if nothing selected
    if (!selection || selection.split(" ").length > 1) return;

    const word = selection;

    // Fetch meaning from Dictionary API
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    // If no meaning found
    if (!data || data.title === "No Definitions Found") {
        showPopup("No definition found for \"" + word + "\"");
        return;
    }

    const meaning = data[0].meanings[0].definitions[0].definition;

    // Show meaning in popup
    showPopup(`${word}: ${meaning}`);
});

function showPopup(text) {
    // Remove existing popup if any
    const existing = document.getElementById("word-meaning-popup");
    if (existing) existing.remove();

    const popup = document.createElement("div");
    popup.id = "word-meaning-popup";
    popup.innerText = text;
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.backgroundColor = "#222";
    popup.style.color = "#fff";
    popup.style.padding = "10px";
    popup.style.borderRadius = "8px";
    popup.style.zIndex = 10000;
    popup.style.maxWidth = "300px";
    popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
    popup.style.fontSize = "14px";

    document.body.appendChild(popup);

    // Remove after 5 seconds
    setTimeout(() => popup.remove(), 5000);
}
