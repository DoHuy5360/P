"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

type Init = {
	isShowSidebarRight: boolean;
	setShowSidebarRight: Dispatch<SetStateAction<boolean>>;
};

const init = {
	isShowSidebarRight: false,
	setShowSidebarRight: () => {},
};

export const ViewContext = createContext<Init>(init);

function ViewProvider({ children }: { children: JSX.Element }) {
	const [isShowSidebarRight, setShowSidebarRight] = useState(false);
	return (
		<ViewContext.Provider
			value={{
				isShowSidebarRight,
				setShowSidebarRight,
			}}
		>
			{children}
		</ViewContext.Provider>
	);
}

export default ViewProvider;
