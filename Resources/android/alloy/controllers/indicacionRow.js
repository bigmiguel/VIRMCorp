function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "indicacionRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.indicacionRow = Ti.UI.createView({
        backgroundColor: "white",
        layout: "vertical",
        id: "indicacionRow"
    });
    $.__views.indicacionRow && $.addTopLevelView($.__views.indicacionRow);
    $.__views.lblDistancia = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        id: "lblDistancia"
    });
    $.__views.indicacionRow.add($.__views.lblDistancia);
    $.__views.lblIndicacion = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#21485D",
        id: "lblIndicacion"
    });
    $.__views.indicacionRow.add($.__views.lblIndicacion);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var paso = args.paso;
    var banInicio = args.banInicio;
    $.lblDistancia.applyProperties($.createStyle(Alloy.FuenteTitulo()));
    $.lblIndicacion.applyProperties($.createStyle(Alloy.FuenteMedia()));
    if (banInicio) {
        $.lblDistancia.text = paso.distance.text;
        $.lblIndicacion.text = paso.duration.text;
    } else {
        $.lblDistancia.text = paso.distance.text;
        var pattern = new RegExp("<[^>]+>", "g");
        $.lblIndicacion.text = paso.html_instructions;
        $.lblIndicacion.text = $.lblIndicacion.text.replace(pattern, "");
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;