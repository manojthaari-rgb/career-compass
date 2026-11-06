// =============================================
// CAREER COMPASS - COMPLETE 21 QUESTION SYSTEM
// =============================================

const TOTAL_QUESTIONS = 21;

let currentQuestion = 0;

let answers = JSON.parse(
    sessionStorage.getItem("careerCompassAnswers") || "{}"
);


// =============================================
// QUESTION DATABASE
// =============================================

const questions = [

    {
        title: "What is your current educational qualification?",
        description: "Select your current education level.",
        type: "single",
        options: [
            "10th Standard",
            "11th Standard",
            "12th Standard",
            "Diploma",
            "Undergraduate",
            "Completed Graduation",
            "Postgraduate",
            "Other"
        ]
    },

    {
        title: "Which group, stream or degree are you currently studying?",
        description: "Choose your current academic stream.",
        type: "dynamic",

        getOptions: () => {

            const qualification = answers[0]?.value;

            if (qualification === "10th Standard") {
                return ["Not decided yet", "Other"];
            }

            if (
                qualification === "11th Standard" ||
                qualification === "12th Standard"
            ) {
                return [
                    "Computer Science with Mathematics",
                    "Biology with Mathematics",
                    "Biology without Mathematics",
                    "Commerce",
                    "Arts and Humanities",
                    "Vocational",
                    "Not decided yet",
                    "Other"
                ];
            }

            if (qualification === "Diploma") {
                return [
                    "Mechanical Engineering",
                    "Electrical Engineering",
                    "Electronics and Communication",
                    "Computer Engineering",
                    "Civil Engineering",
                    "Other"
                ];
            }

            if (
                qualification === "Undergraduate" ||
                qualification === "Completed Graduation"
            ) {
                return [
                    "BTech / BE",
                    "BSc",
                    "BCom",
                    "BBA",
                    "BCA",
                    "BA",
                    "Other"
                ];
            }

            if (qualification === "Postgraduate") {
                return [
                    "MTech / ME",
                    "MSc",
                    "MCom",
                    "MBA",
                    "MCA",
                    "MA",
                    "Other"
                ];
            }

            return ["Not decided yet", "Other"];
        }
    },

    // Q3 - Q14: RIASEC ASSESSMENT

    {
        title: "Which activity would you enjoy most?",
        description: "Choose the activity that interests you most.",
        type: "riasec",
        options: [
            ["A", "Working with machines, tools or equipment"],
            ["B", "Investigating problems and scientific solutions"],
            ["C", "Creating artwork, designs or digital content"],
            ["D", "Helping and supporting people"],
            ["E", "Leading a team or starting a business"],
            ["F", "Organising information, records and files"]
        ]
    },

    {
        title: "Which activity would you choose in your free time?",
        description: "Think about what you naturally enjoy doing.",
        type: "riasec",
        options: [
            ["A", "Building models or repairing objects"],
            ["B", "Researching topics or solving puzzles"],
            ["C", "Drawing, designing or writing"],
            ["D", "Teaching or volunteering"],
            ["E", "Planning events or managing activities"],
            ["F", "Organising files, schedules or information"]
        ]
    },

    {
        title: "What type of project interests you most?",
        description: "Choose the project you would enjoy working on.",
        type: "riasec",
        options: [
            ["A", "Building and testing a technical prototype"],
            ["B", "Analysing data and testing a hypothesis"],
            ["C", "Creating a creative presentation or design"],
            ["D", "Developing a project that helps society"],
            ["E", "Managing a project and leading a team"],
            ["F", "Organising records and schedules"]
        ]
    },

    {
        title: "Which problem would you most enjoy solving?",
        description: "Select the type of challenge that interests you.",
        type: "riasec",
        options: [
            ["A", "A practical or mechanical problem"],
            ["B", "A scientific or analytical problem"],
            ["C", "A creative design problem"],
            ["D", "A problem affecting people or communities"],
            ["E", "A business or management challenge"],
            ["F", "An organisational or documentation problem"]
        ]
    },

    {
        title: "Which subject area attracts you the most?",
        description: "Choose your preferred subject area.",
        type: "riasec",
        options: [
            ["A", "Engineering and practical technology"],
            ["B", "Mathematics, science and research"],
            ["C", "Arts, literature and design"],
            ["D", "Psychology, education and social sciences"],
            ["E", "Business, economics and entrepreneurship"],
            ["F", "Accounting, statistics and information management"]
        ]
    },

    {
        title: "What is your preferred work environment?",
        description: "Imagine your ideal workplace.",
        type: "riasec",
        options: [
            ["A", "Technical workshop or engineering environment"],
            ["B", "Laboratory or research centre"],
            ["C", "Creative studio or design workspace"],
            ["D", "School, hospital or community organisation"],
            ["E", "Corporate or business environment"],
            ["F", "Administrative office"]
        ]
    },

    {
        title: "How would you approach a challenging problem?",
        description: "Choose your natural problem-solving approach.",
        type: "riasec",
        options: [
            ["A", "Experiment with practical solutions"],
            ["B", "Research facts and analyse evidence"],
            ["C", "Try unusual and creative approaches"],
            ["D", "Understand people's opinions and discuss solutions"],
            ["E", "Take responsibility and lead the process"],
            ["F", "Follow a structured process or checklist"]
        ]
    },

    {
        title: "Which achievement would make you happiest?",
        description: "Choose the achievement that feels most rewarding.",
        type: "riasec",
        options: [
            ["A", "Building something useful"],
            ["B", "Discovering something new"],
            ["C", "Creating something original"],
            ["D", "Making a positive difference in someone's life"],
            ["E", "Leading a successful project or business"],
            ["F", "Managing a complex system accurately"]
        ]
    },

    {
        title: "Which responsibility would you prefer?",
        description: "Choose the responsibility you would enjoy.",
        type: "riasec",
        options: [
            ["A", "Handling technical equipment"],
            ["B", "Conducting research and analysis"],
            ["C", "Developing creative ideas"],
            ["D", "Guiding and supporting people"],
            ["E", "Managing people and resources"],
            ["F", "Maintaining records and systems"]
        ]
    },

    {
        title: "What motivates you the most?",
        description: "Select your strongest motivation.",
        type: "riasec",
        options: [
            ["A", "Achieving practical results"],
            ["B", "Gaining knowledge and discovering things"],
            ["C", "Expressing creativity"],
            ["D", "Helping society"],
            ["E", "Achieving success and leadership"],
            ["F", "Stability, organisation and accuracy"]
        ]
    },

    {
        title: "Which working style suits you best?",
        description: "Choose the way you prefer to work.",
        type: "riasec",
        options: [
            ["A", "Hands-on and practical"],
            ["B", "Independent research and analysis"],
            ["C", "Flexible and creative"],
            ["D", "Collaborative and people-oriented"],
            ["E", "Competitive and leadership-oriented"],
            ["F", "Planned and systematic"]
        ]
    },

    {
        title: "Which professional skill would you most like to develop?",
        description: "Select the skill that interests you.",
        type: "riasec",
        options: [
            ["A", "Technical and practical skills"],
            ["B", "Analytical and research skills"],
            ["C", "Creative and artistic skills"],
            ["D", "Communication and interpersonal skills"],
            ["E", "Leadership and business skills"],
            ["F", "Administrative and organisational skills"]
        ]
    },

    // Q15

    {
        title: "Which course fields interest you the most?",
        description: "You can select more than one option.",
        type: "multiple",
        options: [
            "Engineering",
            "Artificial Intelligence",
            "Machine Learning",
            "Cybersecurity",
            "Computer Science",
            "Data Science",
            "Medical Science",
            "Business and Management",
            "Commerce",
            "Computer Applications",
            "Science and Research",
            "Designing and Arts",
            "Law",
            "Education",
            "Other"
        ]
    },

    // Q16

    {
        title: "Which type of job would you prefer?",
        description: "Select your preferred career direction.",
        type: "single",
        options: [
            "Technical",
            "Research",
            "Government",
            "Business and Management",
            "Creative",
            "Healthcare",
            "Teaching and Education",
            "Not Sure Yet",
            "Other"
        ]
    },

    // Q17

    {
        title: "In which country would you prefer to work in the future?",
        description: "Choose your preferred work destination.",
        type: "single",
        options: [
            "India",
            "Germany",
            "USA",
            "UK",
            "Canada",
            "Australia",
            "Singapore",
            "Japan",
            "No Preference",
            "Other"
        ]
    },

    // Q18

    {
        title: "What is your expected annual salary?",
        description: "Choose your expected annual salary range.",
        type: "dynamic",

        getOptions: () => {

            const country = answers[16]?.value;

            const salaries = {

                India: [
                    "Below ₹3 LPA",
                    "₹3–5 LPA",
                    "₹5–10 LPA",
                    "₹10–20 LPA",
                    "Above ₹20 LPA"
                ],

                Germany: [
                    "Below €30,000",
                    "€30,000–€50,000",
                    "€50,000–€70,000",
                    "€70,000–€100,000",
                    "Above €100,000"
                ],

                USA: [
                    "Below $40,000",
                    "$40,000–$60,000",
                    "$60,000–$90,000",
                    "$90,000–$120,000",
                    "Above $120,000"
                ],

                UK: [
                    "Below £25,000",
                    "£25,000–£40,000",
                    "£40,000–£60,000",
                    "£60,000–£90,000",
                    "Above £90,000"
                ],

                Canada: [
                    "Below CAD 40,000",
                    "CAD 40,000–60,000",
                    "CAD 60,000–90,000",
                    "CAD 90,000–120,000",
                    "Above CAD 120,000"
                ],

                Australia: [
                    "Below AUD 50,000",
                    "AUD 50,000–70,000",
                    "AUD 70,000–100,000",
                    "AUD 100,000–130,000",
                    "Above AUD 130,000"
                ],

                Singapore: [
                    "Below SGD 30,000",
                    "SGD 30,000–50,000",
                    "SGD 50,000–80,000",
                    "SGD 80,000–120,000",
                    "Above SGD 120,000"
                ],

                Japan: [
                    "Below JPY 3 million",
                    "JPY 3–5 million",
                    "JPY 5–7 million",
                    "JPY 7–10 million",
                    "Above JPY 10 million"
                ]

            };

            return [
                ...(salaries[country] || [
                    "Below ₹3 LPA",
                    "₹3–5 LPA",
                    "₹5–10 LPA",
                    "₹10–20 LPA",
                    "Above ₹20 LPA"
                ]),
                "Not Sure Yet",
                "Other"
            ];
        }
    },

    // Q19

    {
        title: "Where would you prefer to study?",
        description: "Select your preferred study location.",
        type: "single",
        options: [
            "Tamil Nadu",
            "Other Indian States",
            "Abroad",
            "Online Education",
            "No Preference",
            "Other"
        ]
    },

    // Q20

    {
        title: "What is your preferred annual college budget?",
        description: "Choose your approximate annual college budget.",
        type: "single",
        options: [
            "Below ₹50,000",
            "₹50,000–₹1 Lakh",
            "₹1–2 Lakhs",
            "₹2–5 Lakhs",
            "Above ₹5 Lakhs",
            "Scholarship or Financial Assistance Required",
            "Other"
        ]
    },

    // Q21

    {
        title: "Tell us your dream. What do you really want to become?",
        description: "Share your complete interests, ambitions, courses, career goals and future expectations.",
        type: "text"
    }

];


