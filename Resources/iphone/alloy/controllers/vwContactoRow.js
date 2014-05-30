function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vwContactoRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.lblFila = Ti.UI.createTableViewRow({
        height: "20%",
        top: 0,
        id: "lblFila"
    });
    $.__views.lblFila && $.addTopLevelView($.__views.lblFila);
    $.__views.__alloyId11 = Ti.UI.createImageView({
        image: "/images/user.png",
        left: "2%",
        width: "15%",
        id: "__alloyId11"
    });
    $.__views.lblFila.add($.__views.__alloyId11);
    $.__views.lblNumero = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        left: "20%",
        top: "10%",
        font: {
            fontSize: "13%"
        },
        id: "lblNumero"
    });
    $.__views.lblFila.add($.__views.lblNumero);
    $.__views.lblDetalle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#A9ABC4",
        top: "60%",
        left: "50%",
        font: {
            fontSize: "12%",
            fontWeight: "bold",
            font: "Segoe UI"
        },
        id: "lblDetalle"
    });
    $.__views.lblFila.add($.__views.lblDetalle);
    $.__views.imgDelete = Ti.UI.createImageView({
        id: "imgDelete",
        image: "/images/delete.png",
        right: "2%",
        width: "15%"
    });
    $.__views.lblFila.add($.__views.imgDelete);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.lblFila.numero = $.lblNumero.text = args.numero;
    $.lblDetalle.text = args.nombre;
    $.imgDelete.idContacto = args.id;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;