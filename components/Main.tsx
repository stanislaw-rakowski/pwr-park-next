import React from 'react'
import styled from 'styled-components'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { MdNotificationsActive, MdNotificationsOff } from 'react-icons/md'
import { BiNavigation } from 'react-icons/bi'
import { LiveChatWidget } from '@livechat/widget-react'
import type { Data } from '../lib/types'

const Wrapper = styled.main`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.primaryFontColor};
	background-color: ${({ theme }) => theme.primaryBackground};
	overflow: hidden;

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

const IconButton = styled.button`
	height: 30px;
	width: 30px;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	background-color: inherit;
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.secondaryBackground};
	color: ${({ theme }) => theme.primaryFontColor};

	svg {
		min-height: 12px;
		min-width: 12px;
	}
`

const ThemeButton = styled(IconButton)`
	position: absolute;
	top: 10px;
	right: 10px;
`

const NotificationsButton = styled(IconButton)`
	position: absolute;
	top: 10px;
	left: 10px;
`

const NavigationButton = styled(IconButton)`
	position: absolute;
	bottom: 10px;
	right: 10px;
	border: 1px solid #666;
`

const Accent = styled.span`
	color: ${({ theme }) => theme.accentColor};
`

const Container = styled.div`
	width: 100%;
	height: calc(100% - 110px);
	padding: 1rem 0;

	ul {
		height: 100%;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		justify-content: center;
		padding: 0;
		margin: 0;
		gap: 10px;
	}
`

const Square = styled.li`
	width: 170px;
	height: 170px;

	div {
		height: 100%;
		width: 100%;
		border-radius: 8px;
		background-color: ${({ theme }) => theme.secondaryBackground};
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;

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
	const [notifications, setNotifications] = React.useState(false)

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
				<NotificationsButton onClick={() => setNotifications((curr) => !curr)}>
					{notifications ? <MdNotificationsOff /> : <MdNotificationsActive />}
				</NotificationsButton>
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
									<NavigationButton
										as="a"
										href={`http://maps.apple.com/maps?q=${spot.geo_lat},${spot.geo_lan}`}
										target="_blank"
									>
										<BiNavigation />
									</NavigationButton>
								</div>
							</Square>
						))}
					</ul>
				)}
				<LiveChatWidget license="14842539" />
			</Container>
		</Wrapper>
	)
}
