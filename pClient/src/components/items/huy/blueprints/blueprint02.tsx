import { Component } from "@/app/ver2/page";
import Contenteditable from "@/components/inputs/fakeInput";
import { DataSourceContext } from "@/context/dataSourceProvider";
import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import LabelWrap from "./title";
import FakeInput from "@/components/inputs/fakeInput";

export type IntroductionProps = {
	title: string;
};

function Introduction({ component }: Component<IntroductionProps>) {
	const { dataSource, dispatch } = useContext(DataSourceContext);
	const updateIntroductionContent = useCallback((value: string) => {
		dispatch({
			type: "Update-Introduction-Content",
			value,
		});
	}, []);
	const updateIntroductionTitle = useCallback((value: string) => {
		dispatch({
			type: "Update-Introduction-Title",
			value,
		});
	}, []);
	return (
		<LabelWrap
			title={<FakeInput value={dataSource.introduction.title} onInput={updateIntroductionTitle} />}
			body={<FakeInput value={dataSource.introduction.content} onInput={updateIntroductionContent} />}
		/>
	);
}

export default Introduction;
