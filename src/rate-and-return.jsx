import { useState, useEffect } from "react";

const LEVELS = [
  {
    id: 1,
    title: "Les 3 Interprétations",
    subtitle: "Qu'est-ce qu'un taux d'intérêt ?",
    xp: 100,
    icon: "🎯",
    color: "#F59E0B",
    lesson: {
      intro: "Un taux d'intérêt reflète la relation entre des flux monétaires à différentes dates. Il peut être interprété de 3 façons différentes.",
      example: "Exemple : Tu prêtes 9 500 $ aujourd'hui et tu reçois 10 000 $ dans un an. La différence de 500 $ représente ta compensation. Le taux = 500 / 9 500 = 5,26%",
      concepts: [
        {
          id: "rrr",
          title: "Taux de rendement requis",
          emoji: "📈",
          description: "Le rendement MINIMUM qu'un investisseur exige pour accepter un investissement. C'est ton seuil en dessous duquel tu refuses d'investir.",
          analogy: "🏠 Analogie : Tu n'achètes une maison de location que si elle te rapporte au moins 5% par an. C'est ton taux requis."
        },
        {
          id: "dr",
          title: "Taux d'actualisation",
          emoji: "⏪",
          description: "Le taux utilisé pour ramener une valeur future à sa valeur aujourd'hui. 5,26% est le taux auquel 10 000$ dans 1 an = 9 500$ aujourd'hui.",
          analogy: "🎁 Analogie : Recevoir 100$ aujourd'hui vaut plus que 100$ dans 5 ans. Le taux d'actualisation mesure exactement combien de plus."
        },
        {
          id: "oc",
          title: "Coût d'opportunité",
          emoji: "🔄",
          description: "La valeur à laquelle tu renonces en choisissant une option plutôt qu'une autre. Si tu dépenses 9 500$ maintenant, tu renonces à gagner 5,26%.",
          analogy: "☕ Analogie : Dépenser 5$ en café chaque jour, c'est renoncer à ~1 825$/an investis à 5%. C'est le coût d'opportunité."
        }
      ]
    },
    questions: [
      {
        id: "q1",
        question: "Tu places 10 000$ dans un GIC à 4%. Le 4% représente le rendement minimum que tu exiges pour bloquer ton argent. C'est quelle interprétation ?",
        options: ["Taux d'actualisation", "Taux de rendement requis", "Coût d'opportunité", "Prime de liquidité"],
        correct: 1,
        explanation: "✅ Exact ! C'est le taux de rendement requis — le minimum que tu exiges pour accepter cet investissement."
      },
      {
        id: "q2",
        question: "Une entreprise utilisera 8% pour calculer la valeur aujourd'hui de ses flux futurs. Quel rôle joue ce 8% ?",
        options: ["Taux de rendement requis", "Coût d'opportunité", "Taux d'actualisation", "Prime de défaut"],
        correct: 2,
        explanation: "✅ Exact ! Le taux d'actualisation permet de ramener des flux futurs à leur valeur présente."
      },
      {
        id: "q3",
        question: "Tu dépenses 20 000$ en voyage plutôt que de les investir à 6%. Que représente ce 6% ?",
        options: ["Un taux d'actualisation", "Un taux de rendement requis", "Un coût d'opportunité", "Une prime d'inflation"],
        correct: 2,
        explanation: "✅ Exact ! En dépensant maintenant, tu renonces au 6% que tu aurais pu gagner. C'est le coût d'opportunité de ta consommation actuelle."
      }
    ]
  },
  {
    id: 2,
    title: "Les 5 Composantes",
    subtitle: "De quoi est fait un taux ?",
    xp: 150,
    icon: "🧩",
    color: "#10B981",
    lesson: {
      intro: "Tout taux d'intérêt peut être décomposé en 5 éléments. Chaque composante compense l'investisseur pour un risque spécifique.",
      formula: "r = Taux réel sans risque + Prime d'inflation + Prime de défaut + Prime de liquidité + Prime de maturité",
      concepts: [
        {
          id: "rfr",
          title: "Taux réel sans risque",
          emoji: "🏛️",
          description: "Le taux de base dans un monde sans inflation et sans risque. Il reflète la préférence des gens pour consommer maintenant plutôt que plus tard.",
          analogy: "🍎 Analogie : Si tu prêtes 10 pommes maintenant et veux 10,2 pommes dans un an (sans inflation), le 2% c'est ton taux réel sans risque."
        },
        {
          id: "inf",
          title: "Prime d'inflation",
          emoji: "📊",
          description: "Compensation pour la perte de pouvoir d'achat attendue. Si l'inflation est de 2%, 100$ dans 1 an vaut moins que 100$ aujourd'hui.",
          analogy: "🛒 Analogie : Si l'épicerie coûte 2% plus cher l'an prochain, tu veux 2% de plus sur ton prêt pour garder le même pouvoir d'achat."
        },
        {
          id: "def",
          title: "Prime de défaut",
          emoji: "⚠️",
          description: "Compensation pour le risque que l'emprunteur ne rembourse pas. Plus l'emprunteur est risqué, plus cette prime est élevée.",
          analogy: "🎰 Analogie : Prêter à un ami fiable vs à quelqu'un d'inconnu — tu demands plus d'intérêts à l'inconnu pour compenser le risque de non-remboursement."
        },
        {
          id: "liq",
          title: "Prime de liquidité",
          emoji: "💧",
          description: "Compensation pour ne pas pouvoir revendre facilement l'investissement. Les T-bills américains n'en ont pas (très liquides). Les petites obligations en ont.",
          analogy: "🏚️ Analogie : Un immeuble est difficile à revendre rapidement. Tu exiges donc plus de rendement qu'une action cotée en bourse (très liquide)."
        },
        {
          id: "mat",
          title: "Prime de maturité",
          emoji: "📅",
          description: "Compensation pour la durée plus longue. Plus le terme est long, plus la valeur de marché est sensible aux variations de taux — donc plus de compensation.",
          analogy: "🔒 Analogie : Prêter pour 30 ans est plus risqué que pour 1 an — beaucoup de choses peuvent changer. Tu exiges donc plus pour immobiliser ton argent longtemps."
        }
      ]
    },
    questions: [
      {
        id: "q4",
        question: "Deux obligations identiques, même durée, même émetteur — sauf que l'obligation A est facilement revendable et l'obligation B ne l'est pas. L'obligation B devrait offrir un taux plus élevé à cause de quelle prime ?",
        options: ["Prime de défaut", "Prime d'inflation", "Prime de liquidité", "Prime de maturité"],
        correct: 2,
        explanation: "✅ Exact ! La prime de liquidité compense l'investisseur pour le risque de ne pas pouvoir revendre facilement l'investissement."
      },
      {
        id: "q5",
        question: "Le gouvernement canadien émet un bon du Trésor à 90 jours à 3,5%. L'inflation prévue est de 2%. Quel est approximativement le taux réel sans risque ?",
        options: ["5,5%", "2%", "1,5%", "3,5%"],
        correct: 2,
        explanation: "✅ Exact ! Taux nominal ≈ Taux réel + Inflation → 3,5% ≈ Taux réel + 2% → Taux réel ≈ 1,5%"
      },
      {
        id: "q6",
        question: "Une obligation à 30 ans du gouvernement offre 4,5% et une à 2 ans offre 2,5%. Les deux ont la même liquidité et risque de défaut nul. La différence de 2% est principalement due à :",
        options: ["Prime de défaut", "Prime de maturité", "Prime de liquidité", "Prime d'inflation"],
        correct: 1,
        explanation: "✅ Exact ! À liquidité et risque de défaut égaux, la différence de taux entre une obligation longue et courte reflète la prime de maturité."
      }
    ]
  },
  {
    id: 3,
    title: "Boss Final",
    subtitle: "Applique tout ce que tu sais",
    xp: 300,
    icon: "👑",
    color: "#EF4444",
    lesson: null,
    questions: [
      {
        id: "q7",
        question: "Investment 1 : 2 ans, haute liquidité, faible risque de défaut → 2,0%. Investment 2 : 2 ans, faible liquidité, faible risque de défaut → 2,5%. Quelle est la prime de liquidité ?",
        options: ["0,5%", "2,0%", "2,5%", "1,0%"],
        correct: 0,
        explanation: "✅ Exact ! Les deux investissements sont identiques sauf la liquidité. La différence 2,5% - 2,0% = 0,5% est entièrement due à la prime de liquidité."
      },
      {
        id: "q8",
        question: "Investment 4 : 8 ans, haute liquidité, faible risque de défaut → 4,0%. Investment 5 : 8 ans, faible liquidité, FORT risque de défaut → 6,5%. La prime de liquidité étant 0,5%, quelle est la prime de défaut ?",
        options: ["2,5%", "2,0%", "1,5%", "6,5%"],
        correct: 1,
        explanation: "✅ Exact ! Diff totale = 6,5% - 4,0% = 2,5%. Dont 0,5% de liquidité. Donc prime de défaut = 2,5% - 0,5% = 2,0%."
      },
      {
        id: "q9",
        question: "Un investisseur choisit de dépenser 50 000$ en rénovations plutôt que d'investir. En faisant ce choix, il voit le 50 000$ comme ayant une valeur plus élevée maintenant qu'en l'investissant. Quel concept cela illustre-t-il ?",
        options: ["Taux d'actualisation seulement", "Prime de maturité", "Coût d'opportunité ET taux de rendement requis", "Prime de liquidité"],
        correct: 2,
        explanation: "✅ Exact ! Le rendement d'un investissement potentiel est à la fois le coût d'opportunité de la dépense ET le taux de rendement requis que l'investissement aurait dû dépasser pour être préféré."
      }
    ]
  }
];

