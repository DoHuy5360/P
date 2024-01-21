import { Dispatch, createContext, useEffect, useReducer } from "react";

export type Projects = {
	name: string;
	images: string[];
};

export type CareerPath = {
	company: {
		name: string;
		address: string;
	};
	time: {
		from: string;
		to: string;
	};
	role: {
		name: string;
		tasks: string[];
	};
};
export type UserData = {
	name: string;
	birth: string;
	gender: string;
	phone: string;
	avatar: string;
	introduction: {
		title: string;
		content: string;
	};
	work: {
		position: string;
	};
	projects: Projects[];
	experience: {
		title: string;
		careerPaths: CareerPath[];
	};
};
let userDataSource: UserData = {
	name: "Do Huy",
	birth: "17/08/2002",
	gender: "male",
	phone: "0963758993",
	avatar: "/huy/avatar.svg",
	work: {
		position: "Web developer",
	},
	introduction: {
		title: "About me",
		content:
			"I'm a passionate software developer, I'm spend a lot of time for research and learning in Website area, I'm can face in <b>hard challenge</b>, <b>hard working</b>, <b>high responsibility</b>,... I'm also strong at <b>teamwork</b> and <b>self-solving</b> problem. Currently, I'm mainly work in <b>Front-end</b>, take on <b>ReactJS</b>, <b>NodeJS</b> and more...",
	},
	projects: [
		{
			name: "Cat project",
			images: [
				"https://cdn.discordapp.com/attachments/894599867228364902/1172466973574168626/0D303192-29A5-49A0-A3F9-766821672010.jpg?ex=65b37a75&is=65a10575&hm=74d2f06fa701971a13ebe4e892322da2d3635346bd1600b171f1efae2674523b&",
				"https://cdn.discordapp.com/attachments/894599867228364902/1053467028930973746/IMG_3853.jpg?ex=65b44ca0&is=65a1d7a0&hm=94395c793a5a9bb80a9fc52764d50ac5b752a9fb76d462957c182a2d7df45419&",
			],
		},
	],
	experience: {
		title: "Experience",
		careerPaths: [
			{
				company: {
					name: "Urban Corporation",
					address: "HCM city",
				},
				time: {
					from: "From 05/2023",
					to: "To 07/2023",
				},
				role: {
					name: "Back-end developer",
					tasks: ["Developer 'Manage employees' application", "Lead team"],
				},
			},
		],
	},
};
export type ActionType =
	| {
			value: string;
			type:
				| "Update-Phone"
				| "Update-Birth"
				| "Update-Gender"
				| "Update-Name"
				| "Update-Introduction-Title"
				| "Update-Introduction-Content"
				| "Update-Work-Position"
				| "Update-Experience-Title";
	  }
	| {
			index: number;
			value: string;
			type:
				| "Update-Company-Name"
				| "Update-Company-Address"
				| "Update-Experience-Time-From"
				| "Update-Experience-Time-To"
				| "Update-Experience-Role-Name";
	  }
	| {
			index: number;
			value: string;
			parentIndex: number;
			type: "Update-Experience-Role-Task";
	  }
	| {
			type: "Reload";
	  }
	| {
			type: "Update-Full";
			value: UserData;
	  };
export type ActionOnly = ActionType["type"];
const reducer = (state: UserData, action: ActionType) => {
	switch (action.type) {
		case "Update-Name":
			userDataSource.name = action.value;
			return userDataSource;
		case "Update-Introduction-Title":
			userDataSource.introduction.title = action.value;
			return userDataSource;
		case "Update-Introduction-Content":
			userDataSource.introduction.content = action.value;
			return userDataSource;
		case "Update-Work-Position":
			userDataSource.work.position = action.value;
			return userDataSource;
		case "Update-Experience-Title":
			userDataSource.experience.title = action.value;
			return userDataSource;
		case "Update-Company-Name":
			userDataSource.experience.careerPaths[action.index].company.name = action.value;
			return userDataSource;
		case "Update-Experience-Time-From":
			userDataSource.experience.careerPaths[action.index].time.from = action.value;
			return userDataSource;
		case "Update-Experience-Time-To":
			userDataSource.experience.careerPaths[action.index].time.to = action.value;
			return userDataSource;
		case "Update-Experience-Role-Name":
			userDataSource.experience.careerPaths[action.index].role.name = action.value;
			return userDataSource;
		case "Update-Experience-Role-Task":
			userDataSource.experience.careerPaths[action.parentIndex].role.tasks[action.index] = action.value;
			return userDataSource;
		case "Reload":
			return { ...userDataSource };
		case "Update-Full":
			userDataSource = action.value;
			return userDataSource;
		default:
			return state;
	}
};

export const DataSourceContext = createContext<{ dataSource: UserData; dispatch: Dispatch<ActionType> }>({
	dataSource: userDataSource,
	dispatch: () => {},
});
function DataSourceProvider({ children }: { children: JSX.Element }) {
	const [dataSource, dispatch] = useReducer(reducer, userDataSource);
	useEffect(() => {
		const rawDataStorage = localStorage.getItem("data-user");
		if (rawDataStorage !== null) {
			dispatch({
				type: "Update-Full",
				value: JSON.parse(rawDataStorage) as UserData,
			});
		}
	}, []);
	return <DataSourceContext.Provider value={{ dataSource, dispatch }}>{children}</DataSourceContext.Provider>;
}

export default DataSourceProvider;
