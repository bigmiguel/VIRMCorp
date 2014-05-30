/**
 * @author Miguel Bennetts
 */
exports.AgregaSeleccionar = function (picker){
	picker.add(Ti.UI.createPickerRow({
		title: 'Selecionar...',
		value: 0
	}));
	};

exports.isIPhone5 = function  () {
  	if(Ti.Platform.model.indexOf('iPhone')> -1)
	{
		var modelo = Ti.Platform.model.split(',')[0];
		var generacion = parseInt(modelo.replace('iPhone',''));
		if(generacion >= 5)
			return true;
		else
			return false; 	
	}
	else
		return false;
};

exports.isiOS7Plus= function()
{
	// iOS-specific test
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);

		// Can only test this support on a 3.2+ device
		if (major >= 7)
		{
			return true;
		}
	}
	return false;
};

exports.user = function() {
	return JSON.parse(Ti.App.Properties.getString("usuario"));
};
  

