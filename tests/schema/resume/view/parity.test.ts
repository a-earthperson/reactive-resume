import { describe, expect, it } from "vitest";
import { type DraftData, draftFactory } from "@/schema/draft/data";
import { sampleDraftData } from "@/schema/draft/data/sample";
import { resumeStylesFactory } from "@/schema/resume/styles";
import { resumeViewFactory, resumeViewSchema, unzipResumeView, zipResumeView } from "@/schema/resume/view";

type SectionKey = keyof DraftData["sections"];

const sectionTypes = [
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
] as const satisfies SectionKey[];

/**
 * @remarks
 * Seeds the required minimal string fields for ResumeView validation.
 * @param type - The section type to seed.
 * @param item - The draft item to mutate.
 * @returns The same item with required fields populated.
 */
const requiredFieldSetters: {
	[K in SectionKey]: (item: DraftData["sections"][K]["items"][number]) => void;
} = {
	profiles: (item) => {
		item.network = "profiles-value";
	},
	experience: (item) => {
		item.company = "experience-value";
	},
	education: (item) => {
		item.school = "education-value";
	},
	projects: (item) => {
		item.name = "projects-value";
	},
	skills: (item) => {
		item.name = "skills-value";
	},
	languages: (item) => {
		item.language = "languages-value";
	},
	interests: (item) => {
		item.name = "interests-value";
	},
	awards: (item) => {
		item.title = "awards-value";
	},
	certifications: (item) => {
		item.title = "certifications-value";
	},
	publications: (item) => {
		item.title = "publications-value";
	},
	volunteer: (item) => {
		item.organization = "volunteer-value";
	},
	references: (item) => {
		item.name = "references-value";
	},
};

/**
 * @remarks
 * Applies required field defaults to satisfy ResumeView validation.
 */
const seedRequiredFields = <T extends SectionKey>(
	type: T,
	item: DraftData["sections"][T]["items"][number],
): DraftData["sections"][T]["items"][number] => {
	requiredFieldSetters[type](item);
	return item;
};

/**
 * @remarks
 * Assigns a single item into a section while preserving type constraints.
 */
const setSectionItem = <T extends SectionKey>(
	data: DraftData,
	type: T,
	item: DraftData["sections"][T]["items"][number],
) => {
	data.sections[type].items = [item] as DraftData["sections"][T]["items"];
};

/**
 * @remarks
 * Builds a DraftData payload with at least one valid item in every section and custom section.
 * This ensures view tests exercise every item and section type while satisfying ResumeView requirements.
 */
const createFullDraft = (): DraftData => {
	const data = draftFactory.draft.empty();

	data.basics.customFields = [draftFactory.basics.customField.empty("custom-field-1")];

	for (const type of sectionTypes) {
		const item = seedRequiredFields(
			type,
			draftFactory.sections.item.empty(type, `${type}-1`) as DraftData["sections"][typeof type]["items"][number],
		);

		setSectionItem(data, type, item);
	}

	data.customSections = sectionTypes.map((type) => {
		const section = draftFactory.customSections.item.empty(`custom-${type}`, type);
		const item = seedRequiredFields(
			type,
			draftFactory.sections.item.empty(
				type,
				`custom-${type}-item`,
			) as DraftData["sections"][typeof type]["items"][number],
		);
		section.items = [item];
		return section;
	});

	data.metadata.notes = "Parity test note.";

	return data;
};

/**
 * @remarks
 * Creates a ResumeView with fully populated data and non-default styles to validate parity.
 */
const createFullView = () => {
	const data = createFullDraft();
	const styles = resumeStylesFactory.defaults();

	styles.picture.hidden = true;
	styles.picture.rotation = 45;
	styles.customField.icon = "github-logo";
	styles.summary.columns = 2;
	styles.section.columns = 2;
	styles.customSection.columns = 2;
	styles.baseItem.options = { showLinkInTitle: true };
	styles.items.profile.icon = "linkedin-logo";
	styles.items.skill.icon = "star";
	styles.items.interest.icon = "game-controller";
	styles.metadata.template = "azurill";
	styles.metadata.page.hideIcons = true;

	return {
		data,
		styles,
		view: zipResumeView({ data, styles }),
	};
};

/**
 * @remarks
 * Validates that ResumeView conforms to the expected view contract.
 */
describe("ResumeView schema contract", () => {
	/**
	 * @remarks
	 * Ensures a DraftData sample payload is accepted once zipped into a ResumeView.
	 */
	it("accepts sample DraftData in the ResumeView schema", () => {
		const view = resumeViewFactory.zip({ data: sampleDraftData, styles: resumeStylesFactory.defaults() });
		const result = resumeViewSchema.safeParse(view);
		expect(result.success).toBe(true);
	});

	/**
	 * @remarks
	 * Ensures ResumeView defaults satisfy the ResumeView schema.
	 */
	it("accepts ResumeView defaults in the ResumeView schema", () => {
		const view = resumeViewFactory.defaults();
		const result = resumeViewSchema.safeParse(view);
		expect(result.success).toBe(true);
	});

	/**
	 * @remarks
	 * Ensures a ResumeView roundtrips through unzip/zip without losing parity.
	 */
	it("roundtrips ResumeView payloads without losing parity", () => {
		const { view } = createFullView();
		const roundTrip = zipResumeView(unzipResumeView(view));

		const viewParsed = resumeViewSchema.parse(view);
		const roundTripParsed = resumeViewSchema.parse(roundTrip);

		expect(roundTripParsed).toEqual(viewParsed);
	});
});
