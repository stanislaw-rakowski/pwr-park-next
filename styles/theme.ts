const theme = {
	light: {
		primaryBackground: '#FFF',
		secondaryBackground: '#B6B6B6',
		primaryFontColor: '#000',
		accentColor: '#B12009',
	},
	dark: {
		primaryBackground: '#000',
		secondaryBackground: '#1F1F1F',
		primaryFontColor: '#FFF',
		accentColor: '#B12009',
	},
} as const

export type Theme = typeof theme

export default theme
