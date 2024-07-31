const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Kecamatan = require("./kecamatanModel");

const Desa2412 = sequelize.define(
  "desa_kelurahan_2412",
  {
    id_desa_kelurahan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_kecamatan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kecamatan,
        key: "id_kecamatan",
      },
    },
    kode_desa_kelurahan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_desa_kelurahan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah_pbp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    jumlah_alokasi_desa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    jumlah_alokasi_desa_sisa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "desa_kelurahan_2412",
    hooks: {
      beforeCreate: (desa_kelurahan_2412) => {
        desa_kelurahan_2412.kode_desa_kelurahan = desa_kelurahan_2412.kode_desa_kelurahan.toUpperCase();
        desa_kelurahan_2412.nama_desa_kelurahan = desa_kelurahan_2412.nama_desa_kelurahan.toUpperCase();
      },
      beforeUpdate: (desa_kelurahan_2412) => {
        desa_kelurahan_2412.kode_desa_kelurahan = desa_kelurahan_2412.kode_desa_kelurahan.toUpperCase();
        desa_kelurahan_2412.nama_desa_kelurahan = desa_kelurahan_2412.nama_desa_kelurahan.toUpperCase();
      },
    },
  }
);

Desa2412.belongsTo(Kecamatan, { foreignKey: 'id_kecamatan', as: 'kecamatan' });
Kecamatan.hasMany(Desa2412, { foreignKey: 'id_kecamatan', as: 'desa_kelurahan_2412_by_kecamatan' });

module.exports = Desa2412;
