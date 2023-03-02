/* eslint-disable no-unused-vars */
webix.ui.datafilter.rowCount = webix.extend(
    {
        refresh: function (master, node, value) {
            node.innerHTML = master.count() + " items";
        },
    },
    webix.ui.datafilter.summColumn
);
webix.protoUI(
    {
        name: "multiselectSearch",
        $init: function (config) {
            this.$ready.push(this._load_custom_filter);
        },
        _sorter_func: function (a, b) {
            if ((a.$checked || 0) === (b.$checked || 0))
                return a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1;
            else return (a.$checked || 0) < (b.$checked || 0) ? 1 : -1;
        },
        _load_custom_filter: function () {
            //const that = this;
            const txtId = this.getPopup()
                .getBody()
                .addView(
                    {
                        view: "text",
                        value: "",
                        label: "Filter:",
                        labelWidth: 50,
                    },
                    3
                );
            this.getPopup()
                .getBody()
                .addView(
                    {
                        view: "button",
                        value: "Clear",
                        click: () => {
                            this.setValue("");
                        },
                    },
                    4
                );
            this.selectionHasChanged = false;
            this.getPopup().attachEvent("onShow", () => {
                this.getList().sort(this._sorter_func);
            });
            this.attachEvent("onChange", () => {
                this.selectionHasChanged = true;
                //that.getList().sort(that._sorter_func);
            });
            this.getPopup().attachEvent("onHide", () => {
                if (this.selectionHasChanged) {
                    this.callEvent("onSelectionsChanged", [this.getValue()]);
                    this.selectionHasChanged = false;
                }
            });
            webix.$$(txtId).attachEvent("onTimedKeyPress", (code, e) => {
                const list = this.getList();
                list.filter("value", webix.$$(txtId).getValue());
            });
        },
    },
    webix.ui.multiselect,
    webix.OverlayBox
);

webix.type(webix.ui.tree, {
    baseType: "lineTree",
    name: "playlistCustomTree",
    my_folder: function (obj, common) {
        if (obj.Team === "$GLOBAL" && !obj.showUserFolder) {
            if (obj.isPlaylistNode)
                return "<div class='tree-icon webix_tree_file_star'></div>";
            else {
                if (obj.open) {
                    return "<div class='tree-icon webix_tree_folder_open_gold'></div>";
                }
                if (obj.$level == 1)
                    return "<div class='tree-icon webix_tree_folder_star'></div>";
                else
                    return "<div class='tree-icon webix_tree_folder_gold'></div>";
            }
        }
        if (obj.showUserFolder) {
            return "<div class='tree-icon webix_tree_folder_user'></div>";
        }
        if (!obj.isPlaylistNode) {
            return "<div class='tree-icon webix_tree_folder'></div>";
        }
        return common.folder(obj, common);
    },
});
