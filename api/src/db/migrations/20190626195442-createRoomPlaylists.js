'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('roomPlaylists', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      roomId: {
        type: Sequelize.BIGINT,
        references: { model: 'rooms', key: 'id' }
      },
      playlistId: {
        type: Sequelize.BIGINT,
        references: { model: 'playlists', key: 'id' }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('roomPlaylists');
  }
};
