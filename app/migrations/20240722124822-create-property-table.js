'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('properties', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      property_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seller_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      buyer_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      house_number: {
        type: Sequelize.STRING,
      },
      street_name: {
        type: Sequelize.STRING,
      },
      suburb: {
        type: Sequelize.STRING,
      },
      town: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      postal_address: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      pincode: {
        type: Sequelize.STRING,
      },
      document: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      property_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      property_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      property_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ownership: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      kitchens: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      toilets: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dinning_rooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      sitting_rooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      roof_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      floor_cover: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      floor_cover_area_measurement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      area_measurement: {
        type: Sequelize.STRING,
      },
      cub_boards: {
        type: Sequelize.STRING,
      },
      window_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      braai: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      swimming_pool: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      views: {
        type: Sequelize.STRING,
      },
      outside_building: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      building_area_measurement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      building_area_measurement_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      flatlet: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      flatlet_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dwelling: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      auctioned: {
        type: Sequelize.STRING,
      },
      auctioned_at: {
        type: Sequelize.DATE,
      },
      auction_duration: {
        type: Sequelize.STRING,
      },
      starting_bid: {
        type: Sequelize.STRING,
      },
      auction_ends_at: {
        type: Sequelize.DATE,
      },
      auction_completed: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      avatar_url: {
        type: Sequelize.STRING,
      },
      document_url: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      other_charges: {
        type: Sequelize.STRING,
      },
      maintenance_charges: {
        type: Sequelize.STRING,
      },
      maintenance_frequency: {
        type: Sequelize.STRING,
      },
      include_cost: {
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.JSON,
      },
      temp_images: {
        type: Sequelize.JSON,
      },
      is_verified: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      page: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      expires_at: {
        type: Sequelize.DATE,
      },
      with_cub_boards: {
        type: Sequelize.BOOLEAN,
      },
      kitchen_with_cub_boards: {
        type: Sequelize.BOOLEAN,
      },
      study_rooms: {
        type: Sequelize.INTEGER,
      },
      dining_rooms: {
        type: Sequelize.INTEGER,
      },
      lounge: {
        type: Sequelize.INTEGER,
      },
      fire_places: {
        type: Sequelize.INTEGER,
      },
      tv_rooms: {
        type: Sequelize.INTEGER,
      },
      laundry_rooms: {
        type: Sequelize.INTEGER,
      },
      garage: {
        type: Sequelize.STRING,
      },
      carports: {
        type: Sequelize.INTEGER,
      },
      view_comments: {
        type: Sequelize.STRING,
      },
      garden: {
        type: Sequelize.BOOLEAN,
      },
      store_room: {
        type: Sequelize.BOOLEAN,
      },
      outside_flat: {
        type: Sequelize.BOOLEAN,
      },
      ready_to_occupy: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('properties');
  },
};
