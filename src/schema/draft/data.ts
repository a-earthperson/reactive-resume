import z, { type ZodTypeAny } from "zod";

/**
 * @remarks Represents a URL-like value that can be concrete or still being drafted.
 * @example "https://example.com"
 */
export type UrlValue = URL | string;

/**
 * @remarks Couples a human-readable label with a URL-like value.
 * @example { label: "Portfolio", url: "https://example.com" }
 */
export type LabeledURL = {
	label: string;
	url: UrlValue;
};

/**
 * @remarks Namespace that groups Draft Resume data types for cohesive use.
 * @see DraftResume.DraftData
 */
export namespace DraftResume {
	/**
	 * @remarks Represents a single picture reference used by the draft.
	 * @example { url: "https://example.com/photo.jpg" }
	 */
	export type PictureData = {
		url: UrlValue;
	};

	/**
	 * @remarks Captures a custom field with optional link-like content.
	 * @example { text: "Open to relocation", link: "" }
	 */
	export type CustomFieldData = {
		text: string;
		link: UrlValue;
	};

	/**
	 * @remarks Encapsulates the primary identity fields for the draft owner.
	 * @example { name: "A. Person", headline: "", email: "", phone: "", location: "", website: { label: "", url: "" }, customFields: [] }
	 */
	export type BasicsData = {
		name: string;
		headline: string;
		email: string;
		phone: string;
		location: string;
		website: LabeledURL;
		customFields: CustomFieldData[];
	};

	/**
	 * @remarks Holds a short-form overview with title and content.
	 * @example { title: "Summary", content: "" }
	 */
	export type SummaryData = {
		title: string;
		content: string;
	};

	/**
	 * @remarks Captures a social or professional profile entry.
	 * @example { network: "GitHub", username: "aperson", website: { label: "", url: "" } }
	 */
	export type ProfileItemData = {
		network: string;
		username: string;
		website: LabeledURL;
	};

	/**
	 * @remarks Represents a single work experience entry.
	 * @example { company: "Acme", position: "", location: "", period: "", website: { label: "", url: "" }, description: "" }
	 */
	export type ExperienceItemData = {
		company: string;
		position: string;
		location: string;
		period: string;
		website: LabeledURL;
		description: string;
	};

	/**
	 * @remarks Represents a single education entry.
	 * @example { school: "Example University", degree: "", area: "", grade: "", location: "", period: "", website: { label: "", url: "" }, description: "" }
	 */
	export type EducationItemData = {
		school: string;
		degree: string;
		area: string;
		grade: string;
		location: string;
		period: string;
		website: LabeledURL;
		description: string;
	};

	/**
	 * @remarks Represents a single project entry.
	 * @example { name: "Project X", period: "", website: { label: "", url: "" }, description: "" }
	 */
	export type ProjectItemData = {
		name: string;
		period: string;
		website: LabeledURL;
		description: string;
	};

	/**
	 * @remarks Represents a single skill entry.
	 * @example { name: "TypeScript", proficiency: "Advanced", level: 0, keywords: [] }
	 */
	export type SkillItemData = {
		name: string;
		proficiency: string;
		level: number;
		keywords: string[];
	};

	/**
	 * @remarks Represents a single language entry.
	 * @example { language: "English", fluency: "", level: 0 }
	 */
	export type LanguageItemData = {
		language: string;
		fluency: string;
		level: number;
	};

	/**
	 * @remarks Represents a single interest entry.
	 * @example { name: "Photography", keywords: [] }
	 */
	export type InterestItemData = {
		name: string;
		keywords: string[];
	};

	/**
	 * @remarks Represents a single award entry.
	 * @example { title: "Top Performer", awarder: "", date: "", website: { label: "", url: "" }, description: "" }
	 */
	export type AwardItemData = {
		title: string;
		awarder: string;
		date: string;
		website: LabeledURL;
		description: string;
	};

	/**
	 * @remarks Represents a single certification entry.
	 * @example { title: "Certification", issuer: "", date: "", website: { label: "", url: "" }, description: "" }
	 */
	export type CertificationItemData = {
		title: string;
		issuer: string;
		date: string;
		website: LabeledURL;
		description: string;
	};

