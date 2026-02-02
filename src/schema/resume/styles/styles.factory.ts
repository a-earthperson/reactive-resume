/**
 * @packageDocumentation
 *
 * @remarks
 * Factory helpers for Resume styles. Defaults are sourced from the colocated
 * `default_styles.json` file to keep configuration data-driven and auditable.
 *
 * This module validates the JSON payload at runtime and exposes typed helpers
 * that return cloned defaults to prevent accidental mutation of shared state.
 *
 * @see {@link ./default_styles.json | Default Resume styles JSON}
 * @see {@link ./styles.schema | Resume Styles schemas}
 * @see {@link ./styles.types | Resume Styles types}
 */
import type z from "zod";
import defaultStylesJson from "./default_styles.json";
import { resumeStylesSchema } from "./styles.schema";
import type { Resume } from "./styles.types";

/**
 * @remarks Canonical defaults parsed from `default_styles.json`.
 */
const defaultStyles = resumeStylesSchema.parse(defaultStylesJson);

/**
 * @remarks Strongly-typed default styles payload derived from JSON.
 */
export type ResumeStyles = z.infer<typeof resumeStylesSchema>;

/**
 * @remarks Deep clone helper for JSON-based defaults to avoid shared mutation.
 * @param value - The value to clone.
 * @returns A structured clone of the value.
 */
const cloneDefaults = <T>(value: T): T => structuredClone(value);

/**
 * @remarks Exposes read-only defaults without cloning (internal use only).
 * @returns The parsed defaults payload.
 */
const getDefaults = (): ResumeStyles => defaultStyles;

/**
 * @remarks
 * Factory for resume style defaults. Use these helpers to create fresh
 * instances of styles for view construction.
 */
