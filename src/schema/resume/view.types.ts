/**
 * @packageDocumentation
 *
 * @remarks
 * Compile-time types for Resume View payloads. These types are inferred from
 * the runtime schemas in `view.schema.ts` to keep the view contract schema-first.
 *
 * @see {@link ./view.schema | Resume View schemas}
 */
import type { infer as ZodInfer } from "zod";
import type {
	awardItemViewSchema,
	awardsSectionViewSchema,
	basicsViewSchema,
	certificationItemViewSchema,
	certificationsSectionViewSchema,
	coverLetterItemViewSchema,
	customFieldViewSchema,
	customSectionItemViewSchema,
	customSectionTypeSchema,
	customSectionViewSchema,
	educationItemViewSchema,
	educationSectionViewSchema,
	experienceItemViewSchema,
	experienceSectionViewSchema,
	interestItemViewSchema,
	interestsSectionViewSchema,
	languageItemViewSchema,
	languagesSectionViewSchema,
	metadataViewSchema,
	pictureViewSchema,
	profileItemViewSchema,
	profilesSectionViewSchema,
	projectItemViewSchema,
	projectsSectionViewSchema,
	publicationItemViewSchema,
	publicationsSectionViewSchema,
	referenceItemViewSchema,
	referencesSectionViewSchema,
	resumeViewSchema,
	sectionsViewSchema,
	skillItemViewSchema,
	skillsSectionViewSchema,
	summaryItemViewSchema,
	summaryViewSchema,
	viewSectionTypeSchema,
	volunteerItemViewSchema,
	volunteerSectionViewSchema,
} from "./view.schema.ts";

/**
 * @remarks Namespace grouping Resume View types.
 * @see {@link ./view.schema | Resume View schemas}
 */
export namespace Resume {
	/**
	 * @remarks Types that represent the zipped data+style view model.
	 */
	namespace View {
		/**
		 * @remarks View type for the profile picture.
		 * @example { url: "", hidden: false, size: 80 }
		 */
		export type Picture = ZodInfer<typeof pictureViewSchema>;

		/**
		 * @remarks View type for custom fields in basics.
		 * @example { id: "custom-1", text: "", link: "", icon: "" }
		 */
		export type CustomField = ZodInfer<typeof customFieldViewSchema>;

		/**
		 * @remarks View type for the basics section.
		 * @example { name: "", headline: "", customFields: [] }
		 */
		export type Basics = ZodInfer<typeof basicsViewSchema>;

		/**
		 * @remarks View type for the summary section.
		 * @example { title: "", content: "", hidden: false, columns: 1 }
		 */
		export type Summary = ZodInfer<typeof summaryViewSchema>;

		/**
		 * @remarks View type for profile items.
		 * @example { id: "profile-1", network: "", icon: "", hidden: false }
		 */
		export type ProfileItem = ZodInfer<typeof profileItemViewSchema>;

		/**
		 * @remarks View type for experience items.
		 * @example { id: "exp-1", company: "", hidden: false }
		 */
		export type ExperienceItem = ZodInfer<typeof experienceItemViewSchema>;

		/**
		 * @remarks View type for education items.
		 * @example { id: "edu-1", school: "", hidden: false }
		 */
		export type EducationItem = ZodInfer<typeof educationItemViewSchema>;

		/**
		 * @remarks View type for project items.
		 * @example { id: "proj-1", name: "", hidden: false }
		 */
		export type ProjectItem = ZodInfer<typeof projectItemViewSchema>;

		/**
		 * @remarks View type for skill items.
		 * @example { id: "skill-1", name: "", icon: "", hidden: false }
		 */
		export type SkillItem = ZodInfer<typeof skillItemViewSchema>;

		/**
		 * @remarks View type for language items.
		 * @example { id: "lang-1", language: "", hidden: false }
		 */
		export type LanguageItem = ZodInfer<typeof languageItemViewSchema>;

		/**
		 * @remarks View type for interest items.
		 * @example { id: "interest-1", name: "", icon: "", hidden: false }
		 */
		export type InterestItem = ZodInfer<typeof interestItemViewSchema>;

		/**
		 * @remarks View type for award items.
		 * @example { id: "award-1", title: "", hidden: false }
		 */
		export type AwardItem = ZodInfer<typeof awardItemViewSchema>;

		/**
		 * @remarks View type for certification items.
		 * @example { id: "cert-1", title: "", hidden: false }
		 */
		export type CertificationItem = ZodInfer<typeof certificationItemViewSchema>;

		/**
		 * @remarks View type for publication items.
		 * @example { id: "pub-1", title: "", hidden: false }
		 */
		export type PublicationItem = ZodInfer<typeof publicationItemViewSchema>;

		/**
		 * @remarks View type for volunteer items.
		 * @example { id: "vol-1", organization: "", hidden: false }
		 */
		export type VolunteerItem = ZodInfer<typeof volunteerItemViewSchema>;

		/**
		 * @remarks View type for reference items.
		 * @example { id: "ref-1", name: "", hidden: false }
		 */
		export type ReferenceItem = ZodInfer<typeof referenceItemViewSchema>;

