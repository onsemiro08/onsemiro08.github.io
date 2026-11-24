
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("projects_container");
    const menu = document.getElementById("project_menu");

    const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
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
                    <h3 class="project_title_name">${escapeHTML(project.title)}</h3>
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

    const studies = [
        {
            type: "Visual Study",
            title: "Personal Portfolio",
            category: "Typography / Editorial Layout",
            description: "산세리프 중심의 기존 화면에서 느낀 단조로움을 개선하기 위해 명조체, 비대칭 여백, 타이포그래피 위계를 탐색하고 포트폴리오의 시각적 표현을 다듬었습니다.",
            image: "./img/portfolio_study_02.jpg",
            alt: "개인 포트폴리오 디자인 개선 후 화면",
            link: "https://app.notion.com/p/42206f4560de8196b2a9daaff6b45dfe",
            linkLabel: "View Design Process"
        },
        {
            type: "Development Study",
            title: "Hospital CMS",
            category: "PHP / MySQL / Gnuboard5",
            description: "기존 HTML 병원 홈페이지에 그누보드5를 적용해 공지사항을 관리자 화면에서 관리할 수 있도록 구현했습니다. 낯선 기술을 학습하고 게시판 연동과 서버 배포 과정에서 발생한 오류를 해결한 과정을 정리했습니다.",
            image: "./img/portfolio_study_01.jpg",
            alt: "선수촌병원 게시판 CMS 연동 화면",
            link: "https://app.notion.com/p/41506f4560de81439742d468bea0f03a",
            linkLabel: "View Case Study"
        }
    ];

    const renderStudy = (study, index) => `
        <details class="mini_study" name="mini_studies" ${index === 0 ? "open" : ""}>
            <summary class="mini_study_summary">
                <span class="mini_study_number">${String(index + 1).padStart(2, "0")} / ${escapeHTML(study.type)}</span>
                <span class="mini_study_title">${escapeHTML(study.title)}</span>
                <span class="mini_study_symbol" aria-hidden="true"></span>
            </summary>
            <div class="mini_study_content">
                <div class="mini_study_visual">
                    <img src="${escapeHTML(study.image)}" alt="${escapeHTML(study.alt)}">
                </div>
                <div class="mini_study_text">
                    <p class="mini_study_category">${escapeHTML(study.category)}</p>
                    <p class="mini_project_description">${escapeHTML(study.description)}</p>
                    <a class="mini_study_footer" href="${escapeHTML(study.link)}" target="_blank" rel="noopener noreferrer">
                        ${escapeHTML(study.linkLabel)} ↗
                    </a>
                </div>
            </div>
        </details>`;

    try {
        const response = await fetch("./data/projects.json", { cache: "no-cache" });
        if (!response.ok) throw new Error(`JSON 응답 오류: ${response.status}`);

        const projects = await response.json();

        const order = [
            "project_bingrae",
            "project_hospital",
            "project_tissot",
            "project_jeep",
            "project_innisfree"
        ];

        const orderedProjects = order
            .map((id) => projects.find((project) => project.id === id))
            .filter(Boolean);

        const selectedProjects = orderedProjects.slice(0, 2);
        const otherProjects = orderedProjects.slice(2);

        const menuItem = (project, number) => `
            <li>
                <a href="#${escapeHTML(project.id)}" class="menu_intro">
                    ${String(number).padStart(2, "0")}. ${escapeHTML(project.menu)}
                </a>
            </li>`;

        menu.innerHTML = selectedProjects
            .map((project, index) => menuItem(project, index + 1))
            .join("") +
            '<li><a href="#mini_projects" class="menu_intro">03. Mini Projects</a></li>';

        document.getElementById("other_project_menu").innerHTML = otherProjects
            .map((project, index) => menuItem(project, index + 4))
            .join("");

        const miniSection = `<section id="mini_projects" class="page_section">
            <div class="mini_project_wrap radius_20 padding_40">
                <div class="mini_project_header">
                    <h3>Mini Projects</h3>
                    <span>Design / Development Studies</span>
                </div>
                <div class="mini_study_list">
                    ${studies.map(renderStudy).join("")}
                </div>
            </div>
        </section>`;

        container.innerHTML =
            selectedProjects.map(renderProject).join("\n") +
            miniSection +
            otherProjects.map(renderProject).join("\n");

        if (location.hash) {
            const targetId = decodeURIComponent(location.hash.slice(1));
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView();
            }
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
