function Controller() {
    function muestraCargando() {
        $.cargando.show();
        $.vwCarga.show();
    }
    function ocultaCargando() {
        $.vwCarga.hide();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "wnDetalleMedicamento";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.wnDetalleMed = Ti.UI.createWindow({
        navBarHidden: true,
        id: "wnDetalleMed",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT
    });
    $.__views.wnDetalleMed && $.addTopLevelView($.__views.wnDetalleMed);
    $.__views.vwTodo = Ti.UI.createScrollView({
        backgroundColor: "white",
        layout: "vertical",
        backgroundGradient: {
            type: "radial",
            startPoint: {
                x: "50%",
                y: "50%"
            },
            endPoint: {
                x: "50%",
                y: "50%"
            },
            colors: [ "#00359C", "#3C5EA4" ],
            startRadius: "90%",
            endRadius: 0,
            backfillStart: true
        },
        id: "vwTodo"
    });
    $.__views.wnDetalleMed.add($.__views.vwTodo);
    $.__views.imgClose = Ti.UI.createImageView({
        top: "2%",
        right: "5%",
        width: "15%",
        id: "imgClose",
        image: "/images/close.png"
    });
    $.__views.vwTodo.add($.__views.imgClose);
    $.__views.lblNombre = Ti.UI.createLabel({
        width: "98%",
        height: Ti.UI.SIZE,
        color: "#FFF",
        left: "2%",
        font: {
            fontWeight: "bold"
        },
        text: "Nombre:",
        id: "lblNombre"
    });
    $.__views.vwTodo.add($.__views.lblNombre);
    $.__views.detNombre = Ti.UI.createScrollView({
        height: "5%",
        color: "#FFF",
        id: "detNombre"
    });
    $.__views.vwTodo.add($.__views.detNombre);
    $.__views.lblDetNombre = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#FFF",
        top: 0,
        left: "2%",
        text: "Nombre:",
        id: "lblDetNombre"
    });
    $.__views.detNombre.add($.__views.lblDetNombre);
    $.__views.lblLab = Ti.UI.createLabel({
        width: "98%",
        height: Ti.UI.SIZE,
        color: "#FFF",
        left: "2%",
        font: {
            fontWeight: "bold"
        },
        text: "Laboratorio:",
        id: "lblLab"
    });
    $.__views.vwTodo.add($.__views.lblLab);
    $.__views.detLab = Ti.UI.createScrollView({
        height: "5%",
        color: "#FFF",
        id: "detLab"
    });
    $.__views.vwTodo.add($.__views.detLab);
    $.__views.lblDetLab = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#FFF",
        top: 0,
        left: "2%",
        text: "Laboratorio:",
        id: "lblDetLab"
    });
    $.__views.detLab.add($.__views.lblDetLab);
    $.__views.lblAplicacion = Ti.UI.createLabel({
        width: "98%",
        height: Ti.UI.SIZE,
        color: "#FFF",
        left: "2%",
        font: {
            fontWeight: "bold"
        },
        text: "Forma de aplicación:",
        id: "lblAplicacion"
    });
    $.__views.vwTodo.add($.__views.lblAplicacion);
    $.__views.detAplicacion = Ti.UI.createScrollView({
        height: "5%",
        color: "#FFF",
        id: "detAplicacion"
    });
    $.__views.vwTodo.add($.__views.detAplicacion);
    $.__views.lblDetAplicacion = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#FFF",
        top: 0,
        left: "2%",
        text: "Forma de aplicación:",
        id: "lblDetAplicacion"
    });
    $.__views.detAplicacion.add($.__views.lblDetAplicacion);
    $.__views.lblSustancias = Ti.UI.createLabel({
        width: "98%",
        height: Ti.UI.SIZE,
        color: "#FFF",
        left: "2%",
        font: {
            fontWeight: "bold"
        },
        text: "Sustancias Activas:",
        id: "lblSustancias"
    });
    $.__views.vwTodo.add($.__views.lblSustancias);
    $.__views.detSustancias = Ti.UI.createScrollView({
        height: "5%",
        color: "#FFF",
        id: "detSustancias"
    });
    $.__views.vwTodo.add($.__views.detSustancias);
    $.__views.lblDetSustancias = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#FFF",
        top: 0,
        left: "2%",
        id: "lblDetSustancias"
    });
    $.__views.detSustancias.add($.__views.lblDetSustancias);
    $.__views.lblTerapeuticos = Ti.UI.createLabel({
        width: "98%",
        height: Ti.UI.SIZE,
        color: "#FFF",
        left: "2%",
        font: {
            fontWeight: "bold"
        },
        text: "Terapeuticos:",
        id: "lblTerapeuticos"
    });
    $.__views.vwTodo.add($.__views.lblTerapeuticos);
    $.__views.detTerapeuticos = Ti.UI.createScrollView({
        height: "5%",
        color: "#FFF",
        id: "detTerapeuticos"
    });
    $.__views.vwTodo.add($.__views.detTerapeuticos);
    $.__views.lblDetTerapeuticos = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#FFF",
        top: 0,
        left: "2%",
        id: "lblDetTerapeuticos"
    });
    $.__views.detTerapeuticos.add($.__views.lblDetTerapeuticos);
    $.__views.lblCaracteristicas = Ti.UI.createLabel({
        width: "98%",
        height: Ti.UI.SIZE,
        color: "#FFF",
        left: "2%",
        font: {
            fontWeight: "bold"
        },
        text: "Características:",
        id: "lblCaracteristicas"
    });
    $.__views.vwTodo.add($.__views.lblCaracteristicas);
    $.__views.tbCaracteristicas = Ti.UI.createTableView({
        height: "40%",
        width: "90%",
        left: "5%",
        borderRadius: 10,
        id: "tbCaracteristicas"
    });
    $.__views.vwTodo.add($.__views.tbCaracteristicas);
    $.__views.vwDetalle = Ti.UI.createScrollView({
        backgroundColor: "#F2F2F2",
        top: "100%",
        width: "95%",
        height: "70%",
        borderRadius: 10,
        id: "vwDetalle"
    });
    $.__views.wnDetalleMed.add($.__views.vwDetalle);
    $.__views.imgCloseDetalle = Ti.UI.createImageView({
        top: "2%",
        right: "5%",
        width: "15%",
        id: "imgCloseDetalle",
        image: "/images/close.png"
    });
    $.__views.vwDetalle.add($.__views.imgCloseDetalle);
    $.__views.lblDetAttr = Ti.UI.createLabel({
        width: "95%",
        height: Ti.UI.SIZE,
        color: "#21485D",
        id: "lblDetAttr",
        top: "10%",
        left: "2.5%"
    });
    $.__views.vwDetalle.add($.__views.lblDetAttr);
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
    $.__views.wnDetalleMed.add($.__views.vwCarga);
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
    var args = arguments[0] || {};
    var calidad = Alloy.Dimension() + ".png";
    $.lblAplicacion.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblCaracteristicas.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblSustancias.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblNombre.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblLab.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblTerapeuticos.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblCaracteristicas.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblDetAplicacion.applyProperties($.createStyle(Alloy.FuenteChica()));
    $.lblDetSustancias.applyProperties($.createStyle(Alloy.FuenteChica()));
    $.lblDetNombre.applyProperties($.createStyle(Alloy.FuenteChica()));
    $.lblDetLab.applyProperties($.createStyle(Alloy.FuenteChica()));
    $.lblDetTerapeuticos.applyProperties($.createStyle(Alloy.FuenteChica()));
    $.lblDetAttr.applyProperties($.createStyle(Alloy.FuenteMedia()));
    muestraCargando();
    var url = Alloy.CFG.urlAPI + "PLM/AllAttributesByProduct?divisionId=" + args.divisionIdField + "&categoryId=" + args.categotyIdField + "&productId=" + args.productIdField + "&pharmaFormId=" + args.pharmaFormIdField;
    var cliPLM = Titanium.Network.createHTTPClient({
        onload: function() {
            var prod = JSON.parse(this.responseText);
            Ti.API.info(this.responseText);
            $.lblDetNombre.text = prod.brandField;
            $.lblDetLab.text = prod.divisionNameField;
            for (var i = 0; prod.substancesField.length > i; i++) {
                var sus = prod.substancesField[i];
                $.lblDetSustancias.text += "" + sus.descriptionField + (0 == i ? "" : ",");
            }
            $.lblDetSustancias.text += ".";
            $.lblDetAplicacion.text = prod.pharmaFormField;
            for (var i = 0; prod.therapeuticsField.length > i; i++) {
                var ter = "" + prod.therapeuticsField[i];
                $.lblDetTerapeuticos.text += "" + ter.spanishDescriptionField + (0 == i ? " " : ",");
            }
            $.lblTerapeuticos.text += ".";
            var data = [];
            for (var i = 0; prod.attributesField.length > i; i++) {
                var attr = prod.attributesField[i];
                var row = Ti.UI.createTableViewRow();
                row.rightImage = "/images/der" + calidad;
                row.height = "18%";
                row.title = attr.attributeNameField;
                row.detalle = attr.attributeContentField;
                data.push(row);
            }
            $.tbCaracteristicas.data = data;
            ocultaCargando();
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
    $.tbCaracteristicas.addEventListener("click", function(e) {
        $.lblDetAttr.text = e.row.detalle;
        $.vwDetalle.animate({
            top: "20%",
            duration: 500,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
    });
    $.imgCloseDetalle.addEventListener("click", function() {
        $.vwDetalle.animate({
            top: "100%",
            duration: 500,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
    });
    $.imgClose.addEventListener("click", function() {
        $.wnDetalleMed.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;