// =============================================
// HTML ELEMENT REFERENCES
// =============================================

const questionCounter = document.getElementById("questionCounter");
const progressPercentage = document.getElementById("progressPercentage");
const progressBar = document.getElementById("progressBar");

const questionCategory = document.getElementById("questionCategory");
const questionTitle = document.getElementById("questionTitle");
const questionDescription = document.getElementById("questionDescription");

const answerOptions = document.getElementById("answerOptions");

const otherContainer = document.getElementById("otherContainer");
const otherAnswer = document.getElementById("otherAnswer");

const conclusionContainer = document.getElementById("conclusionContainer");
const conclusionAnswer = document.getElementById("conclusionAnswer");

const errorMessage = document.getElementById("errorMessage");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");


// =============================================
// SAVE ANSWERS
// =============================================

function saveAnswers() {

    sessionStorage.setItem(
        "careerCompassAnswers",
        JSON.stringify(answers)
    );

}


// =============================================
// DISPLAY QUESTION
// =============================================

function displayQuestion() {

    const question = questions[currentQuestion];

    questionCounter.textContent =
        `QUESTION ${currentQuestion + 1} OF ${TOTAL_QUESTIONS}`;

    const percentage = Math.round(
        ((currentQuestion + 1) / TOTAL_QUESTIONS) * 100
    );

    progressPercentage.textContent = percentage + "%";
    progressBar.style.width = percentage + "%";

    questionTitle.textContent = question.title;
    questionDescription.textContent = question.description;

    if (currentQuestion < 2) {
        questionCategory.textContent = "PROFILE INFORMATION";
    } else if (currentQuestion < 14) {
        questionCategory.textContent = "RIASEC INTEREST ASSESSMENT";
    } else if (currentQuestion < 20) {
        questionCategory.textContent = "CAREER PREFERENCES";
    } else {
        questionCategory.textContent = "PERSONAL CONCLUSION";
    }

    errorMessage.textContent = "";

    answerOptions.innerHTML = "";

    otherContainer.style.display = "none";
    conclusionContainer.style.display = "none";

    if (currentQuestion === 20) {

        answerOptions.style.display = "none";
        conclusionContainer.style.display = "block";

        conclusionAnswer.value =
            answers[20]?.value || "";

    } else {

        answerOptions.style.display = "grid";

        const options =
            question.type === "dynamic"
                ? question.getOptions()
                : question.options;

        options.forEach(option => {

            const value =
                question.type === "riasec"
                    ? option[0]
                    : option;

            const label =
                question.type === "riasec"
                    ? `${option[0]}. ${option[1]}`
                    : option;

            const card = document.createElement("label");

            card.className = "answer-option";

            const input = document.createElement("input");

            input.type =
                question.type === "multiple"
                    ? "checkbox"
                    : "radio";

            input.name = "answer";
            input.value = value;

            const saved = answers[currentQuestion];

            if (question.type === "multiple") {

                input.checked =
                    saved?.values?.includes(value) || false;

            } else {

                input.checked =
                    saved?.value === value;

            }

            const span = document.createElement("span");

            span.textContent = label;

            card.appendChild(input);
            card.appendChild(span);

            input.addEventListener("change", () => {

                if (question.type === "multiple") {
                    saveMultipleAnswers();
                } else {
                    saveSingleAnswer();
                }

                // If the qualification changes, clear the old stream.
                if (currentQuestion === 0) {
                    delete answers[1];
                }

                // If the work country changes, clear the old salary range.
                if (currentQuestion === 16) {
                    delete answers[17];
                }

                saveAnswers();

                updateOtherField();
                updateSelectedCards();

            });

            answerOptions.appendChild(card);

        });

        updateOtherField();

        if (answers[currentQuestion]?.other) {
            otherAnswer.value = answers[currentQuestion].other;
        }

        updateSelectedCards();

    }

    previousButton.disabled = currentQuestion === 0;

    nextButton.textContent =
        currentQuestion === 20
            ? "SUBMIT MY CAREER ASSESSMENT"
            : "NEXT →";

}


