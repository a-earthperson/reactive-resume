/**
 * @packageDocumentation
 *
 * @remarks
 * Factory helpers for Resume View payloads. This module zips DraftResume data with
 * Resume styles into a unified view model, and can also unzip a view back into its
 * data and style components.
 *
 * The unzip process assumes view instances were created by a consistent style
 * application strategy (uniform styles per item type and per section). When that
 * assumption does not hold, this factory falls back to default styles to preserve
 * a valid styles payload.
 *
 * @see {@link ../data | Resume data}
 * @see {@link ../styles | Resume styles}
 * @see {@link ./view.types | Resume View types}
 */
import type { DraftData, DraftResume } from "../data/index";
import { draftFactory, sectionTypeSchema } from "../data/index";
import type { DefaultStyles } from "../styles/styles.factory";
import { resumeStylesFactory } from "../styles/styles.factory";
import type { Resume as ResumeStylesNamespace } from "../styles/styles.types";
import type { ResumeView } from "./view.types";

/**
 * @remarks Alias for the full Resume styles payload type.
 * @see DefaultStyles
 */
export type ResumeStyles = DefaultStyles;

/**
 * @remarks Input contract for zipping data and styles into a view.
 * @example { data: draftFactory.draft.empty(), styles: resumeStylesFactory.defaults() }
 */
export type ZipInput = {
	data: DraftData;
	styles: ResumeStyles;
};

/**
 * @remarks Output contract for unzipping a view into data and styles.
 * @example { data: draftFactory.draft.empty(), styles: resumeStylesFactory.defaults() }
 */
export type UnzipOutput = {
	data: DraftData;
	styles: ResumeStyles;
};

/**
 * @remarks Maps section identifiers to their corresponding item style payloads.
 * @see DraftResume.SectionType
 */
type ItemStylesBySection = {
	profiles: ResumeStylesNamespace.Styles.ProfileItemStyles;
	experience: ResumeStylesNamespace.Styles.ExperienceItemStyles;
	education: ResumeStylesNamespace.Styles.EducationItemStyles;
	projects: ResumeStylesNamespace.Styles.ProjectItemStyles;
	skills: ResumeStylesNamespace.Styles.SkillItemStyles;
	languages: ResumeStylesNamespace.Styles.LanguageItemStyles;
	interests: ResumeStylesNamespace.Styles.InterestItemStyles;
	awards: ResumeStylesNamespace.Styles.AwardItemStyles;
	certifications: ResumeStylesNamespace.Styles.CertificationItemStyles;
	publications: ResumeStylesNamespace.Styles.PublicationItemStyles;
	volunteer: ResumeStylesNamespace.Styles.VolunteerItemStyles;
	references: ResumeStylesNamespace.Styles.ReferenceItemStyles;
};

/**
 * @remarks Resolves the base item style with a guaranteed options payload.
 * @param styles - The full Resume styles payload.
 * @returns Base item styles with options filled.
 */
const resolveBaseItemStyle = (styles: ResumeStyles): ResumeStylesNamespace.Styles.BaseItemStyles => ({
	...styles.baseItem,
	options: styles.baseItem.options ?? styles.itemOptions,
});

/**
 * @remarks Merges the base item styles into a concrete item style payload.
 * @param base - The base item styles.
 * @param style - The concrete item style to enrich.
 * @returns A fully merged item style.
 */
const mergeItemStyle = <TStyle extends ResumeStylesNamespace.Styles.BaseItemStyles>(
	base: ResumeStylesNamespace.Styles.BaseItemStyles,
	style: TStyle,
): TStyle => ({ ...base, ...style, options: style.options ?? base.options }) as TStyle;

/**
 * @remarks Applies a style payload to a list of items.
 * @param items - The data items to style.
 * @param style - The style payload to merge into each item.
 * @returns Styled items with merged style properties.
 */
const mergeItems = <TItem extends Record<string, unknown>, TStyle extends Record<string, unknown>>(
	items: TItem[],
	style: TStyle,
) => items.map((item) => ({ ...item, ...style }));

