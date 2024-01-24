"use client";

import Center from "@/components/buttons/center";
import Item from "@/components/component";
import Personal from "@/components/items/huy/blueprints/blueprint01";
import Tray from "@/components/tray";
import AlertProvider, { AlertContext } from "@/context/alertProvider";
import DataSourceProvider, { DataSourceContext } from "@/context/dataSourceProvider";
import ViewProvider, { ViewContext } from "@/context/viewProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import crypto from "crypto";
import Introduction, { IntroductionProps } from "@/components/items/huy/blueprints/blueprint02";
import Experience from "@/components/items/huy/blueprints/blueprint03";
import { BiTrash } from "react-icons/bi";
import Gallery from "@/components/items/huy/blueprints/blueprint04";
import Certification from "@/components/items/huy/blueprints/blueprint05";
import Education from "@/components/items/huy/blueprints/blueprint06";
import Knowledge from "@/components/items/huy/blueprints/blueprint07";
import ViewImageProvider, { ViewImageContext } from "@/context/viewImageProvider";
import { IoClose } from "react-icons/io5";

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
	Personal: typeof Personal;
	Knowledge: typeof Knowledge;
	Introduction: typeof Introduction;
	Experience: typeof Experience;
	Gallery: typeof Gallery;
	Certification: typeof Certification;
	Education: typeof Education;
};

export const convertStringToJSX: ConvertStringToJSX = {
	Personal: Personal,
	Knowledge: Knowledge,
	Introduction: Introduction,
	Experience: Experience,
	Gallery: Gallery,
	Certification: Certification,
	Education: Education,
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
	{
		id: KeyManager.getKey(),
		items: "Personal",
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
		items: "Knowledge",
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
		items: "Gallery",
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
		items: "Certification",
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
		items: "Education",
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
						<ViewImageProvider>
							<div className='h-dvh overflow-y-scroll overflow-x-hidden relative'>
								<ViewImage />
								<SidebarTop />
								<Body />
							</div>
						</ViewImageProvider>
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
function ViewImage() {
	const { source, setSource } = useContext(ViewImageContext);
	return (
		source !== null && (
			<div className='fixed z-30 grid place-items-center w-dvw h-dvh overflow-y-scroll overflow-x-hidden p-10 bg-[#00000088]'>
				<div className='relative w-[100%] bg-white'>
					<div
						onClick={() => {
							setSource(null);
						}}
						className='absolute right-0 top-0 bg-slate-100 hover:bg-slate-200 rounded-[50%] text-[1rem] hover:text-[2rem] p-2 hover:p-4 duration-100 ease-in-out translate-x-[50%] translate-y-[-50%] cursor-pointer border-[1px] border-inputBorder'
					>
						<Center Icon={<IoClose />} />
					</div>
					<img src={source} className='w-[100%] h-fit' alt='view image' />
				</div>
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
	const handleClearLocalStorage = useCallback(() => {
		localStorage.clear();
		setAlertData({ type: "success", message: "Clear cache successfully" });
	}, []);
	return (
		<div className='relative'>
			<div className='overflow-hidden border-[1px] p-5 flex flex-col w-fit m-auto'>
				{components.map((component: Component<T>, i: number) => {
					return <Tray key={component.id} index={i} componentT={component} arrayComponentsT={components} setComponents={setComponents} />;
				})}
			</div>
			<div className='flex w-fit sticky bottom-0 left-[100%]'>
				<div className='hover:bg-slate-300 w-10 h-10'>
					<Center onClick={handleClearLocalStorage} Icon={<BiTrash />} />
				</div>
				<div className='hover:bg-slate-300 w-10 h-10'>
					<Center onClick={handleStoreFormData} Icon={<AiOutlineSave />} />
				</div>
			</div>
		</div>
	);
}

export const itemContainer: Component<any>[] = [
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
	{
		id: KeyManager.getKey(),
		items: "Personal",
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
		items: "Knowledge",
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
		items: "Gallery",
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
		items: "Certification",
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
		items: "Education",
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
			onClick={(e: any) => {
				e.stopPropagation();
			}}
			className={`flex flex-col w-full h-0 translate-y-[-100%] overflow-y-scroll sticky top-0 z-20 transition duration-300 select-none border-solid border-inputBorder bg-white ${
				isShowSidebarTop && "h-80 translate-y-[0] border-b-[1px]"
			}`}
		>
			<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 text-xs'>
				{items.map((item, i) => {
					return <Item data={item} index={i} key={i} />;
				})}
			</div>
		</div>
	);
}
