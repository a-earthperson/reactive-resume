import type { DraftData } from "@/schema/draft/data";

export const sampleResumeData: DraftData[] = [
	{
		picture: {
			url: "https://i.imgur.com/o4Jpt1p.jpeg",
		},
		basics: {
			name: "David Kowalski",
			headline: "Game Developer | Unity & Unreal Engine Specialist",
			email: "david.kowalski@email.com",
			phone: "+1 (555) 291-4756",
			location: "Seattle, WA",
			website: {
				url: "https://davidkowalski.games",
				label: "davidkowalski.games",
			},
			customFields: [
				{
					id: "019bef5a-0477-77e0-968b-5d0e2ecb34e3",
					text: "github.com/dkowalski-dev",
					link: "https://github.com/dkowalski-dev",
				},
				{
					id: "019bef5a-93e4-7746-ad39-3a132360f823",
					text: "itch.io/dkowalski",
					link: "https://itch.io/dkowalski",
				},
			],
		},
		summary: {
			title: "",
			content:
				"<p>Passionate game developer with 5+ years of professional experience creating engaging gameplay systems and polished player experiences across multiple platforms. Specialized in Unity and Unreal Engine with strong expertise in C#, C++, and game design principles. Proven ability to collaborate effectively with cross-functional teams including designers, artists, and QA to deliver high-quality games on time and within scope. Est anim est quis nostrud ipsum deserunt do anim Lorem mollit nostrud minim. Est anim est quis nostrud ipsum.</p>",
		},
		sections: {
			profiles: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-3d42ddc9b4d8",
						network: "GitHub",
						username: "dkowalski-dev",
						website: {
							url: "https://github.com/dkowalski-dev",
							label: "github.com/dkowalski-dev",
						},
					},
					{
						id: "019bef5a-93e4-7746-ad39-43c470b77f4a",
						network: "LinkedIn",
						username: "davidkowalski",
						website: {
							url: "https://linkedin.com/in/davidkowalski",
							label: "linkedin.com/in/davidkowalski",
						},
					},
				],
			},
			experience: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-44d8cec98ca4",
						company: "Cascade Studios",
						position: "Senior Game Developer",
						location: "Seattle, WA",
						period: "March 2022 - Present",
						website: {
							url: "",
							label: "",
						},
						description:
							"<ul><li><p>Lead gameplay programmer on an unannounced AAA action-adventure title built in Unreal Engine 5 for PC and next-gen consoles</p></li><li><p>Architected and implemented core combat system including hit detection, combo mechanics, and enemy AI behavior trees serving 15+ enemy types</p></li><li><p>Developed custom editor tools in C++ that reduced level designer iteration time by 40% and improved workflow efficiency across the team</p></li><li><p>Optimized rendering pipeline and gameplay systems to maintain 60 FPS performance target on all supported platforms, achieving 95% frame rate stability</p></li><li><p>Ad nostrud enim adipisicing ea proident aliqua veniam nisi amet ea irure et mollit.</p></li></ul><p></p>",
					},
				],
			},
			education: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-48455f6cef9e",
						school: "University of Washington",
						degree: "Bachelor of Science",
						area: "Computer Science",
						grade: "3.6 GPA",
						location: "Seattle, WA",
						period: "2014 - 2018",
						website: {
							url: "",
							label: "",
						},
						description:
							"<p>Concentration in Game Development. Relevant Coursework: Game Engine Architecture, Computer Graphics, Artificial Intelligence, Physics Simulation, 3D Mathematics, Software Engineering, Data Structures & Algorithms</p>",
					},
				],
			},
			projects: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-4d2603fe2801",
						name: "Echoes of the Void (Indie Game)",
						period: "2023 - Present",
						website: {
							url: "https://itch.io/echoes-of-the-void",
							label: "View on itch.io",
						},
						description:
							"<p>Solo developer for a narrative-driven 2D platformer built in Unity. Features custom dialogue system, branching story paths, and atmospheric pixel art. Currently in development with demo released on itch.io garnering 5K+ downloads and positive community feedback. Planned Steam release Q2 2025.</p>",
					},
					{
						id: "019bef5a-93e4-7746-ad39-524195dd7eff",
						name: "Open Source: Unity Dialogue Framework",
						period: "2021 - 2023",
						website: {
							url: "https://github.com/dkowalski-dev/unity-dialogue",
							label: "View on GitHub",
						},
						description:
							"<p>Created and maintain an open-source dialogue system for Unity with visual node-based editor, localization support, and voice acting integration. Project has 800+ GitHub stars and is actively used by indie developers worldwide. Includes comprehensive documentation and example projects.</p>",
					},
					{
						id: "019bef5a-93e4-7746-ad39-549106273c73",
						name: "Game Jam Participation",
						period: "2019 - Present",
						website: {
							url: "",
							label: "",
						},
						description:
							"<p>Regular participant in Ludum Dare and Global Game Jam events. Created 12+ game prototypes exploring experimental mechanics and art styles. Won 'Best Gameplay' award at Ludum Dare 48 with puzzle game 'Deeper and Deeper' that ranked in top 5% overall.</p>",
					},
				],
			},
			skills: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-5a52dcf50ed4",
						name: "Unity Engine",
						proficiency: "Expert",
						level: 5,
						keywords: ["C#", "Editor Tools", "Performance Profiling"],
					},
					{
						id: "019bef5a-93e4-7746-ad39-5e8bb7cacbc8",
						name: "Unreal Engine",
						proficiency: "Advanced",
						level: 4,
						keywords: ["C++", "Blueprints", "UE5 Features"],
					},
					{
						id: "019bef5a-93e4-7746-ad39-622f9d41da55",
						name: "Programming Languages",
						proficiency: "Expert",
						level: 5,
						keywords: ["C#", "C++", "Python", "HLSL/GLSL"],
					},
					{
						id: "019bef5a-93e4-7746-ad39-6574ab6814bd",
						name: "Game AI",
						proficiency: "Advanced",
						level: 4,
						keywords: ["Behavior Trees", "FSM", "Pathfinding", "Navigation"],
					},
					{
						id: "019bef5a-93e4-7746-ad39-6a8e22bec684",
						name: "Physics & Mathematics",
						proficiency: "Advanced",
						level: 4,
						keywords: ["3D Math", "Collision Detection", "Rigid Body Dynamics"],
					},
					{
						id: "019bef5a-93e4-7746-ad39-6d8bf7be7514",
						name: "Performance Optimization",
						proficiency: "Advanced",
						level: 4,
						keywords: ["Profiling", "Memory Management", "Frame Rate"],
					},
				],
			},
			languages: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-73807ccc48b5",
						language: "English",
						fluency: "Native",
						level: 5,
					},
					{
						id: "019bef5a-93e4-7746-ad39-768670459358",
						language: "Polish",
						fluency: "Conversational",
						level: 3,
					},
				],
			},
			interests: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-7821b4de95f7",
						name: "Game Design",
						keywords: ["Mechanics", "Level Design", "Player Psychology"],
					},
					{
						id: "019bef5a-93e4-7746-ad39-7c64c1a607d3",
						name: "AI & Procedural Generation",
						keywords: ["PCG", "Machine Learning", "Emergent Gameplay"],
					},
					{
						id: "019bef5a-93e4-7746-ad39-80bccce3c0ef",
						name: "Indie Game Development",
						keywords: ["Solo Dev", "Game Jams", "Community"],
					},
					{
						id: "019bef5a-93e4-7746-ad39-84bb7e9af005",
						name: "Technical Art",
						keywords: ["Shaders", "VFX", "Optimization"],
					},
				],
			},
			awards: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-8a8bb9fbe182",
						title: "Best Gameplay - Ludum Dare 48",
						awarder: "Ludum Dare",
						date: "April 2021",
						website: {
							url: "",
							label: "",
						},
						description:
							"<p>Awarded for puzzle game 'Deeper and Deeper' which ranked in the top 5% overall among 3,000+ submissions</p>",
					},
					{
						id: "019bef5a-93e4-7746-ad39-8dd81379c7c9",
						title: "Employee Excellence Award",
						awarder: "Pixel Forge Interactive",
						date: "December 2021",
						website: {
							url: "",
							label: "",
						},
						description:
							"<p>Recognized for exceptional contributions to 'Starbound Odyssey' development and dedication to code quality</p>",
					},
				],
			},
			certifications: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-91fe8a4dfea6",
						title: "Unity Certified Expert: Programmer",
						issuer: "Unity Technologies",
						date: "March 2022",
						website: {
							url: "",
							label: "",
						},
						description: "",
					},
					{
						id: "019bef5a-93e4-7746-ad39-961afccc2508",
						title: "Unreal Engine 5 C++ Developer",
						issuer: "Epic Games (Udemy)",
						date: "June 2023",
						website: {
							url: "",
							label: "",
						},
						description: "",
					},
				],
			},
			publications: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-9816f0081895",
						title: "Optimizing Unity Games for Mobile: A Practical Guide",
						publisher: "Game Developer Magazine",
						date: "September 2021",
						website: {
							url: "",
							label: "",
						},
						description:
							"<p>Technical article covering mobile optimization techniques including draw call batching, LOD systems, and memory management</p>",
					},
					{
						id: "019bef5a-93e4-7746-ad39-9cf55c272c05",
						title: "Building Modular Dialogue Systems",
						publisher: "Seattle Indie Game Developers Meetup",
						date: "May 2022",
						website: {
							url: "",
							label: "",
						},
						description:
							"<p>Presented talk on designing flexible dialogue systems for narrative games, attended by 60+ local developers</p>",
					},
				],
			},
			volunteer: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-a02580473e05",
						organization: "Seattle Indies",
						location: "Seattle, WA",
						period: "2020 - Present",
						website: {
							url: "",
							label: "",
						},
						description:
							"<p>Active member of local indie game development community. Organize monthly game showcases and provide mentorship to aspiring game developers through code reviews and technical guidance.</p>",
					},
					{
						id: "019bef5a-93e4-7746-ad39-a731c5b1b286",
						organization: "Code.org Game Development Workshops",
						location: "Seattle, WA",
						period: "2021 - Present",
						website: {
							url: "",
							label: "",
						},
						description:
							"<p>Volunteer instructor teaching basic game programming concepts to middle school students. Led 8+ workshops introducing Unity fundamentals and game design principles.</p>",
					},
				],
			},
			references: {
				title: "",
				items: [
					{
						id: "019bef5a-93e4-7746-ad39-a945c0f42dd5",
						name: "Available upon request",
						position: "",
						website: {
							url: "",
							label: "",
						},
						phone: "",
						description: "",
					},
				],
			},
		},
		customSections: [
			{
				id: "019becaf-0b87-769d-98a6-46ccf558c0e8",
				title: "Experience",
				type: "experience",
				items: [
					{
						id: "019bef5a-d1fa-7289-a87c-2677688d9e75",
						company: "Pixel Forge Interactive",
						position: "Game Developer",
						location: "Bellevue, WA",
						period: "June 2020 - February 2022",
						website: {
							url: "",
							label: "",
						},
						description:
							"<ul><li>Core developer on 'Starbound Odyssey,' a sci-fi roguelike that achieved 500K+ sales on Steam with 'Very Positive' user reviews</li><li>Implemented procedural generation systems for level layouts, enemy encounters, and loot drops using Unity and C#</li><li>Designed and programmed player progression systems including skill trees, equipment upgrades, and meta-progression mechanics</li><li>Created robust save/load system supporting cloud saves and cross-platform play between PC and Nintendo Switch</li><li>Integrated third-party SDKs for analytics (GameAnalytics), achievements (Steamworks), and multiplayer networking (Photon)</li><li>Fixed critical bugs and balanced gameplay based on community feedback and telemetry data, releasing 12 post-launch content updates</li><li>Worked closely with artists to implement VFX, animations, and shaders that enhanced visual polish while maintaining performance targets</li></ul>",
					},
					{
						id: "019bef5a-db0e-73c6-9b6e-4471703864f1",
						company: "Mobile Games Studio",
						position: "Junior Game Developer",
						location: "Remote",
						period: "September 2018 - May 2020",
						website: {
							url: "",
							label: "",
						},
						description:
							"<ul><li><p>Contributed to development of three mobile puzzle games built in Unity, collectively downloaded 2M+ times on iOS and Android</p></li><li><p>Implemented UI systems, touch controls, and gesture recognition optimized for mobile devices and various screen sizes</p></li><li><p>Developed monetization features including rewarded video ads, in-app purchases, and daily reward systems that increased retention by 25%</p></li><li><p>Optimized memory usage and load times for mobile platforms, reducing app size by 35% through asset compression and code optimization</p></li><li><p>Collaborated with game designers to balance puzzle difficulty curves and progression pacing using A/B testing data</p></li></ul><p></p>",
					},
				],
			},
		],
		metadata: {
			notes: "",
		},
	},
];
