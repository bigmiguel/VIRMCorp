function Controller() {
    function muestraCargando() {
        $.cargando.show();
        $.vwCarga.show();
    }
    function ocultaCargando() {
        $.vwCarga.hide();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vwListaCupones";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.wnCupones = Ti.UI.createWindow({
        navBarHidden: "true",
        id: "wnCupones"
    });
    $.__views.wnCupones && $.addTopLevelView($.__views.wnCupones);
    $.__views.__alloyId13 = Ti.UI.createView({
        top: "0",
        layout: "vertical",
        id: "__alloyId13"
    });
    $.__views.wnCupones.add($.__views.__alloyId13);
    $.__views.vwTopIOS = Ti.UI.createView({
        backgroundColor: "#FFF",
        id: "vwTopIOS"
    });
    $.__views.__alloyId13.add($.__views.vwTopIOS);
    $.__views.navview = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: Ti.Platform.displayCaps.platformWidth,
        height: "10%",
        backgroundColor: "#00359C",
        color: "#FFF",
        id: "navview"
    });
    $.__views.__alloyId13.add($.__views.navview);
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
        text: "Cupones",
        id: "lblTitulo",
        backgroundColor: "none",
        backgroundGradient: "none"
    });
    $.__views.navview.add($.__views.lblTitulo);
    $.__views.vwCupones = Ti.UI.createScrollView({
        layout: "horizontal",
        top: 0,
        backgroundColor: "#F2F2F2",
        id: "vwCupones"
    });
    $.__views.__alloyId13.add($.__views.vwCupones);
    $.__views.vwContCupones = Ti.UI.createView({
        layout: "horizontal",
        id: "vwContCupones"
    });
    $.__views.vwCupones.add($.__views.vwContCupones);
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
    $.__views.wnCupones.add($.__views.vwCarga);
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
    var alto = Titanium.Platform.displayCaps.platformHeight / 2.5;
    var args = arguments[0] || {};
    var user = Util.user();
    var idTipoCupon = args.idTipoCupon;
    var latitudG = 22.71539;
    var longitudG = -101.25489;
    muestraCargando();
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.distanceFilter = 10;
    Ti.Geolocation.purpose = "Mostrar tu posición actual";
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (!e.success || e.error) return;
        longitudG = e.coords.longitude;
        latitudG = e.coords.latitude;
        var url = Alloy.CFG.urlCupones + "GetCuponesMembresia?membresia=" + user.NO_TARJETA + "&tipo=" + idTipoCupon + "&latitud=" + latitudG + "&longitud=" + longitudG;
        Ti.API.info(url);
        var cliCupones = Ti.Network.createHTTPClient({
            onload: function() {
                var cupones = JSON.parse(this.responseText);
                Ti.API.info(this.responseText);
                $.vwContCupones.height = (alto + 10) * ((cupones.length > 4 ? cupones.length : 4) / 2 + cupones.length % 2);
                for (var i = 0; cupones.length > i; i++) {
                    var cupon = cupones[i];
                    var vwCupon = Alloy.createController("vwCupon", cupon).getView();
                    vwCupon.height = alto;
                    vwCupon.cupon = cupon;
                    vwCupon.addEventListener("click", function(e) {
                        var it = e.source;
                        var nuevaVista = Alloy.createController("vwDetalleCupon", {
                            cupon: it.cupon
                        }).getView();
                        nuevaVista.open({
                            transition: Titanium.UI.iPhone.AnimationStyle.CURL_UP
                        });
                    });
                    $.vwContCupones.add(vwCupon);
                    ocultaCargando();
                }
            },
            onerror: function(e) {
                ocultaCargando();
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
    });
    $.btnMenu.addEventListener("click", function() {
        $.wnCupones.close({
            transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;