/**
 * @remarks Resolves whether a custom section type is supported by DraftResume.
 * @param value - The custom section type to inspect.
 * @returns True if the type is a DraftResume section type.
 */
const isDraftSectionType = (value: ResumeView["customSections"][number]["type"]): value is DraftResume.SectionType =>
	sectionTypeSchema.options.includes(value as DraftResume.SectionType);

/**
 * @remarks Combines section data, section styles, and item styles into a view section.
 * @param section - The section data payload.
 * @param sectionStyles - The global section styles to apply.
 * @param itemStyle - The item styles to apply to each entry.
 * @returns A view-friendly section with styled items.
 */
const mergeSection = <
	TItem extends Record<string, unknown>,
	TStyle extends ResumeStylesNamespace.Styles.BaseItemStyles,
>(
	section: DraftResume.SectionData<TItem>,
	sectionStyles: ResumeStylesNamespace.Styles.SectionStyles,
	itemStyle: TStyle,
) => ({
	...section,
	...sectionStyles,
	items: mergeItems(section.items, itemStyle),
});

/**
 * @remarks Builds a section-keyed lookup of item styles.
 * @param styles - The full Resume styles payload.
 * @returns Section keyed item style lookup.
 */
const resolveItemStylesBySection = (styles: ResumeStyles): ItemStylesBySection => {
	const base = resolveBaseItemStyle(styles);

	return {
		profiles: mergeItemStyle(base, styles.items.profile),
		experience: mergeItemStyle(base, styles.items.experience),
		education: mergeItemStyle(base, styles.items.education),
		projects: mergeItemStyle(base, styles.items.project),
		skills: mergeItemStyle(base, styles.items.skill),
		languages: mergeItemStyle(base, styles.items.language),
		interests: mergeItemStyle(base, styles.items.interest),
		awards: mergeItemStyle(base, styles.items.award),
		certifications: mergeItemStyle(base, styles.items.certification),
		publications: mergeItemStyle(base, styles.items.publication),
		volunteer: mergeItemStyle(base, styles.items.volunteer),
		references: mergeItemStyle(base, styles.items.reference),
	};
};

/**
 * @remarks Zips a custom section with the correct item styles.
 * @param section - The custom section data payload.
 * @param itemStyles - Lookup of item styles keyed by section type.
 * @param customSectionStyles - Styles applied to custom sections.
 * @returns The styled custom section view payload.
 */
const zipCustomSection = (
	section: DraftResume.CustomSectionData,
	itemStyles: ItemStylesBySection,
	customSectionStyles: ResumeStylesNamespace.Styles.CustomSectionStyles,
): ResumeView["customSections"][number] => {
	const withStyles = {
		...section,
		...customSectionStyles,
	};

	switch (section.type) {
		case "profiles":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.ProfileItemData[],
					itemStyles.profiles,
				) as ResumeView["customSections"][number]["items"],
			};
		case "experience":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.ExperienceItemData[],
					itemStyles.experience,
				) as ResumeView["customSections"][number]["items"],
			};
		case "education":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.EducationItemData[],
					itemStyles.education,
				) as ResumeView["customSections"][number]["items"],
			};
		case "projects":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.ProjectItemData[],
					itemStyles.projects,
				) as ResumeView["customSections"][number]["items"],
			};
		case "skills":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.SkillItemData[],
					itemStyles.skills,
				) as ResumeView["customSections"][number]["items"],
			};
		case "languages":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.LanguageItemData[],
					itemStyles.languages,
				) as ResumeView["customSections"][number]["items"],
			};
		case "interests":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.InterestItemData[],
					itemStyles.interests,
				) as ResumeView["customSections"][number]["items"],
			};
		case "awards":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.AwardItemData[],
					itemStyles.awards,
				) as ResumeView["customSections"][number]["items"],
			};
		case "certifications":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.CertificationItemData[],
					itemStyles.certifications,
				) as ResumeView["customSections"][number]["items"],
			};
		case "publications":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.PublicationItemData[],
					itemStyles.publications,
				) as ResumeView["customSections"][number]["items"],
			};
		case "volunteer":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.VolunteerItemData[],
					itemStyles.volunteer,
				) as ResumeView["customSections"][number]["items"],
			};
		case "references":
			return {
				...withStyles,
				items: mergeItems(
					section.items as DraftResume.ReferenceItemData[],
					itemStyles.references,
				) as ResumeView["customSections"][number]["items"],
			};
	}
};

