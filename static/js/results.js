// ======================================================
// CAREER COMPASS - COMPLETE RESULTS DASHBOARD
// PERSONALIZED RECOMMENDATION ENGINE
// ORGANIZED TXT REPORT DOWNLOAD
// ======================================================


// ======================================================
// 1. LOAD STUDENT INFORMATION AND ANSWERS
// ======================================================

const student = JSON.parse(
    sessionStorage.getItem("careerCompassStudent") || "{}"
);

const answers = JSON.parse(
    sessionStorage.getItem("careerCompassAnswers") || "{}"
);


// ======================================================
// 2. RIASEC INFORMATION
// ======================================================

const riasec = {

    A: {
        name: "Realistic",
        description: "You may enjoy practical activities, technology and hands-on problem-solving."
    },

    B: {
        name: "Investigative",
        description: "You may enjoy research, logical thinking and analysing problems."
    },

    C: {
        name: "Artistic",
        description: "You may enjoy creativity, design and expressing original ideas."
    },

    D: {
        name: "Social",
        description: "You may enjoy helping people, teaching and working with others."
    },

    E: {
        name: "Enterprising",
        description: "You may enjoy leadership, business and managing projects."
    },

    F: {
        name: "Conventional",
        description: "You may enjoy organisation, structured systems and accuracy."
    }

};


// ======================================================
// 3. COURSE DATABASE
// ======================================================

const courses = [

    {
        name: "B.Tech Computer Science",
        category: ["A", "B", "F"],
        description: "Learn programming, software development, algorithms and computer systems.",
        duration: "4 Years",
        subjects: "Python, Data Structures, Networks, Databases"
    },

    {
        name: "B.Tech Artificial Intelligence and Data Science",
        category: ["B", "A", "F"],
        description: "Explore artificial intelligence, machine learning and data analytics.",
        duration: "4 Years",
        subjects: "Python, Statistics, Machine Learning, Deep Learning"
    },

    {
        name: "B.Tech Cybersecurity",
        category: ["B", "A", "F"],
        description: "Study digital security, cryptography and computer protection.",
        duration: "4 Years",
        subjects: "Networking, Linux, Cryptography, Security"
    },

    {
        name: "B.Tech Information Technology",
        category: ["A", "B", "F"],
        description: "Understand software technologies, networks and information systems.",
        duration: "4 Years",
        subjects: "Programming, Cloud Computing, Networks"
    },

    {
        name: "BCA",
        category: ["B", "F", "A"],
        description: "Develop knowledge of computer applications and software development.",
        duration: "Usually 3 or 4 Years",
        subjects: "Programming, Web Development, Databases"
    },

    {
        name: "B.Sc Computer Science",
        category: ["B", "F"],
        description: "Build a foundation in computing, programming and computer science.",
        duration: "Usually 3 or 4 Years",
        subjects: "Programming, Mathematics, Algorithms"
    },

    {
        name: "B.Sc Data Science",
        category: ["B", "F"],
        description: "Learn data analysis, statistics and data visualisation.",
        duration: "Usually 3 or 4 Years",
        subjects: "Statistics, Python, Data Analytics"
    },

    {
        name: "B.Tech Electronics and Communication",
        category: ["A", "B"],
        description: "Study electronic circuits and communication technologies.",
        duration: "4 Years",
        subjects: "Electronics, Circuits, Communication Systems"
    },

    {
        name: "BBA",
        category: ["E", "D", "F"],
        description: "Explore business administration, marketing and management.",
        duration: "Usually 3 or 4 Years",
        subjects: "Management, Marketing, Finance"
    },

    {
        name: "B.Des",
        category: ["C", "E"],
        description: "Develop creative design and visual communication skills.",
        duration: "Usually 4 Years",
        subjects: "Design, Typography, User Experience"
    }

];


// ======================================================
// 4. CAREER DATABASE
// ======================================================

const careers = [

    {
        name: "Software Developer",
        category: ["A", "B", "F"],
        description: "Develops and maintains software applications.",
        skills: "Python, Java, Programming, Problem-solving",
        qualification: "Computer Science or related degree"
    },

    {
        name: "AI / Machine Learning Engineer",
        category: ["B", "A"],
        description: "Builds intelligent applications using machine learning.",
        skills: "Python, Statistics, Machine Learning",
        qualification: "AI & DS, Computer Science or related degree"
    },

    {
        name: "Cybersecurity Analyst",
        category: ["B", "A", "F"],
        description: "Helps organisations protect their systems and digital information.",
        skills: "Networking, Linux, Security Fundamentals",
        qualification: "Cybersecurity or related computing degree"
    },

    {
        name: "Data Analyst",
        category: ["B", "F", "E"],
        description: "Analyses information and presents useful findings.",
        skills: "Python, SQL, Excel, Statistics",
        qualification: "Data Science, Computer Science or related degree"
    },

    {
        name: "Web Developer",
        category: ["B", "C", "A"],
        description: "Creates and maintains websites and web applications.",
        skills: "HTML, CSS, JavaScript, Python",
        qualification: "Computer Science, BCA or related degree"
    },

    {
        name: "Network Engineer",
        category: ["A", "B", "F"],
        description: "Maintains computer networks and connectivity systems.",
        skills: "Networking, TCP/IP, Linux",
        qualification: "IT, Computer Science or ECE degree"
    },

    {
        name: "Cloud Engineer",
        category: ["A", "B", "F"],
        description: "Works with cloud infrastructure and computing services.",
        skills: "Linux, Networking, Cloud Computing",
        qualification: "Computer Science or IT degree"
    },

    {
        name: "UI/UX Designer",
        category: ["C", "B", "D"],
        description: "Designs user-friendly digital products and experiences.",
        skills: "Design Thinking, Prototyping, User Research",
        qualification: "Design or related computing degree"
    },

    {
        name: "Business Analyst",
        category: ["E", "B", "F"],
        description: "Studies business requirements and identifies improvements.",
        skills: "Communication, Excel, SQL, Analysis",
        qualification: "Business, IT or related degree"
    },

    {
        name: "Robotics Engineer",
        category: ["A", "B"],
        description: "Develops robotic systems and automation technologies.",
        skills: "Programming, Electronics, Robotics",
        qualification: "Mechanical, ECE or related engineering degree"
    }

];


