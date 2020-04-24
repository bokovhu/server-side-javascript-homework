const mapTechnicalParameter = require("./technicalParameter");

const Part = function (
    id,
    type,
    manufacturer,
    model,
    specification,
    technicalParameters
) {
    this.id = id;
    this.type = type;
    this.manufacturer = manufacturer;
    this.model = model;
    this.specification = specification;
    this.teaser = `${this.manufacturer.name} ${this.model} ${this.specification}`;
    this.technicalParameters = technicalParameters.map(mapTechnicalParameter);
};

module.exports = (part) =>
    new Part(
        part._id,
        part.type,
        part.manufacturer,
        part.model,
        part.specification,
        part.technicalParameters
    );