		/**
		 * @remarks View type for summary items in custom sections.
		 * @example { id: "summary-1", content: "", hidden: false }
		 */
		export type SummaryItem = ZodInfer<typeof summaryItemViewSchema>;

		/**
		 * @remarks View type for cover letter items in custom sections.
		 * @example { id: "cover-letter-1", recipient: "", content: "", hidden: false }
		 */
		export type CoverLetterItem = ZodInfer<typeof coverLetterItemViewSchema>;

		/**
		 * @remarks View type for profiles section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type ProfilesSection = ZodInfer<typeof profilesSectionViewSchema>;

		/**
		 * @remarks View type for experience section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type ExperienceSection = ZodInfer<typeof experienceSectionViewSchema>;

		/**
		 * @remarks View type for education section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type EducationSection = ZodInfer<typeof educationSectionViewSchema>;

		/**
		 * @remarks View type for projects section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type ProjectsSection = ZodInfer<typeof projectsSectionViewSchema>;

		/**
		 * @remarks View type for skills section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type SkillsSection = ZodInfer<typeof skillsSectionViewSchema>;

		/**
		 * @remarks View type for languages section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type LanguagesSection = ZodInfer<typeof languagesSectionViewSchema>;

		/**
		 * @remarks View type for interests section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type InterestsSection = ZodInfer<typeof interestsSectionViewSchema>;

		/**
		 * @remarks View type for awards section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type AwardsSection = ZodInfer<typeof awardsSectionViewSchema>;

		/**
		 * @remarks View type for certifications section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type CertificationsSection = ZodInfer<typeof certificationsSectionViewSchema>;

		/**
		 * @remarks View type for publications section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type PublicationsSection = ZodInfer<typeof publicationsSectionViewSchema>;

		/**
		 * @remarks View type for volunteer section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type VolunteerSection = ZodInfer<typeof volunteerSectionViewSchema>;

		/**
		 * @remarks View type for references section.
		 * @example { title: "", items: [], hidden: false, columns: 1 }
		 */
		export type ReferencesSection = ZodInfer<typeof referencesSectionViewSchema>;

		/**
		 * @remarks View type for the sections collection.
		 * @example { profiles: { title: "", items: [], hidden: false, columns: 1 } }
		 */
		export type Sections = ZodInfer<typeof sectionsViewSchema>;

		/**
		 * @remarks View type for custom section items.
		 * @example { id: "custom-item-1", hidden: false }
		 */
		export type CustomSectionItem = ZodInfer<typeof customSectionItemViewSchema>;

		/**
		 * @remarks View type for custom sections.
		 * @example { id: "custom-1", title: "", type: "experience", hidden: false, columns: 1 }
		 */
		export type CustomSection = ZodInfer<typeof customSectionViewSchema>;

		/**
		 * @remarks View type for custom section identifiers.
		 * @example "summary"
		 */
		export type CustomSectionType = ZodInfer<typeof customSectionTypeSchema>;

		/**
		 * @remarks View type for metadata.
		 * @example { notes: "", template: "onyx", layout: { sidebarWidth: 35, pages: [] } }
		 */
		export type Metadata= ZodInfer<typeof metadataViewSchema>;

		/**
		 * @remarks View type for section identifiers.
		 * @example "experience"
		 */
		export type SectionType = ZodInfer<typeof viewSectionTypeSchema>;

		/**
		 * @remarks View type for section items by section identifier.
		 * @example { id: "exp-1", company: "", hidden: false }
		 */
		export type SectionItem<TSection extends SectionType = SectionType> = Sections[TSection]["items"][number];

		/**
		 * @remarks Top-level Resume View type.
		 * @example { picture: { url: "", hidden: false }, basics: { name: "", customFields: [] } }
		 */
		export type Resume = ZodInfer<typeof resumeViewSchema>;
	}

	/**
	 * @remarks Alias for the top-level Resume View type.
	 * @see Resume.View.Resume  */
	export type View = View.Resume;

}
// /**
//  * @remarks Alias for built-in section identifiers.
//  */
// export type SectionType = Resume.View.SectionType;
//
// /**
//  * @remarks Alias for custom section identifiers (includes summary and cover letter).
//  */
// export type CustomSectionType = Resume.View.CustomSectionType;
//
// /**
//  * @remarks Alias for section items by section identifier.
//  */
// export type SectionItem<TSection extends SectionType = SectionType> = Resume.View.SectionItem<TSection>;
//
// /**
//  * @remarks Alias for custom section items.
//  */
// export type CustomSectionItem = Resume.View.CustomSectionItem;
//
// /**
//  * @remarks Alias for custom section payloads.
//  */
// export type CustomSection = Resume.View.CustomSection;
// export type CustomSectionView = Resume.View.CustomSection;
//
// /**
//  * @remarks Alias for summary custom section items.
//  */
// export type SummaryItem = Resume.View.SummaryItem;
// export type SummaryItemView = Resume.View.SummaryItem;
//
// /**
//  * @remarks Alias for cover letter custom section items.
//  */
// export type CoverLetterItem = Resume.View.CoverLetterItem;
// export type CoverLetterItemView = Resume.View.CoverLetterItem;