	/**
	 * @remarks Represents a single publication entry.
	 * @example { title: "Publication", publisher: "", date: "", website: { label: "", url: "" }, description: "" }
	 */
	export type PublicationItemData = {
		title: string;
		publisher: string;
		date: string;
		website: LabeledURL;
		description: string;
	};

	/**
	 * @remarks Represents a single volunteer entry.
	 * @example { organization: "Org", location: "", period: "", website: { label: "", url: "" }, description: "" }
	 */
	export type VolunteerItemData = {
		organization: string;
		location: string;
		period: string;
		website: LabeledURL;
		description: string;
	};

	/**
	 * @remarks Represents a single reference entry.
	 * @example { name: "Reference", position: "", website: { label: "", url: "" }, phone: "", description: "" }
	 */
	export type ReferenceItemData = {
		name: string;
		position: string;
		website: LabeledURL;
		phone: string;
		description: string;
	};

	/**
	 * @remarks Enumerates built-in section identifiers supported by the draft.
	 * @example "experience"
	 */
	export type SectionType =
		| "profiles"
		| "experience"
		| "education"
		| "projects"
		| "skills"
		| "languages"
		| "interests"
		| "awards"
		| "certifications"
		| "publications"
		| "volunteer"
		| "references";

	/**
	 * @remarks Generic section structure that binds a title to a set of items.
	 * @example { title: "Experience", items: [] }
	 */
	export type SectionData<TItemData> = {
		title: string;
		items: TItemData[];
	};

	/**
	 * @remarks Profiles section data container.
	 * @example { title: "Profiles", items: [] }
	 */
	export type ProfilesSectionData = SectionData<ProfileItemData>;

	/**
	 * @remarks Experience section data container.
	 * @example { title: "Experience", items: [] }
	 */
	export type ExperienceSectionData = SectionData<ExperienceItemData>;

	/**
	 * @remarks Education section data container.
	 * @example { title: "Education", items: [] }
	 */
	export type EducationSectionData = SectionData<EducationItemData>;

	/**
	 * @remarks Projects section data container.
	 * @example { title: "Projects", items: [] }
	 */
	export type ProjectsSectionData = SectionData<ProjectItemData>;

	/**
	 * @remarks Skills section data container.
	 * @example { title: "Skills", items: [] }
	 */
	export type SkillsSectionData = SectionData<SkillItemData>;

	/**
	 * @remarks Languages section data container.
	 * @example { title: "Languages", items: [] }
	 */
	export type LanguagesSectionData = SectionData<LanguageItemData>;

	/**
	 * @remarks Interests section data container.
	 * @example { title: "Interests", items: [] }
	 */
	export type InterestsSectionData = SectionData<InterestItemData>;

	/**
	 * @remarks Awards section data container.
	 * @example { title: "Awards", items: [] }
	 */
	export type AwardsSectionData = SectionData<AwardItemData>;

	/**
	 * @remarks Certifications section data container.
	 * @example { title: "Certifications", items: [] }
	 */
	export type CertificationsSectionData = SectionData<CertificationItemData>;

	/**
	 * @remarks Publications section data container.
	 * @example { title: "Publications", items: [] }
	 */
	export type PublicationsSectionData = SectionData<PublicationItemData>;

	/**
	 * @remarks Volunteer section data container.
	 * @example { title: "Volunteer", items: [] }
	 */
	export type VolunteerSectionData = SectionData<VolunteerItemData>;

	/**
	 * @remarks References section data container.
	 * @example { title: "References", items: [] }
	 */
	export type ReferencesSectionData = SectionData<ReferenceItemData>;

	/**
	 * @remarks Allows incremental updates to a section without requiring full data.
	 * @example { title: "Experience", items: [] }
	 */
	export type SectionPayload<TItemPayload> = {
		title?: string;
		items?: TItemPayload[];
	};

	/**
	 * @remarks Permits partial updates to profile items.
	 * @example { network: "GitHub" }
	 */
	export type ProfileItemPayload = Partial<ProfileItemData>;

