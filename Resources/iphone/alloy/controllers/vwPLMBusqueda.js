function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vwPLMBusqueda";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.vwPLMBusqueda = Ti.UI.createView({
        layout: "vertical",
        id: "vwPLMBusqueda"
    });
    $.__views.vwPLMBusqueda && $.addTopLevelView($.__views.vwPLMBusqueda);
    var __alloyId124 = [];
    $.__views.__alloyId125 = Ti.UI.createTableViewRow({
        height: "33.3%",
        top: 0,
        id: "__alloyId125"
    });
    __alloyId124.push($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createImageView({
        width: "15%",
        left: "2.5%",
        image: "/images/medicina.png",
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
    $.__views.txtMedicamento = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "1dp",
        borderRadius: 5,
        borderColor: "#FFF",
        color: "#00359C",
        backgroundColor: "#FFFFFF",
        width: "80%",
        height: "100%",
        top: 0,
        left: "20%",
        id: "txtMedicamento",
        hintText: "Medicamento"
    });
    $.__views.__alloyId125.add($.__views.txtMedicamento);
    $.__views.__alloyId127 = Ti.UI.createTableViewRow({
        height: "33.3%",
        top: 0,
        id: "__alloyId127"
    });
    __alloyId124.push($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createImageView({
        width: "15%",
        left: "2.5%",
        image: "/images/sustancia.png",
        id: "__alloyId128"
    });
    $.__views.__alloyId127.add($.__views.__alloyId128);
    $.__views.txtSustancia = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "1dp",
        borderRadius: 5,
        borderColor: "#FFF",
        color: "#00359C",
        backgroundColor: "#FFFFFF",
        width: "80%",
        height: "100%",
        top: 0,
        left: "20%",
        id: "txtSustancia",
        hintText: "Sustancia Activa"
    });
    $.__views.__alloyId127.add($.__views.txtSustancia);
    $.__views.__alloyId129 = Ti.UI.createTableViewRow({
        height: "33.3%",
        top: 0,
        id: "__alloyId129"
    });
    __alloyId124.push($.__views.__alloyId129);
    $.__views.__alloyId130 = Ti.UI.createImageView({
        width: "15%",
        left: "2.5%",
        image: "/images/lab.png",
        id: "__alloyId130"
    });
    $.__views.__alloyId129.add($.__views.__alloyId130);
    $.__views.txtLaboratorio = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "1dp",
        borderRadius: 5,
        borderColor: "#FFF",
        color: "#00359C",
        backgroundColor: "#FFFFFF",
        width: "80%",
        height: "100%",
        top: 0,
        left: "20%",
        id: "txtLaboratorio",
        hintText: "Laboratorio"
    });
    $.__views.__alloyId129.add($.__views.txtLaboratorio);
    $.__views.tbPLM = Ti.UI.createTableView({
        width: "90%",
        top: "3%",
        height: "30%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#D0D0D2",
        data: __alloyId124,
        id: "tbPLM"
    });
    $.__views.vwPLMBusqueda.add($.__views.tbPLM);
    $.__views.btnBuscar = Ti.UI.createButton({
        backgroundColor: "#00359C",
        color: "#FFF",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "0.4dp",
        borderRadius: 5,
        top: "3%",
        width: "50%",
        title: "Buscar",
        id: "btnBuscar"
    });
    $.__views.vwPLMBusqueda.add($.__views.btnBuscar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.App.fireEvent("ocultaCargando");
    $.txtLaboratorio.addEventListener("change", function() {
        $.txtMedicamento.value = "";
        $.txtSustancia.value = "";
    });
    $.txtMedicamento.addEventListener("change", function() {
        $.txtLaboratorio.value = "";
        $.txtSustancia.value = "";
    });
    $.txtSustancia.addEventListener("change", function() {
        $.txtMedicamento.value = "";
        $.txtLaboratorio.value = "";
    });
    $.btnBuscar.addEventListener("click", function() {
        Ti.App.fireEvent("muestraCargando");
        var idTipo = 0;
        var url = Alloy.CFG.urlAPI + "PLM/";
        if ("" != $.txtMedicamento.value) {
            url += "Drugs?drug=" + $.txtMedicamento.value;
            idTpo = 1;
        } else if ("" != $.txtSustancia.value) {
            url += "Substances?substance=" + $.txtSustancia.value;
            idTipo = 2;
        } else if ("" != $.txtLaboratorio.text) {
            url += "labs?LabName=" + $.txtLaboratorio.value;
            idTipo = 3;
        }
        var cliPLM = Titanium.Network.createHTTPClient({
            onload: function() {
                var obj = JSON.parse(this.responseText);
                var datos = [];
                for (var i = 0; obj.length > i; i++) {
                    var it = obj[i];
                    var dato = {};
                    switch (idTipo) {
                      case 1:
                        dato.id = it.productIdField;
                        dato.valor = it.brandField + " " + it.pharmaFormField;
                        break;

                      case 2:
                        dato.id = it.activeSubstanceIdField;
                        dato.valor = it.descriptionField;
                        break;

                      case 3:
                        dato.id = it.divisionIdField;
                        dato.valor = it.descriptionField;
                    }
                    dato.producto = it;
                    datos.push(dato);
                }
                var wnResPlm = Alloy.createController("vwPLMResBusqueda", {
                    idTipo: idTipo,
                    datos: datos
                }).getView();
                wnResPlm.open({
                    animated: true,
                    modal: true,
                    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE
                });
                Ti.App.fireEvent("ocultaCargando");
            },
            onerror: function(e) {
                Ti.App.fireEvent("ocultaCargando");
                var error = JSON.stringify(e);
                Ti.UI.createAlertDialog({
                    message: "Error(" + url + "):" + error,
                    ok: "Aceptar",
                    title: "Error Membresia"
                }).show();
            },
            timeout: 1e4
        });
        cliPLM.timeout = 12e3;
        cliPLM.open("GET", url);
        cliPLM.send();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;