// ======================================================
// 5. ANSWER HELPER FUNCTIONS
// ======================================================

function getAnswer(index) {

    return answers[index] || null;

}


function getAnswerText(index) {

    const answer = getAnswer(index);

    if (!answer) return "";

    if (Array.isArray(answer)) {
        return answer.join(", ");
    }

    if (Array.isArray(answer.values)) {

        let values = [...answer.values];

        if (answer.other) {

            values = values.filter(
                value => value !== "Other"
            );

            values.push(answer.other);

        }

        return values.join(", ");

    }

    let value = String(answer.value || "");

    if (answer.other) {

        value = value.replace("Other", "").trim();

        value = value
            ? value + " — " + answer.other
            : answer.other;

    }

    return value;

}


// ======================================================
// 6. CALCULATE RIASEC SCORES
// ======================================================

const scores = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0
};


for (let i = 2; i <= 13; i++) {

    const answer = getAnswer(i);

    if (!answer) continue;

    const selected = String(
        typeof answer === "string"
            ? answer
            : answer.value || ""
    ).trim().toUpperCase();

    if (Object.hasOwn(scores, selected)) {
        scores[selected]++;
    }

}


const totalAnswers = Object.values(scores)
    .reduce((total, score) => total + score, 0);


const sortedScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);


const topThree = sortedScores.slice(0, 3);


const hollandCode = topThree
    .map(item => item[0])
    .join("");


const firstCategory = riasec[
    topThree[0] && topThree[0][1] > 0
        ? topThree[0][0]
        : "B"
];


// ======================================================
// 7. STUDENT PREFERENCES
// ======================================================

const selectedInterests = getAnswerText(14)
    .split(",")
    .map(item => item.trim().toLowerCase())
    .filter(Boolean);


const preferenceKeywords = {

    "engineering": [
        "engineering", "engineer", "robotics", "electronics"
    ],

    "artificial intelligence": [
        "artificial intelligence", "ai", "machine learning"
    ],

    "machine learning": [
        "machine learning", "artificial intelligence", "data science"
    ],

    "cybersecurity": [
        "cybersecurity", "security", "network"
    ],

    "computer science": [
        "computer science", "programming", "software", "computer"
    ],

    "data science": [
        "data science", "data analysis", "statistics"
    ],

    "medical science": [
        "medical", "healthcare", "medicine"
    ],

    "business and management": [
        "business", "management", "leadership"
    ],

    "commerce": [
        "commerce", "finance", "accounting"
    ],

    "computer applications": [
        "computer applications", "software", "programming",
        "web development"
    ],

    "science and research": [
        "science", "research", "scientist"
    ],

    "designing and arts": [
        "design", "creative", "art", "visual"
    ],

    "law": [
        "law", "legal"
    ],

    "education": [
        "education", "teaching", "teacher"
    ]

};


// ======================================================
// 8. CAREER VISION KEYWORD DATABASE
// ======================================================