	/**
	 * @remarks Permits partial updates to experience items.
	 * @example { company: "Acme" }
	 */
	export type ExperienceItemPayload = Partial<ExperienceItemData>;

	/**
	 * @remarks Permits partial updates to education items.
	 * @example { school: "Example University" }
	 */
	export type EducationItemPayload = Partial<EducationItemData>;

	/**
	 * @remarks Permits partial updates to project items.
	 * @example { name: "Project X" }
	 */
	export type ProjectItemPayload = Partial<ProjectItemData>;

	/**
	 * @remarks Permits partial updates to skill items.
	 * @example { name: "TypeScript" }
	 */
	export type SkillItemPayload = Partial<SkillItemData>;

	/**
	 * @remarks Permits partial updates to language items.
	 * @example { language: "English" }
	 */
	export type LanguageItemPayload = Partial<LanguageItemData>;

	/**
	 * @remarks Permits partial updates to interest items.
	 * @example { name: "Photography" }
	 */
	export type InterestItemPayload = Partial<InterestItemData>;

	/**
	 * @remarks Permits partial updates to award items.
	 * @example { title: "Top Performer" }
	 */
	export type AwardItemPayload = Partial<AwardItemData>;

	/**
	 * @remarks Permits partial updates to certification items.
	 * @example { title: "Certification" }
	 */
	export type CertificationItemPayload = Partial<CertificationItemData>;

	/**
	 * @remarks Permits partial updates to publication items.
	 * @example { title: "Publication" }
	 */
	export type PublicationItemPayload = Partial<PublicationItemData>;

	/**
	 * @remarks Permits partial updates to volunteer items.
	 * @example { organization: "Org" }
	 */
	export type VolunteerItemPayload = Partial<VolunteerItemData>;

	/**
	 * @remarks Permits partial updates to reference items.
	 * @example { name: "Reference" }
	 */
	export type ReferenceItemPayload = Partial<ReferenceItemData>;

	/**
	 * @remarks Profiles section update payload.
	 * @example { title: "Profiles", items: [] }
	 */
	export type ProfilesSectionPayload = SectionPayload<ProfileItemPayload>;

	/**
	 * @remarks Experience section update payload.
	 * @example { title: "Experience", items: [] }
	 */
	export type ExperienceSectionPayload = SectionPayload<ExperienceItemPayload>;

	/**
	 * @remarks Education section update payload.
	 * @example { title: "Education", items: [] }
	 */
	export type EducationSectionPayload = SectionPayload<EducationItemPayload>;

	/**
	 * @remarks Projects section update payload.
	 * @example { title: "Projects", items: [] }
	 */
	export type ProjectsSectionPayload = SectionPayload<ProjectItemPayload>;

	/**
	 * @remarks Skills section update payload.
	 * @example { title: "Skills", items: [] }
	 */
	export type SkillsSectionPayload = SectionPayload<SkillItemPayload>;

	/**
	 * @remarks Languages section update payload.
	 * @example { title: "Languages", items: [] }
	 */
	export type LanguagesSectionPayload = SectionPayload<LanguageItemPayload>;

	/**
	 * @remarks Interests section update payload.
	 * @example { title: "Interests", items: [] }
	 */
	export type InterestsSectionPayload = SectionPayload<InterestItemPayload>;

	/**
	 * @remarks Awards section update payload.
	 * @example { title: "Awards", items: [] }
	 */
	export type AwardsSectionPayload = SectionPayload<AwardItemPayload>;

	/**
	 * @remarks Certifications section update payload.
	 * @example { title: "Certifications", items: [] }
	 */
	export type CertificationsSectionPayload = SectionPayload<CertificationItemPayload>;

	/**
	 * @remarks Publications section update payload.
	 * @example { title: "Publications", items: [] }
	 */
	export type PublicationsSectionPayload = SectionPayload<PublicationItemPayload>;

	/**
	 * @remarks Volunteer section update payload.
	 * @example { title: "Volunteer", items: [] }
	 */
	export type VolunteerSectionPayload = SectionPayload<VolunteerItemPayload>;

