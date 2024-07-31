import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import 'jspdf-autotable';

const IndexMasterDataKPMPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [MasterDataKPM, setMasterDataKPM] = useState([]);

    const generateQRCode = async (text) => {
        try {
            const canvas = await QRCode.toCanvas(text);
            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error('Error generating QR code:', error);
            return '';
        }
    };

    const generatePDF = async () => {
        const doc = new jsPDF();
        let xLeft = 13;
        let y = 10;
        let halaman = 1;
        let halamanbaru = true;
        let total_halaman = Math.ceil(MasterDataKPM.length / 28);
        doc.setFontSize(8);

        // Awal Dokumen BAST PBP
        let imageUrlKiri = `${process.env.PUBLIC_URL}/assets/img/logos/bulog.png`;
        doc.addImage(imageUrlKiri, 'PNG', 10, 10, 40, 13);
        let imageUrlKanan = `${process.env.PUBLIC_URL}/assets/img/logos/logosmall.png`;
        doc.addImage(imageUrlKanan, 'PNG', 160, 10, 40, 12, 'myImageAlias', 'MEDIUM', 90);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        let title1 = 'BERITA ACARA SERAH TERIMA (BAST)';
        let title2 = 'PENERIMA BANTUAN PAGAN (PBP) - JULI 2024';
        let title3 = 'NOMOR DTT DISINI';
        doc.text(title1, 105, 13, { align: 'center' });
        doc.text(title2, 105, 18, { align: 'center' });
        doc.text(title3, 105, 23, { align: 'center' });
        doc.rect(10, 30, 35, 10);
        doc.rect(45, 30, 60, 10);
        doc.rect(105, 30, 35, 10);
        doc.rect(140, 30, 60, 10);
        doc.rect(10, 40, 35, 10);
        doc.rect(45, 40, 60, 10);
        doc.rect(105, 40, 35, 10);
        doc.rect(140, 40, 60, 10);
        doc.rect(10, 50, 35, 10);
        doc.rect(45, 50, 60, 10);
        doc.rect(105, 50, 35, 10);
        doc.rect(140, 50, 60, 10);
        doc.setFont('helvetica', 'normal');
        doc.text("Provinsi", 12, 36);
        doc.text("Kabupaten/Kota", 12, 46);
        doc.text("Kecamatan", 12, 56);
        doc.text("JAWA BARAT", 47, 36);
        doc.text("KUNINGAN", 47, 46);
        doc.text("KUNINGAN", 47, 56);
        doc.text("Kelurahan/Desa", 107, 36);
        doc.text("Jumlah KPM", 107, 46);
        doc.text("Total Paket", 107, 56);
        doc.text("KUNINGAN", 142, 36);
        doc.text("10 KPM", 142, 46);
        doc.text("10 Paket", 142, 56);
        doc.rect(10, 65, 190, 10);
        doc.text("Beras Bantuan Pangan diterima dan disalurkan kepada KPM dibantu oleh pejabat setempat dan Pendamping PBP", 12, 71);
        doc.rect(10, 80, 190, 10);
        doc.text("* Nama Jelas TTD dan Stampel Jika Ada", 12, 86);
        doc.text("KUNINGAN, ", 150, 86);
        doc.rect(10, 90, 95, 50);
        doc.rect(105, 90, 95, 50);
        doc.text("Aparat Setempat", 57, 96, { align: 'center' });
        doc.text("Delapan Delapan Logistics", 150, 96, { align: 'center' });
        doc.text("*", 12, 140, { align: 'center' });
        doc.text("*", 107, 140, { align: 'center' });
        doc.rect(10, 150, 10, 10);
        doc.rect(20, 150, 70, 10);
        doc.rect(90, 150, 75, 10);
        doc.rect(165, 150, 35, 10);
        doc.text("No", 12, 156);
        doc.text("Nama Pendamping", 22, 156);
        doc.text("Nomor Telpon Pendamping", 92, 156);
        doc.text("TTD Pendamping", 167, 156);
        const qrImageDataBASTDTT = await generateQRCode("NOMOR DTT DISINI");
        doc.addImage(qrImageDataBASTDTT, 'PNG', 5, 277, 15, 15);
        doc.addPage();
        // Akhir Dokumen BAST

        // Aawal Dokumen DTT
        for (let i = 0; i < MasterDataKPM.length; i++) {
            if (halamanbaru == true) {
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.rect(10, 50, 55, 10);
                doc.rect(65, 50, 20, 10);
                doc.rect(85, 50, 20, 10);
                doc.text("DATA KPM", 13, 56);
                doc.text("QR CODE", 68.5, 56);
                doc.text("TTD", 87, 56);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.rect(105, 50, 55, 10);
                doc.rect(160, 50, 20, 10);
                doc.rect(180, 50, 20, 10);
                doc.text("DATA KPM", 108, 56);
                doc.text("QR CODE", 163.5, 56);
                doc.text("TTD", 182, 56);
                halamanbaru = false;
                i--;
                y = 60.2;
            } else {
                if (i % 2 == 0) {
                    const masterdatakpm = MasterDataKPM[i];
                    const qrText = `${masterdatakpm.id}`;
                    const qrImageData = await generateQRCode(qrText);
                    doc.rect(10, y, 55, 15);
                    doc.rect(65, y, 20, 15);
                    doc.rect(85, y, 20, 15);
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text(masterdatakpm.nama_kpm, xLeft, y + 5);
                    doc.setFont('helvetica', 'normal');
                    doc.text("88-1-3208102001-1", xLeft, y + 10);
                    doc.text(`${i + 1}`, 88.5, y + 5);
                    if (qrImageData) {
                        doc.addImage(qrImageData, 'PNG', 68.5, y + 1, 13, 13);
                    } else {
                        console.error('Gagal menghasilkan data gambar QR code untuk:', masterdatakpm.nama_kpm);
                    }
                } else {
                    const masterdatakpm = MasterDataKPM[i];
                    const qrText = `${masterdatakpm.id}`;
                    const qrImageData = await generateQRCode(qrText);
                    doc.rect(105, y, 55, 15);
                    doc.rect(160, y, 20, 15);
                    doc.rect(180, y, 20, 15);
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text(masterdatakpm.nama_kpm, 108, y + 5);
                    doc.setFont('helvetica', 'normal');
                    doc.text("88-1-3208102001-1", 108, y + 10);
                    doc.text(`${i + 1}`, 182, y + 5);
                    if (qrImageData) {
                        doc.addImage(qrImageData, 'PNG', 163.5, y + 1, 13, 13);
                    } else {
                        console.error('Gagal menghasilkan data gambar QR code untuk:', masterdatakpm.nama_kpm);
                    }
                    y += 15;
                }
            }
            if (y > 270) {
                doc.addPage();
                halamanbaru = true;
                y = 10;
                halaman++;
            }

            const imageUrlKiri = `${process.env.PUBLIC_URL}/assets/img/logos/bulog.png`;
            doc.addImage(imageUrlKiri, 'PNG', 10, 10, 40, 13);
            const imageUrlKanan = `${process.env.PUBLIC_URL}/assets/img/logos/logosmall.png`;
            doc.addImage(imageUrlKanan, 'PNG', 160, 10, 40, 12);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const title1 = 'DATA TANDA TERIMA (DTT)';
            const title2 = 'PENERIMA BANTUAN PAGAN (PBP) - JULI 2024';
            const title3 = 'NOMOR DTT DISINI';
            doc.text(title1, 105, 13, { align: 'center' });
            doc.text(title2, 105, 18, { align: 'center' });
            doc.text(title3, 105, 23, { align: 'center' });
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            const provinsi_1 = 'PROVINSI';
            const kabupaten_kota_1 = 'KABUPATEN/KOTA';
            const kecamatan_1 = 'KECAMATAN';
            const kelurahan_desa_1 = 'DESA/KELURAHAN';
            const provinsi_2 = ': JAWA BARAT';
            const kabupaten_kota_2 = ': KUNINAGN';
            const kecamatan_2 = ': KUNINGAN';
            const kelurahan_desa_2 = ': KUNINGAN';
            const kantor_serah_1 = 'TEMPAT SERAH';
            const tanggal_serah_1 = 'TANGGAL SERAH';
            const jumlah_kpm_1 = 'JUMLAH KPM';
            const halaman_1 = 'HALAMAN';
            const kantor_serah_2 = ': KANTOR DESA KUNINGAN';
            const tanggal_serah_2 = ': 01/06/2024';
            const jumlah_kpm_2 = ': 240';
            const halaman_2 = ': ' + halaman + ' DARI ' + total_halaman + ' HALAMAN';
            doc.text(provinsi_1, 10, 32);
            doc.text(kabupaten_kota_1, 10, 36);
            doc.text(kecamatan_1, 10, 40);
            doc.text(kelurahan_desa_1, 10, 44);
            doc.text(provinsi_2, 40, 32);
            doc.text(kabupaten_kota_2, 40, 36);
            doc.text(kecamatan_2, 40, 40);
            doc.text(kelurahan_desa_2, 40, 44);
            doc.text(kantor_serah_1, 105, 32);
            doc.text(tanggal_serah_1, 105, 36);
            doc.text(jumlah_kpm_1, 105, 40);
            doc.text(halaman_1, 105, 44);
            doc.text(kantor_serah_2, 135, 32);
            doc.text(tanggal_serah_2, 135, 36);
            doc.text(jumlah_kpm_2, 135, 40);
            doc.text(halaman_2, 135, 44);
            // Akhir Dokumen DTT
        }

        // Awal Dokumen BAST PBP Perwakilan
        doc.addPage();
        imageUrlKiri = `${process.env.PUBLIC_URL}/assets/img/logos/bulog.png`;
        doc.addImage(imageUrlKiri, 'PNG', 10, 10, 40, 13);
        imageUrlKanan = `${process.env.PUBLIC_URL}/assets/img/logos/logosmall.png`;
        doc.addImage(imageUrlKanan, 'PNG', 160, 10, 40, 12);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        title1 = 'BERITA ACARA SERAH TERIMA (BAST)';
        title2 = 'PENERIMA BANTUAN PAGAN (PBP) PERWAKILAN - JULI 2024';
        title3 = 'NOMOR DTT DISINI';
        doc.text(title1, 105, 13, { align: 'center' });
        doc.text(title2, 105, 18, { align: 'center' });
        doc.text(title3, 105, 23, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.text("Provinsi", 10, 36);
        doc.text("Kabupaten/Kota", 10, 41);
        doc.text("Kecamatan", 10, 46);
        doc.text("Kelurahan/Desa", 10, 51);
        doc.text(": JAWA BARAT", 47, 36);
        doc.text(": KUNINGAN", 47, 41);
        doc.text(": KUNINGAN", 47, 46);
        doc.text(": KUNINGAN", 47, 51);
        doc.text("Kami yang bertanda tangan dibawah ini adalah sebagai perwakilan KPM yang ditunjuk oleh aparat setempat menyatakan", 10, 61);
        doc.text("dengan sebenar-benarnya bahwa kami telah menerima paket beras sejumlah 10 Kg dengan kondisi dan kualitas baik.", 10, 66);
        doc.rect(10, 76, 10, 20);
        doc.text("No", 12, 87);
        doc.rect(20, 76, 35, 20);
        doc.text("Nama KPM", 37, 84.5, { align: 'center' });
        doc.text("Berhalangan Hadir", 37, 89.5, { align: 'center' });
        doc.rect(55, 76, 70, 10);
        doc.text("Perwakilan KPM", 89, 83, { align: 'center' });
        doc.rect(55, 86, 35, 10);
        doc.text("Nama Lengkap", 72, 92, { align: 'center' });
        doc.rect(90, 86, 35, 10);
        doc.text("Nomor Telpon", 106, 92, { align: 'center' });
        doc.rect(125, 76, 40, 20);
        doc.text("Sebab Diwakilkan", 131, 87);
        doc.rect(165, 76, 35, 20);
        doc.text("Tanda Tangan", 182, 84.5, { align: 'center' });
        doc.text("Perwaikan KPM", 182, 89.5, { align: 'center' });
        doc.rect(10, 96, 10, 15);
        doc.rect(20, 96, 35, 15);
        doc.rect(55, 96, 35, 15);
        doc.rect(90, 96, 35, 15);
        doc.rect(125, 96, 40, 15);
        doc.rect(165, 96, 35, 15);
        doc.rect(10, 111, 10, 15);
        doc.rect(20, 111, 35, 15);
        doc.rect(55, 111, 35, 15);
        doc.rect(90, 111, 35, 15);
        doc.rect(125, 111, 40, 15);
        doc.rect(165, 111, 35, 15);
        doc.rect(10, 126, 10, 15);
        doc.rect(20, 126, 35, 15);
        doc.rect(55, 126, 35, 15);
        doc.rect(90, 126, 35, 15);
        doc.rect(125, 126, 40, 15);
        doc.rect(165, 126, 35, 15);
        doc.rect(10, 141, 10, 15);
        doc.rect(20, 141, 35, 15);
        doc.rect(55, 141, 35, 15);
        doc.rect(90, 141, 35, 15);
        doc.rect(125, 141, 40, 15);
        doc.rect(165, 141, 35, 15);
        doc.rect(10, 156, 10, 15);
        doc.rect(20, 156, 35, 15);
        doc.rect(55, 156, 35, 15);
        doc.rect(90, 156, 35, 15);
        doc.rect(125, 156, 40, 15);
        doc.rect(165, 156, 35, 15);
        doc.rect(10, 180, 155, 10);
        doc.rect(165, 180, 35, 10);
        doc.rect(10, 210, 190, 10);
        doc.text("Jumlah", 12, 186);
        doc.text("Demikian Berita Acara ini dibuat dengan sebenar-benarnya untuk dapat digunakan sebagaimana mestinya.", 10, 200);
        doc.text("* Nama Jelas TTD dan Stampel Jika Ada", 12, 216);
        doc.text("KUNINGAN, ", 150, 216);
        doc.rect(10, 220, 95, 50);
        doc.rect(105, 220, 95, 50);
        doc.text("Aparat Setempat", 57, 226, { align: 'center' });
        doc.text("Delapan Delapan Logistics", 150, 226, { align: 'center' });
        doc.text("*", 12, 270, { align: 'center' });
        doc.text("*", 107, 270, { align: 'center' });
        let qrImageData = await generateQRCode("NOMOR DTT DISINI");
        doc.addImage(qrImageData, 'PNG', 5, 277, 15, 15);
        // Akhir Dokumen BAST Perwakilan

        // Awal Dokumen BAST PBP Penggantain
        doc.addPage();
        imageUrlKiri = `${process.env.PUBLIC_URL}/assets/img/logos/bulog.png`;
        doc.addImage(imageUrlKiri, 'PNG', 10, 10, 40, 13);
        imageUrlKanan = `${process.env.PUBLIC_URL}/assets/img/logos/logosmall.png`;
        doc.addImage(imageUrlKanan, 'PNG', 160, 10, 40, 12);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        title1 = 'BERITA ACARA SERAH TERIMA (BAST)';
        title2 = 'PENERIMA BANTUAN PAGAN (PBP) PENGGANTI - JULI 2024';
        title3 = 'NOMOR DTT DISINI';
        doc.text(title1, 105, 13, { align: 'center' });
        doc.text(title2, 105, 18, { align: 'center' });
        doc.text(title3, 105, 23, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.text("Provinsi", 10, 36);
        doc.text("Kabupaten/Kota", 10, 41);
        doc.text("Kecamatan", 10, 46);
        doc.text("Kelurahan/Desa", 10, 51);
        doc.text(": JAWA BARAT", 47, 36);
        doc.text(": KUNINGAN", 47, 41);
        doc.text(": KUNINGAN", 47, 46);
        doc.text(": KUNINGAN", 47, 51);
        doc.text("Kami yang bertanda tangan dibawah ini adalah sebagai KPM Pengganti yang ditunjuk oleh aparat setempat menyatakan", 10, 61);
        doc.text("dengan sebenar-benarnya bahwa kami telah menerima paket beras sejumlah 10 Kg dengan kondisi dan kualitas baik.", 10, 66);
        doc.rect(10, 76, 10, 20);
        doc.text("No", 12, 87);
        doc.rect(20, 76, 35, 20);
        doc.text("Nama KPM", 37, 84.5, { align: 'center' });
        doc.text("Tidak Ditemukan", 37, 89.5, { align: 'center' });
        doc.rect(55, 76, 70, 10);
        doc.text("KPM Pengganti", 89, 83, { align: 'center' });
        doc.rect(55, 86, 35, 10);
        doc.text("Nama Lengkap", 72, 92, { align: 'center' });
        doc.rect(90, 86, 35, 10);
        doc.text("Nomor Telpon", 106, 92, { align: 'center' });
        doc.rect(125, 76, 40, 20);
        doc.text("Sebab Penggantian", 131, 87);
        doc.rect(165, 76, 35, 20);
        doc.text("Tanda Tangan", 182, 84.5, { align: 'center' });
        doc.text("KPM Pengganti", 182, 89.5, { align: 'center' });
        doc.rect(10, 96, 10, 15);
        doc.rect(20, 96, 35, 15);
        doc.rect(55, 96, 35, 15);
        doc.rect(90, 96, 35, 15);
        doc.rect(125, 96, 40, 15);
        doc.rect(165, 96, 35, 15);
        doc.rect(10, 111, 10, 15);
        doc.rect(20, 111, 35, 15);
        doc.rect(55, 111, 35, 15);
        doc.rect(90, 111, 35, 15);
        doc.rect(125, 111, 40, 15);
        doc.rect(165, 111, 35, 15);
        doc.rect(10, 126, 10, 15);
        doc.rect(20, 126, 35, 15);
        doc.rect(55, 126, 35, 15);
        doc.rect(90, 126, 35, 15);
        doc.rect(125, 126, 40, 15);
        doc.rect(165, 126, 35, 15);
        doc.rect(10, 141, 10, 15);
        doc.rect(20, 141, 35, 15);
        doc.rect(55, 141, 35, 15);
        doc.rect(90, 141, 35, 15);
        doc.rect(125, 141, 40, 15);
        doc.rect(165, 141, 35, 15);
        doc.rect(10, 156, 10, 15);
        doc.rect(20, 156, 35, 15);
        doc.rect(55, 156, 35, 15);
        doc.rect(90, 156, 35, 15);
        doc.rect(125, 156, 40, 15);
        doc.rect(165, 156, 35, 15);
        doc.rect(10, 180, 155, 10);
        doc.rect(165, 180, 35, 10);
        doc.rect(10, 210, 190, 10);
        doc.text("Jumlah", 12, 186);
        doc.text("Demikian Berita Acara ini dibuat dengan sebenar-benarnya untuk dapat digunakan sebagaimana mestinya.", 10, 200);
        doc.text("* Nama Jelas TTD dan Stampel Jika Ada", 12, 216);
        doc.text("KUNINGAN, ", 150, 216);
        doc.rect(10, 220, 95, 50);
        doc.rect(105, 220, 95, 50);
        doc.text("Aparat Setempat", 57, 226, { align: 'center' });
        doc.text("Delapan Delapan Logistics", 150, 226, { align: 'center' });
        doc.text("*", 12, 270, { align: 'center' });
        doc.text("*", 107, 270, { align: 'center' });
        qrImageData = await generateQRCode("NOMOR DTT DISINI");
        doc.addImage(qrImageData, 'PNG', 5, 277, 15, 15);
        // Akhir Dokumen BAST Perwakilan

        doc.save('master_data_kpm.pdf');
    };

    const handleAddMobilClick = () => {
        generatePDF();
    };

    const handleEditDataClick = (id) => {
        setDetailId(id);
        setCurrentView('detail');
    };

    const handleBackClick = () => {
        setCurrentView('index');
    };

    const fetchMasterDataKPM = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/masterdatakpm/all');
            const data = await response.json();
            console.log(data);
            setMasterDataKPM(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchMasterDataKPM();
    }, []);

    return (
        <>
            {currentView === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Master Data KPM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAddMobilClick}>disini</button> untuk menambahkan Master Data KPM.
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="accordion mt-3" id="accordion_master_data_kpm">
                            {MasterDataKPM.map(masterdatakpm => (
                                <div key={masterdatakpm.id_master_data_kpm} className="card accordion-item">
                                    <h2 className="accordion-header px-2" id={`heading${masterdatakpm.id_master_data_kpm}`}>
                                        <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${masterdatakpm.id_master_data_kpm}`} aria-expanded="false" aria-controls={`accordion${masterdatakpm.id_master_data_kpm}`}>
                                            {masterdatakpm.nama_kpm
                                            }
                                        </button>
                                    </h2>
                                    <div id={`accordion${masterdatakpm.id_master_data_kpm}`} className="accordion-collapse collapse" data-bs-parent="#accordion_master_data_kpm">
                                        <div className="accordion-body" style={{ marginTop: "-15px" }} >
                                            <div className="px-2">
                                                <hr />
                                                <div className="col-md-12 col-sm-12 mt-0 mt-md-3">
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {masterdatakpm.desa_kelurahan.kecamatan.kabupaten_kota.provinsi.nama_provinsi}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {masterdatakpm.desa_kelurahan.kecamatan.kabupaten_kota.nama_kabupaten_kota}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        KECAMATAN {masterdatakpm.desa_kelurahan.kecamatan.nama_kecamatan}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {masterdatakpm.desa_kelurahan.nama_desa_kelurahan}
                                                    </p>
                                                    <p className='d-none' >
                                                        <button className="btn btn-link p-0" onClick={() => handleEditDataClick(masterdatakpm.id_master_data_kpm)}>
                                                            <i className="tf-icons bx bx-edit me-2"></i> EDIT DATA
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {currentView === 'add' && <AddPage currentView={currentView} handleBackClick={handleBackClick} refreshData={fetchMasterDataKPM} />}
            {currentView === 'detail' && detailId && <DetailPage id={detailId} />}
        </>
    );
};

export default IndexMasterDataKPMPage;