const visionDatabase = [

    {
        keywords: [
            "cybersecurity", "cyber security", "hacking",
            "ethical hacking", "security", "online threats",
            "protect data", "network security"
        ],

        interest: "Cybersecurity and Digital Protection",

        careers: [
            "Cybersecurity Analyst",
            "Network Security Engineer",
            "Information Security Specialist",
            "Digital Forensics Analyst",
            "Cloud Security Engineer",
            "Security Engineer"
        ],

        skills: [
            "Python Programming",
            "Computer Networking",
            "Linux Fundamentals",
            "Cryptography",
            "Cybersecurity Fundamentals",
            "Cloud Security Basics"
        ],

        steps: [
            "Learn computer networking fundamentals.",
            "Start learning Python and Linux.",
            "Understand basic cybersecurity concepts.",
            "Explore beginner-friendly security projects.",
            "Study cryptography and network security.",
            "Build a portfolio of safe, legal security projects."
        ]

    },

    {
        keywords: [
            "artificial intelligence", "machine learning",
            "ai", "deep learning", "neural networks",
            "intelligent systems"
        ],

        interest: "Artificial Intelligence and Machine Learning",

        careers: [
            "AI Engineer",
            "Machine Learning Engineer",
            "Data Scientist",
            "AI Research Assistant"
        ],

        skills: [
            "Python Programming",
            "Mathematics and Statistics",
            "Machine Learning",
            "Data Analysis",
            "Problem Solving"
        ],

        steps: [
            "Strengthen Python programming.",
            "Learn mathematics and statistics.",
            "Explore machine learning fundamentals.",
            "Build small AI-based projects."
        ]

    },

    {
        keywords: [
            "software", "coding", "programming",
            "applications", "developer", "web development",
            "websites"
        ],

        interest: "Software and Application Development",

        careers: [
            "Software Developer",
            "Web Developer",
            "Full Stack Developer",
            "Application Developer"
        ],

        skills: [
            "Python or Java",
            "HTML and CSS",
            "JavaScript",
            "Database Management",
            "Problem Solving"
        ],

        steps: [
            "Strengthen your programming fundamentals.",
            "Learn data structures and algorithms.",
            "Explore web or application development.",
            "Create your own software projects."
        ]

    },

    {
        keywords: [
            "business", "entrepreneur", "startup",
            "management", "leadership", "company",
            "own business"
        ],

        interest: "Business and Entrepreneurship",

        careers: [
            "Business Analyst",
            "Entrepreneur",
            "Project Manager",
            "Business Development Executive"
        ],

        skills: [
            "Communication",
            "Leadership",
            "Business Analysis",
            "Financial Literacy",
            "Decision Making"
        ],

        steps: [
            "Understand basic business concepts.",
            "Improve communication and leadership.",
            "Explore how businesses operate.",
            "Develop a small business idea."
        ]

    },

    {
        keywords: [
            "design", "creative", "drawing",
            "animation", "graphics", "art", "visual"
        ],

        interest: "Creative Design and Visual Arts",

        careers: [
            "UI/UX Designer",
            "Graphic Designer",
            "Animation Designer",
            "Visual Designer"
        ],

        skills: [
            "Creative Thinking",
            "Design Principles",
            "Visual Communication",
            "UI/UX Fundamentals",
            "Design Software"
        ],

        steps: [
            "Learn basic design principles.",
            "Explore design tools.",
            "Study user experience fundamentals.",
            "Build a creative portfolio."
        ]

    },

    {
        keywords: [
            "doctor", "medical", "healthcare",
            "hospital", "medicine", "patients", "health"
        ],

        interest: "Healthcare and Medical Sciences",

        careers: [
            "Medical Professional",
            "Healthcare Researcher",
            "Medical Laboratory Technologist",
            "Healthcare Administrator"
        ],

        skills: [
            "Scientific Knowledge",
            "Communication",
            "Critical Thinking",
            "Research Skills",
            "Problem Solving"
        ],

        steps: [
            "Explore healthcare-related study pathways.",
            "Understand relevant science subjects.",
            "Research different healthcare professions.",
            "Check the qualifications required for each career."
        ]

    },

    {
        keywords: [
            "data", "analytics", "statistics",
            "data science", "big data", "visualization"
        ],

        interest: "Data Science and Analytics",

        careers: [
            "Data Analyst",
            "Data Scientist",
            "Business Intelligence Analyst",
            "Data Engineer"
        ],

        skills: [
            "Python",
            "SQL",
            "Statistics",
            "Data Visualization",
            "Critical Thinking"
        ],

        steps: [
            "Learn Python fundamentals.",
            "Understand statistics.",
            "Learn SQL and databases.",
            "Practise analysing sample datasets."
        ]

    },

    {
        keywords: [
            "research", "scientist", "innovation",
            "experiments", "discovery", "technology"
        ],

        interest: "Research and Technological Innovation",

        careers: [
            "Research Associate",
            "Research Scientist",
            "Technology Researcher",
            "Innovation Specialist"
        ],

        skills: [
            "Research Methods",
            "Critical Thinking",
            "Technical Knowledge",
            "Data Analysis",
            "Scientific Communication"
        ],

        steps: [
            "Explore a subject that interests you.",
            "Develop research and analytical skills.",
            "Read beginner-friendly research papers.",
            "Try a small research-based project."
        ]

    }

];


// ======================================================
// 9. PERSONALIZATION ENGINE
// ======================================================

function getMatchedVisionAreas() {

    const visionAnswer = answers[20];

    const vision = (
        typeof visionAnswer === "string"
            ? visionAnswer
            : visionAnswer?.value || ""
    ).toLowerCase().trim();

    if (!vision) return [];

    return visionDatabase.filter(area => {

        return area.keywords.some(keyword => {

            const escaped = keyword.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

            const regex = new RegExp(
                "\\b" + escaped + "\\b",
                "i"
            );

            return regex.test(vision);

        });

    });

}


function getPreferenceMatch(text) {

    const searchableText = text.toLowerCase();

    let matched = 0;

    const interestsToCheck = selectedInterests.filter(
        interest =>
            interest &&
            interest !== "other" &&
            !interest.startsWith("other —")
    );

    if (!interestsToCheck.length) return 0;

    interestsToCheck.forEach(interest => {

        const keywords = preferenceKeywords[interest] || [
            interest
        ];

        const found = keywords.some(keyword =>
            searchableText.includes(keyword)
        );

        if (found) matched++;

    });

    return matched / interestsToCheck.length;

}


function getRIASECMatch(categories) {

    let score = 0;

    const weights = [3, 2, 1];

    categories.forEach(code => {

        const position = topThree.findIndex(
            item => item[0] === code
        );

        if (position !== -1) {
            score += weights[position];
        }

    });

    return score / 6;

}


