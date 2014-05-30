function Controller() {
    function cargaResultado() {
        muestraCargando();
        var titulo = "";
        var dataTable = [];
        switch (res.idTipo) {
          case 1:
            titulo = "Medicamentos";
            break;

          case 2:
            titulo = "Sustancias Activas";
            break;

          case 3:
            titulo = "Laboratorios";
        }
        $.tbPLM.removeAllChildren();
        var sec = Ti.UI.createTableViewSection({
            headerTitle: titulo
        });
        for (var i = 0; res.datos.length > i; i++) {
            var dato = res.datos[i];
            var row = Ti.UI.createTableViewRow();
            row.rightImage = "/images/der" + calidad;
            row.height = "10%";
            row.idDato = dato.id;
            row.title = dato.valor;
            row.producto = dato.producto;
            sec.add(row);
        }
        dataTable.push(sec);
        $.tbPLM.data = dataTable;
        ocultaCargando();
    }
    function muestraCargando() {
        $.cargando.show();
        $.vwCarga.show();
    }
    function ocultaCargando() {
        $.vwCarga.hide();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vwPLMResBusqueda";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.wnPLMRes = Ti.UI.createWindow({
        id: "wnPLMRes"
    });
    $.__views.wnPLMRes && $.addTopLevelView($.__views.wnPLMRes);
    $.__views.__alloyId131 = Ti.UI.createView({
        top: "0",
        layout: "vertical",
        id: "__alloyId131"
    });
    $.__views.wnPLMRes.add($.__views.__alloyId131);
    $.__views.vwTopIOS = Ti.UI.createView({
        backgroundColor: "#FFF",
        id: "vwTopIOS"
    });
    $.__views.__alloyId131.add($.__views.vwTopIOS);
    $.__views.navview = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: Ti.Platform.displayCaps.platformWidth,
        height: "10%",
        backgroundColor: "#00359C",
        color: "#FFF",
        id: "navview"
    });
    $.__views.__alloyId131.add($.__views.navview);
    $.__views.btnMenu = Ti.UI.createView({
        backgroundColor: "none",
        left: 0,
        top: "13%",
        width: "25%",
        height: "75%",
        style: "none",
        zIndex: 2,
        id: "btnMenu"
    });
    $.__views.navview.add($.__views.btnMenu);
    $.__views.imgMenu = Ti.UI.createButton({
        backgroundColor: "none",
        color: "#FFF",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: 0,
        borderRadius: 5,
        backgroundImage: "/images/back_win.png",
        height: "75%",
        left: "1%",
        id: "imgMenu"
    });
    $.__views.btnMenu.add($.__views.imgMenu);
    $.__views.lblTitulo = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#FFF",
        textAlign: "center",
        shadowColor: "#000000",
        shadowOffset: {
            x: 0,
            y: 3
        },
        zIndex: 0,
        text: "PLM",
        id: "lblTitulo",
        backgroundColor: "none",
        backgroundGradient: "none"
    });
    $.__views.navview.add($.__views.lblTitulo);
    $.__views.tbPLM = Ti.UI.createTableView({
        top: 0,
        id: "tbPLM"
    });
    $.__views.__alloyId131.add($.__views.tbPLM);
    $.__views.vwCarga = Ti.UI.createView({
        width: Ti.API.FILL,
        height: Ti.API.FILL,
        top: 0,
        backgroundColor: "#000000",
        zIndex: 99999,
        opacity: ".65",
        color: "#FFFFFF",
        id: "vwCarga"
    });
    $.__views.wnPLMRes.add($.__views.vwCarga);
    $.__views.cargando = Ti.UI.createActivityIndicator({
        opacity: "1",
        color: "#FFFFFF",
        id: "cargando",
        zIndex: "9999",
        message: "Cargando..."
    });
    $.__views.vwCarga.add($.__views.cargando);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Util = require("utils");
    $.vwTopIOS.setHeight(Util.isiOS7Plus() ? 20 : 0);
    $.lblTitulo.applyProperties($.createStyle(Alloy.FuenteTitulo()));
    var args = arguments[0] || {};
    var res = args;
    var calidad = Alloy.Dimension() + ".png";
    cargaResultado();
    $.imgMenu.addEventListener("click", function() {
        $.wnPLMRes.close();
    });
    $.tbPLM.addEventListener("click", function(e) {
        muestraCargando();
        var url = Alloy.CFG.urlAPI + "PLM/";
        switch (res.idTipo) {
          case 1:
            ocultaCargando();
            var vwDetMEd = Alloy.createController("wnDetalleMedicamento", e.row.producto).getView();
            vwDetMEd.open({
                animated: true,
                modal: true,
                modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE
            });
            return;

          case 2:
            url += "DrugsBySubstance?substanceId=" + e.row.idDato;
            break;

          case 3:
            url += "DrugsByLab?LabId=" + e.row.idDato;
        }
        var cliPLM = Titanium.Network.createHTTPClient({
            onload: function() {
                var obj = JSON.parse(this.responseText);
                Ti.API.info(this.responseText);
                var datos = [];
                for (var i = 0; obj.length > i; i++) {
                    var it = obj[i];
                    var dato = {};
                    dato.id = it.productIdField;
                    dato.valor = it.brandField + " " + it.pharmaFormField;
                    dato.producto = it;
                    datos.push(dato);
                }
                res = {};
                res.idTipo = 1;
                res.datos = datos;
                cargaResultado();
            },
            onerror: function(e) {
                Ti.App.fireEvent("ocultaCargando");
                var error = JSON.stringify(e);
                Ti.UI.createAlertDialog({
                    message: "Error(" + url + "):" + error,
                    ok: "Aceptar",
                    title: "Error Membresia"
                }).show();
                ocultaCargando();
            }
        });
        cliPLM.timeout = 12e3;
        cliPLM.open("GET", url);
        cliPLM.send();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;