/**
 * @remarks Removes style-specific fields from a view item to recover data.
 * @param item - The view item to strip.
 * @returns The data-only item payload.
 */
const stripItemStyle = <TItem extends Record<string, unknown>>(item: TItem) => {
	const { hidden, options, icon, ...data } = item;
	return data;
};

/**
 * @remarks Extracts a base item style from a view item with fallbacks.
 * @param item - The view item to read style from.
 * @param fallback - The fallback style to use when data is missing.
 * @returns A base item style payload.
 */
const extractItemStyle = <TStyle extends ResumeStylesNamespace.Styles.BaseItemStyles>(
	item: ResumeStylesNamespace.Styles.BaseItemStyles | undefined,
	fallback: TStyle,
): TStyle => {
	if (!item) return fallback;

	return {
		...fallback,
		hidden: item.hidden,
		options: item.options ?? fallback.options,
	};
};

/**
 * @remarks Extracts an icon-capable item style from a view item with fallbacks.
 * @param item - The view item to read style from.
 * @param fallback - The fallback style to use when data is missing.
 * @returns An icon-capable item style payload.
 */
const extractIconItemStyle = <
	TStyle extends ResumeStylesNamespace.Styles.BaseItemStyles & {
		icon: ResumeStylesNamespace.Styles.IconName;
	},
>(
	item: (ResumeStylesNamespace.Styles.BaseItemStyles & { icon?: ResumeStylesNamespace.Styles.IconName }) | undefined,
	fallback: TStyle,
): TStyle => {
	if (!item) return fallback;

	return {
		...fallback,
		hidden: item.hidden,
		options: item.options ?? fallback.options,
		icon: item.icon ?? fallback.icon,
	};
};

/**
 * @remarks Finds the first item for a section type, searching custom sections as fallback.
 * @param view - The Resume View payload to inspect.
 * @param type - The section type to locate.
 * @returns The first matching item, if any.
 */
const findFirstItemByType = (
	view: ResumeView,
	type: DraftResume.SectionType,
): ResumeStylesNamespace.Styles.BaseItemStyles | undefined => {
	const sectionItems = (
		view.sections as Record<DraftResume.SectionType, { items: ResumeStylesNamespace.Styles.BaseItemStyles[] }>
	)[type].items;
	if (sectionItems.length > 0) return sectionItems[0];

	for (const customSection of view.customSections) {
		if (customSection.type !== type) continue;
		if (customSection.items.length > 0) return customSection.items[0] as ResumeStylesNamespace.Styles.BaseItemStyles;
	}

	return undefined;
};

/**
 * @remarks
 * Zips DraftResume data and Resume styles into a unified Resume View payload.
 * @param input - Data and styles payloads to merge.
 * @returns A Resume View instance with merged content and styles.
 */
export const zipResumeView = (input: ZipInput): ResumeView => {
	const itemStylesBySection = resolveItemStylesBySection(input.styles);

	const view = {
		picture: { ...input.data.picture, ...input.styles.picture },
		basics: {
			...input.data.basics,
			customFields: input.data.basics.customFields.map((field) => ({
				...field,
				...input.styles.customField,
			})),
		},
		summary: { ...input.data.summary, ...input.styles.summary },
		sections: {
			profiles: mergeSection(input.data.sections.profiles, input.styles.section, itemStylesBySection.profiles),
			experience: mergeSection(input.data.sections.experience, input.styles.section, itemStylesBySection.experience),
			education: mergeSection(input.data.sections.education, input.styles.section, itemStylesBySection.education),
			projects: mergeSection(input.data.sections.projects, input.styles.section, itemStylesBySection.projects),
			skills: mergeSection(input.data.sections.skills, input.styles.section, itemStylesBySection.skills),
			languages: mergeSection(input.data.sections.languages, input.styles.section, itemStylesBySection.languages),
			interests: mergeSection(input.data.sections.interests, input.styles.section, itemStylesBySection.interests),
			awards: mergeSection(input.data.sections.awards, input.styles.section, itemStylesBySection.awards),
			certifications: mergeSection(
				input.data.sections.certifications,
				input.styles.section,
				itemStylesBySection.certifications,
			),
			publications: mergeSection(
				input.data.sections.publications,
				input.styles.section,
				itemStylesBySection.publications,
			),
			volunteer: mergeSection(input.data.sections.volunteer, input.styles.section, itemStylesBySection.volunteer),
			references: mergeSection(input.data.sections.references, input.styles.section, itemStylesBySection.references),
		},
		customSections: input.data.customSections.map((section) =>
			zipCustomSection(section, itemStylesBySection, input.styles.customSection),
		),
		metadata: { ...input.data.metadata, ...input.styles.metadata },
	} satisfies ResumeView;

	return view;
};