	/**
	 * @remarks References section update payload.
	 * @example { title: "References", items: [] }
	 */
	export type ReferencesSectionPayload = SectionPayload<ReferenceItemPayload>;

	/**
	 * @remarks Aggregates all built-in section data for the draft.
	 * @example { profiles: { title: "", items: [] }, experience: { title: "", items: [] }, education: { title: "", items: [] }, projects: { title: "", items: [] }, skills: { title: "", items: [] }, languages: { title: "", items: [] }, interests: { title: "", items: [] }, awards: { title: "", items: [] }, certifications: { title: "", items: [] }, publications: { title: "", items: [] }, volunteer: { title: "", items: [] }, references: { title: "", items: [] } }
	 */
	export type SectionsData = {
		profiles: ProfilesSectionData;
		experience: ExperienceSectionData;
		education: EducationSectionData;
		projects: ProjectsSectionData;
		skills: SkillsSectionData;
		languages: LanguagesSectionData;
		interests: InterestsSectionData;
		awards: AwardsSectionData;
		certifications: CertificationsSectionData;
		publications: PublicationsSectionData;
		volunteer: VolunteerSectionData;
		references: ReferencesSectionData;
	};

	/**
	 * @remarks Represents an item in a custom section.
	 * @example { name: "Custom Item" }
	 */
	export type CustomSectionItemData =
		| ProfileItemData
		| ExperienceItemData
		| EducationItemData
		| ProjectItemData
		| SkillItemData
		| LanguageItemData
		| InterestItemData
		| AwardItemData
		| CertificationItemData
		| PublicationItemData
		| VolunteerItemData
		| ReferenceItemData;

	/**
	 * @remarks Stores a custom section, mapping a type to its items.
	 * @example { type: "projects", items: [] }
	 */
	export type CustomSectionData = {
		type: SectionType;
		items: CustomSectionItemData[];
	};

	/**
	 * @remarks Holds metadata for draft-specific behaviors or notes.
	 * @example { notes: "" }
	 */
	export type MetadataData = {
		notes: string;
	};

	/**
	 * @remarks Top-level draft data structure persisted by the /draft endpoints.
	 * @example { picture: { url: "" }, basics: { name: "", headline: "", email: "", phone: "", location: "", website: { label: "", url: "" }, customFields: [] }, summary: { title: "", content: "" }, sections: { profiles: { title: "", items: [] }, experience: { title: "", items: [] }, education: { title: "", items: [] }, projects: { title: "", items: [] }, skills: { title: "", items: [] }, languages: { title: "", items: [] }, interests: { title: "", items: [] }, awards: { title: "", items: [] }, certifications: { title: "", items: [] }, publications: { title: "", items: [] }, volunteer: { title: "", items: [] }, references: { title: "", items: [] } }, customSections: [], metadata: { notes: "" } }
	 */
	export type DraftData = {
		picture: PictureData;
		basics: BasicsData;
		summary: SummaryData;
		sections: SectionsData;
		customSections: CustomSectionData[];
		metadata: MetadataData;
	};
}

/**
 * @remarks Alias for the canonical Draft Resume data model.
 * @see DraftResume.DraftData
 */
export type DraftData = DraftResume.DraftData;

/**
 * @remarks Defines the accepted URL-like values for draft payloads.
 * @example "https://example.com"
 */
const urlValueSchema = z.union([z.string(), z.instanceof(URL)]);

/**
 * @remarks Validates a labeled URL pair.
 * @example { label: "Portfolio", url: "https://example.com" }
 */
const labeledUrlSchema = z.object({
	label: z.string(),
	url: urlValueSchema,
});

/**
 * @remarks Validates the picture payload for draft data.
 * @example { url: "" }
 */
const pictureDataSchema = z.object({
	url: urlValueSchema,
});

/**
 * @remarks Validates a custom field payload for draft data.
 * @example { text: "Open to relocation", link: "" }
 */
const customFieldDataSchema = z.object({
	text: z.string(),
	link: urlValueSchema,
});

/**
 * @remarks Validates the basics section for draft data.
 * @example { name: "", headline: "", email: "", phone: "", location: "", website: { label: "", url: "" }, customFields: [] }
 */
