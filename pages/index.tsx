import Head from 'next/head'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Main from '../components/Main'
import theme from '../styles/theme'
import GlobalStyles from '../styles/GlobalStyles'

const Wrapper = styled.div`
	height: 100%;
`

export default function Home() {
	const [isDarkMode, setIsDarkMode] = React.useState(false)

	const adjustedTheme = isDarkMode ? theme.dark : theme.light

	function changeTheme() {
		setIsDarkMode((curr) => !curr)
	}

	return (
		<Wrapper>
			<Head>
				<title>Pwr Park</title>
				<meta name="description" content="Aplikacja do śledzenia ilości miejsc parkingowych na parkingach PWr" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ThemeProvider theme={adjustedTheme}>
				<GlobalStyles />
				<Main isDarkMode={isDarkMode} changeTheme={changeTheme} />
			</ThemeProvider>
		</Wrapper>
	)
}
