const { create } = require('./property.create');
const { get } = require('./property.get');
const { getById } = require('./property.getById');
const { update } = require('./property.update');
const { destroy } = require('./property.destroy');
const { stats } = require('./property.stats');
const { getAllPublic } = require('./property.get.public');
const { getByIdPublic } = require('./property.getById.public');

class Property {
  constructor(image) {
    this.image = image;
  }
}

Property.prototype.get = get;
Property.prototype.getById = getById;
Property.prototype.create = create;
Property.prototype.update = update;
Property.prototype.destroy = destroy;
Property.prototype.stats = stats;
Property.prototype.getAllPublic = getAllPublic;
Property.prototype.getByIdPublic = getByIdPublic;

module.exports = Property;
