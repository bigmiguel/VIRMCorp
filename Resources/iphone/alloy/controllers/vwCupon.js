function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vwCupon";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.sclCupon = Ti.UI.createScrollView({
        backgroundColor: "#FFF",
        layout: "vertical",
        left: "2%",
        width: "47%",
        top: "1%",
        shadow: {
            shadowRadius: 10,
            shadowOpacity: .5,
            shadowOffset: {
                x: 5,
                y: 10
            },
            shadowColor: "#000"
        },
        id: "sclCupon"
    });
    $.__views.sclCupon && $.addTopLevelView($.__views.sclCupon);
    $.__views.imgCupon = Ti.UI.createImageView({
        left: "10%",
        width: "80%",
        top: "1%",
        id: "imgCupon"
    });
    $.__views.sclCupon.add($.__views.imgCupon);
    $.__views.lblDescripcion = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        id: "lblDescripcion"
    });
    $.__views.sclCupon.add($.__views.lblDescripcion);
    $.__views.lblRestrcion = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        id: "lblRestrcion"
    });
    $.__views.sclCupon.add($.__views.lblRestrcion);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.imgCupon.image = args.UrlLogo;
    $.lblDescripcion.applyProperties($.createStyle(Alloy.FuenteChica()));
    $.lblRestrcion.applyProperties($.createStyle(Alloy.FuenteChica()));
    $.lblDescripcion.text = args.DescripcionCupon;
    $.lblRestrcion.text = args.Restricciones;
    $.imgCupon.cupon = $.lblDescripcion.cupon = $.lblRestrcion.cupon = args;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;