function getVisionMatch(text) {

    const matchedAreas = getMatchedVisionAreas();

    if (!matchedAreas.length) return 0;

    const keywords = matchedAreas.flatMap(
        area => [
            ...area.careers,
            ...area.keywords,
            area.interest
        ]
    );

    const searchableText = text.toLowerCase();

    const matched = keywords.some(keyword =>
        searchableText.includes(keyword.toLowerCase())
    );

    return matched ? 1 : 0;

}


// ======================================================
// 10. RECOMMENDATION EXPLANATION ENGINE
// ======================================================

function getRecommendationReasons(item, type) {

    const text = type === "course"
        ? [
            item.name,
            item.description,
            item.subjects
        ].join(" ")
        : [
            item.name,
            item.description,
            item.skills,
            item.qualification
        ].join(" ");

    const reasons = [];

    const matchingCategories = topThree
        .filter(([code]) => item.category.includes(code))
        .map(([code]) => riasec[code].name);

    const preferenceMatch = getPreferenceMatch(text);

    const visionMatch = getVisionMatch(text);

    if (matchingCategories.length > 0) {

        reasons.push(
            "Personality match: This recommendation connects with your " +
            matchingCategories.join(", ") +
            " interests."
        );

    }

    if (preferenceMatch > 0) {

        const matchingPreferences = selectedInterests.filter(
            interest => {

                const keywords = preferenceKeywords[interest] || [
                    interest
                ];

                return keywords.some(keyword =>
                    text.toLowerCase().includes(keyword)
                );

            }
        );

        if (matchingPreferences.length > 0) {

            reasons.push(
                "Preference match: It relates to your selected interest in " +
                matchingPreferences.join(", ") +
                "."
            );

        } else {

            reasons.push(
                "Preference match: It connects with some of your selected study preferences."
            );

        }

    }

    if (visionMatch > 0) {

        reasons.push(
            "Vision match: It relates to the career field identified in your personal career vision."
        );

    }

    if (reasons.length === 0) {

        reasons.push(
            "This is an additional option worth exploring alongside your interests."
        );

    }

    return reasons;

}


// ======================================================
// 11. DISPLAY STUDENT NAME
// ======================================================

function displayStudentName() {

    const element = document.getElementById("studentName");

    if (!element) return;

    element.textContent =
        student.fullName || student.name || "Student";

}


// ======================================================
// 12. DISPLAY STUDENT PROFILE
// ======================================================

function displayStudentProfile() {

    const container =
        document.getElementById("studentProfile");

    if (!container) return;

    container.innerHTML = "";

    const details = [

        ["Full Name", student.fullName || student.name],
        ["Email", student.email],
        [
            "Location",
            [student.city, student.state]
                .filter(Boolean)
                .join(", ")
        ],
        ["Country", student.country],
        ["Education", getAnswerText(0)],
        ["Study Field", getAnswerText(1)]

    ];

    details.forEach(([title, value]) => {

        const card = document.createElement("div");

        const heading = document.createElement("h4");

        heading.textContent = title.toUpperCase();

        const paragraph = document.createElement("p");

        paragraph.textContent = value || "Not provided";

        card.append(heading, paragraph);

        container.appendChild(card);

    });

}


// ======================================================
// 13. DISPLAY PERSONALITY PROFILE
// ======================================================

function displayPersonality() {

    const codeElement =
        document.getElementById("hollandCode");

    const interestElement =
        document.getElementById("topInterest");

    const descriptionElement =
        document.getElementById("profileDescription");

    const tags = document.getElementById("profileTags");

    const scoreContainer =
        document.getElementById("scoreBars");

    if (
        !codeElement ||
        !interestElement ||
        !descriptionElement ||
        !tags ||
        !scoreContainer
    ) {

        console.error("RIASEC dashboard elements are missing.");

        return;

    }

    codeElement.textContent = hollandCode || "---";

    interestElement.textContent =
        firstCategory.name + " Interest Profile";

    descriptionElement.textContent =
        firstCategory.description;

    tags.innerHTML = "";

    topThree.forEach(([code]) => {

        const tag = document.createElement("span");

        tag.textContent = riasec[code].name;

        tags.appendChild(tag);

    });

    scoreContainer.innerHTML = "";

    sortedScores.forEach(([code, score]) => {

        const percentage = totalAnswers
            ? Math.round(score / totalAnswers * 100)
            : 0;

        const row = document.createElement("div");

        row.className = "score-row";

        const info = document.createElement("div");

        info.className = "score-info";

        const name = document.createElement("span");

        name.textContent = riasec[code].name;

        const value = document.createElement("span");

        value.textContent = percentage + "%";

        info.append(name, value);

        const track = document.createElement("div");

        track.className = "score-track";

        const fill = document.createElement("div");

        fill.className = "score-fill";

        fill.style.width = percentage + "%";

        track.appendChild(fill);

        row.append(info, track);

        scoreContainer.appendChild(row);

    });

    displayChart();

}


// ======================================================
// 14. RIASEC RADAR CHART
// ======================================================

