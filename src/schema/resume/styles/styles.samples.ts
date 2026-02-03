import type { Resume } from "./styles.types.ts";

export const sampleResumeStyles: Resume.Styles.Types[] = [
	{
		itemOptions: {
			showLinkInTitle: false,
		},
		baseItem: {
			hidden: false,
			options: {
				showLinkInTitle: false,
			},
		},
		picture: {
			hidden: false,
			size: 100,
			rotation: 0,
			aspectRatio: 1,
			borderRadius: 0,
			borderColor: "rgba(0, 0, 0, 0.5)",
			borderWidth: 0,
			shadowColor: "rgba(0, 0, 0, 0.5)",
			shadowWidth: 0,
		},
		customField: {
			icon: "github-logo",
		},
		summary: {
			hidden: false,
			columns: 1,
		},
		section: {
			hidden: false,
			columns: 1,
		},
		items: {
			profile: {
				hidden: false,
				options: {
					showLinkInTitle: false,
				},
				icon: "github-logo",
			},
			experience: {
				hidden: false,
				options: {
					showLinkInTitle: false,
				},
			},
			education: {
				hidden: false,
				options: {
					showLinkInTitle: false,
				},
			},
			project: {
				hidden: false,
				options: {
					showLinkInTitle: true,
				},
			},
			skill: {
				hidden: false,
				options: {
					showLinkInTitle: false,
				},
				icon: "code",
			},
			language: {
				hidden: false,
				options: {
					showLinkInTitle: false,
				},
			},
			interest: {
				hidden: false,
				options: {
					showLinkInTitle: false,
				},
				icon: "game-controller",
			},
			award: {
				hidden: false,
				options: {
					showLinkInTitle: false,
				},
			},
			certification: {
				hidden: false,
				options: {
					showLinkInTitle: false,
				},
			},
			publication: {
				hidden: false,
				options: {
					showLinkInTitle: false,
				},
			},
			volunteer: {
				hidden: false,
				options: {
					showLinkInTitle: false,
				},
			},
			reference: {
				hidden: false,
				options: {
					showLinkInTitle: false,
				},
			},
		},
		customSection: {
			hidden: false,
			columns: 1,
		},
		pageLayout: {
			fullWidth: false,
			main: ["profiles", "summary", "education", "experience", "projects", "volunteer", "references"],
			sidebar: ["skills", "certifications", "awards", "languages", "interests", "publications"],
		},
		metadata: {
			template: "azurill",
			layout: {
				sidebarWidth: 30,
				pages: [
					{
						fullWidth: false,
						main: ["summary", "education", "experience"],
						sidebar: ["profiles", "skills"],
					},
					{
						fullWidth: false,
						main: ["019becaf-0b87-769d-98a6-46ccf558c0e8", "awards"],
						sidebar: ["languages", "certifications", "interests", "references"],
					},
					{
						fullWidth: true,
						main: ["projects", "publications", "volunteer"],
						sidebar: [],
					},
					{
						fullWidth: true,
						main: ["019bef5b-0b3d-7e2a-8a7c-12d9e23a4f6b"],
						sidebar: [],
					},
				],
			},
			css: {
				enabled: false,
				value: "",
			},
			page: {
				gapX: 4,
				gapY: 8,
				marginX: 16,
				marginY: 14,
				format: "a4",
				locale: "en-US",
				hideIcons: false,
			},
			design: {
				level: {
					icon: "acorn",
					type: "circle",
				},
				colors: {
					primary: "rgba(0, 132, 209, 1)",
					text: "rgba(0, 0, 0, 1)",
					background: "rgba(255, 255, 255, 1)",
				},
			},
			typography: {
				body: {
					fontFamily: "IBM Plex Serif",
					fontWeights: ["400", "600"],
					fontSize: 11,
					lineHeight: 1.5,
				},
				heading: {
					fontFamily: "Fira Sans Condensed",
					fontWeights: ["500"],
					fontSize: 18,
					lineHeight: 1.5,
				},
			},
		},
	},
];
