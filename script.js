const profiles = {
  stress: {
    label: "Stress response",
    hr: 108,
    hrv: 34,
    gsr: 72,
    temp: 376,
    emg: 64,
    motion: 45
  },
  pain: {
    label: "Pain response",
    hr: 118,
    hrv: 29,
    gsr: 62,
    temp: 382,
    emg: 82,
    motion: 34
  },
  fatigue: {
    label: "Fatigue response",
    hr: 86,
    hrv: 25,
    gsr: 44,
    temp: 368,
    emg: 29,
    motion: 78
  },
  relaxed: {
    label: "Relaxed response",
    hr: 68,
    hrv: 78,
    gsr: 18,
    temp: 365,
    emg: 14,
    motion: 12
  }
};

const inputs = {
  hr: document.getElementById("hr"),
  hrv: document.getElementById("hrv"),
  gsr: document.getElementById("gsr"),
  temp: document.getElementById("temp"),
  emg: document.getElementById("emg"),
  motion: document.getElementById("motion")
};

const labels = {
  hr: document.getElementById("hr-value"),
  hrv: document.getElementById("hrv-value"),
  gsr: document.getElementById("gsr-value"),
  temp: document.getElementById("temp-value"),
  emg: document.getElementById("emg-value"),
  motion: document.getElementById("motion-value")
};

const profileName = document.getElementById("profile-name");
const profileTabs = document.querySelectorAll(".profile-tab");
const analyzeButton = document.getElementById("analyze-button");
const agentMessage = document.getElementById("agent-message");
const agentSummary = document.getElementById("agent-summary");
const agentConfidence = document.getElementById("agent-confidence");
const agentLog = document.getElementById("agent-log");
const heroAlert = document.getElementById("hero-alert");
const heroHr = document.getElementById("hero-hr");
const heroStress = document.getElementById("hero-stress");
const heroPain = document.getElementById("hero-pain");
const heroCaregiver = document.getElementById("hero-caregiver");
const medicalQuestion = document.getElementById("medical-question");
const medicalAnalyzeButton = document.getElementById("medical-analyze-button");
const medicalRisk = document.getElementById("medical-risk");
const medicalAnswer = document.getElementById("medical-answer");
const knowledgeCards = document.getElementById("knowledge-cards");
const symptomButtons = document.querySelectorAll(".symptom-toggles button");

const meters = {
  stress: document.getElementById("stress-meter"),
  pain: document.getElementById("pain-meter"),
  fatigue: document.getElementById("fatigue-meter"),
  relax: document.getElementById("relax-meter")
};

const scores = {
  stress: document.getElementById("stress-score"),
  pain: document.getElementById("pain-score"),
  fatigue: document.getElementById("fatigue-score"),
  relax: document.getElementById("relax-score")
};

