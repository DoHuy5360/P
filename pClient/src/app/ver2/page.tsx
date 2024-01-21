"use client";

import Center from "@/components/buttons/center";
import Card from "@/components/component";
import { Section01 } from "@/components/items/huy/blueprints/blueprint01";
import Tray from "@/components/tray";
import AlertProvider, { AlertContext } from "@/context/alertProvider";
import DataSourceProvider, { DataSourceContext } from "@/context/dataSourceProvider";
import ViewProvider, { ViewContext } from "@/context/viewProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import crypto from "crypto";
import Introduction, { IntroductionProps } from "@/components/items/huy/blueprints/blueprint02";
import Experience from "@/components/items/huy/blueprints/blueprint03";

export class KeyManager {
	private static localData = typeof localStorage !== "undefined" ? localStorage.getItem("data-form") : null;
	public static existingKeys: string[] | null = this.localData === null ? [] : JSON.parse(this.localData).map((form: Component<any>) => form.id);
	public static isKeyExisting(key: string) {
		return this.existingKeys?.includes(key);
	}
	public static generateKey() {
		return crypto.randomBytes(32).toString("hex");
	}
	public static getKey() {
		let key = this.generateKey();
		while (this.isKeyExisting(key)) {
			key = this.generateKey();
		}
		this.existingKeys?.push(key);
		return key;
	}
}
export type Component<T> = {
	id: string;
	items: null | string | ((data: Component<T>) => JSX.Element);
	component: {
		permissions: Permissions;
		data: T | null;
	};
};

export type ConvertStringToJSX = {
	Section01: typeof Section01;
	Introduction: typeof Introduction;
	Experience: typeof Experience;
};

export const convertStringToJSX: ConvertStringToJSX = {
	Section01: Section01,
	Introduction: Introduction,
	Experience: Experience,
};

export type Permissions = {
	dragging: boolean;
	editing: boolean;
	duplicating: boolean;
	deleting: boolean;
	collapsing: boolean;
	viewing: boolean;
	clearing: boolean;
};

export const initForms: Component<IntroductionProps | any>[] = [
	{
		id: KeyManager.getKey(),
		items: "Section01",
		component: {
			permissions: {
				dragging: true,
				editing: true,
				duplicating: true,
				deleting: true,
				collapsing: true,
				viewing: true,
				clearing: true,
			},
			data: null,
		},
	},
	{
		id: KeyManager.getKey(),
		items: "Introduction",
		component: {
			permissions: {
				dragging: true,
				editing: true,
				duplicating: true,
				deleting: true,
				collapsing: true,
				viewing: true,
				clearing: true,
			},
			data: null,
		},
	},
	{
		id: KeyManager.getKey(),
		items: "Experience",
		component: {
			permissions: {
				dragging: true,
				editing: true,
				duplicating: true,
				deleting: true,
				collapsing: true,
				viewing: true,
				clearing: true,
			},
			data: null,
		},
	},
	{
		id: KeyManager.getKey(),
		items: null,
		component: {
			permissions: {
				dragging: true,
				editing: true,
				duplicating: true,
				deleting: true,
				collapsing: true,
				viewing: true,
				clearing: true,
			},
			data: null,
		},
	},
];

export default function Form() {
	return (
		<AlertProvider>
			<div className='relative bg-white w-full'>
				<Alert />
				<ViewProvider>
					<DataSourceProvider>
						<div className='h-dvh overflow-y-scroll overflow-x-hidden relative'>
							<SidebarTop />
							<Body />
						</div>
					</DataSourceProvider>
				</ViewProvider>
			</div>
		</AlertProvider>
	);
}
function Alert() {
	const [isShowAlertData, setShowAlertData] = useState(false);
	const { alertData } = useContext(AlertContext);
	const colors = {
		success: "bg-green-500",
		fail: "bg-red-500",
	};
	useEffect(() => {
		setShowAlertData(true);
		setTimeout(() => {
			setShowAlertData(false);
		}, 2000);
	}, [alertData]);
	return (
		isShowAlertData &&
		alertData !== null && (
			<div className='absolute bottom-4 left-4 flex bg-slate-50 border-2 border-solid z-20'>
				<div className={`px-2 ${colors[alertData.type]}`}>!</div>
				<div className='px-2'>{alertData.message}</div>
			</div>
		)
	);
}

