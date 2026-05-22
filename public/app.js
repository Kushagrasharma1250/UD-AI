const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const uploadMessage = document.getElementById("uploadMessage");
const filesList = document.getElementById("filesList");
const processButton = document.getElementById("processButton");
const processMessage = document.getElementById("processMessage");
const processResult = document.getElementById("processResult");
const loadUsersButton = document.getElementById("loadUsersButton");
const usersList = document.getElementById("usersList");

const apiBase = "/api";

const showMessage = (el, message, isError = false) => {
  el.textContent = message;
  el.style.borderColor = isError ? "rgba(248, 113, 113, 0.3)" : "rgba(56, 189, 248, 0.24)";
  el.style.background = isError ? "rgba(248, 113, 113, 0.08)" : "rgba(56, 189, 248, 0.12)";
};

const renderFiles = (files = []) => {
  if (!files.length) {
    filesList.innerHTML = "<div class=\"item\">No uploaded files found.</div>";
    return;
  }

  filesList.innerHTML = files
    .map(
      (file) => `
      <div class="item">
        <strong>${file.filename}</strong>
        <div>Uploaded: ${new Date(file.uploadedAt).toLocaleString()}</div>
        <div><a href="/uploads/${encodeURIComponent(file.filename)}" target="_blank" rel="noreferrer">Download / Preview</a></div>
      </div>`
    )
    .join("");
};

const loadFiles = async () => {
  try {
    const response = await fetch(`${apiBase}/files`);
    const files = await response.json();
    renderFiles(files);
  } catch (error) {
    console.error(error);
    showMessage(uploadMessage, "Unable to load uploaded files.", true);
  }
};

uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!fileInput.files.length) {
    showMessage(uploadMessage, "Please select a file before uploading.", true);
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  showMessage(uploadMessage, "Uploading…");

  try {
    const response = await fetch(`${apiBase}/upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Upload failed.");
    }

    showMessage(uploadMessage, data.message || "Upload successful.");
    fileInput.value = "";
    loadFiles();
  } catch (error) {
    console.error(error);
    showMessage(uploadMessage, error.message || "Upload failed.", true);
  }
});

processButton.addEventListener("click", async () => {
  processMessage.textContent = "Processing latest CSV file…";
  processResult.innerHTML = "";

  try {
    const response = await fetch(`${apiBase}/process`, {
      method: "POST"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Processing failed.");
    }

    showMessage(processMessage, "CSV processed successfully.");
    processResult.innerHTML = `<div class="item"><strong>Processed rows</strong><div>${data.processed.processedData.length} rows</div><strong>Metadata</strong><pre>${JSON.stringify(data.processed.metadata, null, 2)}</pre></div>`;
  } catch (error) {
    console.error(error);
    showMessage(processMessage, error.message || "Processing failed.", true);
  }
});

loadUsersButton.addEventListener("click", async () => {
  usersList.innerHTML = "<div class=\"item\">Loading users…</div>";

  try {
    const response = await fetch(`${apiBase}/users`);
    const users = await response.json();

    if (!response.ok) {
      throw new Error(users.message || "Unable to load users.");
    }

    if (!Array.isArray(users) || !users.length) {
      usersList.innerHTML = "<div class=\"item\">No users found.</div>";
      return;
    }

    usersList.innerHTML = users
      .map(
        (user) => `
        <div class="item">
          <strong>${user.name}</strong>
          <div>${user.email}</div>
          <div>${user.phone || ""}</div>
        </div>`
      )
      .join("");
  } catch (error) {
    console.error(error);
    usersList.innerHTML = `<div class="item">${error.message || "Unable to load users."}</div>`;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  loadFiles();
});