function displayChart() {

    const canvas = document.getElementById("riasecChart");

    if (!canvas || typeof Chart === "undefined") return;

    const existingChart = Chart.getChart(canvas);

    if (existingChart) {
        existingChart.destroy();
    }

    new Chart(canvas, {

        type: "radar",

        data: {

            labels: Object.values(riasec)
                .map(item => item.name),

            datasets: [{

                label: "Interest Score",

                data: Object.keys(scores)
                    .map(code => scores[code]),

                backgroundColor: "rgba(176, 38, 255, 0.2)",

                borderColor: "#B026FF",

                borderWidth: 2,

                pointBackgroundColor: "#D18AFF"

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                r: {

                    min: 0,

                    max: 12,

                    ticks: {
                        stepSize: 2,
                        color: "#AAA4BD"
                    },

                    pointLabels: {
                        color: "#FFFFFF"
                    }

                }

            },

            plugins: {

                legend: {
                    display: false
                }

            }

        }

    });

}


// ======================================================
// 15. PERSONALIZED COURSE RECOMMENDATIONS
// ======================================================

function getCourseScore(course) {

    const text = [
        course.name,
        course.description,
        course.subjects
    ].join(" ");

    const riasecScore = getRIASECMatch(course.category);

    const preferenceScore = getPreferenceMatch(text);

    const visionScore = getVisionMatch(text);

    const total = (
        riasecScore * 40 +
        preferenceScore * 35 +
        visionScore * 25
    );

    return Math.round(total);

}


function displayCourses() {

    const container =
        document.getElementById("courseRecommendations");

    if (!container) return;

    container.innerHTML = "";

    const recommended = [...courses]

        .map(course => ({
            ...course,
            matchScore: getCourseScore(course)
        }))

        .sort((a, b) =>
            b.matchScore - a.matchScore
        )

        .slice(0, 4);

    recommended.forEach((course, index) => {

        const card = document.createElement("div");

        card.className = "recommendation-card";

        const reasons = getRecommendationReasons(
            course,
            "course"
        );

        card.innerHTML = `

            <span class="recommendation-number">
                COURSE ${index + 1}
            </span>

            <h3>${escapeHTML(course.name)}</h3>

            <h4>${course.matchScore}% Match</h4>

            <p>${escapeHTML(course.description)}</p>

            <p>
                <strong>Duration:</strong>
                ${escapeHTML(course.duration)}
            </p>

            <p>
                <strong>Subjects:</strong>
                ${escapeHTML(course.subjects)}
            </p>

            <div class="match-explanation">

                <h4>💡 Why this course?</h4>

                <ul>
                    ${reasons.map(reason => `
                        <li>${escapeHTML(reason)}</li>
                    `).join("")}
                </ul>

            </div>

        `;

        container.appendChild(card);

    });

}


// ======================================================
// 16. PERSONALIZED CAREER RECOMMENDATIONS
// ======================================================

function getCareerScore(career) {

    const text = [
        career.name,
        career.description,
        career.skills,
        career.qualification
    ].join(" ");

    const riasecScore = getRIASECMatch(career.category);

    const preferenceScore = getPreferenceMatch(text);

    const visionScore = getVisionMatch(text);

    const total = (
        riasecScore * 40 +
        preferenceScore * 35 +
        visionScore * 25
    );

    return Math.round(total);

}


function displayCareers() {

    const container =
        document.getElementById("careerRecommendations");

    if (!container) return;

    container.innerHTML = "";

    const recommended = [...careers]

        .map(career => ({
            ...career,
            matchScore: getCareerScore(career)
        }))

        .sort((a, b) =>
            b.matchScore - a.matchScore
        )

        .slice(0, 4);

    recommended.forEach((career, index) => {

        const card = document.createElement("div");

        card.className = "recommendation-card";

        const reasons = getRecommendationReasons(
            career,
            "career"
        );

        card.innerHTML = `

            <span class="recommendation-number">
                CAREER ${index + 1}
            </span>

            <h3>${escapeHTML(career.name)}</h3>

            <h4>${career.matchScore}% Match</h4>

            <p>${escapeHTML(career.description)}</p>

            <p>
                <strong>Skills:</strong>
                ${escapeHTML(career.skills)}
            </p>

            <p>
                <strong>Qualification:</strong>
                ${escapeHTML(career.qualification)}
            </p>

            <div class="match-explanation">

                <h4>💡 Why this career?</h4>

                <ul>
                    ${reasons.map(reason => `
                        <li>${escapeHTML(reason)}</li>
                    `).join("")}
                </ul>

            </div>

        `;

        container.appendChild(card);

    });

}


// ======================================================
// 17. CAREER ROADMAP
// ======================================================

function displayRoadmap() {

    const container =
        document.getElementById("careerRoadmap");

    if (!container) return;

    container.innerHTML = "";

    const stages = [

        [
            "Stage 1 – Build Your Foundation",
            "Strengthen your academic subjects and basic knowledge."
        ],

        [
            "Stage 2 – Develop Core Skills",
            "Learn programming, communication and technical fundamentals."
        ],

        [
            "Stage 3 – Choose Your Specialisation",
            "Explore subjects related to your recommended career."
        ],

        [
            "Stage 4 – Gain Practical Experience",
            "Work on projects and build a portfolio."
        ],

        [
            "Stage 5 – Prepare for Opportunities",
            "Improve your professional skills and explore internships."
        ],

        [
            "Stage 6 – Plan Your Future",
            "Prepare for employment or higher education."
        ]

    ];

    stages.forEach(([title, description]) => {

        const item = document.createElement("div");

        item.className = "roadmap-item";

        const heading = document.createElement("h3");

        heading.textContent = title;

        const paragraph = document.createElement("p");

        paragraph.textContent = description;

        item.append(heading, paragraph);

        container.appendChild(item);

    });

}


// ======================================================
// 18. PERSONAL CAREER VISION
// ======================================================

function displayConclusion() {

    const conclusion = getAnswerText(20);

    const element =
        document.getElementById("studentConclusion");

    if (element) {

        element.textContent =
            conclusion || "No personal career vision was provided.";

    }

}


// ======================================================
// 19. DISPLAY VISION LISTS
// ======================================================

function displayVisionList(elementId, items) {

    const container = document.getElementById(elementId);

    if (!container) {

        console.warn(
            "Vision HTML element not found:",
            elementId
        );

        return;

    }

    container.replaceChildren();

    const list = document.createElement("ul");

    items.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        list.appendChild(li);

    });

    container.appendChild(list);

}


