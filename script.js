// Sidebar Toggle with Icon Sync
function toggleSidebar() {
    const layout = document.getElementById('layout');
    const btn = document.querySelector('.toggle-btn');
    layout.classList.toggle('sidebar-hidden');
    btn.innerHTML = layout.classList.contains('sidebar-hidden') ? '▶' : '☰';
}

// Live Preview with Separate Report/Exp Nos
function updatePreview() {
    const fields = {
        'deptIn': 'deptOut', 'uniIn': 'uniOut', 'courseTitleIn': 'courseTitleOut',
        'reportNoIn': 'reportNoOutTop', // Head Lab Report No
        'expNoIn': 'expNoOutTable',    // Table Experiment No
        'expNameIn': 'expNameOut', 'stuNameIn': 'stuNameOut',
        'stuIdIn': 'stuIdOut', 'semIn': 'semOut', 'secIn': 'secOut', 'codeIn': 'codeOut',
        't1Name': 't1NameOut', 't2Name': 't2NameOut'
    };

    for (let key in fields) {
        const input = document.getElementById(key);
        const output = document.getElementById(fields[key]);
        if (input && output) {
            output.innerText = input.value || (input.placeholder.includes(':') ? input.placeholder.split(':')[1].trim() : input.placeholder);
        }
    }
}

window.onload = () => { updatePreview(); };

// PDF Download with Format Lock
function downloadPDF() {
    const element = document.getElementById('cover-page');
    
    // Scale reset for high-quality capture
    const originalTransform = element.style.transform;
    element.style.transform = "scale(1)";

    const opt = {
        margin: 0,
        filename: 'VU_Cover_Page.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
        element.style.transform = originalTransform;
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = totalPages; i > 1; i--) {
            pdf.deletePage(i);
        }
    }).save();
}
