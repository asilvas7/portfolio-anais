const themeSwitch = document.querySelector("#themeSwitch");
const body = document.body;
const navLinks = document.querySelectorAll(".nav-link");
const internalLinks = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll("section[id]");

// El diseño abre en modo claro, igual que la referencia.
const savedTheme = localStorage.getItem("portfolio-theme");
const useLightTheme = savedTheme !== "dark";

body.classList.toggle("light-theme", useLightTheme);
themeSwitch?.setAttribute("aria-pressed", String(useLightTheme));

// Cambio de tema conservando la preferencia.
themeSwitch?.addEventListener("click", () => {
    const lightThemeIsActive = body.classList.toggle("light-theme");
    themeSwitch.setAttribute("aria-pressed", String(lightThemeIsActive));
    localStorage.setItem("portfolio-theme", lightThemeIsActive ? "light" : "dark");
});

// Navegación suave para enlaces internos.
internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// Actualiza automáticamente el enlace activo al desplazarse.
const observer = new IntersectionObserver(
    (entries) => {
        const visibleEntry = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${visibleEntry.target.id}`
            );
        });
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));