const medicalKnowledge = [
  {
    id: "cardiac",
    title: "Possible cardiac or breathing emergency",
    keywords: ["chest", "pressure", "squeezing", "crushing", "jaw", "left arm", "shortness", "breath", "sweating", "nausea", "dizzy"],
    urgency: "urgent",
    explanation: "Chest pressure with sweating, nausea, dizziness, racing heart, or shortness of breath can be a serious warning pattern.",
    caregiverSteps: [
      "Call emergency services now if chest pressure is sudden, severe, spreading, or paired with breathing trouble.",
      "Keep the person seated and still while help is contacted.",
      "Record symptom start time, wearable readings, medicines, and known heart or lung history."
    ]
  },
  {
    id: "stroke",
    title: "Possible stroke warning signs",
    keywords: ["stroke", "face", "droop", "one-sided", "weakness", "speech", "slurred", "confusion", "vision", "balance", "numbness"],
    urgency: "urgent",
    explanation: "Sudden face drooping, one-sided arm or leg weakness, speech trouble, vision change, severe dizziness, or confusion can indicate a time-sensitive neurologic emergency.",
    caregiverSteps: [
      "Call emergency services immediately for sudden neurologic changes.",
      "Note the exact time the person was last known well.",
      "Do not give food, drink, or medicines unless a clinician instructs you."
    ]
  },
  {
    id: "dehydration",
    title: "Possible dehydration or fluid need",
    keywords: ["water", "thirst", "dehydration", "dark urine", "dry mouth", "dizzy", "dizziness", "heat", "sweating", "low urine"],
    urgency: "watch",
    explanation: "Dry mouth, dark urine, dizziness, heat exposure, and fatigue can fit dehydration, especially when heart rate is elevated.",
    caregiverSteps: [
      "Offer small sips of water or an electrolyte drink if swallowing is safe.",
      "Check urine color, recent fluid intake, vomiting, diarrhea, fever, and heat exposure.",
      "Seek urgent help for confusion, fainting, very low urine output, or inability to keep fluids down."
    ]
  },
  {
    id: "infection",
    title: "Possible infection or fever-related distress",
    keywords: ["fever", "hot", "infection", "chills", "wound", "redness", "swelling", "confusion", "cough", "burning urine"],
    urgency: "watch",
    explanation: "Fever, chills, wound redness, cough, urinary symptoms, or new confusion can suggest infection and should be checked promptly.",
    caregiverSteps: [
      "Measure temperature with a thermometer and inspect any wounds or pressure areas.",
      "Contact a clinician if fever persists, symptoms worsen, or the person is medically fragile.",
      "Seek urgent care for confusion, breathing difficulty, blue lips, severe weakness, or very high fever."
    ]
  },
  {
    id: "pain",
    title: "Pain or physical discomfort pattern",
    keywords: ["pain", "hurt", "ache", "cramp", "spasm", "pressure sore", "uncomfortable", "worse", "severe"],
    urgency: "watch",
    explanation: "High muscle activity, elevated heart rate, sweating, and caregiver-observed discomfort can support a pain signal.",
    caregiverSteps: [
      "Ask yes/no questions or use the user's communication method to locate pain.",
      "Check posture, braces, skin pressure points, catheter lines, recent injury, and range of motion.",
      "Escalate quickly if pain is sudden, severe, worsening, associated with chest symptoms, or follows trauma."
    ]
  },
  {
    id: "stress",
    title: "Stress, anxiety, or overstimulation pattern",
    keywords: ["stress", "anxiety", "panic", "scared", "fear", "overwhelmed", "frightened", "tense"],
    urgency: "routine",
    explanation: "High GSR, elevated heart rate, low HRV, and a triggering environment can fit stress or anxiety.",
    caregiverSteps: [
      "Reduce noise, light, crowding, or other triggers if possible.",
      "Use calm reassurance and a familiar yes/no confirmation method.",
      "Check for hidden physical causes such as pain, thirst, toileting need, overheating, or medication timing."
    ]
  },
  {
    id: "fatigue",
    title: "Fatigue or recovery need",
    keywords: ["tired", "fatigue", "sleepy", "weak", "rest", "exhausted", "low energy"],
    urgency: "routine",
    explanation: "Low HRV, movement instability, and reduced muscle activity can fit fatigue or reduced comfort.",
    caregiverSteps: [
      "Offer rest, repositioning, hydration, and a quieter environment.",
      "Review sleep, recent activity, nutrition, medication timing, and illness symptoms.",
      "Contact a clinician if weakness is sudden, one-sided, paired with confusion, or unusually severe."
    ]
  }
];

const emergencyWords = [
  "chest pressure",
  "crushing",
  "shortness of breath",
  "difficulty breathing",
  "one-sided weakness",
  "slurred speech",
  "face droop",
  "fainting",
  "unconscious",
  "seizure",
  "blue lips",
  "severe confusion",
  "worst headache",
  "anaphylaxis"
];

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function normalize(value, min, max) {
  return clamp(((value - min) / (max - min)) * 100);
}

function getSensorValues() {
  return {
    hr: Number(inputs.hr.value),
    hrv: Number(inputs.hrv.value),
    gsr: Number(inputs.gsr.value),
    temp: Number(inputs.temp.value) / 10,
    emg: Number(inputs.emg.value),
    motion: Number(inputs.motion.value)
  };
}

function updateSensorLabels() {
  const values = getSensorValues();
  labels.hr.textContent = `${values.hr} bpm`;
  labels.hrv.textContent = `${values.hrv} ms`;
  labels.gsr.textContent = `${values.gsr}%`;
  labels.temp.textContent = `${values.temp.toFixed(1)} C`;
  labels.emg.textContent = `${values.emg}%`;
  labels.motion.textContent = `${values.motion}%`;
}

