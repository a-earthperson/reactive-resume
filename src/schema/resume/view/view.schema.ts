/**
 * @packageDocumentation
 *
 * @remarks
 * Runtime validation schemas for Resume View payloads. These schemas "zip" DraftResume
 * data with Resume styles to form the unified view model used by renderers.
 *
 * The intent is to keep data and styling orthogonal in their own modules, while
 * composing them here into a single view contract.
 *
 * @see {@link ../data | Resume data}
 * @see {@link ../styles | Resume styles}
 */
import z from "zod";
import {
	awardItemDataSchema,
	awardsSectionDataSchema,
	basicsDataSchema,
	certificationItemDataSchema,
	certificationsSectionDataSchema,
	customFieldDataSchema,
	customSectionDataSchema,
	educationItemDataSchema,
	educationSectionDataSchema,
	experienceItemDataSchema,
	experienceSectionDataSchema,
	interestItemDataSchema,
	interestsSectionDataSchema,
	languageItemDataSchema,
	languagesSectionDataSchema,
	metadataDataSchema,
	pictureDataSchema,
	profileItemDataSchema,
	profilesSectionDataSchema,
	projectItemDataSchema,
	projectsSectionDataSchema,
	publicationItemDataSchema,
	publicationsSectionDataSchema,
	referenceItemDataSchema,
	referencesSectionDataSchema,
	sectionsDataSchema,
	sectionTypeSchema,
	skillItemDataSchema,
	skillsSectionDataSchema,
	summaryDataSchema,
	volunteerItemDataSchema,
	volunteerSectionDataSchema,
} from "../data/index";
import {
	awardItemStylesSchema,
	certificationItemStylesSchema,
	customFieldStylesSchema,
	customSectionStylesSchema,
	educationItemStylesSchema,
	experienceItemStylesSchema,
	interestItemStylesSchema,
	languageItemStylesSchema,
	metadataStylesSchema,
	pictureStylesSchema,
	profileItemStylesSchema,
	projectItemStylesSchema,
	publicationItemStylesSchema,
	referenceItemStylesSchema,
	sectionStylesSchema,
	skillItemStylesSchema,
	summaryStylesSchema,
	volunteerItemStylesSchema,
} from "../styles";

/**
 * @remarks
 * View schema for the profile picture, combining data and styles.
 * @example { url: "", hidden: false, size: 80 }
 */
export const pictureViewSchema = pictureDataSchema.merge(pictureStylesSchema);

/**
 * @remarks
 * View schema for custom fields in the basics section.
 * @example { id: "custom-1", text: "", link: "", icon: "" }
 */
export const customFieldViewSchema = customFieldDataSchema.merge(customFieldStylesSchema);

/**
 * @remarks
 * View schema for the basics section, using styled custom fields.
 * @example { name: "", headline: "", customFields: [] }
 */
export const basicsViewSchema = basicsDataSchema.extend({
	customFields: z.array(customFieldViewSchema),
});

/**
 * @remarks
 * View schema for the summary section, combining content with visibility and column styles.
 * @example { title: "", content: "", hidden: false, columns: 1 }
 */
export const summaryViewSchema = summaryDataSchema.merge(summaryStylesSchema);

/**
 * @remarks
 * View schema for profile items, combining identity data with item styles.
 * @example { id: "profile-1", network: "", username: "", icon: "", hidden: false }
 */
export const profileItemViewSchema = profileItemDataSchema.merge(profileItemStylesSchema);

/**
 * @remarks
 * View schema for experience items, combining content with item styles.
 * @example { id: "exp-1", company: "", position: "", hidden: false }
 */
export const experienceItemViewSchema = experienceItemDataSchema.merge(experienceItemStylesSchema);

/**
 * @remarks
 * View schema for education items, combining content with item styles.
 * @example { id: "edu-1", school: "", degree: "", hidden: false }
 */
export const educationItemViewSchema = educationItemDataSchema.merge(educationItemStylesSchema);

/**
 * @remarks
 * View schema for project items, combining content with item styles.
 * @example { id: "proj-1", name: "", period: "", hidden: false }
 */
export const projectItemViewSchema = projectItemDataSchema.merge(projectItemStylesSchema);

/**
 * @remarks
 * View schema for skill items, combining content with icon and item styles.
 * @example { id: "skill-1", name: "", level: 0, icon: "", hidden: false }
 */
export const skillItemViewSchema = skillItemDataSchema.merge(skillItemStylesSchema);

/**
 * @remarks
 * View schema for language items, combining content with item styles.
 * @example { id: "lang-1", language: "", level: 0, hidden: false }
 */
export const languageItemViewSchema = languageItemDataSchema.merge(languageItemStylesSchema);

/**
 * @remarks
 * View schema for interest items, combining content with icon and item styles.
 * @example { id: "interest-1", name: "", icon: "", hidden: false }
 */
export const interestItemViewSchema = interestItemDataSchema.merge(interestItemStylesSchema);

/**
 * @remarks
 * View schema for award items, combining content with item styles.
 * @example { id: "award-1", title: "", date: "", hidden: false }
 */
export const awardItemViewSchema = awardItemDataSchema.merge(awardItemStylesSchema);

