import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useLayoutEffect, useState } from "react";

type FakeInputType = {
	value: string;
	title?: string;
	onInput: (value: string) => void;
};
function FakeInput({ value, onInput, title }: FakeInputType) {
	const sendText = useCallback((e: ChangeEvent<HTMLDivElement>) => {
		onInput(e.target.innerHTML);
	}, []);
	return (
		<div
			title={title}
			onInput={sendText}
			className='text-left md:text-justify cursor-text bg-white py-1 px-2 w-fit border-inputBorder border-[1px]'
			contentEditable={true}
			dangerouslySetInnerHTML={{ __html: value }}
			draggable={false}
		></div>
	);
}
export default FakeInput;
