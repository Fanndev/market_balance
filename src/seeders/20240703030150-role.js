"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Roles", [
      {
        role_id: 1,
        nama_role: "super_admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 2,
        nama_role: "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