function Body<T>() {
	const [components, setComponents] = useState<Component<T>[]>([]);
	const { setAlertData } = useContext(AlertContext);
	const { dataSource } = useContext(DataSourceContext);

	useEffect(() => {
		const rawDataStorage = localStorage.getItem("data-form");
		if (rawDataStorage !== null) {
			setComponents(JSON.parse(rawDataStorage) as Component<T>[]);
		} else {
			// initForms data is come from fetching
			setComponents(initForms as Component<T>[]);
		}
	}, []);
	const handleStoreFormData = useCallback(() => {
		localStorage.setItem("data-form", JSON.stringify(components));
		localStorage.setItem("data-user", JSON.stringify(dataSource));
		setAlertData({ type: "success", message: "Storing successfully" });
	}, [components]);
	return (
		<div className='relative'>
			<div className='overflow-x-hidden border-[1px] p-5 flex flex-col w-fit m-auto'>
				{components.map((component: Component<T>, i: number) => {
					return <Tray key={component.id} index={i} componentT={component} arrayComponentsT={components} setComponents={setComponents} />;
				})}
			</div>
			<div className='absolute bottom-0 right-0 hover:bg-slate-300 w-10 h-10'>
				<Center onClick={handleStoreFormData} Icon={<AiOutlineSave />} />
			</div>
		</div>
	);
}

export const itemContainer: Component<IntroductionProps | any>[] = [
	{
		id: KeyManager.getKey(),
		items: "Section01",
		component: {
			permissions: {
				dragging: true,
				editing: true,
				duplicating: true,
				deleting: true,
				collapsing: true,
				viewing: true,
				clearing: true,
			},
			data: {
				name: "",
				position: "",
				inputs: [
					{
						id: KeyManager.getKey(),
						items: "Input",
						component: {
							permissions: {
								dragging: true,
								editing: true,
								duplicating: true,
								deleting: true,
								collapsing: true,
								viewing: true,
							},
							data: {
								id: "0",
								value: "Do Huy",
								permissions: {
									dragging: true,
									editing: true,
									duplicating: true,
									deleting: true,
									collapsing: true,
									viewing: true,
								},
							},
						},
					},
				],
			},
		},
	},
	{
		id: KeyManager.getKey(),
		items: "Introduction",
		component: {
			permissions: {
				dragging: true,
				editing: true,
				duplicating: true,
				deleting: true,
				collapsing: true,
				viewing: true,
				clearing: true,
			},
			data: {
				title: "Goals",
			},
		},
	},
];
function SidebarTop<T>() {
	const [items, setItems] = useState<Component<T>[]>([]);
	const { isShowSidebarTop, setShowSidebarTop } = useContext(ViewContext);
	useEffect(() => {
		const handleWindowClick = () => {
			setShowSidebarTop(false);
		};
		setItems(itemContainer);
		window.addEventListener("click", handleWindowClick);
		return () => {
			window.removeEventListener("click", handleWindowClick);
		};
	}, []);
	return (
		<div
			className={`flex flex-col w-full h-0 translate-y-[-100%] overflow-y-scroll sticky top-0 z-20 transition duration-300 select-none border-solid border-slate-400 bg-white ${
				isShowSidebarTop && "h-80 translate-y-[0] border-b-2"
			}`}
		>
			<div className='p-5'>
				{items.map((item, i) => {
					return <Card data={item} index={i} key={i} />;
				})}
			</div>
		</div>
	);
}