// =============================================
// SAVE SINGLE SELECTION
// =============================================

function saveSingleAnswer() {

    const selected = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selected) return;

    answers[currentQuestion] = {
        ...answers[currentQuestion],
        value: selected.value
    };

    saveAnswers();

}


// =============================================
// SAVE MULTIPLE SELECTIONS
// =============================================

function saveMultipleAnswers() {

    const selected = Array.from(
        document.querySelectorAll('input[name="answer"]:checked')
    ).map(input => input.value);

    answers[currentQuestion] = {
        ...answers[currentQuestion],
        values: selected
    };

    saveAnswers();

}


// =============================================
// OTHER FIELD DISPLAY
// =============================================

function updateOtherField() {

    const selected = Array.from(
        document.querySelectorAll('input[name="answer"]:checked')
    );

    const hasOther = selected.some(
        input => input.value === "Other"
    );

    otherContainer.style.display =
        hasOther ? "block" : "none";

    if (hasOther) {

        otherAnswer.value =
            answers[currentQuestion]?.other || "";

    } else {

        otherAnswer.value = "";

    }

}


// =============================================
// SAVE TYPED OTHER ANSWER
// =============================================

otherAnswer.addEventListener("input", () => {

    if (!answers[currentQuestion]) {
        answers[currentQuestion] = {};
    }

    answers[currentQuestion].other =
        otherAnswer.value;

    saveAnswers();

});


