window.PCBuilder = {
    Config: {
        url: window.location.origin,
    },
    Components: {
        toggleTable(el) {
            let body = el.find("tbody");
            let rows = body
                .find("tr")
                .toArray()
                .map((row) => $(row))
                .filter((row) => row.attr("data-expansion"));

            rows.forEach((row) => {
                const expansionHandler = {
                    row: row,
                    table: el,
                    expanded: false,
                    expansion: null,
                    expansionRow: null,
                    expansionId: row.attr("data-expansion"),
                    toggler: null,
                    colSpan: 0,
                    findExpansionRow() {
                        return this.table.find(
                            `[data-expansion-of="${this.expansionId}"]`
                        );
                    },
                    handleRowClick() {
                        console.log(this.toggler);
                        if (this.expanded) {
                            this.toggler
                                .find("i")
                                .removeClass("fa-chevron-down")
                                .addClass("fa-chevron-left");
                            this.expansionRow.remove();
                            this.expansionRow = null;
                            this.expanded = false;
                        } else {
                            this.toggler
                                .find("i")
                                .removeClass("fa-chevron-left")
                                .addClass("fa-chevron-down");
                            this.row.after(
                                `<tr data-expansion-of="${this.expansionId}">
                                    <td colspan="${this.colSpan}">
                                        <div class="row-expansion-content">
                                            ${this.expansion.html()}
                                        </div>
                                    </td>
                                </tr>`
                            );
                            this.expansionRow = this.findExpansionRow();
                            this.expanded = true;
                        }
                    },
                    mount() {
                        $(`
                            <td data-row-toggler>
                                <i class="fas fa-chevron-left"></i>
                            </td>
                            `).appendTo(this.row);
                        this.toggler = this.row.find("[data-row-toggler]");
                        this.colSpan = this.row.find("td").length;
                        this.expansion = $(
                            `#${this.row.attr("data-expansion")}`
                        );
                    },
                };
                const mount = expansionHandler.mount.bind(expansionHandler);
                const handle = expansionHandler.handleRowClick.bind(
                    expansionHandler
                );
                mount();
                row.click(handle);
            });
        },
    },
    NewConfigurationPage: {
        mount(el) {
            const page = {
                form: el,
                nameInput: el.find("#configName"),
                cpuSelector: el.find("#cpuSelector"),
                motherboardSelector: el.find("#motherboardSelector"),
                ramSelector: el.find("#ramSelector"),
                gpuSelector: el.find("#gpuSelector"),
                storageSelector: el.find("#storageSelector"),
                saveButton: el.find("#saveButton"),
                onSave() {
                    const request = {
                        partIds: [
                            this.cpuSelector.val(),
                            this.motherboardSelector.val(),
                            this.ramSelector.val(),
                            this.gpuSelector.val(),
                            this.storageSelector.val(),
                        ],
                        configName: this.nameInput.val(),
                    };

                    $.ajax({
                        url: `${PCBuilder.Config.url}/api/config/create`,
                        method: "POST",
                        data: JSON.stringify(request),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                    })
                        .done(
                            () =>
                                (window.location = `${PCBuilder.Config.url}/my-configs`)
                        )
                        .fail(() => alert("Unsuccessful operation"));
                },
            };

            page.saveButton.click(page.onSave.bind(page));
        },
    },
    EditConfigurationPage: {
        mount(el, configId) {
            const page = {
                form: el,
                nameInput: el.find("#configName"),
                cpuSelector: el.find("#cpuSelector"),
                motherboardSelector: el.find("#motherboardSelector"),
                ramSelector: el.find("#ramSelector"),
                gpuSelector: el.find("#gpuSelector"),
                storageSelector: el.find("#storageSelector"),
                saveButton: el.find("#saveButton"),
                configId: el.find("#configId"),
                onSave() {
                    const request = {
                        partIds: [
                            this.cpuSelector.val(),
                            this.motherboardSelector.val(),
                            this.ramSelector.val(),
                            this.gpuSelector.val(),
                            this.storageSelector.val(),
                        ],
                        configName: this.nameInput.val(),
                    };

                    $.ajax({
                        url: `${
                            PCBuilder.Config.url
                        }/api/config/${this.configId.val()}`,
                        method: "PUT",
                        data: JSON.stringify(request),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                    })
                        .done(
                            () =>
                                (window.location = `${PCBuilder.Config.url}/my-configs`)
                        )
                        .fail((reason) =>
                            alert(
                                "Unsuccessful operation: " +
                                    JSON.stringify(reason)
                            )
                        );
                },
            };

            page.saveButton.click(page.onSave.bind(page));
        },
    },
    SignupPage: {
        mount(el) {
            const page = {
                form: el,
                nameInput: el.find("#signupName"),
                emailInput: el.find("#signupEmail"),
                passwordInput: el.find("#signupPassword"),
                signupButton: el.find("#signupButton"),
                onSignup() {
                    const request = {
                        name: this.nameInput.val(),
                        emailAddress: this.emailInput.val(),
                        password: this.passwordInput.val(),
                    };

                    $.ajax({
                        url: `${PCBuilder.Config.url}/api/user/register`,
                        method: "POST",
                        data: JSON.stringify(request),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                    })
                        .done(
                            () =>
                                (window.location = `${PCBuilder.Config.url}/thanks-for-signing-up`)
                        )
                        .fail(() => {
                            alert(
                                "Could not sign up. Make sure you are trying to use an e-mail address that is not yet registered!"
                            );
                        });
                },
            };
            page.signupButton.click(page.onSignup.bind(page));
        },
    },
    MyConfigurationsPage: {
        mount() {
            const page = {
                configCards: $(".config-card"),
            };

            page.configCards.each((_, el) => {
                const configId = $(el).data("config-id");
                $(el)
                    .find(".delete-config")
                    .click(() =>
                        window.PCBuilder.MyConfigurationsPage.deleteConfig(
                            configId
                        )
                    );
            });
        },
        deleteConfig(id) {
            $.ajax({
                url: `${PCBuilder.Config.url}/api/config/${id}`,
                method: "DELETE",
            })
                .done(() => location.reload())
                .fail(() => {
                    alert("Could not delete the build!");
                });
        },
    },
    PartSearchPage: {
        mount(filterEl, resultEl) {
            const page = {
                filterForm: filterEl,
                resultForm: resultEl,
                allParts: JSON.parse(resultEl.find("#allParts").val()),
                resultsTable: resultEl.find("#resultsTable"),
                partType: filterEl.find("#partType").val(),
                oldPartId: filterEl.find("#oldPartId").val(),
                configId: filterEl.find("#configId").val(),
                textSearchInput: filterEl.find("#textSearch"),
            };

            const choiceFilterableTechnicalParameterNames = new Set();
            const hasFilterableTechnicalParameterNames = new Set();
            const allChoiceFilterElements = page.filterForm.find(
                '[data-filtertype="TechnicalParameterChoiceFilter"]'
            );
            const allHasFilterElements = page.filterForm.find(
                '[data-filtertype="TechnicalParameterHasFilter"]'
            );

            const choiceFilters = [];
            const hasFilters = [];

            const executeSearch = () => {
                const filteredChoices = choiceFilters.map((filter) => {
                    return {
                        paramName: filter.paramName,
                        values: $(
                            `[data-param="${filter.paramName}"]:checked`
                        ).map((_, _el) => $(_el).data("choice")),
                    };
                });
                const filteredCapabilities = hasFilters
                    .map((filter) => {
                        return {
                            paramName: filter.paramName,
                            selected: filter.yesElement.is(":checked"),
                            doFilter: !filter.dontCareElement.is(":checked"),
                        };
                    })
                    .filter((f) => f.doFilter);
                const filteredManufacturers = [];
                page.filterForm.find("[data-manufacturer]").each((_, _el) => {
                    const el = $(_el);
                    if (el.is(":checked")) {
                        filteredManufacturers.push(el.data("choice"));
                    }
                });
                const searchTerm = page.textSearchInput.val().toLowerCase();

                const matched = [];

                page.allParts
                    .filter((part) => part.type === page.partType)
                    .filter((part) => {
                        let matches = true;
                        let partParams = {};
                        part.technicalParameters.forEach(
                            (param) => (partParams[param.name] = param)
                        );

                        for (let i = 0; i < filteredChoices.length; i++) {
                            const choice = filteredChoices[i];
                            const choiceValues = [];
                            for (let j = 0; j < choice.values.length; j++) {
                                choiceValues.push(choice.values[j]);
                            }
                            if (
                                typeof partParams[choice.paramName] !==
                                "undefined"
                            ) {
                                if (
                                    choiceValues.indexOf(
                                        partParams[choice.paramName].value.text
                                    ) < 0
                                ) {
                                    matches = false;
                                }
                            } else {
                                matches = false;
                            }
                        }

                        for (let i = 0; i < filteredCapabilities.length; i++) {
                            const capability = filteredCapabilities[i];
                            if (
                                typeof partParams[capability.paramName] !==
                                "undefined"
                            ) {
                                if (
                                    partParams[capability.paramName].value
                                        .has !== capability.selected
                                ) {
                                    matches = false;
                                }
                            } else {
                                matches = false;
                            }
                        }

                        if (
                            filteredManufacturers.indexOf(
                                part.manufacturer.name
                            ) < 0
                        ) {
                            matches = false;
                        }

                        if (searchTerm && searchTerm.length > 0) {
                            if (
                                !part.model
                                    .toLowerCase()
                                    .includes(searchTerm) &&
                                !part.specification
                                    .toLowerCase()
                                    .includes(searchTerm)
                            ) {
                                matches = false;
                            }
                        }

                        if (matches) {
                            matched.push(part);
                        }
                    });

                page.resultsTable.find("tbody").empty();
                matched.forEach((part) => {
                    $(
                        `
                            <tr>
                                <td>${part.manufacturer.name}</td>
                                <td>${part.model}</td>
                                <td>${part.specification}</td>
                                <td>
                                    <button class="btn btn-primary" onclick="window.PCBuilder.PartSearchPage.selectPart(event, '${part._id}', '${page.oldPartId}', '${page.configId}')">Select</button>
                                </td>
                            </tr>
                            `
                    ).appendTo(page.resultsTable.find("tbody"));
                });
            };

            allChoiceFilterElements.each((_, _el) => {
                const el = $(_el);
                choiceFilterableTechnicalParameterNames.add(el.data("param"));

                el.change(() => executeSearch());
            });
            allHasFilterElements.each((_, _el) => {
                const el = $(_el);
                hasFilterableTechnicalParameterNames.add(el.data("param"));

                el.change(() => executeSearch());
            });
            page.filterForm.find("[data-manufacturer]").each((_, _el) => {
                const el = $(_el);
                el.change(() => executeSearch());
            });
            $(page.textSearchInput).on("keyup", () => executeSearch());

            choiceFilterableTechnicalParameterNames.forEach((paramName) => {
                choiceFilters.push({
                    paramName: paramName,
                    choiceElements: $(`[data-param="${paramName}"]`),
                });
            });
            hasFilterableTechnicalParameterNames.forEach((paramName) => {
                hasFilters.push({
                    paramName: paramName,
                    yesElement: $(
                        `[data-param="${paramName}"][data-yesno="yes"]`
                    ),
                    noElement: $(
                        `[data-param="${paramName}"][data-yesno="no"]`
                    ),
                    dontCareElement: $(
                        `[data-param="${paramName}"][data-yesno="dontcare"]`
                    ),
                });
            });

            console.log(choiceFilterableTechnicalParameterNames);
            console.log(hasFilterableTechnicalParameterNames);

            executeSearch();
        },
        selectPart(event, id, oldId, configId) {
            console.log(event);
            event.preventDefault();
            $.ajax({
                url: `${window.PCBuilder.Config.url}/api/config/${configId}/parts?partId=${id}&oldPartId=${oldId}`,
                method: "POST",
            })
                .done(
                    () =>
                        (window.location = `${window.PCBuilder.Config.url}/edit-configuration/${configId}`)
                )
                .fail(() => alert("Unsuccessful operation!"));
        },
    },
};
