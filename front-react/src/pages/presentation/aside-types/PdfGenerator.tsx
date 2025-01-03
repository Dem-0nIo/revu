/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prefer-template */
/* eslint-disable one-var */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { format } from 'date-fns';

export const PdfGenerator = (listaCompras: any[]) => {

    const vendorData = {
        vendorName: "Federico García Lorca",
        vendorAddress: "14-203, Cali, Valle",
        vendorPinCode: "450006",
        contactPerson: "Santiago Ramón",
        contactPersonMobNo: "301-5455667",
    }

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // console.log(pdf.getFontList());
    // Set document properties
    pdf.setProperties({
        title: "Solicitud de Cotización",
    })

    // Add images and text to the PDF
    const imageUrlP = require('../../../assets/img/wanna/LOGO-03.png');
    pdf.addImage(imageUrlP, 'JPEG', 10, 5, 20, 20);

    pdf.setFontSize(10);
    pdf.setFont('times', 'bold');
    pdf.text('COTIZACIÓN', 150, 12);

    // Line width in units (you can adjust this)
    pdf.setLineWidth(0.1);

    // Line color (RGB)
    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, 18, 200, 18)
    pdf.text('Contacto', 13, 23)
    pdf.setFont('times', 'normal');
    pdf.text("Revu, lo soñamos lo vivimos", 13, 28)
    pdf.text("Número de Telfóno", 16, 32)
    pdf.setFont('times', 'bold')
    pdf.text('RQ No      :', 130, 23)
    pdf.text('RQ Fecha   :', 130, 27)
    pdf.text('Fecha Vence    :', 130, 31)
    pdf.setFont('times', 'normal')
    pdf.text("RQ00001", 155, 23)
    pdf.text(format(new Date(), 'MMM dd, yyyy'), 155, 27)
    pdf.text(format(new Date("2024-02-08 00:00:00.000 +0530"), 'MMM dd, yyyy'), 155, 31)
    pdf.line(10, 34, 200, 34)
    pdf.setFont('times', 'bold')
    pdf.text('Para', 13, 39)
    pdf.setFont('times', 'bold')
    pdf.text('Dirección :', 130, 39)
    pdf.setFont('times', 'normal')
    pdf.text('Acá la dirección', 130, 44)
    pdf.text('Calle 1, #34-12', 130, 48)

    // Generate the vendor-specific content
    pdf.setFont('times', 'bold');
    pdf.text(`${vendorData?.vendorName}`, 13, 44);
    pdf.text(`${vendorData?.vendorAddress}`, 13, 48)
    pdf.setFont('times', 'normal');
    pdf.text(`Codigo Postal : ${vendorData?.vendorPinCode}`, 13, 52);
    pdf.setFont('custom', 'bold')
    pdf.text('Persona de contacto', 13, 56)
    pdf.setFont('times', 'normal')
    pdf.text(`${vendorData?.contactPerson}`, 13, 60);
    pdf.text(`  ${vendorData?.contactPersonMobNo || "N/A"}`, 16, 64);
    pdf.setFont('times', 'bold')
    pdf.text('Estimad@,', 13, 72)
    pdf.setFont('times', 'normal')
    pdf.text('Le enviamos la oferta más competitiva, Términos y condiciones antes de la fecha de vencimiento.', 13, 79)
    pdf.setFont('times', 'normal')
    pdf.setFontSize(10);
    
   // Generate AutoTable for item details
    const itemDetailsRows = listaCompras?.map((item, index) => [
        (index + 1).toString(),
        item.firstName.toString(),
        item.displayName.toString(),
        item.socialInstagram?.toString(),
        item.socialInstagramCla?.toString(),
        item.socialInstagramSeg?.toString(),
        item.costo_1?.toString(),
    ]);
    const itemDetailsHeaders = ['No', 'Nombre', 'NikName', 'Intagram', 'Clasificación', 'Seguidores', 'Precio'];
    const columnWidths = [10, 30, 30, 30, 30, 30, 30]; // Adjust column widths as needed

    pdf.setFont('times');
    const itemDetailsYStart = 88;

    autoTable(pdf,{
        head: [itemDetailsHeaders],
        body: itemDetailsRows,
        // didDrawCell: (itemDetailsRows) => {
        //     if (itemDetailsRows.section === 'body' && itemDetailsRows.column.index === 1) {
        //         const base64Img = 'data:image/png;base64' + itemDetailsRows.cell.raw;
        //         pdf.addImage(base64Img, 'PNG', itemDetailsRows.cell.x + 2, itemDetailsRows.cell.y + 2, 5, 5);
        //     }
        // },
        startY: itemDetailsYStart, // Adjust the Y position as needed
        headStyles: {
            fontSize: 10, // Adjust the font size as needed
            font: 'times', // Set the font family
            halign: 'left',
        },
        columnStyles: {
            0: { cellWidth: columnWidths[0] }, // Adjust column widths as needed
            1: { cellWidth: columnWidths[1] },
            2: { cellWidth: columnWidths[2] },
            3: { cellWidth: columnWidths[3] },
            4: { cellWidth: columnWidths[4] },
            5: { cellWidth: columnWidths[5] },
            6: { cellWidth: columnWidths[6] },
        },
        alternateRowStyles: { fillColor: [255, 255, 255] },
        bodyStyles: {
            fontSize: 10, // Adjust the font size for the body
            font: 'times', // Set the font family for the body
            cellPadding: { top: 1, right: 5, bottom: 1, left: 2 }, // Adjust cell padding
            textColor: [0, 0, 0], // Set text color for the body
        },
        margin: { top: 10, left: 13 },
    }); // Provide the missing 'options' argument

    // Add summary and page numbers
    const summaryYStart = pdf.internal.pageSize.getHeight() - 50;

    // Calculate the total cost
    const totalCost = listaCompras.reduce((total, item) => total + (item.costo_1 || 0), 0);

    // Add the total cost to the PDF
    pdf.setFont('times', 'bold');
    pdf.text(`Costo Total: $${totalCost.toFixed(2)}`, 13, summaryYStart + 12);

    pdf.setFont('times', 'normal')
    pdf.text('Gracias,', 13, summaryYStart + 20)
    pdf.text('Atentamente,', 13, summaryYStart + 24)
    pdf.text('Para ', 13, summaryYStart + 28)
    pdf.setFont('times', 'bold')
    pdf.text(' Persona de cotización', 19, summaryYStart + 28)

    const totalPages = pdf.internal.pages.length;
    for (let i = 1; i <= totalPages; i++) {
        pdf.line(10, 283, 200, 283)
        pdf.setPage(i);
        pdf.setFont('times');
        pdf.text(
            `Page ${i} of ${totalPages}`,
            185,
            pdf.internal.pageSize.getHeight() - 5
        );
    }

    // Save the PDF 
    pdf.save('Cotizacion.pdf');

    // // pdf open in a new tab
    // const pdfDataUri = pdf.output('datauristring');
    // const newTab = window.open();
    // newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
}

export default PdfGenerator