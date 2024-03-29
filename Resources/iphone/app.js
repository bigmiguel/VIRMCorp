var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var Util = require("utils");

Alloy.limpiaPicker = function(picker) {
    try {
        if (picker.columns[0]) {
            var _col = picker.columns[0];
            var len = _col.rowCount;
            for (var x = len - 1; x >= 0; x--) {
                var _row = _col.rows[x];
                _col.removeRow(_row);
            }
        }
    } catch (ex) {
        Ti.API.info(ex);
    }
};

try {
    Alloy.Globals.Map = require("ti.map");
} catch (ex) {
    alert(ex);
}

Alloy.FuenteTitulo = function() {
    if ("baja" == Alloy.Dimension()) return {
        font: {
            fontSize: "21%",
            fontWeight: "bold",
            font: "Segoe UI"
        }
    };
    if ("media" == Alloy.Dimension()) return {
        font: {
            fontSize: "36%",
            fontWeight: "bold",
            font: "Segoe UI"
        }
    };
    if ("alta" == Alloy.Dimension()) return {
        font: {
            fontSize: "72%",
            fontWeight: "bold",
            font: "Segoe UI"
        }
    };
};

Alloy.Fuente = function() {
    if ("baja" == Alloy.Dimension()) return {
        font: {
            fontSize: "12%",
            font: "Segoe UI"
        }
    };
    if ("media" == Alloy.Dimension()) return {
        font: {
            fontSize: "22%",
            font: "Segoe UI"
        }
    };
    if ("alta" == Alloy.Dimension()) return {
        font: {
            fontSize: "40%",
            font: "Segoe UI"
        }
    };
};

Alloy.FuenteMedia = function() {
    if ("baja" == Alloy.Dimension()) return {
        font: {
            fontSize: "15%",
            font: "Segoe UI"
        }
    };
    if ("media" == Alloy.Dimension()) return {
        font: {
            fontSize: "25%",
            font: "Segoe UI"
        }
    };
    if ("alta" == Alloy.Dimension()) return {
        font: {
            fontSize: "50%",
            font: "Segoe UI"
        }
    };
};

Alloy.FuenteChica = function() {
    if ("baja" == Alloy.Dimension()) return {
        font: {
            fontSize: "10%",
            font: "Segoe UI"
        }
    };
    if ("media" == Alloy.Dimension()) return {
        font: {
            fontSize: "16%",
            font: "Segoe UI"
        }
    };
    if ("alta" == Alloy.Dimension()) return {
        font: {
            fontSize: "32%",
            font: "Segoe UI"
        }
    };
};

Alloy.espacioMenu = function() {
    if ("baja" == Alloy.Dimension()) return 15;
    if ("media" == Alloy.Dimension()) return 30;
    if ("alta" == Alloy.Dimension()) return 45;
};

Alloy.espacioTarjeta = function() {
    if ("baja" == Alloy.Dimension()) return Util.isIPhone5() ? "100dp" : "60dp";
    if ("media" == Alloy.Dimension()) return Util.isIPhone5() ? "115dp" : "75dp";
    if ("alta" == Alloy.Dimension()) return Util.isIPhone5() ? "140dp" : "110dp";
};

Alloy.Dimension = function() {
    var ancho = Ti.Platform.displayCaps.platformWidth;
    if (480 > ancho) return "baja";
    if (ancho >= 480 && 600 > ancho) return "media";
    if (ancho >= 600) return "alta";
};

Alloy.createController("index");