// ======================================================
// 20. CAREER VISION ANALYSIS ENGINE
// ======================================================

function analyseCareerVision() {

    const visionAnswer = answers[20];

    const vision = (

        typeof visionAnswer === "string"
            ? visionAnswer
            : visionAnswer?.value || ""

    ).trim();

    const originalVision =
        document.getElementById("originalVision");

    const visionSummary =
        document.getElementById("visionSummary");

    const visionFeedback =
        document.getElementById("visionFeedback");

    if (
        !originalVision ||
        !visionSummary ||
        !visionFeedback
    ) {

        console.error(
            "Career Vision HTML elements are missing. Check results.html."
        );

        return;

    }

    if (!vision) {

        originalVision.textContent =
            "No career vision was provided.";

        visionSummary.textContent =
            "Complete Question 21 to receive your personalised analysis.";

        visionFeedback.textContent =
            "Your career vision can help you explore possible career directions. You can edit your assessment and add your ambition.";

        displayVisionList("visionInterests", [
            "No interests identified yet."
        ]);

        displayVisionList("visionCareers", [
            "Career suggestions will appear here."
        ]);

        displayVisionList("visionSkills", [
            "Skill suggestions will appear here."
        ]);

        displayVisionList("visionSteps", [
            "Enter your career vision to receive recommended next steps."
        ]);

        return;

    }

    originalVision.textContent = vision;

    const matchedAreas = getMatchedVisionAreas();

    if (matchedAreas.length === 0) {

        visionSummary.textContent =
            "Your vision describes a personal ambition. We could not identify a specific career field from the keywords, so we recommend exploring your interests further.";

        displayVisionList("visionInterests", [
            "Personal ambition",
            "Future career development",
            "Goal exploration"
        ]);

        displayVisionList("visionCareers", [
            "Explore careers related to your educational interests."
        ]);

        displayVisionList("visionSkills", [
            "Communication",
            "Problem Solving",
            "Critical Thinking",
            "Digital Skills"
        ]);

        displayVisionList("visionSteps", [
            "Identify the subjects you enjoy most.",
            "Explore careers connected to those subjects.",
            "Research the qualifications required.",
            "Set a small learning goal."
        ]);

        visionFeedback.textContent =
            "Every career journey begins with an ambition. Your vision gives us a starting point. Try including more details about the subjects, activities or industries that interest you to receive more relevant suggestions.";

        return;

    }

    const interests = [
        ...new Set(
            matchedAreas.map(area => area.interest)
        )
    ];

    const suggestedCareers = [
        ...new Set(
            matchedAreas.flatMap(area => area.careers)
        )
    ];

    const suggestedSkills = [
        ...new Set(
            matchedAreas.flatMap(area => area.skills)
        )
    ];

    const recommendedSteps = [
        ...new Set(
            matchedAreas.flatMap(area => area.steps)
        )
    ];

    visionSummary.textContent =
        "Your career vision highlights an interest in " +
        interests.join(", ") +
        ". These areas can help you explore suitable academic and professional directions.";

    displayVisionList(
        "visionInterests",
        interests
    );

    displayVisionList(
        "visionCareers",
        suggestedCareers.slice(0, 8)
    );

    displayVisionList(
        "visionSkills",
        suggestedSkills.slice(0, 10)
    );

    displayVisionList(
        "visionSteps",
        recommendedSteps.slice(0, 8)
    );

    let feedback =
        "Your ambition gives you a useful starting direction. ";

    if (interests.length === 1) {

        feedback +=
            "Your vision points towards " +
            interests[0] +
            ". Focus on building fundamental skills in this field before exploring advanced specialisations.";

    } else {

        feedback +=
            "Your vision connects multiple areas: " +
            interests.join(", ") +
            ". Explore how these fields relate to each other and identify which one interests you most.";

    }

    feedback +=
        " These suggestions are based on keywords in your answer. They are guidance for exploration, not a final career decision.";

    visionFeedback.textContent = feedback;

    console.log("Original Career Vision:", vision);

    console.log("Matched Areas:", matchedAreas);

    console.log("Identified Interests:", interests);

    console.log("Suggested Careers:", suggestedCareers);

}


// ======================================================
// 21. DOWNLOAD ORGANIZED CAREER REPORT AS TXT
// ======================================================

