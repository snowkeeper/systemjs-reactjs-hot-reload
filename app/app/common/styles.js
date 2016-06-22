import { colors, themeManager, getMuiTheme } from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

export let myStyles = {
	primary1Color: '#223E77',
	textColor: colors.blueGrey200,
	alternateTextColor: colors.lightBlue50,
	primary2Color: '#3B71E2',
	canvasColor: '#303234',
	accent1Color: colors.blueGrey50,
	accent2Color: colors.blueGrey400,
	accent3Color: "#FA905C",
	disabledColor: colors.grey600,
}

export let myStylesWhite = {
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

export let myStylesLight = {
	primary1Color: 'initial',
	primary2Color: colors.lightBlue700,
	textColor: colors.grey700,
	accent1Color: colors.blueGrey50,
    accent2Color: colors.blueGrey500,
    accent3Color: colors.lightBlack,
    alternateTextColor: colors.blueGrey600,
}

export let myStylesGraphite = {
	primary1Color: 'initial',
	primary2Color: colors.lightBlue700,
    textColor: colors.blueGrey200,
    accent1Color: colors.blueGrey50,
	accent2Color: colors.blueGrey400,
	accent3Color: "#FA905C",
	alternateTextColor: colors.blueGrey200,
}

export let myStylesDefault = {
	primary1Color: '#0C87C1',
	alternateTextColor: '#fff',
}

export let myStylesDefaultDark = {
	alternateTextColor: '#fff',
}

export let Styles = {
	Colors: colors,
	getMuiTheme: getMuiTheme,
	ThemeManager: themeManager,
	DarkRawTheme: darkBaseTheme,
	LightRawTheme: lightBaseTheme
}
