import { Component } from "@/app/page";
import Contenteditable from "@/components/inputs/fakeInput";
import { DataSourceContext } from "@/context/dataSourceProvider";
import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import LabelWrap from "./title";
import FakeInput from "@/components/inputs/fakeInput";
import useUpdateDataSource from "@/components/hooks/useUpdateDataSource";

export type IntroductionProps = {
	title: string;
};

function Introduction({ component }: Component<IntroductionProps>) {
	const { dataSource, dispatch } = useContext(DataSourceContext);
	const { actions } = useUpdateDataSource({});
	return (
		<LabelWrap
			title={<FakeInput value={dataSource.introduction.title} onInput={actions.updateIntroductionTitle} />}
			body={<FakeInput value={dataSource.introduction.content} onInput={actions.updateIntroductionContent} />}
		/>
	);
}

export default Introduction;
