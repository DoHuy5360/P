import { CertificateType, DataSourceContext } from "@/context/dataSourceProvider";
import { useCallback, useContext } from "react";
import LabelWrap from "./title";
import FakeInput from "@/components/inputs/fakeInput";
import useUpdateDataSource from "@/components/hooks/useUpdateDataSource";
import { ViewImageContext } from "@/context/viewImageProvider";

function Certification() {
	const { dataSource, actions } = useUpdateDataSource({});
	return (
		<LabelWrap
			title={<FakeInput value={dataSource.certification.title} onInput={actions.updateCertificationTitle} />}
			body={
				<div className='flex flex-wrap gap-2'>
					{dataSource.certification.certificates.map((cer, i) => {
						return (
							<div key={i}>
								<Certificate certificate={cer} index={i} />
							</div>
						);
					})}
				</div>
			}
		/>
	);
}
type CertificateProps = {
	certificate: CertificateType;
	index: number;
};
function Certificate({ certificate, index }: CertificateProps) {
	const { actions } = useUpdateDataSource({ index });
	const { setSource } = useContext(ViewImageContext);
	return (
		<div className='w-fit flex flex-wrap gap-2'>
			<div className='flex gap-2'>
				{certificate.image.map((img, i) => {
					return (
						<img
							src={img.source}
							onClick={() => {
								setSource(img.source);
							}}
							className='sm:w-full md:w-full lg:w-60 xl:w-60 border-[1px] border-inputBorder cursor-pointer'
							draggable={false}
							alt={img.name}
							key={i}
						/>
					);
				})}
			</div>
			<div className='flex flex-col gap-2'>
				<div className='font-bold'>
					<FakeInput value={certificate.name} onInput={actions.updateCertificationName} />
				</div>
				<FakeInput value={certificate.organization} onInput={actions.updateCertificationOrganization} />
				<FakeInput value={certificate.issuance} onInput={actions.updateCertificationIssuance} />
			</div>
		</div>
	);
}

export default Certification;
