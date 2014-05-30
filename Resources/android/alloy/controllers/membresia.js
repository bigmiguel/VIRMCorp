function Controller() {
    function ajustaImagen() {
        var numTar = "";
        for (var i = 0; user.NO_TARJETA.length > i; i++) {
            numTar += user.NO_TARJETA[i];
            0 == (i + 1) % 4 && (numTar += " ");
        }
        $.lblTitular.text = user.NOMBRE_TARJETA;
        $.lblMembresia.text = numTar;
        $.lblVigencia.text = "Vence " + user.FECHA_VIGENCIA.substring(0, 10);
        $.lblMembresia.left = "10%";
        $.lblMembresia.top = .32 * $.vwMembresia.size.height + $.lblMembresia.size.width / 2;
        $.lblTitular.left = "5%";
        $.lblTitular.top = .28 * $.vwMembresia.size.height + $.lblMembresia.size.width / 2;
        $.lblHora.right = "5%";
        $.lblHora.bottom = "10%";
        $.lblVigencia.left = "-2%";
        $.lblVigencia.bottom = "20%";
        $.imgTarjeta.height = .9 * $.vwMembresia.size.width;
        $.imgTarjeta.width = $.vwMembresia.size.height;
        $.imgTarjeta.top = Alloy.espacioTarjeta();
        $.imgTarjeta.show();
        $.imgTarjeta.transform = trans;
        $.vwMembresia.removeEventListener("postlayout", ajustaImagen);
        $.lblTitular.applyProperties($.createStyle(Alloy.FuenteMedia()));
        $.lblMembresia.applyProperties($.createStyle(Alloy.FuenteTitulo()));
        $.lblHora.applyProperties($.createStyle(Alloy.FuenteTitulo()));
        $.lblVigencia.applyProperties($.createStyle(Alloy.FuenteTitulo()));
        $.lblVigencia.transform = $.lblHora.transform = $.lblTitular.transform = $.lblMembresia.transform = trans;
        Ti.App.fireEvent("ocultaCargando");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "membresia";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.vwMembresia = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "vwMembresia"
    });
    $.__views.vwMembresia && $.addTopLevelView($.__views.vwMembresia);
    $.__views.imgTarjeta = Ti.UI.createImageView({
        id: "imgTarjeta",
        image: "/images/clasica.png",
        visible: "false"
    });
    $.__views.vwMembresia.add($.__views.imgTarjeta);
    $.__views.lblHora = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#FFF",
        id: "lblHora"
    });
    $.__views.vwMembresia.add($.__views.lblHora);
    $.__views.lblTitular = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#FFF",
        id: "lblTitular",
        zIndex: "99999"
    });
    $.__views.vwMembresia.add($.__views.lblTitular);
    $.__views.lblMembresia = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#FFF",
        id: "lblMembresia",
        zIndex: "99999"
    });
    $.__views.vwMembresia.add($.__views.lblMembresia);
    $.__views.lblVigencia = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#FFF",
        id: "lblVigencia"
    });
    $.__views.vwMembresia.add($.__views.lblVigencia);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Util = require("utils");
    try {
        require("date");
    } catch (e) {}
    arguments[0] || {};
    var user = Util.user();
    var trans = Ti.UI.create2DMatrix();
    trans = trans.rotate(90);
    $.vwMembresia.addEventListener("postlayout", ajustaImagen);
    setInterval(function() {
        $.lblHora.text = new Date().toString("HH:mm:ss");
    }, 1e3);
    exports.destroy = function() {};
    Alloy.Globals.current = $;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;