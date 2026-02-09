function updatePreview() {
    const fields = {
        'deptIn': 'deptOut', 'uniIn': 'uniOut', 'courseTitleIn': 'courseTitleOut',
        'expNoIn': 'expNoOutTop', 'expNameIn': 'expNameOut', 'stuNameIn': 'stuNameOut',
        'stuIdIn': 'stuIdOut', 'semIn': 'semOut', 'secIn': 'secOut', 'codeIn': 'codeOut',
        't1Name': 't1NameOut', 't2Name': 't2NameOut'
    };

    for (let key in fields) {
        const val = document.getElementById(key).value;
        document.getElementById(fields[key]).innerText = val;
    }
    // Update the second exp no inside table
    document.getElementById('expNoOutTable').innerText = document.getElementById('expNoIn').value;
}

function saveLogo(input, imgId) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById(imgId).src = e.target.result;
            localStorage.setItem(imgId, e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

window.onload = () => {
    ['leftLogoImg', 'rightLogoImg'].forEach(id => {
        const data = localStorage.getItem(id);
        if (data) document.getElementById(id).src = data;
    });
    updatePreview();
};

function downloadPDF() {
    const element = document.getElementById('cover-page');
    const opt = {
        margin: 0,
        filename: 'Lab_Report_Cover.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: 'avoid-all' }
    };

    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
        // Double check to ensure only 1 page remains
        const pageCount = pdf.internal.getNumberOfPages();
        if (pageCount > 1) {
            for (let i = pageCount; i > 1; i--) {
                pdf.deletePage(i);
            }
        }
    }).save();
}
