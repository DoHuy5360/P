"use client";
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import Center from "./buttons/center";
import { GoPlus } from "react-icons/go";
import { ViewContext } from "@/context/viewProvider";
import { Component, ConvertStringToJSX, KeyManager, convertStringToJSX } from "@/app/page";
import Actions from "./actions";
import DragAndDrop from "./drag";

export function convertItemToJSX(key: null | string | ((data: any) => JSX.Element)) {
	if (key !== null) {
		key = convertStringToJSX[key as keyof ConvertStringToJSX];
	}
	return key;
}

export enum TransferTypes {
	inForm = "inForm",
	sidebarTop = "sidebarTop",
}

export type TransferData<T> = {
	dataTransfer: {
		index: number;
		obj: Component<T>;
		jsx: string | null | ((data: Component<T>) => JSX.Element);
		type: TransferTypes.inForm | TransferTypes.sidebarTop;
	};
};

type TrayProps<T> = {
	index: number;
	componentT: Component<T>;
	arrayComponentsT: Component<T>[];
	setComponents: Dispatch<SetStateAction<Component<T>[]>>;
};

function Tray<T>({ index, componentT, arrayComponentsT, setComponents }: TrayProps<T>) {
	const [styles, setStyles] = useState<string>("bg-white");
	const { setShowSidebarTop } = useContext(ViewContext);
	const [ComponentItem, setComponentItem] = useState<null | ((data: Component<T>) => JSX.Element)>(null);
	useEffect(() => {
		const jsxItem = convertItemToJSX(componentT.items);
		const temp = () => jsxItem;
		setComponentItem(temp);
	}, [arrayComponentsT]);
	const getNewItem: () => Component<T> = useCallback(() => {
		return {
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
		};
	}, [arrayComponentsT]);
	const isNullItem = ComponentItem === null;
	return (
		<div className={`hover:bg-slate-100 relative select-none ${styles}`}>
			<DragAndDrop index={index} elementT={componentT} arrayT={arrayComponentsT} setArrayT={setComponents} setComponentItem={setComponentItem} setStyles={setStyles}>
				<Actions index={index} elementT={componentT} arrayT={arrayComponentsT} setArrayT={setComponents} getNewItem={getNewItem}>
					{isNullItem ? (
						<div className='min-h-56 min-w-56'>
							<div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
								<div className='hover:bg-slate-300 w-10 h-10 rounded-[50%] '>
									<Center
										onClick={(e: any) => {
											e.stopPropagation();
											setShowSidebarTop(true);
										}}
										Icon={<GoPlus />}
									/>
								</div>
							</div>
						</div>
					) : (
						<div draggable={true} className='cursor-grab h-fit'>
							<ComponentItem {...componentT} />
						</div>
					)}
				</Actions>
			</DragAndDrop>
		</div>
	);
}

export default Tray;
