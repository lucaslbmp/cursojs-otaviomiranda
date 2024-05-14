"use strict";'use strict';

//const { password } = require('../../config/database');
const bcryptjs = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(
      'users',
    [
      {
        nome: 'Luiz',
        email: 'luiz1@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Pedro',
        email: 'pedro@gmail.com',
        password_hash: await bcryptjs.hash('654321', 8),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Roberto',
        email: 'roberto@gmail.com',
        password_hash: await bcryptjs.hash('112233', 8),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  async down () {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
