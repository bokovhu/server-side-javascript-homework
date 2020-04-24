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
                        .fail(() => alert("Unsuccessful operation"));
                },
            };
            page.signupButton.click(page.onSignup.bind(page));
        },
    },
};
