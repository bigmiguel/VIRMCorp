function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vwCupones";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tbCategorias = Ti.UI.createTableView({
        backgroundColor: "white",
        layout: "vertical",
        id: "tbCategorias"
    });
    $.__views.tbCategorias && $.addTopLevelView($.__views.tbCategorias);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Util = require("utils");
    arguments[0] || {};
    var user = Util.user();
    var calidad = Alloy.Dimension() + ".png";
    var url = Alloy.CFG.urlCupones + "GetCategoriasMembresia?membresia=" + user.NO_TARJETA;
    Ti.API.info(url);
    Ti.App.fireEvent("muestraCargando");
    var cliCupones = Ti.Network.createHTTPClient({
        onload: function() {
            var cupones = JSON.parse(this.responseText);
            var dataTable = [];
            var sec = Ti.UI.createTableViewSection({
                headerTitle: "Categorias"
            });
            for (var i = 0; cupones.length > i; i++) {
                var cupon = cupones[i];
                var row = Ti.UI.createTableViewRow();
                row.rightImage = "/images/der" + calidad;
                row.height = .1 * Titanium.Platform.displayCaps.platformHeight;
                row.idTipoCupon = cupon.idTipoCupon;
                var lbl = Ti.UI.createLabel({
                    textAling: "TEXT_ALIGNMENT_LEFT",
                    text: cupon.Descripcion,
                    left: 3
                });
                lbl.idTipoCupon = row.idTipoCupon = cupon.idTipoCupon;
                lbl.applyProperties($.createStyle(Alloy.FuenteMedia()));
                row.addEventListener("click", function(e) {
                    var it = e.source;
                    var nuevaVista = Alloy.createController("vwListaCupones", {
                        idTipoCupon: it.idTipoCupon
                    }).getView();
                    nuevaVista.open({
                        transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
                    });
                });
                row.add(lbl);
                sec.add(row);
            }
            dataTable.push(sec);
            $.tbCategorias.data = dataTable;
            Ti.App.fireEvent("ocultaCargando");
        },
        onerror: function(e) {
            Ti.App.fireEvent("ocultaCargando");
            var error = JSON.stringify(e);
            Ti.UI.createAlertDialog({
                message: "Error:" + error,
                ok: "Aceptar",
                title: "Error Membresia"
            }).show();
        }
    });
    cliCupones.open("GET", url);
    cliCupones.send();
    exports.destroy = function() {};
    Alloy.Globals.current = $;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;