import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import type { Spot } from "../../types";

function getParkingName(id: number) {
	switch (id) {
		case 1:
			return {
				full: "Parking Wrońskiego",
				short: "WRO",
			};
		case 2:
			return {
				full: "Polinka",
				short: "C13",
			};
		case 3:
			return {
				full: "D20",
				short: "D20 - D21",
			};
		case 4:
			return {
				full: "GEO LO1 Geocentrum",
				short: "GEO-L",
			};
		case 5:
			return {
				full: "Architektura",
				short: "E01",
			};
		default:
			throw new Error("Unknown parking id");
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Spot[]>
) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto("https://iparking.pwr.edu.pl/");

	await page.waitForSelector(".counter");

	const data = await page.evaluate(() => {
		return [...document.querySelectorAll(".counter")].map((el, index) => ({
			id: index + 1,
			spots: Number(el.textContent?.trim()),
		}));
	});

	const spots = data.map(spot => ({
		...spot,
		name: getParkingName(spot.id),
	}));

	await browser.close();

	res.status(200).json(spots);
}