function downloadCareerReport() {

    const button = document.querySelector(
        '[onclick="downloadCareerReport()"]'
    );

    const originalText = button ? button.innerText : "";

    try {

        if (button) {

            button.innerText = "Preparing Report...";

            button.disabled = true;

        }


        // ==============================================
        // 1. STUDENT INFORMATION
        // ==============================================

        const studentName =
            student.fullName || student.name || "Not provided";

        const location = [
            student.city,
            student.state,
            student.country
        ].filter(Boolean).join(", ") || "Not provided";


        // ==============================================
        // 2. PREPARE ALL COURSES
        // ==============================================

        const recommendedCourses = [...courses]

            .map(course => ({

                ...course,

                matchScore: getCourseScore(course)

            }))

            .sort((a, b) => b.matchScore - a.matchScore);


        // ==============================================
        // 3. PREPARE ALL CAREERS
        // ==============================================

        const recommendedCareers = [...careers]

            .map(career => ({

                ...career,

                matchScore: getCareerScore(career)

            }))

            .sort((a, b) => b.matchScore - a.matchScore);


        // ==============================================
        // 4. PREPARE CAREER VISION ANALYSIS
        // ==============================================

        const vision = getAnswerText(20);

        const matchedAreas = getMatchedVisionAreas();

        let visionInterests = [];

        let visionCareers = [];

        let visionSkills = [];

        let visionSteps = [];

        let visionSummary = "";

        let visionFeedback = "";


        if (!vision) {

            visionSummary =
                "No personal career vision was provided.";

            visionFeedback =
                "Complete your career vision to receive personalised suggestions.";

            visionInterests = [
                "No interests identified yet."
            ];

            visionCareers = [
                "Career suggestions will appear here."
            ];

            visionSkills = [
                "Skill suggestions will appear here."
            ];

            visionSteps = [
                "Enter your career vision to receive recommended next steps."
            ];

        }

        else if (matchedAreas.length === 0) {

            visionSummary =
                "Your vision describes a personal ambition. We could not identify a specific career field from the keywords, so we recommend exploring your interests further.";

            visionFeedback =
                "Every career journey begins with an ambition. Your vision gives us a starting point. Try including more details about the subjects, activities or industries that interest you to receive more relevant suggestions.";

            visionInterests = [
                "Personal ambition",
                "Future career development",
                "Goal exploration"
            ];

            visionCareers = [
                "Explore careers related to your educational interests."
            ];

            visionSkills = [
                "Communication",
                "Problem Solving",
                "Critical Thinking",
                "Digital Skills"
            ];

            visionSteps = [
                "Identify the subjects you enjoy most.",
                "Explore careers connected to those subjects.",
                "Research the qualifications required.",
                "Set a small learning goal."
            ];

        }

        else {

            const interests = [
                ...new Set(
                    matchedAreas.map(area => area.interest)
                )
            ];

            const suggestedCareers = [
                ...new Set(
                    matchedAreas.flatMap(area => area.careers)
                )
            ];

            const suggestedSkills = [
                ...new Set(
                    matchedAreas.flatMap(area => area.skills)
                )
            ];

            const recommendedSteps = [
                ...new Set(
                    matchedAreas.flatMap(area => area.steps)
                )
            ];

            visionInterests = interests;

            visionCareers = suggestedCareers.slice(0, 8);

            visionSkills = suggestedSkills.slice(0, 10);

            visionSteps = recommendedSteps.slice(0, 8);

            visionSummary =
                "Your career vision highlights an interest in " +
                interests.join(", ") +
                ". These areas can help you explore suitable academic and professional directions.";

            visionFeedback =
                "Your ambition gives you a useful starting direction. ";

            if (interests.length === 1) {

                visionFeedback +=
                    "Your vision points towards " +
                    interests[0] +
                    ". Focus on building fundamental skills in this field before exploring advanced specialisations.";

            } else {

                visionFeedback +=
                    "Your vision connects multiple areas: " +
                    interests.join(", ") +
                    ". Explore how these fields relate to each other and identify which one interests you most.";

            }

            visionFeedback +=
                " These suggestions are based on keywords in your answer. They are guidance for exploration, not a final career decision.";

        }


        // ==============================================
        // 5. BUILD TEXT REPORT
        // ==============================================

        const lines = [];

        const separator = "=".repeat(65);

        const divider = "-".repeat(65);


        function addLine(text = "") {

            lines.push(String(text));

        }


        function addHeading(number, title) {

            addLine("");

            addLine(divider);

            addLine(
                "  " + number + ". " + title.toUpperCase()
            );

            addLine(divider);

            addLine("");

        }


        function addList(title, items) {

            addLine(title + ":");

            if (!items.length) {

                addLine("  Not available.");

            }

            items.forEach((item, index) => {

                addLine(
                    "  " + (index + 1) + ". " + item
                );

            });

            addLine("");

        }


        // ==============================================
        // REPORT HEADER
        // ==============================================

        addLine(separator);

        addLine("");

        addLine("                    CAREER COMPASS");

        addLine("");

        addLine("             PERSONALIZED CAREER REPORT");

        addLine("");

        addLine(
            "  Discover Your Interests. Choose Your Course."
        );

        addLine("               Build Your Future.");

        addLine("");

        addLine(separator);


        // ==============================================
        // STUDENT INFORMATION
        // ==============================================

        addHeading("01", "Student Information");

        addLine("  Name       : " + studentName);

        addLine(
            "  Email      : " + (student.email || "Not provided")
        );

        addLine("  Location   : " + location);

        addLine("");


        // ==============================================
        // RECOMMENDED COURSES
        // ==============================================

        addHeading("02", "Recommended Courses");

        addLine(
            "These courses are ranked using your personality profile,"
        );

        addLine(
            "selected preferences and personal career vision."
        );

        addLine("");

        recommendedCourses.forEach((course, index) => {

            addLine(
                "COURSE " + (index + 1) + ": " + course.name
            );

            addLine(divider);

            addLine(
                "Match Percentage  : " + course.matchScore + "%"
            );

            addLine(
                "Description       : " + course.description
            );

            addLine(
                "Duration          : " + course.duration
            );

            addLine(
                "Important Subjects: " + course.subjects
            );

            addList(
                "Why This Course Is Recommended",
                getRecommendationReasons(course, "course")
            );

            addLine("");

        });


        // ==============================================
        // CAREER OPPORTUNITIES
        // ==============================================

        addHeading("03", "Career Opportunities");

        addLine(
            "These career paths are ranked according to their"
        );

        addLine(
            "compatibility with your assessment responses."
        );

        addLine("");

        recommendedCareers.forEach((career, index) => {

            addLine(
                "CAREER " + (index + 1) + ": " + career.name
            );

            addLine(divider);

            addLine(
                "Match Percentage : " + career.matchScore + "%"
            );

            addLine(
                "Description      : " + career.description
            );

            addLine(
                "Required Skills  : " + career.skills
            );

            addLine(
                "Qualification    : " + career.qualification
            );

            addList(
                "Why This Career Is Recommended",
                getRecommendationReasons(career, "career")
            );

            addLine("");

        });


        // ==============================================
        // PERSONAL CAREER VISION
        // ==============================================

        addHeading("04", "Personal Career Vision");

        addLine("YOUR ORIGINAL VISION:");

        addLine(
            vision || "No personal career vision was provided."
        );

        addLine("");


        // ==============================================
        // CAREER VISION ANALYSIS
        // ==============================================

        addHeading("05", "Career Vision Analysis");

        addLine("VISION SUMMARY:");

        addLine(visionSummary);

        addLine("");

        addList(
            "Identified Interests",
            visionInterests
        );

        addList(
            "Suggested Careers",
            visionCareers
        );

        addList(
            "Recommended Skills",
            visionSkills
        );

        addList(
            "Recommended Next Steps",
            visionSteps
        );

        addLine("PERSONALIZED FEEDBACK:");

        addLine(visionFeedback);

        addLine("");


        // ==============================================
        // REPORT FOOTER
        // ==============================================

        addLine(separator);

        addLine("");

        addLine("                    CAREER COMPASS");

        addLine("");

        addLine(
            "  Your career journey begins with understanding yourself."
        );

        addLine("");

        addLine(
            "  NOTE: These recommendations are exploratory guidance."
        );

        addLine(
            "  They do not guarantee admission or employment."
        );

        addLine("");

        addLine(separator);

        addLine("                 END OF CAREER REPORT");

        addLine("");

        addLine(separator);


        // ==============================================
        // 6. DOWNLOAD TXT FILE
        // ==============================================

        const reportContent = lines.join("\r\n");

        const blob = new Blob(
            ["\uFEFF", reportContent],
            {
                type: "text/plain;charset=utf-8"
            }
        );

        const downloadURL = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");

        downloadLink.href = downloadURL;

        downloadLink.download =
            "Career_Compass_Personalized_Report.txt";

        document.body.appendChild(downloadLink);

        downloadLink.click();

        downloadLink.remove();

        setTimeout(() => {

            URL.revokeObjectURL(downloadURL);

        }, 1000);


    }

    catch (error) {

        console.error(
            "Career report download error:",
            error
        );

        alert(
            "Unable to download the report. Please try again."
        );

    }

    finally {

        if (button) {

            button.innerText = originalText;

            button.disabled = false;

        }

    }

}


// ======================================================
// 22. EDIT ASSESSMENT
// ======================================================

function editAssessment() {

    window.location.href = "assessment.html";

}


// ======================================================
// 23. RETAKE ASSESSMENT
// ======================================================

function retakeAssessment() {

    if (confirm("Start the assessment again?")) {

        sessionStorage.removeItem(
            "careerCompassAnswers"
        );

        sessionStorage.removeItem(
            "careerCompassAssessmentSubmitted"
        );

        window.location.href = "assessment.html";

    }

}


// ======================================================
// 24. HTML SECURITY
// ======================================================

function escapeHTML(value) {

    return String(value || "").replace(

        /[&<>"']/g,

        character => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"

        })[character]

    );

}


// ======================================================
// 25. INITIALISE DASHBOARD
// ======================================================

function initialiseDashboard() {

    displayStudentName();

    displayStudentProfile();

    displayPersonality();

    displayCourses();

    displayCareers();

    displayRoadmap();

    displayConclusion();

    analyseCareerVision();

}


// RUN DASHBOARD

initialiseDashboard();


// ======================================================
// END OF CAREER COMPASS RESULTS DASHBOARD
// ======================================================