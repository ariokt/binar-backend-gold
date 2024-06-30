'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('order_statuses', [
      {
        name: 'Diterima',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Diproses',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sedang Dikirim',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Disampaikan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dibatalkan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('order_statuses', null, {});
  }
};