// =============================================
// SELECTED OPTION DESIGN
// =============================================

function updateSelectedCards() {

    document.querySelectorAll(".answer-option").forEach(card => {

        const input = card.querySelector("input");

        card.classList.toggle(
            "selected",
            input.checked
        );

    });

}


// =============================================
// VALIDATE ANSWER
// =============================================

function validateAnswer() {

    if (currentQuestion === 20) {

        if (!conclusionAnswer.value.trim()) {

            errorMessage.textContent =
                "Please describe your interests and career goals.";

            conclusionAnswer.focus();

            return false;

        }

        return true;

    }

    const selected = Array.from(
        document.querySelectorAll('input[name="answer"]:checked')
    );

    if (selected.length === 0) {

        errorMessage.textContent =
            "Please select an answer before continuing.";

        return false;

    }

    const hasOther = selected.some(
        input => input.value === "Other"
    );

    if (hasOther && !otherAnswer.value.trim()) {

        errorMessage.textContent =
            "Please type your answer in the Other field.";

        otherAnswer.focus();

        return false;

    }

    return true;

}


// =============================================
// SAVE OTHER ANSWER
// =============================================

function saveOtherAnswer() {

    const selected = Array.from(
        document.querySelectorAll('input[name="answer"]:checked')
    );

    const hasOther = selected.some(
        input => input.value === "Other"
    );

    if (hasOther) {

        if (!answers[currentQuestion]) {
            answers[currentQuestion] = {};
        }

        answers[currentQuestion].other =
            otherAnswer.value.trim();

    } else if (answers[currentQuestion]) {

        delete answers[currentQuestion].other;

    }

    saveAnswers();

}


