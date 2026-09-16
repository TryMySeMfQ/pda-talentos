const grid = document.getElementById("students-grid");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search-input");
const areaFilter = document.getElementById("area-filter");
const modal = document.getElementById("contact-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

let students = [];

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function renderStudents(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  for (const student of list) {
    const card = document.createElement("article");
    card.className = "student-card";

    const badgeClass = student.disponibilidade === "Disponível" ? "badge disponivel" : "badge";

    card.innerHTML = `
      <img src="${escapeHtml(student.foto)}" alt="Foto de ${escapeHtml(student.nome)}" />
      <h3>${escapeHtml(student.nome)}</h3>
      <div class="student-meta">${escapeHtml(student.area)} · ${escapeHtml(student.cidade)}</div>
      <span class="${badgeClass}">${escapeHtml(student.disponibilidade)}</span>
      <div class="stack-tags">
        ${student.stack.map((tech) => `<span>${escapeHtml(tech)}</span>`).join("")}
      </div>
      <p class="result-highlight">${escapeHtml(student.resultadoConcreto)}</p>
      <button class="btn btn-primary" data-id="${student.id}">Entrar em contato</button>
    `;

    card.querySelector("button").addEventListener("click", () => openContactModal(student));
    grid.appendChild(card);
  }
}

function openContactModal(student) {
  const whatsappMessage = encodeURIComponent(
    `Olá, ${student.nome}! Vi seu perfil na plataforma de talentos da PdA e tenho um projeto freelancer que pode ser do seu interesse.`
  );

  modalBody.innerHTML = `
    <h3>${escapeHtml(student.nome)}</h3>
    <p>${escapeHtml(student.bio)}</p>
    <div class="modal-actions">
      <a class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer"
         href="https://wa.me/${encodeURIComponent(student.whatsapp)}?text=${whatsappMessage}">
        Chamar no WhatsApp
      </a>
      <a class="btn btn-primary" href="mailto:${encodeURIComponent(student.email)}">
        Enviar e-mail
      </a>
    </div>
  `;

  modal.hidden = false;
}

function applyFilters() {
  const term = searchInput.value.trim().toLowerCase();
  const area = areaFilter.value;

  const filtered = students.filter((student) => {
    const matchesArea = !area || student.area === area;
    const matchesTerm =
      !term ||
      student.nome.toLowerCase().includes(term) ||
      student.stack.some((tech) => tech.toLowerCase().includes(term));
    return matchesArea && matchesTerm;
  });

  renderStudents(filtered);
}

modalClose.addEventListener("click", () => {
  modal.hidden = true;
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.hidden = true;
  }
});

searchInput.addEventListener("input", applyFilters);
areaFilter.addEventListener("change", applyFilters);

fetch("data/students.json")
  .then((response) => response.json())
  .then((data) => {
    students = data;
    renderStudents(students);
  })
  .catch((error) => {
    console.error("Erro ao carregar os talentos:", error);
    emptyState.textContent = "Não foi possível carregar os talentos agora.";
    emptyState.hidden = false;
  });
