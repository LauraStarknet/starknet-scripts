
async function fetchLeverJobs() {
    try {
        const response = await fetch('https://api.lever.co/v0/postings/starknet?mode=json');
        const jobs = await response.json();
        return jobs;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
}
function groupAndSortJobs(jobs) {
    const departments = {};
    jobs.forEach(job => {
        const department = job.categories.department || 'Unassigned Department';
        const team = job.categories.team || 'Unassigned Team';
        if (department === "Open Application") {
            return;
        }
        if (!departments[department]) {
            departments[department] = [];
        }
        departments[department].push({
            ...job,
            team: team,
        });
    });
    return departments;
}
function getIcon() {
    return '<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L43 1L43 43" stroke="#EAAEAE"/><path d="M1 43L43 1" stroke="#EAAEAE"/></svg>';
}
function displayJobsByDepartmentAndTeam(departments) {
    const container = document.getElementById('jobs-container');
    if (!container) {
        console.error("No jobs container found!");
        return;
    }
    const sortedDepartments = Object.keys(departments).sort();
    sortedDepartments.forEach(department => {
        const departmentSection = document.createElement('div');
        departmentSection.className = 'department-section';
        const sortedJobs = departments[department].sort((a, b) => a.team.localeCompare(b.team));
        sortedJobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.className = 'job-posting';
            const linkBlock = document.createElement('a');
            linkBlock.setAttribute('href', job.hostedUrl);
            linkBlock.setAttribute('target', '_blank');
            linkBlock.className = 'job-posting-wrapper';
            const location = job.categories.location || '';
            const commitment = job.categories.commitment || '';
            const team = job.categories.team || '';
            let details = [];
            if (team) {
                details.push(team);
            }
            if (location) {
                details.push(location);
            }
            if (commitment) {
                details.push(commitment);
            }
            // Wrap the detailsString in an <h2> element with the specified classes
            let newDetailsString = `<h2 class="eyebrow is--pink global"><span>(</span>`;
            details.forEach((det) => { newDetailsString += `<span class="text-anim" letters-fade-in-random="" text-split="">${det.replace('employee', '')}</span>`});
            newDetailsString += '<span>)</span></h2>'
            
            const detailsString = details.length > 0 ? newDetailsString : '';
            linkBlock.innerHTML = `
                    <h6 class="job-title">${job.text}</h6>
                    <span class="job-details">${detailsString}</span>
                    <span class="job-icon">${getIcon()}</span>
                `;
            jobElement.appendChild(linkBlock);
            departmentSection.appendChild(jobElement);
        });
        container.appendChild(departmentSection);
    });
}
(async function () {
    const jobs = await fetchLeverJobs();
    if (jobs) {
        const departments = groupAndSortJobs(jobs);
        displayJobsByDepartmentAndTeam(departments);
    } else {
        console.error("No jobs were fetched.");
    }
})();