export default function CFAApp() {
  const [screen, setScreen] = useState("home"); // home | lesson | quiz | result | complete
  const [currentLevel, setCurrentLevel] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState([0]);
  const [totalXP, setTotalXP] = useState(0);
  const [earnedXP, setEarnedXP] = useState({});
  const [quizState, setQuizState] = useState({ qIndex: 0, answers: [], showFeedback: false, selected: null });
  const [xpAnimation, setXpAnimation] = useState(false);
  const [lessonStep, setLessonStep] = useState(0);

  const level = LEVELS[currentLevel];

  const startLesson = (idx) => {
    setCurrentLevel(idx);
    setLessonStep(0);
    setScreen(LEVELS[idx].lesson ? "lesson" : "quiz");
    setQuizState({ qIndex: 0, answers: [], showFeedback: false, selected: null });
  };

  const startQuiz = () => {
    setQuizState({ qIndex: 0, answers: [], showFeedback: false, selected: null });
    setScreen("quiz");
  };

  const selectAnswer = (idx) => {
    if (quizState.showFeedback) return;
    setQuizState(s => ({ ...s, selected: idx, showFeedback: true }));
  };

  const nextQuestion = () => {
    const { qIndex, answers, selected } = quizState;
    const newAnswers = [...answers, selected];
    const nextQ = qIndex + 1;
    if (nextQ >= level.questions.length) {
      const correct = newAnswers.filter((a, i) => a === level.questions[i].correct).length;
      const ratio = correct / level.questions.length;
      const xp = Math.round(level.xp * ratio);
      const newEarned = { ...earnedXP, [level.id]: xp };
      setEarnedXP(newEarned);
      const newTotal = Object.values(newEarned).reduce((a, b) => a + b, 0);
      setTotalXP(newTotal);
      setXpAnimation(true);
      setTimeout(() => setXpAnimation(false), 1000);
      // Unlock next level
      const nextLevelIdx = currentLevel + 1;
      if (nextLevelIdx < LEVELS.length && !unlockedLevels.includes(nextLevelIdx)) {
        setUnlockedLevels(prev => [...prev, nextLevelIdx]);
      }
      setQuizState(s => ({ ...s, answers: newAnswers, showFeedback: false }));
      setScreen("result");
    } else {
      setQuizState({ qIndex: nextQ, answers: newAnswers, showFeedback: false, selected: null });
    }
  };

  const maxXP = LEVELS.reduce((a, l) => a + l.xp, 0);
  const xpPercent = Math.round((totalXP / maxXP) * 100);

  const styles = {
    app: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #1a1a2e, #16213e)",
      fontFamily: "'Georgia', serif",
      color: "#e2e8f0",
      padding: "0",
      position: "relative",
      overflow: "hidden"
    },
    grid: {
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
      pointerEvents: "none", zIndex: 0
    },
    content: { position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto", padding: "24px 16px" },
    header: {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      marginBottom: 32, padding: "16px 20px",
      background: "rgba(255,255,255,0.05)", borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.1)"
    },
    logo: { fontSize: 13, fontWeight: 700, letterSpacing: 4, color: "#94a3b8", textTransform: "uppercase" },
    xpBadge: {
      display: "flex", alignItems: "center", gap: 8,
      background: xpAnimation ? "rgba(245,158,11,0.3)" : "rgba(245,158,11,0.1)",
      border: "1px solid rgba(245,158,11,0.4)", borderRadius: 20,
      padding: "6px 14px", transition: "background 0.3s",
      transform: xpAnimation ? "scale(1.1)" : "scale(1)"
    },
    xpText: { fontSize: 15, fontWeight: 700, color: "#F59E0B" },
    progressBar: {
      height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden"
    },
    progressFill: {
      height: "100%", width: `${xpPercent}%`,
      background: "linear-gradient(90deg, #F59E0B, #EF4444)",
      borderRadius: 3, transition: "width 0.8s ease"
    },
    title: {
      fontSize: 32, fontWeight: 700, marginBottom: 8,
      background: "linear-gradient(135deg, #F59E0B, #fff)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
    },
    subtitle: { fontSize: 15, color: "#94a3b8", marginBottom: 32 },
    card: {
      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 20, padding: "24px", marginBottom: 16,
      transition: "all 0.2s", cursor: "pointer"
    },
    btn: (color = "#F59E0B") => ({
      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
      color: "#000", border: "none", borderRadius: 12,
      padding: "14px 28px", fontSize: 15, fontWeight: 700,
      cursor: "pointer", transition: "all 0.2s", width: "100%", marginTop: 16
    }),
    btnSecondary: {
      background: "rgba(255,255,255,0.1)", color: "#e2e8f0",
      border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12,
      padding: "12px 24px", fontSize: 14, fontWeight: 600,
      cursor: "pointer", marginTop: 12, width: "100%"
    },
    conceptCard: (color) => ({
      background: `rgba(${hexToRgb(color)}, 0.08)`,
      border: `1px solid rgba(${hexToRgb(color)}, 0.25)`,
      borderRadius: 16, padding: 20, marginBottom: 12
    }),
    optionBtn: (selected, correct, isCorrect, showFeedback) => {
      let bg = "rgba(255,255,255,0.05)";
      let border = "1px solid rgba(255,255,255,0.1)";
      if (showFeedback && selected) {
        bg = isCorrect ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)";
        border = `1px solid ${isCorrect ? "#10B981" : "#EF4444"}`;
      }
      return {
        background: bg, border, borderRadius: 12,
        padding: "14px 18px", marginBottom: 10, cursor: "pointer",
        textAlign: "left", color: "#e2e8f0", fontSize: 14, width: "100%",
        transition: "all 0.2s", fontFamily: "'Georgia', serif"
      };
    }
  };

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  }

  if (screen === "home") return (
    <div style={styles.app}>
      <div style={styles.grid} />
      <div style={styles.content}>
        <div style={styles.header}>
          <span style={styles.logo}>CFA Level I · M1</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, minWidth: 160 }}>
            <div style={styles.xpBadge}>
              <span>⚡</span>
              <span style={styles.xpText}>{totalXP} / {maxXP} XP</span>
            </div>
            <div style={{ ...styles.progressBar, width: 160 }}>
              <div style={styles.progressFill} />
            </div>
          </div>
        </div>

        <h1 style={styles.title}>Taux d'Intérêt</h1>
        <p style={styles.subtitle}>Maîtrise les concepts fondamentaux du CFA · 3 niveaux · {maxXP} XP</p>

        {LEVELS.map((lvl, idx) => {
          const unlocked = unlockedLevels.includes(idx);
          const done = earnedXP[lvl.id] !== undefined;
          const xp = earnedXP[lvl.id] || 0;
          return (
            <div
              key={lvl.id}
              style={{
                ...styles.card,
                opacity: unlocked ? 1 : 0.4,
                cursor: unlocked ? "pointer" : "not-allowed",
                borderColor: done ? `rgba(${hexToRgb(lvl.color)}, 0.5)` : "rgba(255,255,255,0.1)"
              }}
              onClick={() => unlocked && startLesson(idx)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ fontSize: 36 }}>{unlocked ? lvl.icon : "🔒"}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: lvl.color, textTransform: "uppercase", marginBottom: 4 }}>
                      Niveau {lvl.id}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>{lvl.title}</div>
                    <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>{lvl.subtitle}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: done ? lvl.color : "#475569" }}>
                    {done ? xp : lvl.xp} XP
                  </div>
                  {done && <div style={{ fontSize: 11, color: "#10B981" }}>✓ Complété</div>}
                </div>
              </div>
              {done && (
                <div style={{ marginTop: 12, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${(xp / lvl.xp) * 100}%`, background: lvl.color, borderRadius: 2 }} />
                </div>
              )}
            </div>
          );
        })}

        {Object.keys(earnedXP).length === LEVELS.length && (
          <div style={{ textAlign: "center", padding: 32, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 20, marginTop: 8 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#F59E0B" }}>Module complété !</div>
            <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 8 }}>Score final : {totalXP} / {maxXP} XP</div>
          </div>
        )}
      </div>
    </div>
  );

  if (screen === "lesson") {
    const concepts = level.lesson.concepts;
    const totalSteps = concepts.length + 1; // +1 for intro
    return (
      <div style={styles.app}>
        <div style={styles.grid} />
        <div style={styles.content}>
          <div style={{ display: "flex", gap: 8, marginBottom: 24, alignItems: "center" }}>
            <button style={{ ...styles.btnSecondary, width: "auto", marginTop: 0, padding: "8px 16px" }} onClick={() => setScreen("home")}>← Retour</button>
            <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${((lessonStep + 1) / totalSteps) * 100}%`, background: level.color, borderRadius: 2, transition: "width 0.4s" }} />
            </div>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{lessonStep + 1}/{totalSteps}</span>
          </div>

          <div style={{ marginBottom: 8, fontSize: 11, letterSpacing: 3, color: level.color, fontWeight: 700, textTransform: "uppercase" }}>
            {level.icon} Niveau {level.id} · Leçon
          </div>
          <h2 style={{ ...styles.title, fontSize: 26, marginBottom: 24 }}>{level.title}</h2>

          {lessonStep === 0 && (
            <div>
              <div style={{ ...styles.conceptCard(level.color), marginBottom: 20 }}>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "#e2e8f0", margin: 0 }}>{level.lesson.intro}</p>
              </div>
              {level.lesson.example && (
                <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#10B981", marginBottom: 8 }}>EXEMPLE CONCRET</div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#e2e8f0", margin: 0 }}>{level.lesson.example}</p>
                </div>
              )}
              {level.lesson.formula && (
                <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 16, padding: 20, marginBottom: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#F59E0B", marginBottom: 12 }}>LA FORMULE</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#F59E0B", lineHeight: 1.6 }}>{level.lesson.formula}</div>
                </div>
              )}
              <button style={styles.btn(level.color)} onClick={() => setLessonStep(1)}>
                Découvrir les concepts →
              </button>
            </div>
          )}

          {lessonStep > 0 && lessonStep <= concepts.length && (
            <div>
              {(() => {
                const c = concepts[lessonStep - 1];
                return (
                  <div style={styles.conceptCard(level.color)}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                      <span style={{ fontSize: 32 }}>{c.emoji}</span>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: level.color, marginBottom: 4 }}>
                          COMPOSANTE {lessonStep}/{concepts.length}
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 700 }}>{c.title}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "#cbd5e1", marginBottom: 16 }}>{c.description}</p>
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16 }}>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: "#94a3b8", margin: 0, fontStyle: "italic" }}>{c.analogy}</p>
                    </div>
                  </div>
                );
              })()}
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button style={{ ...styles.btnSecondary, marginTop: 0 }} onClick={() => setLessonStep(s => s - 1)}>← Précédent</button>
                {lessonStep < concepts.length
                  ? <button style={{ ...styles.btn(level.color), marginTop: 0 }} onClick={() => setLessonStep(s => s + 1)}>Suivant →</button>
                  : <button style={{ ...styles.btn(level.color), marginTop: 0 }} onClick={startQuiz}>Passer au quiz ⚡</button>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === "quiz") {
    const { qIndex, showFeedback, selected } = quizState;
    const q = level.questions[qIndex];
    const isCorrect = selected === q.correct;
    return (
      <div style={styles.app}>
        <div style={styles.grid} />
        <div style={styles.content}>
          <div style={{ display: "flex", gap: 8, marginBottom: 24, alignItems: "center" }}>
            <button style={{ ...styles.btnSecondary, width: "auto", marginTop: 0, padding: "8px 16px" }} onClick={() => setScreen(level.lesson ? "lesson" : "home")}>← Retour</button>
            <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${((qIndex + 1) / level.questions.length) * 100}%`, background: level.color, borderRadius: 2, transition: "width 0.4s" }} />
            </div>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>Q{qIndex + 1}/{level.questions.length}</span>
          </div>

          <div style={{ marginBottom: 8, fontSize: 11, letterSpacing: 3, color: level.color, fontWeight: 700, textTransform: "uppercase" }}>
            {level.icon} Niveau {level.id} · Quiz
          </div>
          <h2 style={{ ...styles.title, fontSize: 24, marginBottom: 28 }}>{q.question}</h2>

          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrectOpt = i === q.correct;
            let emoji = "";
            if (showFeedback && isSelected) emoji = isCorrect ? " ✅" : " ❌";
            if (showFeedback && !isSelected && isCorrectOpt) emoji = " ✅";
            return (
              <button
                key={i}
                style={styles.optionBtn(isSelected, isCorrectOpt, isCorrect, showFeedback)}
                onClick={() => selectAnswer(i)}
              >
                <span style={{ fontWeight: 600, color: level.color, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
                {opt}{emoji}
              </button>
            );
          })}

          {showFeedback && (
            <div style={{
              background: isCorrect ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
              border: `1px solid ${isCorrect ? "#10B981" : "#EF4444"}`,
              borderRadius: 14, padding: 16, marginTop: 8, marginBottom: 8
            }}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: isCorrect ? "#6ee7b7" : "#fca5a5" }}>
                {q.explanation}
              </p>
            </div>
          )}

          {showFeedback && (
            <button style={styles.btn(level.color)} onClick={nextQuestion}>
              {qIndex + 1 < level.questions.length ? "Question suivante →" : "Voir les résultats 🏆"}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (screen === "result") {
    const xp = earnedXP[level.id] || 0;
    const correct = level.questions.filter((q, i) => quizState.answers[i] === q.correct).length;
    const pct = Math.round((correct / level.questions.length) * 100);
    const nextIdx = currentLevel + 1;
    const hasNext = nextIdx < LEVELS.length;
    return (
      <div style={styles.app}>
        <div style={styles.grid} />
        <div style={styles.content}>
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>
              {pct === 100 ? "🏆" : pct >= 67 ? "⭐" : "📚"}
            </div>
            <h2 style={{ ...styles.title, fontSize: 28, textAlign: "center" }}>
              {pct === 100 ? "Parfait !" : pct >= 67 ? "Bien joué !" : "Continue !"}
            </h2>
            <div style={{ fontSize: 48, fontWeight: 700, color: level.color, marginBottom: 4 }}>+{xp} XP</div>
            <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 32 }}>
              {correct}/{level.questions.length} bonnes réponses · {pct}%
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 20, marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 8 }}>XP total</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#F59E0B" }}>{totalXP} / {maxXP}</div>
              <div style={{ ...styles.progressBar, marginTop: 12 }}>
                <div style={styles.progressFill} />
              </div>
            </div>
            {hasNext && (
              <button style={styles.btn(LEVELS[nextIdx].color)} onClick={() => startLesson(nextIdx)}>
                Niveau {nextIdx + 1} : {LEVELS[nextIdx].title} →
              </button>
            )}
            <button style={styles.btnSecondary} onClick={() => setScreen("home")}>
              ← Tableau de bord
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}