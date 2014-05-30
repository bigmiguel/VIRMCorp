function Controller() {
    function _MenuIzquierdo() {
        true == $.btnMenu.toggle ? cierraMenuIzquierdo() : abreMenuIzquierdo();
    }
    function _MenuDerecho() {
        true == $.btnMenuDer.toggle ? cierraMenuDerecho() : abreMenuDerecho();
    }
    function abreMenuIzquierdo() {
        $.leftMenu.show();
        $.rightMenu.hide();
        $.movableview.animate({
            left: "60%",
            duration: 400,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.btnMenu.toggle = true;
    }
    function cierraMenuIzquierdo() {
        $.movableview.setWidth(Titanium.Platform.displayCaps.platformWidth);
        $.movableview.animate({
            left: 0,
            duration: 400,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.btnMenu.toggle = false;
    }
    function abreMenuDerecho() {
        $.leftMenu.hide();
        $.rightMenu.show();
        $.movableview.animate({
            left: "-80%",
            duration: 400,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.btnMenuDer.toggle = true;
    }
    function cierraMenuDerecho() {
        $.movableview.setWidth(Titanium.Platform.displayCaps.platformWidth);
        $.movableview.animate({
            left: 0,
            duration: 400,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.btnMenuDer.toggle = false;
    }
    function muestraCargando() {
        $.cargando.show();
        $.vwCarga.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "slideMenu";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.wnSlideMenu = Ti.UI.createWindow({
        id: "wnSlideMenu",
        navBarHidden: "true"
    });
    $.__views.wnSlideMenu && $.addTopLevelView($.__views.wnSlideMenu);
    $.__views.vwTopIOS = Ti.UI.createView({
        backgroundColor: "#FFFFFF",
        id: "vwTopIOS",
        top: "0"
    });
    $.__views.wnSlideMenu.add($.__views.vwTopIOS);
    $.__views.containerview = Ti.UI.createView({
        id: "containerview"
    });
    $.__views.wnSlideMenu.add($.__views.containerview);
    $.__views.leftMenu = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: "60%",
        zIndex: "0",
        backgroundColor: "#333333",
        layout: "vertical",
        id: "leftMenu"
    });
    $.__views.containerview.add($.__views.leftMenu);
    $.__views.leftTableView = Ti.UI.createScrollView({
        id: "leftTableView",
        layout: "vertical"
    });
    $.__views.leftMenu.add($.__views.leftTableView);
    $.__views.rightMenu = Ti.UI.createView({
        top: "0dp",
        right: "0dp",
        width: "80%",
        zIndex: "0",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "100%",
                y: "70%"
            },
            endPoint: {
                x: "100%",
                y: "100%"
            },
            colors: [ {
                color: "#4E6EAD",
                offset: .01
            }, {
                color: "#95ABD6",
                offset: 1
            } ]
        },
        layout: "vertical",
        id: "rightMenu",
        visible: "false"
    });
    $.__views.containerview.add($.__views.rightMenu);
    $.__views.movableview = Ti.UI.createView({
        id: "movableview"
    });
    $.__views.containerview.add($.__views.movableview);
    $.__views.shadowview = Ti.UI.createView({
        shadowColor: "black",
        shadowOffset: {
            x: "0",
            y: "0"
        },
        shadowRadius: "5",
        id: "shadowview"
    });
    $.__views.movableview.add($.__views.shadowview);
    $.__views.navview = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: Ti.Platform.displayCaps.platformWidth,
        height: "10%",
        backgroundColor: "#00359C",
        color: "#FFF",
        id: "navview"
    });
    $.__views.shadowview.add($.__views.navview);
    $.__views.btnMenu = Ti.UI.createView({
        backgroundColor: "none",
        left: 0,
        top: 0,
        width: "40%",
        height: "100%",
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
        backgroundImage: "/images/ButtonMenu.png",
        width: "30%",
        left: "2%",
        zIndex: 1,
        id: "imgMenu"
    });
    $.__views.btnMenu.add($.__views.imgMenu);
    $.__views.btnMenuDer = Ti.UI.createView({
        backgroundColor: "none",
        right: 0,
        top: 0,
        width: "40%",
        height: "100%",
        style: "none",
        zIndex: 2,
        id: "btnMenuDer",
        visible: "false"
    });
    $.__views.navview.add($.__views.btnMenuDer);
    $.__views.imgMenuDer = Ti.UI.createButton({
        backgroundColor: "none",
        color: "#FFF",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderWidth: 0,
        borderRadius: 5,
        backgroundImage: "/images/ButtonMenuDer.png",
        width: "30%",
        right: "4%",
        zIndex: 1,
        id: "imgMenuDer"
    });
    $.__views.btnMenuDer.add($.__views.imgMenuDer);
    $.__views.lblTitulo = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#FFFFFF",
        textAlign: "center",
        shadowColor: "#000000",
        shadowOffset: {
            x: 0,
            y: 3
        },
        zIndex: 0,
        text: "Medica VRIM",
        id: "lblTitulo",
        backgroundColor: "none",
        backgroundGradient: "none"
    });
    $.__views.navview.add($.__views.lblTitulo);
    $.__views.contentview = Ti.UI.createView({
        left: "0dp",
        width: Ti.Platform.displayCaps.platformWidth,
        height: Ti.UI.Fill,
        top: "10%",
        backgroundColor: "white",
        zindex: 2,
        id: "contentview",
        moving: "false",
        axis: "0"
    });
    $.__views.shadowview.add($.__views.contentview);
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
    $.__views.containerview.add($.__views.vwCarga);
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
    $.containerview.top = Util.isiOS7Plus() ? 20 : 0;
    $.lblTitulo.applyProperties($.createStyle(Alloy.FuenteTitulo()));
    Titanium.Platform.displayCaps.platformHeight;
    Ti.Platform.displayCaps.platformWidth;
    var user = Util.user();
    muestraCargando();
    var MenuSI = [ {
        icon: "/images/user.png",
        titulo: void 0 == user.NOMBRE_TARJETA ? "No tienes tarjete" : user.NOMBRE_TARJETA,
        vista: null,
        params: null,
        banTitulo: true
    }, {
        icon: "/images/membresia.png",
        titulo: "Mi Membresía",
        vista: "membresia",
        params: null,
        banTitulo: false
    }, {
        icon: "/images/medicos.png",
        titulo: "# Emergencia",
        vista: "vwNumEmergencia",
        banTitulo: false
    }, {
        icon: "/images/ambulancias.png",
        titulo: "Ambulancia",
        vista: "",
        params: null,
        banTitulo: false,
        banAmbulancia: true
    }, {
        icon: "/images/user.png",
        titulo: "Red Médica",
        vista: null,
        params: null,
        banTitulo: true
    }, {
        icon: "/images/medicos.png",
        titulo: "Medicos",
        vista: "redMedicos",
        params: {
            idAfiliacion: "2",
            idTipoBusqueda: "1"
        },
        banTitulo: false
    }, {
        icon: "/images/ambulancias.png",
        titulo: "Serviciòs",
        vista: "redMedicos",
        params: {
            idAfiliacion: "2",
            idTipoBusqueda: "2"
        },
        banTitulo: false
    }, {
        icon: "/images/labicon.png",
        titulo: "Laboratorios",
        vista: "redMedicos",
        params: {
            idAfiliacion: "2",
            idTipoBusqueda: "4"
        },
        banTitulo: false
    }, {
        icon: "/images/tdc.png",
        titulo: "Red TDC",
        vista: null,
        params: null,
        banTitulo: true
    }, {
        icon: "/images/tdc.png",
        titulo: "Descuentos TDC",
        vista: "redMedicos",
        params: {
            idAfiliacion: "2",
            idTipoBusqueda: "3"
        },
        banTitulo: false
    }, {
        icon: "/images/tdc.png",
        titulo: "Cupones",
        vista: "vwCupones",
        params: null,
        banTitulo: false
    }, {
        icon: "/images/salud_interactiva.png",
        titulo: "Otros Servicios",
        vista: null,
        params: null,
        banTitulo: true
    }, {
        icon: "/images/PLM.png",
        titulo: "Medicamentos",
        vista: "vwPLMBusqueda",
        params: null,
        banTitulo: false
    }, {
        icon: "/images/link.png",
        titulo: "Seguro Inbursa",
        vista: null,
        params: {
            link: "https://medicavrim.com/PublicFiles/PrivacidadVRIM.pdf"
        },
        banTitulo: false,
        banLink: true
    }, {
        icon: "/images/link.png",
        titulo: "Aviso de Privacidad",
        vista: null,
        params: {
            link: "http://imagenes.medicallhome.com.mx/docs/restriccionesinbursa.pdf"
        },
        banTitulo: false,
        banLink: true
    } ];
    for (var i = 0; MenuSI.length > i; i++) {
        var _parametros = MenuSI[i];
        var _menuFila = Alloy.createController("menurow", _parametros).getView();
        $.leftTableView.add(_menuFila);
        _parametros.banTitulo ? _menuFila.backgroundColor = "#333333" : _parametros.banAmbulancia ? _menuFila.addEventListener("click", function() {
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: [ "Llamar", "Cancelar" ],
                message: "4209 3205",
                title: "Ambulancia"
            });
            dialog.addEventListener("click", function(e) {
                0 === e.index && Ti.Platform.openURL("tel:42093205");
            });
            dialog.show();
        }) : _parametros.banLink ? _menuFila.addEventListener("click", function() {
            Ti.Platform.openURL(_parametros.params.link);
        }) : _menuFila.addEventListener("click", function(e) {
            cierraMenuIzquierdo();
            muestraCargando();
            Alloy.Globals.current.destroy();
            $.contentview.remove(_currentView);
            if (null != vistaDer) {
                $.rightMenu.remove(vistaDer);
                vistaDer = null;
            }
            $.btnMenuDer.hide();
            var nuevaVista = Alloy.createController(e.source.vista, e.source.params).getView();
            $.contentview.add(nuevaVista);
            _currentView = nuevaVista;
            $.contentview.setZIndex(2);
        });
    }
    Ti.App.addEventListener("muestraCargando", function() {
        muestraCargando();
    });
    Ti.App.addEventListener("ocultaCargando", function() {
        $.vwCarga.hide();
    });
    var vistaDer = null;
    Ti.App.addEventListener("muestraSubMenu", function(e) {
        $.rightMenu.removeAllChildren();
        $.btnMenuDer.show();
        vistaDer = Alloy.createController(e.vista, e.parametros).getView();
        $.rightMenu.add(vistaDer);
    });
    Ti.App.addEventListener("cierraMenuDer", function() {
        cierraMenuDerecho();
    });
    var vistaDet = null;
    Ti.App.addEventListener("MuestraDetalleProveedor", function(e) {
        setTimeout(function() {
            $.btnMenuDer.toogle || abreMenuDerecho();
        }, 100);
        $.rightMenu.removeAllChildren();
        vistaDet = null;
        vistaDet = Alloy.createController("detalleProveedor", e).getView();
        $.rightMenu.add(vistaDet);
    });
    Ti.App.addEventListener("regresaBusqueda", function() {
        null != vistaDet && $.rightMenu.remove(vistaDet);
        $.rightMenu.add(vistaDer);
        vistaDet = null;
    });
    $.wnSlideMenu.addEventListener("android:back", function() {
        var activity = Titanium.Android.currentActivity;
        activity.finish();
    });
    var _currentView = Alloy.createController("membresia").getView();
    $.contentview.add(_currentView);
    $.imgMenu.addEventListener("click", _MenuIzquierdo);
    $.btnMenuDer.addEventListener("click", _MenuDerecho);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;