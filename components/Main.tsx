import React from 'react'
import styled from 'styled-components'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import type { Data } from '../lib/types'

const Wrapper = styled.main`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.primaryFontColor};
	background-color: ${({ theme }) => theme.primaryBackground};

	* {
		transition: all 150ms ease;
	}
`

const Header = styled.div`
	width: 100%;
	height: 110px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`

const Title = styled.h1`
	margin: 0;
	line-height: 1.15;
	font-size: 4rem;
	text-align: center;
`

const ThemeButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	height: 30px;
	width: 30px;
	background-color: inherit;
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.secondaryBackground};
	color: inherit;
`

const Accent = styled.span`
	color: ${({ theme }) => theme.accentColor};
`

const Container = styled.div`
	width: 100%;
	height: calc(100% - 110px);
	padding: 2rem 0;

	ul {
		height: 100%;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		justify-content: center;
		padding: 0;
		margin: 0;
	}
`

const Square = styled.li`
	width: 50%;
	aspect-ratio: 1/1;
	padding: 10px;

	div {
		height: 100%;
		width: 100%;
		border-radius: 8px;
		background-color: ${({ theme }) => theme.secondaryBackground};
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		h2 {
			margin: 0;
			font-size: 4rem;
		}
	}
`

type Props = {
	isDarkMode: boolean
	changeTheme: () => void
}

export default function Main({ isDarkMode, changeTheme }: Props) {
	const [data, setData] = React.useState<Data | null>(null)

	React.useEffect(() => {
		const getData = async () => {
			const res = await fetch('/api/data')
			setData(await res.json())
		}

		getData()
	}, [])

	return (
		<Wrapper>
			<Header>
				<Title>
					<Accent>Pwr</Accent> Park
				</Title>
				<ThemeButton onClick={changeTheme}>{isDarkMode ? <BsFillSunFill /> : <BsFillMoonFill />}</ThemeButton>
			</Header>
			<Container>
				{data && (
					<ul>
						{data.places.map((spot) => (
							<Square key={spot.id}>
								<div>
									<h2>{spot.liczba_miejsc}</h2>
									<p>{spot.symbol}</p>
								</div>
							</Square>
						))}
					</ul>
				)}
			</Container>
		</Wrapper>
	)
}
