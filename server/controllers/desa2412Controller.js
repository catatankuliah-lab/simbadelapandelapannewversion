const { sequelize } = require('../config/database.js');

const getAllDesaByIdKecamatan = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT * 
      FROM desa_kelurahan_2412
      WHERE id_kecamatan = :id
      ORDER BY nama_desa_kelurahan ASC
    `;

    const results = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllDesaByIdKecamatan
};