function calculateScores(values) {
  const highHr = normalize(values.hr, 55, 145);
  const lowHrv = 100 - normalize(values.hrv, 15, 95);
  const highTemp = normalize(values.temp, 33, 39.5);

  const stress = clamp(highHr * 0.28 + lowHrv * 0.33 + values.gsr * 0.28 + values.motion * 0.11);
  const pain = clamp(highHr * 0.22 + values.emg * 0.34 + highTemp * 0.24 + values.gsr * 0.2);
  const fatigue = clamp(lowHrv * 0.24 + values.motion * 0.26 + (100 - values.emg) * 0.18 + (100 - highHr) * 0.12 + values.gsr * 0.2);
  const relax = clamp((100 - stress) * 0.42 + normalize(values.hrv, 15, 95) * 0.34 + (100 - values.motion) * 0.24);

  return {
    stress: Math.round(stress),
    pain: Math.round(pain),
    fatigue: Math.round(fatigue),
    relax: Math.round(relax)
  };
}

function chooseMessage(result) {
  const ranked = Object.entries(result).sort((a, b) => b[1] - a[1]);
  const [topState, topScore] = ranked[0];

  if (topState === "pain" && topScore >= 62) {
    return {
      message: "I am in pain.",
      summary: "High muscle activity, elevated heart rate, and temperature changes suggest pain or physical discomfort."
    };
  }

  if (topState === "stress" && topScore >= 58) {
    return {
      message: "I feel stressed.",
      summary: "Elevated heart rate, low HRV, and high GSR suggest stress or discomfort."
    };
  }

  if (topState === "fatigue" && topScore >= 58) {
    return {
      message: "I am tired.",
      summary: "Low HRV with higher movement instability suggests fatigue and reduced comfort."
    };
  }

  if (topState === "relax" && topScore >= 55) {
    return {
      message: "I feel relaxed.",
      summary: "Stable heart rhythm, lower skin response, and calm motion patterns suggest comfort."
    };
  }

  return {
    message: "I feel uncomfortable.",
    summary: "Signals are mixed, so the agent recommends caregiver confirmation before taking action."
  };
}

function renderScores(result) {
  Object.entries(result).forEach(([key, value]) => {
    meters[key].value = value;
    scores[key].textContent = `${value}%`;
  });
}