const basicsDataSchema = z.object({
	name: z.string(),
	headline: z.string(),
	email: z.string(),
	phone: z.string(),
	location: z.string(),
	website: labeledUrlSchema,
	customFields: z.array(customFieldDataSchema),
});

/**
 * @remarks Validates the summary section for draft data.
 * @example { title: "", content: "" }
 */
const summaryDataSchema = z.object({
	title: z.string(),
	content: z.string(),
});

/**
 * @remarks Validates a profile item for draft data.
 * @example { network: "", username: "", website: { label: "", url: "" } }
 */
const profileItemDataSchema = z.object({
	network: z.string(),
	username: z.string(),
	website: labeledUrlSchema,
});

/**
 * @remarks Validates an experience item for draft data.
 * @example { company: "", position: "", location: "", period: "", website: { label: "", url: "" }, description: "" }
 */
const experienceItemDataSchema = z.object({
	company: z.string(),
	position: z.string(),
	location: z.string(),
	period: z.string(),
	website: labeledUrlSchema,
	description: z.string(),
});

/**
 * @remarks Validates an education item for draft data.
 * @example { school: "", degree: "", area: "", grade: "", location: "", period: "", website: { label: "", url: "" }, description: "" }
 */
const educationItemDataSchema = z.object({
	school: z.string(),
	degree: z.string(),
	area: z.string(),
	grade: z.string(),
	location: z.string(),
	period: z.string(),
	website: labeledUrlSchema,
	description: z.string(),
});

/**
 * @remarks Validates a project item for draft data.
 * @example { name: "", period: "", website: { label: "", url: "" }, description: "" }
 */
const projectItemDataSchema = z.object({
	name: z.string(),
	period: z.string(),
	website: labeledUrlSchema,
	description: z.string(),
});

/**
 * @remarks Validates a skill item for draft data.
 * @example { name: "", proficiency: "", level: 0, keywords: [] }
 */
const skillItemDataSchema = z.object({
	name: z.string(),
	proficiency: z.string(),
	level: z.number(),
	keywords: z.array(z.string()),
});

/**
 * @remarks Validates a language item for draft data.
 * @example { language: "", fluency: "", level: 0 }
 */
const languageItemDataSchema = z.object({
	language: z.string(),
	fluency: z.string(),
	level: z.number(),
});

/**
 * @remarks Validates an interest item for draft data.
 * @example { name: "", keywords: [] }
 */
const interestItemDataSchema = z.object({
	name: z.string(),
	keywords: z.array(z.string()),
});

/**
 * @remarks Validates an award item for draft data.
 * @example { title: "", awarder: "", date: "", website: { label: "", url: "" }, description: "" }
 */
const awardItemDataSchema = z.object({
	title: z.string(),
	awarder: z.string(),
	date: z.string(),
	website: labeledUrlSchema,
	description: z.string(),
});

/**
 * @remarks Validates a certification item for draft data.
 * @example { title: "", issuer: "", date: "", website: { label: "", url: "" }, description: "" }
 */
const certificationItemDataSchema = z.object({
	title: z.string(),
	issuer: z.string(),
	date: z.string(),
	website: labeledUrlSchema,
	description: z.string(),
});

/**
 * @remarks Validates a publication item for draft data.
 * @example { title: "", publisher: "", date: "", website: { label: "", url: "" }, description: "" }
 */
const publicationItemDataSchema = z.object({
	title: z.string(),
	publisher: z.string(),
	date: z.string(),
	website: labeledUrlSchema,
	description: z.string(),
});

/**
 * @remarks Validates a volunteer item for draft data.
 * @example { organization: "", location: "", period: "", website: { label: "", url: "" }, description: "" }
 */
const volunteerItemDataSchema = z.object({
	organization: z.string(),
	location: z.string(),
	period: z.string(),
	website: labeledUrlSchema,
	description: z.string(),
});

/**
 * @remarks Validates a reference item for draft data.
 * @example { name: "", position: "", website: { label: "", url: "" }, phone: "", description: "" }
 */
