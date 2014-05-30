function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vwDetalleCupon";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.wnDetalle = Ti.UI.createWindow({
        navBarHidden: true,
        backgroundColor: "#FD5904",
        layout: "vertical",
        id: "wnDetalle"
    });
    $.__views.wnDetalle && $.addTopLevelView($.__views.wnDetalle);
    $.__views.imgClose = Ti.UI.createImageView({
        top: "2%",
        right: "5%",
        width: "15%",
        id: "imgClose",
        image: "/images/close.png"
    });
    $.__views.wnDetalle.add($.__views.imgClose);
    $.__views.__alloyId12 = Ti.UI.createScrollView({
        backgroundColor: "#FD5904",
        layout: "vertical",
        id: "__alloyId12"
    });
    $.__views.wnDetalle.add($.__views.__alloyId12);
    $.__views.vwDetalle = Ti.UI.createScrollView({
        backgroundColor: "#FFF",
        top: "1%",
        width: "90%",
        left: "5%",
        height: "50%",
        layout: "vertical",
        id: "vwDetalle"
    });
    $.__views.__alloyId12.add($.__views.vwDetalle);
    $.__views.imgCupon = Ti.UI.createImageView({
        top: "2%",
        width: "20%",
        left: "40%",
        id: "imgCupon"
    });
    $.__views.vwDetalle.add($.__views.imgCupon);
    $.__views.btnRedimir = Ti.UI.createButton({
        backgroundColor: "#FD5904",
        color: "#FFF",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "0.4dp",
        borderRadius: 5,
        top: "5%",
        width: "60%",
        height: "15%",
        title: "Redimir",
        id: "btnRedimir"
    });
    $.__views.vwDetalle.add($.__views.btnRedimir);
    $.__views.lblDescripcion = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        top: "5dp",
        id: "lblDescripcion"
    });
    $.__views.vwDetalle.add($.__views.lblDescripcion);
    $.__views.lblRestricciones = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        top: "5dp",
        id: "lblRestricciones"
    });
    $.__views.vwDetalle.add($.__views.lblRestricciones);
    $.__views.vwTiendaMasCerca = Ti.UI.createView({
        backgroundColor: "#FFF",
        top: "3%",
        width: "90%",
        left: "5%",
        height: "35%",
        id: "vwTiendaMasCerca"
    });
    $.__views.__alloyId12.add($.__views.vwTiendaMasCerca);
    $.__views.lblTitulo = Ti.UI.createLabel({
        width: "40%",
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "5%",
        top: "5%",
        text: "Donde Usar",
        id: "lblTitulo"
    });
    $.__views.vwTiendaMasCerca.add($.__views.lblTitulo);
    $.__views.lblProveedor = Ti.UI.createLabel({
        width: "40%",
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "5%",
        top: "25%",
        id: "lblProveedor"
    });
    $.__views.vwTiendaMasCerca.add($.__views.lblProveedor);
    $.__views.lblSucusal = Ti.UI.createLabel({
        width: "40%",
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "5%",
        top: "50%",
        id: "lblSucusal"
    });
    $.__views.vwTiendaMasCerca.add($.__views.lblSucusal);
    $.__views.vwMapa = Alloy.Globals.Map.createView({
        top: "10%",
        height: "80%",
        left: "52.5%",
        width: "45%",
        backgroundColor: "#000",
        enableZoomControls: false,
        compassEnabled: false,
        id: "vwMapa",
        ns: "Alloy.Globals.Map"
    });
    $.__views.vwTiendaMasCerca.add($.__views.vwMapa);
    $.__views.btnTiendas = Ti.UI.createButton({
        backgroundColor: "#FD5904",
        color: "#FFF",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "0.4dp",
        borderRadius: 5,
        bottom: "1%",
        left: "1%",
        width: "40%",
        height: "15%",
        title: "Ver Sucursales",
        id: "btnTiendas"
    });
    $.__views.vwTiendaMasCerca.add($.__views.btnTiendas);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Util = require("utils");
    var args = arguments[0] || {};
    var cupon = args.cupon;
    var sucursal = cupon.sucursales[0];
    var calidad = Alloy.Dimension() + ".png";
    var user = Util.user();
    $.btnTiendas.applyProperties($.createStyle(Alloy.Fuente()));
    $.btnRedimir.applyProperties($.createStyle(Alloy.Fuente()));
    $.lblDescripcion.applyProperties($.createStyle(Alloy.FuenteTitulo()));
    $.lblRestricciones.applyProperties($.createStyle(Alloy.FuenteMedia()));
    $.lblProveedor.applyProperties($.createStyle(Alloy.FuenteChica()));
    $.lblSucusal.applyProperties($.createStyle(Alloy.FuenteChica()));
    $.lblTitulo.applyProperties($.createStyle(Alloy.FuenteTitulo()));
    $.imgCupon.image = cupon.UrlLogo;
    $.lblDescripcion.text = cupon.DescripcionCupon;
    $.lblRestricciones.text = cupon.Restricciones;
    $.lblProveedor.text = cupon.RazonSocialProveedor;
    $.lblSucusal.text = sucursal.SUCURSAL;
    $.imgClose.addEventListener("click", function() {
        $.wnDetalle.close({
            transition: Titanium.UI.iPhone.AnimationStyle.CURL_DOWN
        });
    });
    $.btnTiendas.addEventListener("click", function() {
        var vwCupon = Alloy.createController("vwTiendas", cupon.sucursales).getView();
        vwCupon.open({
            modal: true
        });
    });
    $.btnRedimir.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "Confirmar", "Cancelar" ],
            message: "¿Estas seguro de redimir este cupon?",
            title: "Redimir"
        });
        dialog.addEventListener("click", function(e) {
            if (0 === e.index) {
                var url = Alloy.CFG.urlCupones + "GetCupon?membresia=" + user.NO_TARJETA + "&CuponId=" + cupon.CuponId;
                var cliCupones = Ti.Network.createHTTPClient({
                    onload: function() {
                        JSON.parse(this.responseText);
                        $.wnDetalle.close({
                            transition: Titanium.UI.iPhone.AnimationStyle.CURL_DOWN
                        });
                    },
                    onerror: function(e) {
                        Ti.App.fireEvent("ocultaCargando");
                        var error = JSON.stringify(e);
                        Ti.UI.createAlertDialog({
                            message: "Error:" + error.Message,
                            ok: "Aceptar",
                            title: "Error Membresia"
                        }).show();
                    }
                });
                cliCupones.open("GET", url);
                cliCupones.send();
            }
        });
        dialog.show();
    });
    var anotacion = Alloy.Globals.Map.createAnnotation({
        latitude: sucursal.DIRECCION.EJEX,
        longitude: sucursal.DIRECCION.EJEY,
        image: "/images/doc" + calidad,
        title: "" + sucursal.SUCURSAL
    });
    var newRegion = {
        latitude: sucursal.DIRECCION.EJEX,
        longitude: sucursal.DIRECCION.EJEY,
        latitudeDelta: .003,
        longitudeDelta: .003,
        animate: false
    };
    $.vwMapa.setLocation(newRegion);
    $.vwMapa.addAnnotation(anotacion);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;