// =============================================
// SAVE Q21 CONCLUSION
// =============================================

function saveConclusion() {

    answers[20] = {
        value: conclusionAnswer.value.trim()
    };

    saveAnswers();

}


// =============================================
// NEXT BUTTON - DASHBOARD REDIRECT
// =============================================

nextButton.addEventListener("click", () => {

    if (!validateAnswer()) return;

    if (currentQuestion === 20) {

        // Save the final conclusion.
        saveConclusion();

        // Save all assessment answers.
        saveAnswers();

        // Mark the assessment as submitted.
        sessionStorage.setItem(
             "careerCompassAssessmentSubmitted",
             "true"
        );

        // Prevent multiple submissions.
        nextButton.disabled = true;

        nextButton.textContent = "PREPARING YOUR RESULTS...";

        errorMessage.textContent =
            "Your assessment has been submitted successfully!";

        // Automatically open the results dashboard.
        setTimeout(() => {

            window.location.href = "results.html";

        }, 800);

        return;

    }

    saveOtherAnswer();

    currentQuestion++;

    displayQuestion();

});


// =============================================
// PREVIOUS BUTTON
// =============================================

previousButton.addEventListener("click", () => {

    if (currentQuestion > 0) {

        saveOtherAnswer();

        currentQuestion--;

        displayQuestion();

    }

});


// =============================================
// Q21 AUTO SAVE
// =============================================

conclusionAnswer.addEventListener("input", () => {

    saveConclusion();

});


// =============================================
// START
// =============================================

displayQuestion();