const referenceItemDataSchema = z.object({
	name: z.string(),
	position: z.string(),
	website: labeledUrlSchema,
	phone: z.string(),
	description: z.string(),
});

/**
 * @remarks Provides a reusable section schema for draft sections.
 * @param itemSchema - The schema for the items inside the section.
 * @returns A section schema with a title and items list.
 */
const createSectionSchema = <TItemSchema extends ZodTypeAny>(itemSchema: TItemSchema) =>
	z.object({
		title: z.string(),
		items: z.array(itemSchema),
	});

/**
 * @remarks Validates the supported section identifiers for drafts.
 * @example "skills"
 */
const sectionTypeSchema = z.enum([
	"profiles",
	"experience",
	"education",
	"projects",
	"skills",
	"languages",
	"interests",
	"awards",
	"certifications",
	"publications",
	"volunteer",
	"references",
]);

/**
 * @remarks Validates the aggregate sections object for drafts.
 * @example { profiles: { title: "", items: [] }, experience: { title: "", items: [] }, education: { title: "", items: [] }, projects: { title: "", items: [] }, skills: { title: "", items: [] }, languages: { title: "", items: [] }, interests: { title: "", items: [] }, awards: { title: "", items: [] }, certifications: { title: "", items: [] }, publications: { title: "", items: [] }, volunteer: { title: "", items: [] }, references: { title: "", items: [] } }
 */
const sectionsDataSchema = z.object({
	profiles: createSectionSchema(profileItemDataSchema),
	experience: createSectionSchema(experienceItemDataSchema),
	education: createSectionSchema(educationItemDataSchema),
	projects: createSectionSchema(projectItemDataSchema),
	skills: createSectionSchema(skillItemDataSchema),
	languages: createSectionSchema(languageItemDataSchema),
	interests: createSectionSchema(interestItemDataSchema),
	awards: createSectionSchema(awardItemDataSchema),
	certifications: createSectionSchema(certificationItemDataSchema),
	publications: createSectionSchema(publicationItemDataSchema),
	volunteer: createSectionSchema(volunteerItemDataSchema),
	references: createSectionSchema(referenceItemDataSchema),
});

/**
 * @remarks Validates a custom section item union for drafts.
 * @example { name: "" }
 */
const customSectionItemDataSchema = z.union([
	profileItemDataSchema,
	experienceItemDataSchema,
	educationItemDataSchema,
	projectItemDataSchema,
	skillItemDataSchema,
	languageItemDataSchema,
	interestItemDataSchema,
	awardItemDataSchema,
	certificationItemDataSchema,
	publicationItemDataSchema,
	volunteerItemDataSchema,
	referenceItemDataSchema,
]);

/**
 * @remarks Validates a custom section structure for drafts.
 * @example { type: "projects", items: [] }
 */
const customSectionDataSchema = z.object({
	type: sectionTypeSchema,
	items: z.array(customSectionItemDataSchema),
});

/**
 * @remarks Validates metadata for draft data.
 * @example { notes: "" }
 */
const metadataDataSchema = z.object({
	notes: z.string(),
});

/**
 * @remarks Validates Draft Resume data while allowing empty string values.
 * @example { picture: { url: "" }, basics: { name: "", headline: "", email: "", phone: "", location: "", website: { label: "", url: "" }, customFields: [] }, summary: { title: "", content: "" }, sections: { profiles: { title: "", items: [] }, experience: { title: "", items: [] }, education: { title: "", items: [] }, projects: { title: "", items: [] }, skills: { title: "", items: [] }, languages: { title: "", items: [] }, interests: { title: "", items: [] }, awards: { title: "", items: [] }, certifications: { title: "", items: [] }, publications: { title: "", items: [] }, volunteer: { title: "", items: [] }, references: { title: "", items: [] } }, customSections: [], metadata: { notes: "" } }
 */
export const draftDataSchema = z.object({
	picture: pictureDataSchema,
	basics: basicsDataSchema,
	summary: summaryDataSchema,
	sections: sectionsDataSchema,
	customSections: z.array(customSectionDataSchema),
	metadata: metadataDataSchema,
});
