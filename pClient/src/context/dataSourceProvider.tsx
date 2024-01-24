import { Dispatch, createContext, useEffect, useReducer } from "react";

export type Projects = {
	name: string;
	type: string;
	members: string;
	technologies: DataImage[];
	reference: string;
	description: string;
	images: DataImage[];
	role: string;
	time: {
		from: string;
		to: string;
	};
};
export type DataImage = {
	name: string;
	source: string;
};

export type CareerPath = {
	company: {
		name: string;
		address: string;
		images: DataImage[];
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
export type CertificateType = {
	name: string;
	image: DataImage[];
	organization: string;
	issuance: string;
};
export type SchoolType = {
	type: string;
	name: string;
	scores: string[];
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
	knowledge: {
		title: string;
		skills: DataImage[];
	};
	gallery: {
		title: string;
		projects: Projects[];
	};
	experience: {
		title: string;
		careerPaths: CareerPath[];
	};
	certification: {
		title: string;
		certificates: CertificateType[];
	};
	education: {
		title: string;
		schools: SchoolType[];
	};
};
let userDataSource: UserData = {
	name: "Name: Do Huy",
	birth: "Birth: 17/08/2002",
	gender: "Gender: Male",
	phone: "Phone: 0963758993",
	avatar: "/huy/avatar.svg",
	work: {
		position: "Web developer",
	},
	knowledge: {
		title: "Skills",
		skills: [
			{
				source: "/huy/skills/javascript.svg",
				name: "Javascript",
			},
			{
				source: "/huy/skills/typescript.svg",
				name: "TypeScript",
			},
			{
				source: "/huy/skills/python.svg",
				name: "Python",
			},
			{
				source: "/huy/skills/php.svg",
				name: "PHP",
			},
			{
				source: "/huy/skills/html.svg",
				name: "HTML",
			},
			{
				source: "/huy/skills/css.svg",
				name: "CSS",
			},
			{
				source: "/huy/skills/git.svg",
				name: "Git",
			},
		],
	},
	introduction: {
		title: "About me",
		content:
			"I'm a passionate software developer, I'm spend a lot of time for research and learning in Website area, I'm can face in <b>hard challenge</b>, <b>hard working</b>, <b>high responsibility</b>,... I'm also strong at <b>teamwork</b> and <b>self-solving</b> problem. Currently, I'm mainly work in <b>Front-end</b>, take on <b>ReactJS</b>, <b>NodeJS</b> and more...",
	},
	gallery: {
		title: "Projects",
		projects: [
			{
				name: "Project name: LiNker",
				type: "Type: Personal",
				members: "Contributors: 1",
				role: "Role: Full-stack",
				reference: "<a href='https://github.com/DoHuy5360'>LiNker.com</a>",
				time: {
					from: "From 08/2023",
					to: "To 01/2024",
				},
				description: "This is a realtime chat application launched on website platform.",
				technologies: [
					{
						name: "TypeScript",
						source:
							"https://cdn.discordapp.com/attachments/894599867228364902/1172466973574168626/0D303192-29A5-49A0-A3F9-766821672010.jpg?ex=65b37a75&is=65a10575&hm=74d2f06fa701971a13ebe4e892322da2d3635346bd1600b171f1efae2674523b&",
					},
					{
						name: "MongoDB",
						source:
							"https://cdn.discordapp.com/attachments/894599867228364902/1053467028930973746/IMG_3853.jpg?ex=65b44ca0&is=65a1d7a0&hm=94395c793a5a9bb80a9fc52764d50ac5b752a9fb76d462957c182a2d7df45419&",
					},
				],
				images: [
					{
						name: "",
						source:
							"https://cdn.discordapp.com/attachments/894599867228364902/1172466973574168626/0D303192-29A5-49A0-A3F9-766821672010.jpg?ex=65b37a75&is=65a10575&hm=74d2f06fa701971a13ebe4e892322da2d3635346bd1600b171f1efae2674523b&",
					},
					{
						name: "",
						source:
							"https://cdn.discordapp.com/attachments/894599867228364902/1053467028930973746/IMG_3853.jpg?ex=65b44ca0&is=65a1d7a0&hm=94395c793a5a9bb80a9fc52764d50ac5b752a9fb76d462957c182a2d7df45419&",
					},
				],
			},
		],
	},
	experience: {
		title: "Experience",
		careerPaths: [
			{
				company: {
					name: "Urban Corporation",
					address: "HCM city",
					images: [
						{
							name: "Urban corporation logo",
							source: "https://urbanvietnam.vn/images/New_urban_logo_rgb_01.png",
						},
						{
							name: "My internship working team",
							source: "https://urbanvietnam.vn/images/Urban_VietNam/vanlang.jpg",
						},
						{
							name: "My internship assessment form",
							source: "/huy/experience/urban/internship-assessment-form.jpg",
						},
					],
				},
				time: {
					from: "From 05/2023",
					to: "To 07/2023",
				},
				role: {
					name: "Back-end developer",
					tasks: ["Developer 'Manage employees' application", "Leading team", "Hold daily team meetings"],
				},
			},
		],
	},
	certification: {
		title: "Certification",
		certificates: [
			{
				name: "Back End Development and APIs",
				image: [
					{
						name: "Back End & APIs certificate",
						source: "/huy/certification/beAndApis.png",
					},
				],
				organization: "Organize: <b>freeCodeCamp</b>",
				issuance: "Issuance on: 24/10/2023",
			},
			{
				name: "Foundational C# with Microsoft",
				image: [
					{
						name: "C# certification",
						source: "/huy/certification/csharp.png",
					},
				],
				organization: "Organize: <b>Microsoft & freeCodeCamp</b>",
				issuance: "Issuance on: 03/09/2023",
			},
		],
	},
	education: {
		title: "Education",
		schools: [
			{
				name: "Van Lang",
				type: "University",
				scores: [
					"Programming techniques (8.8/10)",
					"Data structures & Algorithms (8.7/10)",
					"Advanced Python programming (8.9/10)",
					"Database management system (8.2/10)",
					"Advanced Web programming (9.5/10)",
					"Internship projects (10/10)",
				],
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
				| "Update-Experience-Title"
				| "Update-Project-Title"
				| "Update-Certification-title"
				| "Update-Education-Title"
				| "Update-Knowledge-Title";
	  }
	| {
			index: number;
			value: string;
			type:
				| "Update-Company-Name"
				| "Update-Company-Address"
				| "Update-Experience-Time-From"
				| "Update-Experience-Time-To"
				| "Update-Experience-Role-Name"
				| "Update-Project-Name"
				| "Update-Project-Members"
				| "Update-Project-TimeFrom"
				| "Update-Project-TimeTo"
				| "Update-Project-Role"
				| "Update-Project-Description"
				| "Update-Project-Type"
				| "Update-Project-Reference"
				| "Update-Certification-Name"
				| "Update-Certification-Organization"
				| "Update-Certification-Issuance"
				| "Update-Education-Type"
				| "Update-Knowledge-Skill";
	  }
	| {
			index: number;
			value: string;
			parentIndex: number;
			type: "Update-Experience-Role-Task" | "Update-Project-Technologies" | "Update-Education-Score";
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
	if (action.type === "Reload") return { ...state };
	else if (action.type === "Update-Phone") state.phone = action.value;
	else if (action.type === "Update-Birth") state.birth = action.value;
	else if (action.type === "Update-Gender") state.gender = action.value;
	else if (action.type === "Update-Introduction-Title") state.introduction.title = action.value;
	else if (action.type === "Update-Introduction-Content") state.introduction.content = action.value;
	else if (action.type === "Update-Work-Position") state.work.position = action.value;
	else if (action.type === "Update-Experience-Title") state.experience.title = action.value;
	else if (action.type === "Update-Project-Name") state.gallery.projects[action.index].name = action.value;
	else if (action.type === "Update-Project-Members") state.gallery.projects[action.index].members = action.value;
	else if (action.type === "Update-Project-TimeFrom") state.gallery.projects[action.index].time.from = action.value;
	else if (action.type === "Update-Project-TimeTo") state.gallery.projects[action.index].time.to = action.value;
	else if (action.type === "Update-Project-Role") state.gallery.projects[action.index].role = action.value;
	else if (action.type === "Update-Project-Description") state.gallery.projects[action.index].description = action.value;
	else if (action.type === "Update-Company-Name") state.experience.careerPaths[action.index].company.name = action.value;
	else if (action.type === "Update-Experience-Time-From") state.experience.careerPaths[action.index].time.from = action.value;
	else if (action.type === "Update-Experience-Time-To") state.experience.careerPaths[action.index].time.to = action.value;
	else if (action.type === "Update-Experience-Role-Name") state.experience.careerPaths[action.index].role.name = action.value;
	else if (action.type === "Update-Experience-Role-Task") state.experience.careerPaths[action.parentIndex].role.tasks[action.index] = action.value;
	else if (action.type === "Update-Project-Title") state.gallery.title = action.value;
	else if (action.type === "Update-Knowledge-Title") state.knowledge.title = action.value;
	else if (action.type === "Update-Knowledge-Skill") state.knowledge.skills[action.index].name = action.value;
	else if (action.type === "Update-Education-Title") state.education.title = action.value;
	else if (action.type === "Update-Education-Type") state.education.schools[action.index].type = action.value;
	else if (action.type === "Update-Project-Reference") state.gallery.projects[action.index].reference = action.value;
	else if (action.type === "Update-Education-Score") state.education.schools[action.parentIndex].scores[action.index] = action.value;
	else if (action.type === "Update-Certification-title") state.certification.title = action.value;
	else if (action.type === "Update-Certification-Name") state.certification.certificates[action.index].name = action.value;
	else if (action.type === "Update-Certification-Organization") state.certification.certificates[action.index].organization = action.value;
	else if (action.type === "Update-Certification-Issuance") state.certification.certificates[action.index].issuance = action.value;
	else if (action.type === "Update-Project-Technologies") state.gallery.projects[action.parentIndex].technologies[action.index].name = action.value;
	else if (action.type === "Update-Name") state.name = action.value;
	else if (action.type === "Update-Project-Type") state.gallery.projects[action.index].type = action.value;
	else if (action.type === "Update-Company-Address") state.experience.careerPaths[action.index].company.address = action.value;
	else if (action.type === "Update-Full") state = action.value;
	return state;
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
