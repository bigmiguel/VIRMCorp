function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        navBarHidden: "true",
        backgroundColor: "white",
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.vwTopIOS = Ti.UI.createView({
        backgroundColor: "#FFF",
        id: "vwTopIOS"
    });
    $.__views.index.add($.__views.vwTopIOS);
    $.__views.navview = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: Ti.Platform.displayCaps.platformWidth,
        height: "10%",
        backgroundColor: "#00359C",
        color: "#FFF",
        id: "navview"
    });
    $.__views.index.add($.__views.navview);
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
        id: "lblTitulo",
        backgroundColor: "none",
        backgroundGradient: "none"
    });
    $.__views.navview.add($.__views.lblTitulo);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        image: "/images/medicavrim.png"
    });
    $.__views.index.add($.__views.image);
    $.__views.vwLogin = Ti.UI.createView({
        id: "vwLogin",
        layout: "vertical"
    });
    $.__views.index.add($.__views.vwLogin);
    $.__views.txtNEmpleado = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "1dp",
        borderRadius: 5,
        borderColor: "#999",
        color: "#00359C",
        backgroundColor: "#FFFFFF",
        top: "5px",
        width: "70%",
        autocorrect: false,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "txtNEmpleado",
        hintText: "Numero de Tarjeta"
    });
    $.__views.vwLogin.add($.__views.txtNEmpleado);
    $.__views.btnLogin = Ti.UI.createButton({
        backgroundColor: "#00359C",
        color: "#FFF",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "0.4dp",
        borderRadius: 5,
        top: "5dp",
        width: "60%",
        title: "Login",
        id: "btnLogin"
    });
    $.__views.vwLogin.add($.__views.btnLogin);
    $.__views.btnMasTarde = Ti.UI.createButton({
        backgroundColor: "#00359C",
        color: "#FFF",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: "0.4dp",
        borderRadius: 5,
        top: "5dp",
        width: "60%",
        title: "Recordar Despues",
        id: "btnMasTarde"
    });
    $.__views.vwLogin.add($.__views.btnMasTarde);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Util = require("utils");
    $.vwTopIOS.setHeight(Util.isiOS7Plus() ? 20 : 0);
    $.lblTitulo.applyProperties($.createStyle(Alloy.FuenteTitulo()));
    $.btnLogin.applyProperties($.createStyle(Alloy.Fuente()));
    $.txtNEmpleado.applyProperties($.createStyle(Alloy.Fuente()));
    $.btnLogin.setWidth("40%");
    $.btnMasTarde.addEventListener("click", function() {
        var _principal = Alloy.createController("slideMenu");
        $.index.close();
        _principal.getView().open();
        $.index = null;
    });
    $.btnLogin.addEventListener("click", function() {
        if ("" == $.txtNEmpleado.value) {
            alert("El numero de empledo no puede estar vacio.");
            return;
        }
        var api = Alloy.CFG.urlAPI + "membresia/LigarMembresia";
        var cliSSL = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                Ti.App.Properties.setString("usuario", this.responseText);
                var _principal = Alloy.createController("slideMenu");
                $.index.close();
                _principal.getView().open();
                $.index = null;
            },
            onerror: function(e) {
                var error = JSON.parse(e);
                Ti.UI.createAlertDialog({
                    message: error,
                    ok: "Ok",
                    title: "Datos invalidos"
                }).show();
            }
        });
        var user = {
            NO_TARJETA: "0738121200000467"
        };
        cliSSL.open("POST", api, true);
        Ti.API.info(JSON.stringify(user));
        cliSSL.setRequestHeader("Accept", "application/json");
        cliSSL.setRequestHeader("Content-Type", "application/json");
        cliSSL.send(JSON.stringify(user));
    });
    var user = Util.user();
    if (null != user) {
        var _principal = Alloy.createController("slideMenu");
        $.index.close();
        _principal.getView().open();
        $.index = null;
    } else $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;