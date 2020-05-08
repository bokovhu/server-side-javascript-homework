const logRequest = require("../logRequest");
const LOGTAG = "Part Filter Populator middleware";

const Part = require("../db/part");
const Build = require("../db/build");

// This middleware populates the available
// filters for a given part type.
module.exports = (options) => {
    return (req, res, next) => {
        const partType = req.query.partType;
        const configId = req.query.configId;

        Part.find({
            type: partType,
        }).then((parts) => {
            const filterableTextParams = {};
            const filterableHasParams = [];
            const filterableManufacturerNames = [];

            parts.forEach((part) => {
                part.technicalParameters.forEach((param) => {
                    console.log(param);
                    if (param.unit === "text") {
                        if (
                            typeof filterableTextParams[param.name] ===
                            "undefined"
                        ) {
                            filterableTextParams[param.name] = { values: [] };
                        }

                        if (
                            filterableTextParams[param.name].values.indexOf(
                                param.value.text
                            ) < 0
                        ) {
                            filterableTextParams[param.name].values.push(
                                param.value.text
                            );
                        }
                    } else if (param.unit === "has") {
                        if (filterableHasParams.indexOf(param.name) < 0) {
                            filterableHasParams.push(param.name);
                        }
                    }
                });
                if (
                    filterableManufacturerNames.indexOf(
                        part.manufacturer.name
                    ) < 0
                ) {
                    filterableManufacturerNames.push(part.manufacturer.name);
                }
            });

            const filters = [];
            filters.push({
                type: "ManufacturerFilter",
                choices: filterableManufacturerNames,
            });
            Object.keys(filterableTextParams).forEach((textParamName) =>
                filters.push({
                    type: "TechnicalParameterChoiceFilter",
                    parameterName: textParamName,
                    choices: filterableTextParams[textParamName].values,
                })
            );
            filterableHasParams.forEach((hasParamName) =>
                filters.push({
                    type: "TechnicalParameterHasFilter",
                    parameterName: hasParamName,
                })
            );

            console.log(filters);

            res.locals.filters = filters;
            res.locals.configId = configId;
            res.locals.partType = partType;

            const idsOfPartsOfPartType = parts.map((p) => p._id.toString());

            Build.findOne({
                _id: configId,
            }).then((build) => {
                res.locals.oldPartId = build.partIds.filter(
                    (partId) =>
                        idsOfPartsOfPartType.indexOf(partId.toString()) >= 0
                )[0];
                next();
            });
        });
    };
};
