document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("projects_container");
    const menu = document.getElementById("project_menu");
    const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
    })[char]);
    const textRow = (label, value) => `<p><span>${escapeHTML(label)}</span> ${escapeHTML(value)}</p>`;
    const renderProject = (project) => {
        const images = project.images.map((image) => `
                    <div class="${escapeHTML(image.className)}">
                        <img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt)}">
                    </div>`).join("");
        const roleInfo = project.roles?.length ? `
                <p>${project.roles.map((role) => `<span>${escapeHTML(role.label)}</span> ${escapeHTML(role.value)}${(role.extraLines || []).map((line) => `<br>${escapeHTML(line)}`).join("")}`).join("<br>\n                    ")}</p>
                <div class="project_role">
                    ${textRow("인원 :", project.members)}
                    ${textRow("작업 기간 :", project.period)}
                </div>` : `
                ${textRow("인원 :", project.members)}
                ${textRow("작업 기간 :", project.period)}`;
        const breakdown = project.aiBreakdown ? `<p>${escapeHTML(project.aiBreakdown)}</p>` : "";
        const skills = project.skillLines.map(escapeHTML).join("<br>\n                    ");
        const links = project.links.map((link) => {
            const external = link.target === "_blank" ? ' target="_blank" rel="noopener noreferrer"' : "";
            return `<p><span>${escapeHTML(link.label)}</span> <a href="${escapeHTML(link.url)}"${external}>VIEW ↗</a></p>`;
        }).join("\n                    ");
        return `<div id="${escapeHTML(project.id)}" class="page_section">
            <div class="project_wrap radius_20 padding_40">
                <div class="project_visual">${images}
                </div>
                    <div class="project_text">
                        <p${project.titleClass ? ` class="${escapeHTML(project.titleClass)}"` : ""}><span>프로젝트 명 :</span> ${escapeHTML(project.title)}</p>
                        ${project.sub_title ? `<p class="project_subtitle">${escapeHTML(project.sub_title)}</p>` : ""}
                        ${roleInfo}
                    <div class="ai_info">
                        ${textRow("AI 사용 여부 / 빈도 :", project.ai)}
                        ${breakdown}
                        <p><span>사용 스킬 :</span> ${skills}</p>
                    </div>
                    <div class="project_links">
                        ${links}
                    </div>
                </div>
            </div>
        </div>`;
    };
    try {
        const response = await fetch("./data/projects.json", { cache: "no-cache" });
        if (!response.ok) throw new Error(`JSON 응답 오류: ${response.status}`);
        const projects = await response.json();
        menu.innerHTML = projects.map((project, index) => `<li><a href="#${escapeHTML(project.id)}" class="menu_intro">${String(index + 1).padStart(2, "0")}. ${escapeHTML(project.menu)}</a></li>`).join("");
        container.innerHTML = projects.map(renderProject).join("\n");
        if (location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))) {
            document.getElementById(decodeURIComponent(location.hash.slice(1))).scrollIntoView();
        }
    } catch (error) {
        console.error("프로젝트 데이터를 불러오지 못했습니다.", error);
        container.textContent = "프로젝트 목록을 불러오지 못했습니다.";
    } finally {
        const script = document.createElement("script");
        script.src = "./js/index.js";
        document.body.appendChild(script);
    }
});
