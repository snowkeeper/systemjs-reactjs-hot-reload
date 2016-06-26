import { colors, themeManager, getMuiTheme } from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { defaultsDeep as deep } from 'lodash';
 
export let NIGHT  = deep( {
	palette: {
		primary1Color: '#223E77',
		textColor: colors.blueGrey200,
		alternateTextColor: colors.lightBlue50,
		primary2Color: '#3B71E2',
		canvasColor: '#303234',
		accent1Color: colors.blueGrey50,
		accent2Color: colors.blueGrey400,
		accent3Color: "#FA905C",
		disabledColor: colors.grey600,
	},
	appBar: {
		buttonColor: colors.blueGrey200
	},
}, darkBaseTheme);

export let LIGHT  = deep( {	
	palette: {
		primary1Color: '#FFFFFF',
		textColor: colors.blueGrey600,
		alternateTextColor: colors.blueGrey600,
		primary2Color: '#3B71E2',
		canvasColor: '#FFFFFF',
		accent1Color: colors.blueGrey50,
		accent2Color: colors.blueGrey500,
		accent3Color: "#FA905C",
		disabledColor: colors.grey600,
	}
}, lightBaseTheme);

export let CREAM  = deep( {
	palette: {
		primary1Color: 'initial',
		primary2Color: colors.lightBlue700,
		textColor: colors.grey700,
		accent1Color: colors.blueGrey50,
		accent2Color: colors.blueGrey500,
		accent3Color: colors.lightBlack,
		alternateTextColor: colors.blueGrey600,
	}
}, lightBaseTheme);

export let GRAPHITE  = deep( {
	palette: {
		primary1Color: 'initial',
		primary2Color: colors.lightBlue700,
		textColor: colors.blueGrey200,
		accent1Color: colors.blueGrey50,
		accent2Color: colors.blueGrey400,
		accent3Color: "#FA905C",
		alternateTextColor: colors.blueGrey200,
	},
	appBar: {
		textColor: colors.blueGrey200,
		buttonColor: colors.blueGrey400
	},
}, darkBaseTheme);


export let BLUE  = deep( {
	palette: {
		primary1Color: '#0C87C1',
		textColor: colors.blueGrey700,
		alternateTextColor: '#fff',
	},
	appBar: {
		textColor: '#fff',
		buttonColor: '#bbb'
	}
}, lightBaseTheme);

export let DEFAULT  = lightBaseTheme;

export let DARK  = darkBaseTheme;

export let Styles = {
	Colors: colors,
	getMuiTheme: getMuiTheme,
	ThemeManager: themeManager,
	DarkRawTheme: darkBaseTheme,
	LightRawTheme: lightBaseTheme,
	DARK,
	DEFAULT,
	BLUE,
	GRAPHITE,
	LIGHT,
	NIGHT,
	CREAM
}
