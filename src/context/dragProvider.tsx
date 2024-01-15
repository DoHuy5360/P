"use client";

import { Item } from "@/app/home/page";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type DropFieldSelected = {
	id: string;
	setItem: Dispatch<SetStateAction<Item | null>>;
};

type Init = {
	itemSelected: string;
	setItemSelected: Dispatch<SetStateAction<string>>;
	dropFieldSelected: DropFieldSelected;
	setDropFieldSelected: Dispatch<SetStateAction<DropFieldSelected>>;
	dropFieldDropped: string;
	setDropFieldDropped: Dispatch<SetStateAction<string>>;
};

const init = {
	itemSelected: "",
	setItemSelected: () => {},
	dropFieldSelected: {
		id: "",
		setItem: () => {},
	},
	setDropFieldSelected: () => {},
	dropFieldDropped: "",
	setDropFieldDropped: () => {},
};

export const DragContext = createContext<Init>(init);

function DragProvider({ children }: { children: JSX.Element }) {
	const [itemSelected, setItemSelected] = useState("");
	const [dropFieldSelected, setDropFieldSelected] = useState<DropFieldSelected>({
		id: "",
		setItem: () => {},
	});
	const [dropFieldDropped, setDropFieldDropped] = useState("");
	return (
		<DragContext.Provider
			value={{
				itemSelected,
				setItemSelected,
				dropFieldSelected,
				setDropFieldSelected,
				dropFieldDropped,
				setDropFieldDropped,
			}}
		>
			{children}
		</DragContext.Provider>
	);
}

export default DragProvider;