/**
 * @remarks
 * View schema for certification items, combining content with item styles.
 * @example { id: "cert-1", title: "", issuer: "", hidden: false }
 */
export const certificationItemViewSchema = certificationItemDataSchema.merge(certificationItemStylesSchema);

/**
 * @remarks
 * View schema for publication items, combining content with item styles.
 * @example { id: "pub-1", title: "", publisher: "", hidden: false }
 */
export const publicationItemViewSchema = publicationItemDataSchema.merge(publicationItemStylesSchema);

/**
 * @remarks
 * View schema for volunteer items, combining content with item styles.
 * @example { id: "vol-1", organization: "", hidden: false }
 */
export const volunteerItemViewSchema = volunteerItemDataSchema.merge(volunteerItemStylesSchema);

/**
 * @remarks
 * View schema for reference items, combining content with item styles.
 * @example { id: "ref-1", name: "", hidden: false }
 */
export const referenceItemViewSchema = referenceItemDataSchema.merge(referenceItemStylesSchema);

/**
 * @remarks
 * View schema for the profiles section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const profilesSectionViewSchema = profilesSectionDataSchema
	.extend({ items: z.array(profileItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the experience section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const experienceSectionViewSchema = experienceSectionDataSchema
	.extend({ items: z.array(experienceItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the education section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const educationSectionViewSchema = educationSectionDataSchema
	.extend({ items: z.array(educationItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the projects section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const projectsSectionViewSchema = projectsSectionDataSchema
	.extend({ items: z.array(projectItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the skills section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const skillsSectionViewSchema = skillsSectionDataSchema
	.extend({ items: z.array(skillItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the languages section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const languagesSectionViewSchema = languagesSectionDataSchema
	.extend({ items: z.array(languageItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the interests section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const interestsSectionViewSchema = interestsSectionDataSchema
	.extend({ items: z.array(interestItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the awards section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const awardsSectionViewSchema = awardsSectionDataSchema
	.extend({ items: z.array(awardItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the certifications section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const certificationsSectionViewSchema = certificationsSectionDataSchema
	.extend({ items: z.array(certificationItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the publications section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const publicationsSectionViewSchema = publicationsSectionDataSchema
	.extend({ items: z.array(publicationItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the volunteer section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const volunteerSectionViewSchema = volunteerSectionDataSchema
	.extend({ items: z.array(volunteerItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the references section, combining section data and styles.
 * @example { title: "", items: [], hidden: false, columns: 1 }
 */
export const referencesSectionViewSchema = referencesSectionDataSchema
	.extend({ items: z.array(referenceItemViewSchema) })
	.merge(sectionStylesSchema);

/**
 * @remarks
 * View schema for the full sections object.
 * @example { profiles: { title: "", items: [], hidden: false, columns: 1 } }
 */
export const sectionsViewSchema = sectionsDataSchema.extend({
	profiles: profilesSectionViewSchema,
	experience: experienceSectionViewSchema,
	education: educationSectionViewSchema,
	projects: projectsSectionViewSchema,
	skills: skillsSectionViewSchema,
	languages: languagesSectionViewSchema,
	interests: interestsSectionViewSchema,
	awards: awardsSectionViewSchema,
	certifications: certificationsSectionViewSchema,
	publications: publicationsSectionViewSchema,
	volunteer: volunteerSectionViewSchema,
	references: referencesSectionViewSchema,
});

/**
 * @remarks
 * View schema for custom section items, allowing any styled item type.
 * @example { id: "custom-item-1", hidden: false }
 */
export const customSectionItemViewSchema = z.union([
	profileItemViewSchema,
	experienceItemViewSchema,
	educationItemViewSchema,
	projectItemViewSchema,
	skillItemViewSchema,
	languageItemViewSchema,
	interestItemViewSchema,
	awardItemViewSchema,
	certificationItemViewSchema,
	publicationItemViewSchema,
	volunteerItemViewSchema,
	referenceItemViewSchema,
]);

/**
 * @remarks
 * View schema for custom sections, combining data with section styles.
 * @example { id: "custom-1", title: "", type: "experience", hidden: false, columns: 1 }
 */
export const customSectionViewSchema = customSectionDataSchema
	.extend({ items: z.array(customSectionItemViewSchema) })
	.merge(customSectionStylesSchema);

/**
 * @remarks
 * View schema for metadata, combining notes with styling configuration.
 * @example { notes: "", template: "onyx", layout: { sidebarWidth: 35, pages: [] } }
 */
export const metadataViewSchema = metadataDataSchema.merge(metadataStylesSchema);

/**
 * @remarks
 * Top-level Resume View schema, combining draft data with styles.
 * @example { picture: { url: "", hidden: false }, basics: { name: "", customFields: [] } }
 */
export const resumeViewSchema = z.object({
	picture: pictureViewSchema,
	basics: basicsViewSchema,
	summary: summaryViewSchema,
	sections: sectionsViewSchema,
	customSections: z.array(customSectionViewSchema),
	metadata: metadataViewSchema,
});

/**
 * @remarks
 * Re-exported section type schema for view consumers.
 * @example "experience"
 */
export const viewSectionTypeSchema = sectionTypeSchema;