/**
 * @remarks
 * Unzips a Resume View payload into DraftResume data and Resume styles.
 * @param view - The Resume View payload to split.
 * @returns Data and styles payloads derived from the view.
 */
export const unzipResumeView = (view: ResumeView): UnzipOutput => {
	const defaults = resumeStylesFactory.defaults();

	const data: DraftData = {
		picture: { url: view.picture.url },
		basics: {
			...view.basics,
			customFields: view.basics.customFields.map((field) => stripItemStyle(field) as DraftResume.CustomFieldData),
		},
		summary: {
			title: view.summary.title,
			content: view.summary.content,
		},
		sections: {
			profiles: {
				title: view.sections.profiles.title,
				items: view.sections.profiles.items.map((item) => stripItemStyle(item) as DraftResume.ProfileItemData),
			},
			experience: {
				title: view.sections.experience.title,
				items: view.sections.experience.items.map((item) => stripItemStyle(item) as DraftResume.ExperienceItemData),
			},
			education: {
				title: view.sections.education.title,
				items: view.sections.education.items.map((item) => stripItemStyle(item) as DraftResume.EducationItemData),
			},
			projects: {
				title: view.sections.projects.title,
				items: view.sections.projects.items.map((item) => stripItemStyle(item) as DraftResume.ProjectItemData),
			},
			skills: {
				title: view.sections.skills.title,
				items: view.sections.skills.items.map((item) => stripItemStyle(item) as DraftResume.SkillItemData),
			},
			languages: {
				title: view.sections.languages.title,
				items: view.sections.languages.items.map((item) => stripItemStyle(item) as DraftResume.LanguageItemData),
			},
			interests: {
				title: view.sections.interests.title,
				items: view.sections.interests.items.map((item) => stripItemStyle(item) as DraftResume.InterestItemData),
			},
			awards: {
				title: view.sections.awards.title,
				items: view.sections.awards.items.map((item) => stripItemStyle(item) as DraftResume.AwardItemData),
			},
			certifications: {
				title: view.sections.certifications.title,
				items: view.sections.certifications.items.map(
					(item) => stripItemStyle(item) as DraftResume.CertificationItemData,
				),
			},
			publications: {
				title: view.sections.publications.title,
				items: view.sections.publications.items.map((item) => stripItemStyle(item) as DraftResume.PublicationItemData),
			},
			volunteer: {
				title: view.sections.volunteer.title,
				items: view.sections.volunteer.items.map((item) => stripItemStyle(item) as DraftResume.VolunteerItemData),
			},
			references: {
				title: view.sections.references.title,
				items: view.sections.references.items.map((item) => stripItemStyle(item) as DraftResume.ReferenceItemData),
			},
		},
		customSections: view.customSections
			.filter((section) => isDraftSectionType(section.type))
			.map((section) => ({
				id: section.id,
				title: section.title,
				type: section.type,
				items: section.items.map((item) => stripItemStyle(item) as DraftResume.CustomSectionItemData),
			})),
		metadata: { notes: view.metadata.notes },
	};

	const styles: ResumeStyles = {
		itemOptions: defaults.itemOptions,
		baseItem: defaults.baseItem,
		picture: {
			hidden: view.picture.hidden,
			size: view.picture.size,
			rotation: view.picture.rotation,
			aspectRatio: view.picture.aspectRatio,
			borderRadius: view.picture.borderRadius,
			borderColor: view.picture.borderColor,
			borderWidth: view.picture.borderWidth,
			shadowColor: view.picture.shadowColor,
			shadowWidth: view.picture.shadowWidth,
		},
		customField:
			view.basics.customFields.length > 0 ? { icon: view.basics.customFields[0].icon } : defaults.customField,
		summary: {
			hidden: view.summary.hidden,
			columns: view.summary.columns,
		},
		section: {
			hidden: view.sections.profiles.hidden,
			columns: view.sections.profiles.columns,
		},
		items: {
			profile: extractIconItemStyle(
				findFirstItemByType(view, "profiles") as ResumeStylesNamespace.Styles.ProfileItemStyles | undefined,
				defaults.items.profile,
			),
			experience: extractItemStyle(
				findFirstItemByType(view, "experience"),
				defaults.items.experience,
			) as ResumeStylesNamespace.Styles.ExperienceItemStyles,
			education: extractItemStyle(
				findFirstItemByType(view, "education"),
				defaults.items.education,
			) as ResumeStylesNamespace.Styles.EducationItemStyles,
			project: extractItemStyle(
				findFirstItemByType(view, "projects"),
				defaults.items.project,
			) as ResumeStylesNamespace.Styles.ProjectItemStyles,
			skill: extractIconItemStyle(
				findFirstItemByType(view, "skills") as ResumeStylesNamespace.Styles.SkillItemStyles | undefined,
				defaults.items.skill,
			),
			language: extractItemStyle(
				findFirstItemByType(view, "languages"),
				defaults.items.language,
			) as ResumeStylesNamespace.Styles.LanguageItemStyles,
			interest: extractIconItemStyle(
				findFirstItemByType(view, "interests") as ResumeStylesNamespace.Styles.InterestItemStyles | undefined,
				defaults.items.interest,
			),
			award: extractItemStyle(
				findFirstItemByType(view, "awards"),
				defaults.items.award,
			) as ResumeStylesNamespace.Styles.AwardItemStyles,
			certification: extractItemStyle(
				findFirstItemByType(view, "certifications"),
				defaults.items.certification,
			) as ResumeStylesNamespace.Styles.CertificationItemStyles,
			publication: extractItemStyle(
				findFirstItemByType(view, "publications"),
				defaults.items.publication,
			) as ResumeStylesNamespace.Styles.PublicationItemStyles,
			volunteer: extractItemStyle(
				findFirstItemByType(view, "volunteer"),
				defaults.items.volunteer,
			) as ResumeStylesNamespace.Styles.VolunteerItemStyles,
			reference: extractItemStyle(
				findFirstItemByType(view, "references"),
				defaults.items.reference,
			) as ResumeStylesNamespace.Styles.ReferenceItemStyles,
		},
		customSection:
			view.customSections.length > 0
				? {
						hidden: view.customSections[0].hidden,
						columns: view.customSections[0].columns,
					}
				: defaults.customSection,
		pageLayout: defaults.pageLayout,
		metadata: (() => {
			const { notes, ...metadataStyles } = view.metadata;
			return metadataStyles;
		})(),
	};

	return { data, styles };
};

/**
 * @remarks
 * Factory for Resume View payloads. This integrates DraftResume and Resume styles
 * factories for ergonomic default construction.
 */
export const resumeViewFactory = {
	/**
	 * @remarks Creates a fully default Resume View payload.
	 * @returns A view built from default data and styles.
	 */
	defaults: (): ResumeView =>
		zipResumeView({ data: draftFactory.draft.empty(), styles: resumeStylesFactory.defaults() }),

	/**
	 * @remarks Zips DraftResume data and Resume styles into a view.
	 * @param input - Data and styles payloads to merge.
	 * @returns A Resume View instance.
	 */
	zip: zipResumeView,

	/**
	 * @remarks Unzips a Resume View payload into data and styles.
	 * @param view - The Resume View payload to split.
	 * @returns Data and styles payloads derived from the view.
	 */
	unzip: unzipResumeView,
};
