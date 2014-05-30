exports.AgregaSeleccionar = function(picker) {
    picker.add(Ti.UI.createPickerRow({
        title: "Selecionar...",
        value: 0
    }));
};

exports.isIPhone5 = function() {
    if (Ti.Platform.model.indexOf("iPhone") > -1) {
        var modelo = Ti.Platform.model.split(",")[0];
        var generacion = parseInt(modelo.replace("iPhone", ""));
        return generacion >= 5 ? true : false;
    }
    return false;
};

exports.isiOS7Plus = function() {
    return false;
};

exports.user = function() {
    return JSON.parse(Ti.App.Properties.getString("usuario"));
};