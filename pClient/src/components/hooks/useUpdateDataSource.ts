import { DataSourceContext } from "@/context/dataSourceProvider";
import { useCallback, useContext } from "react";

type UseUpdateType = {
	index?: number;
	parentIndex?: number;
};
const useUpdateDataSource = ({ index = 0, parentIndex = 0 }: UseUpdateType) => {
	const { dataSource, dispatch } = useContext(DataSourceContext);
	const updateCertificationTitle = useCallback((value: string) => {
		dispatch({
			type: "Update-Certification-title",
			value,
		});
	}, []);
	const updateCertificationName = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Certification-Name",
				value,
				index,
			});
		},
		[index]
	);
	const updateCertificationOrganization = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Certification-Organization",
				value,
				index,
			});
		},
		[index]
	);
	const updateCertificationIssuance = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Certification-Issuance",
				value,
				index,
			});
		},
		[index]
	);
	const updateEducationTitle = useCallback((value: string) => {
		dispatch({
			type: "Update-Education-Title",
			value,
		});
	}, []);
	const updateEducationType = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Education-Type",
				value,
				index,
			});
		},
		[index]
	);
	const updateEducationScore = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Education-Score",
				value,
				parentIndex,
				index,
			});
		},
		[index, parentIndex]
	);
	const updateProjectTitle = useCallback((value: string) => {
		dispatch({
			type: "Update-Project-Title",
			value,
		});
	}, []);
	const updateProjectName = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Project-Name",
				value,
				index,
			});
		},
		[index]
	);
	const updateProjectMembers = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Project-Members",
				value,
				index,
			});
		},
		[index]
	);
	const updateProjectTimeFrom = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Project-TimeFrom",
				value,
				index,
			});
		},
		[index]
	);
	const updateProjectTimeTo = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Project-TimeTo",
				value,
				index,
			});
		},
		[index]
	);
	const updateProjectRole = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Project-Role",
				value,
				index,
			});
		},
		[index]
	);
	const updateProjectDescription = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Project-Description",
				value,
				index,
			});
		},
		[index]
	);
	const updateProjectType = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Project-Type",
				value,
				index,
			});
		},
		[index]
	);
	const updateProjectReference = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Project-Reference",
				value,
				index,
			});
		},
		[index]
	);
	const updateProjectTechnologies = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Project-Technologies",
				parentIndex,
				value,
				index,
			});
		},
		[index, parentIndex]
	);
	const updateExperienceTitle = useCallback((value: string) => {
		dispatch({
			type: "Update-Experience-Title",
			value,
		});
	}, []);
	const updateCompanyName = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Company-Name",
				value,
				index,
			});
		},
		[index]
	);
	const updateCompanyAddress = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Company-Address",
				value,
				index,
			});
		},
		[index]
	);
	const updateExperienceTimeFrom = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Experience-Time-From",
				value,
				index,
			});
		},
		[index]
	);
	const updateExperienceTimeTo = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Experience-Time-To",
				value,
				index,
			});
		},
		[index]
	);
	const updateExperienceRoleName = useCallback(
		(value: string) => {
			dispatch({
				type: "Update-Experience-Role-Name",
				value,
				index,
			});
		},
		[index]
	);
	const reload = useCallback(() => {
		dispatch({
			type: "Reload",
		});
	}, []);

	const updateExperienceTask = useCallback((value: string) => {
		dispatch({
			type: "Update-Experience-Role-Task",
			value,
			parentIndex,
			index,
		});
	}, []);
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
	const updateWorkPosition = useCallback((value: string) => {
		dispatch({
			type: "Update-Work-Position",
			value,
		});
	}, []);
	const updateName = useCallback((value: string) => {
		dispatch({
			type: "Update-Name",
			value,
		});
	}, []);
	const updatePhone = useCallback((value: string) => {
		dispatch({
			type: "Update-Phone",
			value,
		});
	}, []);
	const updateBirth = useCallback((value: string) => {
		dispatch({
			type: "Update-Birth",
			value,
		});
	}, []);
	const updateGender = useCallback((value: string) => {
		dispatch({
			type: "Update-Gender",
			value,
		});
	}, []);
	const updateKnowledgeTitle = useCallback((value: string) => {
		dispatch({
			type: "Update-Knowledge-Title",
			value,
		});
	}, []);
	const updateKnowledgeSkill = useCallback((value: string) => {
		dispatch({
			type: "Update-Knowledge-Skill",
			value,
			index,
		});
	}, []);
	const actions = {
		reload,
		updateCertificationTitle,
		updateCertificationName,
		updateCertificationOrganization,
		updateCertificationIssuance,
		updateEducationTitle,
		updateEducationType,
		updateEducationScore,
		updateProjectTitle,
		updateProjectName,
		updateProjectMembers,
		updateProjectTimeFrom,
		updateProjectTimeTo,
		updateProjectRole,
		updateProjectDescription,
		updateProjectType,
		updateProjectReference,
		updateProjectTechnologies,
		updateExperienceTitle,
		updateCompanyName,
		updateCompanyAddress,
		updateExperienceTimeFrom,
		updateExperienceTimeTo,
		updateExperienceRoleName,
		updateExperienceTask,
		updateIntroductionContent,
		updateIntroductionTitle,
		updateWorkPosition,
		updateName,
		updatePhone,
		updateBirth,
		updateGender,
		updateKnowledgeTitle,
		updateKnowledgeSkill,
	};
	return { dataSource, actions };
};

export default useUpdateDataSource;
