import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useEffect, useState } from "react";

type ViewImageContextType = {
	source: string | null;
	setSource: Dispatch<SetStateAction<string | null>>;
};

export const ViewImageContext = createContext<ViewImageContextType>({
	source: null,
	setSource: () => {},
});

function ViewImageProvider({ children }: { children: JSX.Element }) {
	const [source, setSource] = useState<string | null>(null);

	return (
		<ViewImageContext.Provider
			value={{
				source,
				setSource,
			}}
		>
			{children}
		</ViewImageContext.Provider>
	);
}

export default ViewImageProvider;
