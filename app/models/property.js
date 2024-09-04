'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      Property.belongsTo(models.User, {
        foreignKey: 'seller_id',
        as: 'seller',
      });
      Property.belongsTo(models.User, {
        foreignKey: 'buyer_id',
        as: 'buyer',
      });
      // Property.hasMany(models.Request, {
      //   foreignKey: 'property_id', // Add a foreign key in the Request model
      //   as: 'requests',
      // });
      // Property.belongsTo(models.Category, {
      //   foreignKey: 'category_id',
      //   as: 'category',
      // });
      Property.hasMany(models.Image, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'property',
        },
      });
    }
  }

  Property.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      property_name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'property_name',
      },
      // category_id: {
      //   type: DataTypes.UUID,
      //   references: {
      //     model: 'categories',
      //     key: 'id',
      //   },
      //   allowNull: true,
      // },
      category: {
        type: DataTypes.ENUM(
          'house',
          'apartment/flat',
          'farm',
          'vacant land/plot',
          'townhouse',
          'industrial property',
          'comercial property'
        ),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'name',
      },
      seller_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'seller_id',
      },
      buyer_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'buyer_id',
      },
      house_number: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'house_number',
      },
      street_name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'street_name',
      },
      suburb: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      town: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      pincode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      property_type: {
        type: DataTypes.ENUM('rent', 'sell', 'buy'),
        allowNull: false,
        defaultValue: 'sell',
        field: 'property_type',
      },
      property_status: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'property_status',
      },
      property_description: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'property_description',
      },
      ownership: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      kitchens: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      toilets: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dinning_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'dinning_rooms',
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sitting_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'sitting_rooms',
      },
      roof_type: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'roof_type',
      },
      floor_cover: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'floor_cover',
      },
      floor_cover_area_measurement: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'floor_cover_area_measurement',
      },
      area_measurement: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'area_measurement',
      },
      cub_boards: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'cub_boards',
      },
      window_type: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'window_type',
      },
      braai: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      swimming_pool: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'swimming_pool',
      },
      views: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      outside_building: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'outside_building',
      },
      building_area_measurement: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'building_area_measurement',
      },
      building_area_measurement_description: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'building_area_measurement_description',
      },
      flatlet: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'flatlet',
      },
      flatlet_description: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'flatlet_description',
      },
      dwelling: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      auctioned: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'auctioned',
      },
      auctioned_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'auctioned_at',
      },
      auction_duration: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'auction_duration',
      },
      starting_bid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'starting_bid',
      },
      auction_ends_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'auction_ends_at',
      },
      auction_completed: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'auction_completed',
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar_url: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'avatar_url',
      },
      document_url: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'document_url',
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      monthly_rates: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      monthly_levy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      other_charges: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'other_charges',
      },
      maintenance_charges: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'maintenance_charges',
      },
      maintenance_frequency: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'maintenance_frequency',
      },
      include_cost: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'include_cost',
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      temp_images: {
        type: DataTypes.JSON,
        allowNull: true,
        field: 'temp_images',
      },
      is_verified: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_verified',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
      },
      page: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'page',
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'deleted',
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at',
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'expires_at',
      },
      with_cub_boards: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'with_cub_boards',
      },
      kitchen_with_cub_boards: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'kitchen_with_cub_boards',
      },
      study_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'study_rooms',
      },
      dining_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'dining_rooms',
      },
      lounge: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fire_places: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'fire_places',
      },
      tv_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'tv_rooms',
      },
      laundry_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'laundry_rooms',
      },
      garage: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      carports: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      view_comments: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'view_comments',
      },
      garden: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      store_room: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'store_room',
      },
      outside_flat: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'outside_flat',
      },
      ready_to_occupy: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'ready_to_occupy',
      },
    },
    {
      sequelize,
      modelName: 'Property',
      tableName: 'properties',
      timestamps: true,
    }
  );

  return Property;
};