export const resumeStylesFactory = {
	/**
	 * @remarks Returns the full defaults payload as a deep clone.
	 * @returns A cloned defaults object.
	 */
	defaults: (): ResumeStyles => cloneDefaults(getDefaults()),

	/**
	 * @remarks Item-level style defaults.
	 */
	item: {
		/**
		 * @remarks Base item options defaults.
		 * @returns Default item options.
		 */
		options: {
			defaults: (): Resume.Styles.ItemOptions => cloneDefaults(getDefaults().itemOptions),
		},

		/**
		 * @remarks Base item styles defaults.
		 * @returns Default base item styles.
		 */
		base: {
			defaults: (): Resume.Styles.BaseItemStyles => cloneDefaults(getDefaults().baseItem),
		},

		/**
		 * @remarks Default styles for profile items.
		 * @returns Default profile item styles.
		 */
		profile: {
			defaults: (): Resume.Styles.ProfileItemStyles => cloneDefaults(getDefaults().items.profile),
		},

		/**
		 * @remarks Default styles for experience items.
		 * @returns Default experience item styles.
		 */
		experience: {
			defaults: (): Resume.Styles.ExperienceItemStyles => cloneDefaults(getDefaults().items.experience),
		},

		/**
		 * @remarks Default styles for education items.
		 * @returns Default education item styles.
		 */
		education: {
			defaults: (): Resume.Styles.EducationItemStyles => cloneDefaults(getDefaults().items.education),
		},

		/**
		 * @remarks Default styles for project items.
		 * @returns Default project item styles.
		 */
		project: {
			defaults: (): Resume.Styles.ProjectItemStyles => cloneDefaults(getDefaults().items.project),
		},

		/**
		 * @remarks Default styles for skill items.
		 * @returns Default skill item styles.
		 */
		skill: {
			defaults: (): Resume.Styles.SkillItemStyles => cloneDefaults(getDefaults().items.skill),
		},

		/**
		 * @remarks Default styles for language items.
		 * @returns Default language item styles.
		 */
		language: {
			defaults: (): Resume.Styles.LanguageItemStyles => cloneDefaults(getDefaults().items.language),
		},

		/**
		 * @remarks Default styles for interest items.
		 * @returns Default interest item styles.
		 */
		interest: {
			defaults: (): Resume.Styles.InterestItemStyles => cloneDefaults(getDefaults().items.interest),
		},

		/**
		 * @remarks Default styles for award items.
		 * @returns Default award item styles.
		 */
		award: {
			defaults: (): Resume.Styles.AwardItemStyles => cloneDefaults(getDefaults().items.award),
		},

		/**
		 * @remarks Default styles for certification items.
		 * @returns Default certification item styles.
		 */
		certification: {
			defaults: (): Resume.Styles.CertificationItemStyles => cloneDefaults(getDefaults().items.certification),
		},

		/**
		 * @remarks Default styles for publication items.
		 * @returns Default publication item styles.
		 */
		publication: {
			defaults: (): Resume.Styles.PublicationItemStyles => cloneDefaults(getDefaults().items.publication),
		},

		/**
		 * @remarks Default styles for volunteer items.
		 * @returns Default volunteer item styles.
		 */
		volunteer: {
			defaults: (): Resume.Styles.VolunteerItemStyles => cloneDefaults(getDefaults().items.volunteer),
		},

		/**
		 * @remarks Default styles for reference items.
		 * @returns Default reference item styles.
		 */
		reference: {
			defaults: (): Resume.Styles.ReferenceItemStyles => cloneDefaults(getDefaults().items.reference),
		},
	},

	/**
	 * @remarks Picture style defaults.
	 */
	picture: {
		/**
		 * @remarks Default composite picture styles.
		 * @returns Default picture styles.
		 */
		defaults: (): Resume.Styles.PictureStyles => cloneDefaults(getDefaults().picture),

		/**
		 * @remarks Default picture sizing and rotation styles.
		 * @returns Default picture custom styles.
		 */
		custom: (): Resume.Styles.PictureCustomStyles => {
			const { size, rotation } = getDefaults().picture;
			return cloneDefaults({ size, rotation });
		},

		/**
		 * @remarks Default picture framing styles.
		 * @returns Default picture CSS styles.
		 */
		css: (): Resume.Styles.PictureCssStyles => {
			const { aspectRatio, borderRadius, borderColor, borderWidth, shadowColor, shadowWidth } = getDefaults().picture;
			return cloneDefaults({ aspectRatio, borderRadius, borderColor, borderWidth, shadowColor, shadowWidth });
		},
	},

	/**
	 * @remarks Custom field style defaults.
	 */
	customField: {
		/**
		 * @remarks Default custom field styles.
		 * @returns Default custom field styles.
		 */
		defaults: (): Resume.Styles.CustomFieldStyles => cloneDefaults(getDefaults().customField),
	},

	/**
	 * @remarks Summary style defaults.
	 */
	summary: {
		/**
		 * @remarks Default summary styles.
		 * @returns Default summary styles.
		 */
		defaults: (): Resume.Styles.SummaryStyles => cloneDefaults(getDefaults().summary),
	},

	/**
	 * @remarks Section style defaults.
	 */
	section: {
		/**
		 * @remarks Default section styles.
		 * @returns Default section styles.
		 */
		defaults: (): Resume.Styles.SectionStyles => cloneDefaults(getDefaults().section),
	},

	/**
	 * @remarks Custom section style defaults.
	 */
	customSection: {
		/**
		 * @remarks Default custom section styles.
		 * @returns Default custom section styles.
		 */
		defaults: (): Resume.Styles.CustomSectionStyles => cloneDefaults(getDefaults().customSection),
	},

	/**
	 * @remarks Page layout defaults.
	 */
	pageLayout: {
		/**
		 * @remarks Default page layout definition.
		 * @returns Default page layout data.
		 */
		defaults: (): Resume.Styles.PageLayout => cloneDefaults(getDefaults().pageLayout),
	},

	/**
	 * @remarks Metadata style defaults.
	 */
	metadata: {
		/**
		 * @remarks Default metadata styles.
		 * @returns Default metadata styles.
		 */
		defaults: (): Resume.Styles.MetadataStyles => cloneDefaults(getDefaults().metadata),

		/**
		 * @remarks Default layout data.
		 * @returns Default layout configuration.
		 */
		layout: {
			defaults: (): Resume.Styles.LayoutConfig => cloneDefaults(getDefaults().metadata.layout),
		},

		/**
		 * @remarks Default CSS settings.
		 * @returns Default CSS configuration.
		 */
		css: {
			defaults: (): Resume.Styles.CssConfig => cloneDefaults(getDefaults().metadata.css),
		},

		/**
		 * @remarks Default page settings.
		 * @returns Default page configuration.
		 */
		page: {
			defaults: (): Resume.Styles.PageConfig => cloneDefaults(getDefaults().metadata.page),
		},

		/**
		 * @remarks Default design settings.
		 */
		design: {
			/**
			 * @remarks Default design configuration.
			 * @returns Default design settings.
			 */
			defaults: (): Resume.Styles.DesignConfig => cloneDefaults(getDefaults().metadata.design),

			/**
			 * @remarks Default design color palette.
			 * @returns Default color palette.
			 */
			colors: {
				defaults: (): Resume.Styles.ColorPalette => cloneDefaults(getDefaults().metadata.design.colors),
			},

			/**
			 * @remarks Default proficiency level design.
			 * @returns Default level design data.
			 */
			level: {
				defaults: (): Resume.Styles.LevelDesign => cloneDefaults(getDefaults().metadata.design.level),
			},
		},

		/**
		 * @remarks Default typography settings.
		 */
		typography: {
			/**
			 * @remarks Default typography configuration.
			 * @returns Default typography settings.
			 */
			defaults: (): Resume.Styles.TypographyConfig => cloneDefaults(getDefaults().metadata.typography),

			/**
			 * @remarks Default body typography settings.
			 * @returns Default body typography.
			 */
			body: {
				defaults: (): Resume.Styles.TypographyStyle => cloneDefaults(getDefaults().metadata.typography.body),
			},

			/**
			 * @remarks Default heading typography settings.
			 * @returns Default heading typography.
			 */
			heading: {
				defaults: (): Resume.Styles.TypographyStyle => cloneDefaults(getDefaults().metadata.typography.heading),
			},
		},
	},
};
