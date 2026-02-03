import type { ResumeDataTypes } from "./data.types";

export const sampleDraftData: ResumeDataTypes[] = [
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
	{
		picture: {
			url: "https://upload.wikimedia.org/wikipedia/commons/5/5b/JohnvonNeumann-LosAlamos.jpg",
		},
		basics: {
			name: "John von Neumann",
			headline: "Mathematician, Physicist, and Computer Scientist",
			email: "",
			phone: "",
			location: "Princeton, NJ, USA",
			website: {
				label: "Wikipedia",
				url: "https://en.wikipedia.org/wiki/John_von_Neumann",
			},
			customFields: [
				{
					id: "cf-born",
					text: "Born: Budapest, 1903",
					link: "",
				},
				{
					id: "cf-citizenship",
					text: "Citizenship: Hungarian-American",
					link: "",
				},
				{
					id: "cf-fields",
					text: "Fields: Mathematics, Physics, Computer Science, Economics",
					link: "",
				},
			],
		},
		summary: {
			title: "Summary",
			content:
				"Hungarian-American polymath who made foundational contributions to mathematical logic, game theory, " +
				"quantum mechanics, and the architecture of stored-program computers. Led theoretical and applied " +
				"work across academia, national laboratories, and government advisory roles.",
		},
		sections: {
			profiles: {
				title: "Profiles",
				items: [
					{
						id: "profile-wikipedia",
						network: "Wikipedia",
						username: "",
						website: {
							label: "en.wikipedia.org/wiki/John_von_Neumann",
							url: "https://en.wikipedia.org/wiki/John_von_Neumann",
						},
					},
					{
						id: "profile-genealogy",
						network: "Mathematics Genealogy Project",
						username: "",
						website: {
							label: "genealogy.math.ndsu.nodak.edu",
							url: "https://genealogy.math.ndsu.nodak.edu/id.php?id=16917",
						},
					},
					{
						id: "profile-ias",
						network: "Institute for Advanced Study",
						username: "",
						website: {
							label: "ias.edu",
							url: "https://www.ias.edu",
						},
					},
				],
			},
			experience: {
				title: "Experience",
				items: [
					{
						id: "exp-ias-professor",
						company: "Institute for Advanced Study",
						position: "Professor of Mathematics",
						location: "Princeton, NJ, USA",
						period: "1933 - 1957",
						website: {
							label: "ias.edu",
							url: "https://www.ias.edu",
						},
						description:
							"Member of the founding faculty; advanced operator theory, set theory, and numerical analysis " +
							"and influenced early digital computer design through the IAS computer project.",
					},
					{
						id: "exp-los-alamos",
						company: "Los Alamos National Laboratory",
						position: "Consultant, Manhattan Project",
						location: "Los Alamos, NM, USA",
						period: "1943 - 1945",
						website: {
							label: "lanl.gov",
							url: "https://www.lanl.gov",
						},
						description:
							"Applied shockwave and hydrodynamics calculations to implosion modeling and contributed " +
							"to computational approaches for weapons physics.",
					},
					{
						id: "exp-princeton-visit",
						company: "Princeton University",
						position: "Visiting Professor",
						location: "Princeton, NJ, USA",
						period: "1930 - 1933",
						website: {
							label: "princeton.edu",
							url: "https://www.princeton.edu",
						},
						description: "Taught and conducted research in mathematical physics and logic prior to joining the IAS.",
					},
				],
			},
			education: {
				title: "Education",
				items: [
					{
						id: "edu-budapest-phd",
						school: "Pazmany Peter University (University of Budapest)",
						degree: "PhD",
						area: "Mathematics",
						grade: "",
						location: "Budapest, Hungary",
						period: "1921 - 1926",
						website: {
							label: "ELTE",
							url: "https://www.elte.hu/en/",
						},
						description: "Completed doctorate in mathematics at age 23.",
					},
					{
						id: "edu-eth-zurich",
						school: "ETH Zurich",
						degree: "Dipl. Ing.",
						area: "Chemical Engineering",
						grade: "",
						location: "Zurich, Switzerland",
						period: "1921 - 1925",
						website: {
							label: "ETH Zurich",
							url: "https://ethz.ch/en.html",
						},
						description: "Completed engineering degree while pursuing advanced mathematics and physics coursework.",
					},
				],
			},
			projects: {
				title: "Projects",
				items: [
					{
						id: "proj-edvac",
						name: "First Draft of a Report on the EDVAC",
						period: "1945",
						website: {
							label: "Wikipedia",
							url: "https://en.wikipedia.org/wiki/First_Draft_of_a_Report_on_the_EDVAC",
						},
						description:
							"Outlined the stored-program concept and architectural principles that became standard " +
							"for modern digital computers.",
					},
					{
						id: "proj-monte-carlo",
						name: "Monte Carlo Method (with Stanislaw Ulam)",
						period: "1940s",
						website: {
							label: "Wikipedia",
							url: "https://en.wikipedia.org/wiki/Monte_Carlo_method",
						},
						description: "Pioneered stochastic simulation techniques for complex physical and mathematical systems.",
					},
					{
						id: "proj-von-neumann",
						name: "von Neumann Architecture",
						period: "1945 - 1950",
						website: {
							label: "Wikipedia",
							url: "https://en.wikipedia.org/wiki/Von_Neumann_architecture",
						},
						description:
							"Defined the single memory, stored-program architecture adopted by most general-purpose computers.",
					},
				],
			},
			skills: {
				title: "Skills",
				items: [
					{
						id: "skill-math-analysis",
						name: "Mathematical Analysis",
						proficiency: "Expert",
						level: 5,
						keywords: ["Measure theory", "Functional analysis", "Operator theory"],
					},
					{
						id: "skill-game-theory",
						name: "Game Theory",
						proficiency: "Expert",
						level: 5,
						keywords: ["Minimax theorem", "Zero-sum games", "Equilibrium analysis"],
					},
					{
						id: "skill-numerical",
						name: "Numerical Methods",
						proficiency: "Advanced",
						level: 4,
						keywords: ["Approximation", "Stability", "Numerical integration"],
					},
					{
						id: "skill-computer-arch",
						name: "Computer Architecture",
						proficiency: "Advanced",
						level: 4,
						keywords: ["Stored-program design", "Logical design", "IAS computer"],
					},
				],
			},
			languages: {
				title: "Languages",
				items: [
					{
						id: "lang-hungarian",
						language: "Hungarian",
						fluency: "Native",
						level: 5,
					},
					{
						id: "lang-german",
						language: "German",
						fluency: "Fluent",
						level: 4,
					},
					{
						id: "lang-english",
						language: "English",
						fluency: "Fluent",
						level: 4,
					},
				],
			},
			interests: {
				title: "Interests",
				items: [
					{
						id: "interest-computing",
						name: "Computing Machinery",
						keywords: ["Automatic computing", "Digital logic", "Programming"],
					},
					{
						id: "interest-nuclear",
						name: "Nuclear Physics",
						keywords: ["Hydrodynamics", "Shock waves", "Implosion modeling"],
					},
					{
						id: "interest-economics",
						name: "Economics and Strategy",
						keywords: ["Decision theory", "Game theory", "Utility"],
					},
					{
						id: "interest-logic",
						name: "Mathematical Logic",
						keywords: ["Set theory", "Axiomatization", "Foundations"],
					},
				],
			},
			awards: {
				title: "Awards",
				items: [
					{
						id: "award-fermi",
						title: "Enrico Fermi Award",
						awarder: "U.S. Atomic Energy Commission",
						date: "1956",
						website: {
							label: "Wikipedia",
							url: "https://en.wikipedia.org/wiki/Enrico_Fermi_Award",
						},
						description: "Recognized for contributions to nuclear physics and the atomic energy program.",
					},
					{
						id: "award-medal-merit",
						title: "Medal for Merit",
						awarder: "United States",
						date: "1947",
						website: {
							label: "Wikipedia",
							url: "https://en.wikipedia.org/wiki/Medal_for_Merit_(United_States)",
						},
						description: "Awarded for exceptionally meritorious conduct in the performance of outstanding services.",
					},
				],
			},
			certifications: {
				title: "Certifications",
				items: [],
			},
			publications: {
				title: "Publications",
				items: [
					{
						id: "pub-theory-games",
						title: "Theory of Games and Economic Behavior",
						publisher: "Princeton University Press",
						date: "1944",
						website: {
							label: "Wikipedia",
							url: "https://en.wikipedia.org/wiki/Theory_of_Games_and_Economic_Behavior",
						},
						description: "Co-authored with Oskar Morgenstern; established the mathematical foundations of game theory.",
					},
					{
						id: "pub-quantum",
						title: "Mathematical Foundations of Quantum Mechanics",
						publisher: "Princeton University Press",
						date: "1932",
						website: {
							label: "Wikipedia",
							url: "https://en.wikipedia.org/wiki/Mathematical_Foundations_of_Quantum_Mechanics",
						},
						description: "Formalized the Hilbert space framework for quantum mechanics and operator theory.",
					},
					{
						id: "pub-computer-brain",
						title: "The Computer and the Brain",
						publisher: "Yale University Press",
						date: "1958",
						website: {
							label: "Wikipedia",
							url: "https://en.wikipedia.org/wiki/The_Computer_and_the_Brain",
						},
						description: "Posthumous work comparing digital computation with biological neural systems.",
					},
				],
			},
			volunteer: {
				title: "Public Service",
				items: [
					{
						id: "vol-atomic-energy",
						organization: "U.S. Atomic Energy Commission - General Advisory Committee",
						location: "Washington, DC, USA",
						period: "1947 - 1952",
						website: {
							label: "Wikipedia",
							url: "https://en.wikipedia.org/wiki/Atomic_Energy_Commission",
						},
						description: "Served on advisory committee on nuclear policy, reactor development, and national security.",
					},
				],
			},
			references: {
				title: "References",
				items: [
					{
						id: "ref-upon-request",
						name: "Available upon request",
						position: "",
						website: {
							label: "",
							url: "",
						},
						phone: "",
						description: "",
					},
				],
			},
		},
		customSections: [
			{
				id: "custom-defense-projects",
				title: "Defense Research Projects",
				type: "projects",
				items: [
					{
						id: "proj-shockwave",
						name: "Shockwave and Hydrodynamic Calculations",
						period: "1940s",
						website: {
							label: "",
							url: "",
						},
						description:
							"Developed numerical techniques for shockwave propagation and implosion dynamics " +
							"used in defense research and early computational physics.",
					},
				],
			},
		],
		metadata: {
			notes: "Draft profile for historical figure; contact fields are intentionally left blank where unknown.",
		},
	},
];