function renderAgent() {
  updateSensorLabels();
  const values = getSensorValues();
  const result = calculateScores(values);
  const output = chooseMessage(result);
  const confidence = clamp(Math.max(result.stress, result.pain, result.fatigue, result.relax) + 7, 55, 96);

  renderScores(result);
  agentMessage.textContent = output.message;
  agentSummary.textContent = output.summary;
  agentConfidence.textContent = `Confidence ${confidence}%`;

  heroAlert.querySelector("strong").textContent = output.message;
  heroAlert.querySelector("p").textContent = `Confidence ${confidence}% from HRV, GSR, motion, temperature, and EMG fusion.`;
  heroHr.textContent = `${values.hr} bpm`;
  heroStress.textContent = `${result.stress}%`;
  heroPain.textContent = `${result.pain}%`;

  agentLog.innerHTML = `<p><strong>Agent:</strong> ${output.message} Suggested response: check comfort, confirm with the user, and notify a caregiver if the signal persists.</p>`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function scoreMedicalTopic(topic, text, result) {
  const keywordScore = topic.keywords.reduce((total, keyword) => {
    return text.includes(keyword) ? total + 18 : total;
  }, 0);

  const signalScore = {
    cardiac: result.stress > 70 || getSensorValues().hr > 110 ? 24 : 0,
    stroke: 0,
    dehydration: getSensorValues().hr > 96 && result.fatigue > 50 ? 18 : 0,
    infection: getSensorValues().temp >= 38 ? 24 : 0,
    pain: result.pain > 62 ? 24 : 0,
    stress: result.stress > 62 ? 24 : 0,
    fatigue: result.fatigue > 58 ? 24 : 0
  }[topic.id] || 0;

  return keywordScore + signalScore;
}

function analyzeMedicalQuestion() {
  const text = medicalQuestion.value.trim().toLowerCase();
  const values = getSensorValues();
  const signalResult = calculateScores(values);
  const output = chooseMessage(signalResult);

  const rankedTopics = medicalKnowledge
    .map((topic) => ({
      ...topic,
      score: scoreMedicalTopic(topic, text, signalResult)
    }))
    .sort((a, b) => b.score - a.score);

  const matches = rankedTopics.filter((topic) => topic.score > 0).slice(0, 3);
  const primary = matches[0] || medicalKnowledge.find((topic) => topic.id === "pain");
  const hasEmergencyWord = emergencyWords.some((word) => text.includes(word));
  const urgent = hasEmergencyWord || matches.some((topic) => topic.urgency === "urgent" && topic.score >= 30);
  const watch = !urgent && (primary.urgency === "watch" || signalResult.pain > 70 || signalResult.stress > 78);

  medicalRisk.classList.toggle("urgent", urgent);
  medicalRisk.classList.toggle("watch", watch);
  medicalRisk.textContent = urgent
    ? "Emergency warning: contact local emergency services now if these symptoms are present."
    : watch
      ? "Needs caregiver attention: confirm symptoms and consider clinician contact if persistent or worsening."
      : "Routine support: monitor, confirm comfort, and keep learning from caregiver feedback.";

  const topicList = matches.length ? matches : [primary];
  const caregiverSteps = topicList
    .flatMap((topic) => topic.caregiverSteps)
    .slice(0, 5)
    .map((step) => `<li>${escapeHtml(step)}</li>`)
    .join("");

  medicalAnswer.innerHTML = `
    <h4>${escapeHtml(primary.title)}</h4>
    <p>${escapeHtml(primary.explanation)}</p>
    <p><strong>Sensor interpretation:</strong> The current wearable pattern says "${escapeHtml(output.message)}" with stress ${signalResult.stress}%, pain ${signalResult.pain}%, fatigue ${signalResult.fatigue}%, and relaxation ${signalResult.relax}%.</p>
    <ul>${caregiverSteps}</ul>
  `;

  knowledgeCards.innerHTML = topicList
    .map((topic) => `
      <article>
        <span>${escapeHtml(topic.urgency === "urgent" ? "High priority" : topic.urgency === "watch" ? "Monitor closely" : "Supportive care")}</span>
        <strong>${escapeHtml(topic.title)}: ${escapeHtml(topic.explanation)}</strong>
      </article>
    `)
    .join("");

  agentLog.innerHTML = urgent
    ? "<p><strong>Medical Agent:</strong> Red flags detected. Treat this as urgent and contact emergency services if the observation is real.</p>"
    : `<p><strong>Medical Agent:</strong> ${escapeHtml(primary.title)} is the strongest match. Continue monitoring and confirm the user's needs through caregiver feedback.</p>`;
}

function loadProfile(profileKey) {
  const profile = profiles[profileKey];
  Object.entries(profile).forEach(([key, value]) => {
    if (inputs[key]) {
      inputs[key].value = value;
    }
  });

  profileName.textContent = profile.label;
  profileTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.profile === profileKey);
  });

  renderAgent();
}

profileTabs.forEach((tab) => {
  tab.addEventListener("click", () => loadProfile(tab.dataset.profile));
});

Object.values(inputs).forEach((input) => {
  input.addEventListener("input", renderAgent);
});

analyzeButton.addEventListener("click", () => {
  renderAgent();
  analyzeMedicalQuestion();
  analyzeButton.textContent = "Analysis Updated";
  window.setTimeout(() => {
    analyzeButton.textContent = "Analyze Signals";
  }, 1200);
});

symptomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    medicalQuestion.value = button.dataset.symptom;
    analyzeMedicalQuestion();
  });
});

medicalAnalyzeButton.addEventListener("click", analyzeMedicalQuestion);

heroCaregiver.addEventListener("click", () => {
  heroCaregiver.textContent = "Caregiver Alert Queued";
  agentLog.innerHTML = "<p><strong>Agent:</strong> Caregiver alert queued with current message, confidence, and recent sensor trend summary.</p>";
  window.setTimeout(() => {
    heroCaregiver.textContent = "Alert Caregiver";
  }, 1600);
});

loadProfile("stress");
analyzeMedicalQuestion();
