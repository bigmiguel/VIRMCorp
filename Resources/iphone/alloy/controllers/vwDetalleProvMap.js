function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vwDetalleProvMap";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.vwTodo = Ti.UI.createScrollView({
        width: "85%",
        height: "50%",
        layout: "vertical",
        zIndex: 999999,
        backgroundColor: "#FAFAFA",
        id: "vwTodo"
    });
    $.__views.vwTodo && $.addTopLevelView($.__views.vwTodo);
    $.__views.vwDireccion = Ti.UI.createView({
        top: "1%",
        width: "98%",
        left: "1%",
        height: "98%",
        backgroundColor: "#FFF",
        id: "vwDireccion"
    });
    $.__views.vwTodo.add($.__views.vwDireccion);
    $.__views.lblProveedor = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "3%",
        id: "lblProveedor",
        top: "2%"
    });
    $.__views.vwDireccion.add($.__views.lblProveedor);
    $.__views.lblDireccion = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "3%",
        id: "lblDireccion",
        top: "25%"
    });
    $.__views.vwDireccion.add($.__views.lblDireccion);
    $.__views.imgComoLlegar = Ti.UI.createImageView({
        id: "imgComoLlegar",
        image: "/images/clock.png",
        bottom: "10%",
        width: "10%",
        left: "3%"
    });
    $.__views.vwDireccion.add($.__views.imgComoLlegar);
    $.__views.lblHorario = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        text: "Cómo Llegar..",
        id: "lblHorario",
        bottom: "9.5%",
        left: "14%"
    });
    $.__views.vwDireccion.add($.__views.lblHorario);
    $.__views.imgComoLlegar = Ti.UI.createImageView({
        id: "imgComoLlegar",
        image: "/images/ruta.png",
        bottom: "3%",
        width: "10%",
        left: "3%"
    });
    $.__views.vwDireccion.add($.__views.imgComoLlegar);
    $.__views.lblComollegar = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#FD5904",
        text: "Cómo Llegar..",
        id: "lblComollegar",
        bottom: "3%",
        left: "14%"
    });
    $.__views.vwDireccion.add($.__views.lblComollegar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var suc = arguments[0] || {};
    $.lblProveedor.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblDireccion.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblComollegar.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblHorario.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblProveedor.text = suc.SUCURSAL;
    $.lblDireccion.text = suc.DIRECCION.CALLE + ", " + suc.DIRECCION.COLONIA + ", " + suc.DIRECCION.MUNICIPIO + ", " + suc.DIRECCION.ESTADO + ", CP: " + suc.DIRECCION.CP;
    $.lblHorario.text = suc.DIRECCION.HORARIO;
    $.imgComoLlegar.addEventListener("click", function() {
        Ti.App.fireEvent("creaRutaCupon", {
            latitud: suc.DIRECCION.EJEX,
            longitud: suc.DIRECCION.EJEY
        });
    });
    $.lblComollegar.addEventListener("click", function() {
        Ti.App.fireEvent("creaRutaCupon", {
            latitud: suc.DIRECCION.EJEX,
            longitud: suc.DIRECCION.EJEY
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;