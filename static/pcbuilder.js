function toggleTable(el) {
    let body = el.find("tbody");
    let rows = body.find("tr").toArray()
        .map (
            row => $(row)
        )
        .filter (
            row => row.attr('data-expansion')
        );

    rows.forEach(row => {
        const expansionHandler = {
            row: row,
            table: el,
            expanded: false,
            expansion: null,
            expansionRow: null,
            expansionId: row.attr('data-expansion'),
            toggler: null,
            colSpan: 0,
            findExpansionRow () {
                return this.table.find(
                    `[data-expansion-of="${this.expansionId}"]`
                )
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
                    this.row.after (
                        `<tr data-expansion-of="${this.expansionId}">
                            <td colspan="${this.colSpan}">
                                <div class="row-expansion-content">
                                    ${this.expansion.html()}
                                </div>
                            </td>
                        </tr>`
                    );
                    this.expansionRow = this.findExpansionRow ();
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
                this.expansion = $(`#${this.row.attr("data-expansion")}`);
            }
        };
        const mount = expansionHandler.mount.bind(expansionHandler);
        const handle = expansionHandler.handleRowClick.bind(expansionHandler);
        mount();
        row.click(handle);
    });
}
