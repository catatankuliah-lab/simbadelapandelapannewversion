const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const { sequelize, connectDB } = require('./config/database');

const alokasiRoutes = require('./routes/alokasiRoutes');
const provinsiRoutes = require('./routes/provinsiRoutes');
const kabupatenRoutes = require('./routes/kabupatenRoutes');
const kecamatanRoutes = require('./routes/kecamatanRoutes');
const desaRoutes = require('./routes/desaRoutes');
const desa2408Routes = require('./routes/desa2408Routes');
const hakAksesRoutes = require('./routes/hakAksesRoutes');
const userRoutes = require('./routes/userRoutes');
const adminKancabRoutes = require('./routes/adminKancabRoutes');
const petugasPenyalurRoutes = require('./routes/petugasPenyalurRoutes');
const picGUdangRoutes = require('./routes/picGudangRoutes');
const checkerGudangRoutes = require('./routes/checkerGudangRoutes');
const kantorCabangRoutes = require('./routes/kantorCabangRoutes');
const gudangRoutes = require('./routes/gudangRoutes');
const wo2408Routes = require('./routes/wo2408Routes');
const loRoutes = require('./routes/loRoutes');
const doRoutes = require('./routes/doRoutes');
const sjtRoutes = require('./routes/sjtRoutes');
const itemWo2408Routes = require('./routes/itemWo2408Routes');
const dttRoutes = require('./routes/dttRoutes');
const masterdatakpmRoutes = require("./routes/masterDataKpmRoutes");
const kpmRoutes = require("./routes/kpmRoutes");

const app = express();
const PORT = 5050;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  "/uploads/mobil",
  express.static(path.join(__dirname, "uploads/mobil"))
);

// Menggunakan routes
app.use('/api/alokasi', alokasiRoutes);
app.use('/api/provinsi', provinsiRoutes);
app.use('/api/kabupaten', kabupatenRoutes);
app.use('/api/kecamatan', kecamatanRoutes);
app.use('/api/desa', desaRoutes);
app.use('/api/desa2408', desa2408Routes);
app.use('/api/hakakses', hakAksesRoutes);
app.use('/api/user', userRoutes);
app.use('/api/adminkancab', adminKancabRoutes);
app.use('/api/petugaspenyalur', petugasPenyalurRoutes);
app.use('/api/picgudang', picGUdangRoutes);
app.use('/api/checkergudang', checkerGudangRoutes);
app.use('/api/kantorcabang', kantorCabangRoutes);
app.use('/api/gudang', gudangRoutes);
app.use('/api/dtt', dttRoutes);
app.use('/api/masterdatakpm', masterdatakpmRoutes);
app.use('/api/wo2408', wo2408Routes);
app.use('/api/lo', loRoutes);
app.use('/api/do', doRoutes);
app.use('/api/sjt', sjtRoutes);
app.use('/api/itemwo2408', itemWo2408Routes);
app.use('/api/kpm', kpmRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
