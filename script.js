function updatePreview() {
    const fields = {
        'deptIn': 'deptOut', 'uniIn': 'uniOut', 'courseTitleIn': 'courseTitleOut',
        'expNoIn': 'expNoOutTop', 'expNameIn': 'expNameOut', 'stuNameIn': 'stuNameOut',
        'stuIdIn': 'stuIdOut', 'semIn': 'semOut', 'secIn': 'secOut', 'codeIn': 'codeOut',
        't1Name': 't1NameOut', 't2Name': 't2NameOut'
    };

    for (let key in fields) {
        const input = document.getElementById(key);
        const output = document.getElementById(fields[key]);
        if (input && output) output.innerText = input.value;
    }
    document.getElementById('expNoOutTable').innerText = document.getElementById('expNoIn').value;
}

window.onload = () => {
    updatePreview();
};

function downloadPDF() {
    const element = document.getElementById('cover-page');
    const opt = {
        margin: 0,
        filename: 'Varendra_University_Report.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: 'avoid-all' }
    };

    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
        const pageCount = pdf.internal.getNumberOfPages();
        if (pageCount > 1) {
            for (let i = pageCount; i > 1; i--) {
                pdf.deletePage(i);
            }
        }
    }).save();
}
