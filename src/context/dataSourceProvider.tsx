import { createContext } from "react";

export type Projects = {
	name: string;
	images: string[];
};

export type Company = {
	name: string;
	images: string[];
	address: string;
};

export type UserData = {
	name: string;
	birth: string;
	gender: string;
	phone: string;
	avatar: string;
	projects: Projects[];
	companies: Company[];
};
const userDataSource: UserData = {
	name: "Do Huy",
	birth: "17/08/2002",
	gender: "male",
	phone: "0963xxxxxx",
	avatar: "https://cdn.discordapp.com/emojis/965996667574816829.webp?size=128&quality=lossless",
	projects: [
		{
			name: "Cat project",
			images: [
				"https://cdn.discordapp.com/attachments/894599867228364902/1172466973574168626/0D303192-29A5-49A0-A3F9-766821672010.jpg?ex=65b37a75&is=65a10575&hm=74d2f06fa701971a13ebe4e892322da2d3635346bd1600b171f1efae2674523b&",
			],
		},
	],
	companies: [
		{
			name: "IT company",
			images: ["https://cdn.discordapp.com/emojis/906185838931632148.webp?size=128&quality=lossless"],
			address: "TP.HCM",
		},
	],
};
export const DataSourceContext = createContext(userDataSource);
function DataSourceProvider({ children }: { children: JSX.Element }) {
	return <DataSourceContext.Provider value={userDataSource}>{children}</DataSourceContext.Provider>;
}

export default DataSourceProvider;
