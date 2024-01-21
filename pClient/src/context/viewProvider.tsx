"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

type Init = {
	isShowSidebarTop: boolean;
	setShowSidebarTop: Dispatch<SetStateAction<boolean>>;
};

const init = {
	isShowSidebarTop: false,
	setShowSidebarTop: () => {},
};

export const ViewContext = createContext<Init>(init);

function ViewProvider({ children }: { children: JSX.Element }) {
	const [isShowSidebarTop, setShowSidebarTop] = useState(false);
	return (
		<ViewContext.Provider
			value={{
				isShowSidebarTop,
				setShowSidebarTop,
			}}
		>
			{children}
		</ViewContext.Provider>
	);
}

export default ViewProvider;
