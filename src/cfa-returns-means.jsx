import { useState, useEffect, useCallback } from "react";

const ALL_QUESTIONS = [
  // ─── SECTION 1: INTERPRETING INTEREST RATES ───
  {
    id: 1, section: "Rates",
    q: "An interest rate is BEST described as which of the following?",
    opts: ["The minimum return required to accept an investment", "A rate that reflects the relationship between differently dated cash flows", "The cost of borrowing money from a financial institution"],
    correct: 1,
    exp: "An interest rate reflects the relationship between differently dated cash flows. It can be interpreted as a required rate of return, a discount rate, or an opportunity cost — all of which involve differently dated cash flows."
  },
  {
    id: 2, section: "Rates",
    q: "An investor requires a minimum of 6% return before investing in any asset. This 6% is MOST likely described as a:",
    opts: ["Discount rate", "Required rate of return", "Opportunity cost"],
    correct: 1,
    exp: "The required rate of return is the minimum return an investor must receive to accept an investment. The investor's 6% threshold is exactly this."
  },
  {
    id: 3, section: "Rates",
    q: "A firm uses 8% to convert future cash flows to their present value. The 8% is BEST described as a:",
    opts: ["Required rate of return", "Opportunity cost", "Discount rate"],
    correct: 2,
    exp: "The discount rate is used to convert future cash flows to their present value today. The firm is using 8% for this exact purpose."
  },
  {
    id: 4, section: "Rates",
    q: "An investor spends $50,000 on a vacation instead of investing it at 7%. The 7% foregone return is MOST accurately described as a(n):",
    opts: ["Discount rate", "Required rate of return", "Opportunity cost"],
    correct: 2,
    exp: "The opportunity cost is the value an investor forgoes by choosing one course of action over another. By spending rather than investing, the investor foregoes the 7% return."
  },
  {
    id: 5, section: "Rates",
    q: "If $9,500 today is equivalent in value to $10,000 in one year, the interest rate is closest to:",
    opts: ["4.76%", "5.26%", "5.56%"],
    correct: 1,
    exp: "Interest rate = ($10,000 − $9,500) / $9,500 = $500 / $9,500 = 5.26%. The rate is calculated on the present value (denominator), not the future value."
  },
  {
    id: 6, section: "Rates",
    q: "Using a 5.26% discount rate, the present value of $10,000 received in one year is closest to:",
    opts: ["$9,000", "$9,500", "$10,526"],
    correct: 1,
    exp: "PV = $10,000 / (1 + 0.0526) = $10,000 / 1.0526 = $9,500. The discount rate converts the future value back to today's equivalent."
  },
  {
    id: 7, section: "Rates",
    q: "The same 5.26% interest rate can simultaneously be interpreted as all of the following EXCEPT a:",
    opts: ["Required rate of return", "Discount rate", "Nominal risk-free rate"],
    correct: 2,
    exp: "A single interest rate can be interpreted as a required rate of return, discount rate, OR opportunity cost — these are three views of the same rate. It is NOT automatically a nominal risk-free rate, which requires specific conditions."
  },
  // ─── SECTION 2: COMPONENTS OF INTEREST RATES ───
  {
    id: 8, section: "Components",
    q: "The nominal risk-free rate is BEST described as the sum of the real risk-free rate and a premium for:",
    opts: ["Default risk", "Expected inflation", "Maturity risk"],
    correct: 1,
    exp: "Nominal risk-free rate ≈ Real risk-free rate + Inflation premium. The nominal rate includes compensation for expected inflation but excludes default, liquidity, and maturity premiums."
  },
  {
    id: 9, section: "Components",
    q: "The real risk-free interest rate is MOST accurately described as the interest rate for a completely risk-free security assuming:",
    opts: ["No default risk and no liquidity risk", "No inflation is expected", "No maturity premium is required"],
    correct: 1,
    exp: "The real risk-free rate is the rate for a completely risk-free security IF NO INFLATION WERE EXPECTED. It reflects only time preferences for current vs. future consumption."
  },
  {
    id: 10, section: "Components",
    q: "A Canadian T-bill with 90 days to maturity yields 3.5%. If expected inflation is 2%, the real risk-free rate is closest to:",
    opts: ["1.5%", "2.0%", "5.5%"],
    correct: 0,
    exp: "Nominal ≈ Real risk-free + Inflation → 3.5% ≈ Real + 2% → Real ≈ 1.5%. The T-bill rate represents the nominal risk-free rate; subtracting inflation gives the real rate."
  },
  {
    id: 11, section: "Components",
    q: "Investment A: 2-year maturity, high liquidity, low default risk → 2.0%. Investment B: 2-year maturity, LOW liquidity, low default risk → 2.5%. The difference of 0.5% MOST likely represents:",
    opts: ["A maturity premium", "A default risk premium", "A liquidity premium"],
    correct: 2,
    exp: "Both investments are identical except for liquidity. The 0.5% difference therefore represents the liquidity premium — compensation for the difficulty of selling Investment B quickly."
  },
  {
    id: 12, section: "Components",
    q: "Investment C: 8-year maturity, high liquidity, LOW default risk → 4.0%. Investment D: 8-year maturity, low liquidity, HIGH default risk → 6.5%. Given a liquidity premium of 0.5%, the default risk premium is closest to:",
    opts: ["1.5%", "2.0%", "2.5%"],
    correct: 1,
    exp: "Difference = 6.5% − 4.0% = 2.5%. Of this, 0.5% is the liquidity premium. Therefore default risk premium = 2.5% − 0.5% = 2.0%."
  },
  {
    id: 13, section: "Components",
    q: "A 30-year government bond yields more than a 2-year government bond of the same issuer. This difference MOST likely reflects a:",
    opts: ["Default risk premium", "Liquidity premium", "Maturity premium"],
    correct: 2,
    exp: "Same issuer means same default and liquidity risk. The yield difference between long and short government bonds of the same issuer reflects the maturity premium — compensation for greater sensitivity to interest rate changes."
  },
  {
    id: 14, section: "Components",
    q: "Which of the following risk premiums compensates investors for the possibility of not being repaid?",
    opts: ["Liquidity premium", "Default risk premium", "Maturity premium"],
    correct: 1,
    exp: "The default risk premium compensates investors for the possibility that the borrower will fail to make promised payments at the contracted time and amount."
  },
  {
    id: 15, section: "Components",
    q: "An investor holds a bond issued by a small, thinly traded company. The extra yield above a similar government bond MOST likely includes all of the following EXCEPT a:",
    opts: ["Default risk premium", "Liquidity premium", "Inflation premium"],
    correct: 2,
    exp: "Both the corporate bond and the government bond have the same inflation premium (inflation affects all bonds equally). The corporate bond's extra yield reflects default risk and liquidity risk premiums."
  },
  // ─── SECTION 3: ARITHMETIC MEAN ───
  {
    id: 16, section: "Arithmetic",
    q: "A fund reports annual returns of +15%, −5%, +10%, +20%, and 0% over five years. The arithmetic mean return is closest to:",
    opts: ["7%", "8%", "9%"],
    correct: 1,
    exp: "Arithmetic mean = (15 + (−5) + 10 + 20 + 0) / 5 = 40 / 5 = 8%. Simple sum divided by number of periods."
  },
  {
    id: 17, section: "Arithmetic",
    q: "The arithmetic mean return is MOST appropriate for estimating the average return over:",
    opts: ["Multiple future periods with compounding", "A single future period", "Historical compound growth"],
    correct: 1,
    exp: "The arithmetic mean is the best estimate for the expected return over a SINGLE future period. For multiple periods with compounding, the geometric mean is more appropriate."
  },
  {
    id: 18, section: "Arithmetic",
    q: "A stock returns +100% in Year 1 and −50% in Year 2. The arithmetic mean return is 25%, but an investor who invested $1,000 ends up with:",
    opts: ["$1,250 (a gain)", "$1,000 (breakeven)", "$750 (a loss)"],
    correct: 1,
    exp: "$1,000 × 1.10 × 0.50 = $1,000. The investor breaks even despite the 25% arithmetic mean — this illustrates why arithmetic mean overstates true compound performance."
  },
  {
    id: 19, section: "Arithmetic",
    q: "Which statement regarding the arithmetic mean return is MOST accurate?",
    opts: ["It is always equal to the geometric mean return", "It equals or exceeds the geometric mean return", "It is always less than the geometric mean return"],
    correct: 1,
    exp: "The arithmetic mean is always ≥ geometric mean. They are equal only when all returns in the series are identical (zero variance)."
  },
  // ─── SECTION 4: GEOMETRIC MEAN ───
  {
    id: 20, section: "Geometric",
    q: "A portfolio has annual returns of +50%, −50%, and +10% over three years. The geometric mean return is closest to:",
    opts: ["−5.0%", "−3.5%", "3.3%"],
    correct: 1,
    exp: "RG = (1.50 × 0.50 × 1.10)^(1/3) − 1 = (0.825)^(1/3) − 1 = 0.9648 − 1 = −3.52%. The geometric mean captures the true compound growth rate."
  },
  {
    id: 21, section: "Geometric",
    q: "The geometric mean return is BEST described as:",
    opts: ["The average of one-period returns", "The compound rate of growth over multiple periods", "The return adjusted for the timing of cash flows"],
    correct: 1,
    exp: "The geometric mean represents the compound rate of growth — the single rate that, if applied each period, gives the same ending value as the actual returns."
  },
  {
    id: 22, section: "Geometric",
    q: "An investor had $1 that grew to $1.35 over 3 years. The geometric mean annual return is closest to:",
    opts: ["11.7%", "10.7%", "9.5%"],
    correct: 1,
    exp: "RG = (1.35)^(1/3) − 1 = 1.1050 − 1 = 10.50% ≈ 10.7%. The 1/T power finds the equivalent annual rate that produces the same 3-year growth."
  },
  {
    id: 23, section: "Geometric",
    q: "When returns have non-zero variance, which of the following relationships is MOST accurate?",
    opts: ["Geometric mean > Arithmetic mean", "Geometric mean = Arithmetic mean", "Geometric mean < Arithmetic mean"],
    correct: 2,
    exp: "With non-zero variance, the geometric mean is always LESS than the arithmetic mean. The greater the variance, the larger the difference between the two."
  },
  {
    id: 24, section: "Geometric",
    q: "Which mean is MOST appropriate when an investor wants to know the actual ending value of a multi-period investment?",
    opts: ["Arithmetic mean", "Geometric mean", "Harmonic mean"],
    correct: 1,
    exp: "The geometric mean is the appropriate measure for multi-period compound growth. It gives the single rate that, compounded over T periods, produces the actual ending portfolio value."
  },
  // ─── SECTION 5: HARMONIC MEAN ───
  {
    id: 25, section: "Harmonic",
    q: "An investor buys $1,000 worth of stock each month for 2 months at prices of $10 and $15. The average price paid per share is BEST represented by the:",
    opts: ["Arithmetic mean of $12.50", "Geometric mean of $12.25", "Harmonic mean of $12.00"],
    correct: 2,
    exp: "With a fixed dollar amount invested at variable prices (cost averaging), the harmonic mean gives the true average price per share. Month 1: 100 shares, Month 2: 66.67 shares. Avg price = $2,000/166.67 = $12 = harmonic mean."
  },
  {
    id: 26, section: "Harmonic",
    q: "The harmonic mean is MOST appropriate when averaging:",
    opts: ["Compound returns over multiple periods", "Rates or ratios applied to a fixed quantity", "Returns that include extreme outliers"],
    correct: 1,
    exp: "The harmonic mean is appropriate for averaging rates and ratios (like P/E ratios or prices) when a fixed quantity is involved. It gives less weight to larger values."
  },
  {
    id: 27, section: "Harmonic",
    q: "Three companies have P/E ratios of 45, 15, and 15. The harmonic mean P/E is closest to:",
    opts: ["19.3", "25.0", "21.2"],
    correct: 0,
    exp: "Harmonic mean = 3 / (1/45 + 1/15 + 1/15) = 3 / (0.0222 + 0.0667 + 0.0667) = 3 / 0.1556 = 19.3. The harmonic mean reduces the influence of the outlier (45)."
  },
  {
    id: 28, section: "Harmonic",
    q: "Which of the following relationships is always true (assuming non-zero variance)?",
    opts: ["Harmonic mean ≥ Geometric mean ≥ Arithmetic mean", "Arithmetic mean ≥ Geometric mean ≥ Harmonic mean", "Geometric mean ≥ Arithmetic mean ≥ Harmonic mean"],
    correct: 1,
    exp: "The correct order is: Arithmetic ≥ Geometric ≥ Harmonic. Also, Arithmetic × Harmonic = (Geometric)². They are equal only when all values are identical."
  },
  // ─── SECTION 6: MONEY-WEIGHTED RETURN ───
  {
    id: 29, section: "MWR",
    q: "The money-weighted rate of return (MWR) is BEST described as the:",
    opts: ["Geometric mean of sub-period returns", "Internal rate of return on all portfolio cash flows", "Time-weighted average of holding period returns"],
    correct: 1,
    exp: "The MWR is the IRR of all cash flows — it finds the rate that equates the present value of all cash inflows to the present value of all cash outflows."
  },
  {
    id: 30, section: "MWR",
    q: "An investor deposits $10,000 at the start of Year 1 and $5,000 at the start of Year 2, then withdraws $18,000 at the end of Year 2. The MWR is MOST likely calculated by:",
    opts: ["Averaging the returns of Year 1 and Year 2", "Finding the IRR that equates PV of inflows to PV of outflows", "Compounding the geometric mean of annual returns"],
    correct: 1,
    exp: "MWR = IRR: Find r such that $10,000 + $5,000/(1+r) = $18,000/(1+r)². This is solved with a financial calculator, not by simple averaging."
  },
  {
    id: 31, section: "MWR",
    q: "A fund returns +15% in Year 1 and −4% in Year 2. An investor deposits $1,000 initially and $45,000 more at the start of Year 2. The MWR is MOST likely:",
    opts: ["Positive, approximately equal to TWR", "Negative, due to the large deposit before the loss", "Equal to the arithmetic mean of 5.5%"],
    correct: 1,
    exp: "The large $45,000 deposit was made just before the −4% loss year. This means most of the capital experienced the loss. The MWR will be negative, reflecting the poor timing of the investor's large deposit."
  },
  {
    id: 32, section: "MWR",
    q: "Which of the following is the primary disadvantage of using MWR to evaluate a portfolio manager's performance?",
    opts: ["It does not account for compounding", "It is affected by the timing of client deposits and withdrawals", "It cannot be used when there are multiple cash flows"],
    correct: 1,
    exp: "The MWR is heavily influenced by the timing and size of cash flows, which are controlled by the INVESTOR, not the manager. This makes it unfair for evaluating manager skill."
  },
  // ─── SECTION 7: TIME-WEIGHTED RETURN ───
  {
    id: 33, section: "TWR",
    q: "The time-weighted rate of return (TWR) is MOST appropriate for evaluating the performance of:",
    opts: ["Individual investors who control their own cash flows", "Portfolio managers who do not control client cash flows", "Portfolios with no external cash flows"],
    correct: 1,
    exp: "TWR eliminates the impact of the timing and size of cash flows, which managers cannot control. It measures the pure investment skill of the manager."
  },
  {
    id: 34, section: "TWR",
    q: "A portfolio earns +20% in the first half of the year and −10% in the second half. The TWR for the year is closest to:",
    opts: ["5.0%", "8.0%", "10.0%"],
    correct: 1,
    exp: "TWR = (1.20 × 0.90)^(1/2) × ... wait, for the full year: TWR = (1.20)(0.90) − 1 = 1.08 − 1 = 8%. Note: no exponent needed here as this covers exactly one year."
  },
  {
    id: 35, section: "TWR",
    q: "To calculate the TWR, a portfolio manager must calculate the return for each sub-period between:",
    opts: ["Market open and market close each day", "Each external cash flow (deposit or withdrawal)", "Each calendar quarter"],
    correct: 1,
    exp: "TWR requires calculating the holding period return between each external cash flow. This eliminates the impact of investor deposits and withdrawals on the performance measure."
  },
  {
    id: 36, section: "TWR",
    q: "Which statement BEST describes the relationship between TWR and the geometric mean?",
    opts: ["TWR is the arithmetic mean of sub-period returns", "TWR is the geometric mean of sub-period returns", "TWR and geometric mean are unrelated concepts"],
    correct: 1,
    exp: "TWR IS the geometric mean of the sub-period returns (where sub-periods are defined by external cash flows). This is why TWR captures compound growth independent of cash flow timing."
  },
  {
    id: 37, section: "TWR",
    q: "A client deposits a large sum into a portfolio just before a period of poor performance. Compared to TWR, the MWR will MOST likely be:",
    opts: ["Higher than TWR", "Lower than TWR", "Equal to TWR"],
    correct: 1,
    exp: "When large deposits precede poor performance, the MWR is pulled DOWN (the large capital suffers the loss). TWR is unaffected by cash flow timing. Therefore MWR < TWR in this scenario."
  },
  {
    id: 38, section: "TWR",
    q: "Which return measure over a 3-year period would be NEGATIVE if most assets under management were added just before a losing year?",
    opts: ["Geometric mean return", "Time-weighted rate of return", "Money-weighted rate of return"],
    correct: 2,
    exp: "The MWR is sensitive to cash flow timing. If a large amount is invested before a losing year, the MWR can be negative even if the TWR is positive (since TWR is unaffected by the size of flows)."
  },
  // ─── SECTION 8: CHOOSING THE RIGHT MEASURE ───
  {
    id: 39, section: "Choosing",
    q: "A portfolio manager invests €5,000 annually in a security for 4 years at prices of €62, €76, €84, and €90. The average price is BEST represented as the:",
    opts: ["Arithmetic mean of €78.00", "Harmonic mean of €76.48", "Geometric mean of €77.26"],
    correct: 1,
    exp: "Fixed dollar amount invested at variable prices → harmonic mean. The harmonic mean (€76.48) gives the true average price per unit purchased through cost averaging."
  },
  {
    id: 40, section: "Choosing",
    q: "Which mean should be used to estimate the compound annual growth rate of a portfolio over the past 10 years?",
    opts: ["Arithmetic mean", "Geometric mean", "Harmonic mean"],
    correct: 1,
    exp: "The geometric mean represents the compound rate of growth. For historical multi-period analysis where compounding occurs, the geometric mean is always the correct choice."
  },
  {
    id: 41, section: "Choosing",
    q: "An analyst wants to compare two portfolio managers fairly, knowing their clients made different deposit and withdrawal decisions. The MOST appropriate return measure is:",
    opts: ["Money-weighted return for both", "Time-weighted return for both", "Arithmetic mean for both"],
    correct: 1,
    exp: "TWR eliminates the impact of client-driven cash flows, making it the only fair basis for comparing two managers whose clients behaved differently."
  },
  {
    id: 42, section: "Choosing",
    q: "The geometric mean return is MOST accurately described as being less than or equal to the arithmetic mean return. This difference increases as:",
    opts: ["The number of periods increases", "The variability of returns increases", "The average return increases"],
    correct: 1,
    exp: "The greater the variance (variability) in returns, the larger the gap between arithmetic and geometric mean. With zero variance (identical returns), the two are equal."
  },
  {
    id: 43, section: "Choosing",
    q: "Which of the following BEST describes when to use arithmetic mean vs geometric mean for forecasting?",
    opts: ["Arithmetic for multi-period; geometric for single period", "Arithmetic for single period; geometric for multi-period", "Both give the same result for forecasting purposes"],
    correct: 1,
    exp: "Arithmetic mean = best estimate for ONE future period. Geometric mean = best estimate for MULTIPLE future periods with compounding. This is a key distinction in the CFA curriculum."
  }
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SECTIONS = ["All", "Rates", "Components", "Arithmetic", "Geometric", "Harmonic", "MWR", "TWR", "Choosing"];
const SECTION_LABELS = {
  "All": "All Topics",
  "Rates": "Interpreting Rates",
  "Components": "Rate Components",
  "Arithmetic": "Arithmetic Mean",
  "Geometric": "Geometric Mean",
  "Harmonic": "Harmonic Mean",
  "MWR": "Money-Weighted Return",
  "TWR": "Time-Weighted Return",
  "Choosing": "Choosing the Right Measure"
};

const TIMER_SECONDS = 90;

export default function CFAQuiz() {
  const [mode, setMode] = useState("menu"); // menu | quiz | results
  const [selectedSection, setSelectedSection] = useState("All");
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFb, setShowFb] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [timerActive, setTimerActive] = useState(false);

  const startQuiz = useCallback((section) => {
    const pool = section === "All" ? ALL_QUESTIONS : ALL_QUESTIONS.filter(q => q.section === section);
    setQuestions(shuffle(pool));
    setQIdx(0);
    setSelected(null);
    setShowFb(false);
    setAnswers([]);
    setTimer(TIMER_SECONDS);
    setTimerActive(true);
    setMode("quiz");
  }, []);

  useEffect(() => {
    if (!timerActive || showFb) return;
    if (timer <= 0) {
      setShowFb(true);
      setTimerActive(false);
      return;
    }
    const t = setTimeout(() => setTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, timerActive, showFb]);

  const selectAnswer = (idx) => {
    if (showFb) return;
    setSelected(idx);
    setShowFb(true);
    setTimerActive(false);
  };

  const next = () => {
    const newAnswers = [...answers, { selected, correct: questions[qIdx].correct, time: TIMER_SECONDS - timer }];
    if (qIdx + 1 >= questions.length) {
      setAnswers(newAnswers);
      setMode("results");
    } else {
      setAnswers(newAnswers);
      setQIdx(i => i + 1);
      setSelected(null);
      setShowFb(false);
      setTimer(TIMER_SECONDS);
      setTimerActive(true);
    }
  };

  const q = questions[qIdx];
  const correctCount = answers.filter(a => a.selected === a.correct).length;
  const pct = questions.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;

  const timerColor = timer > 60 ? "#10B981" : timer > 30 ? "#F59E0B" : "#EF4444";
  const timerPct = (timer / TIMER_SECONDS) * 100;

  const S = {
    app: { minHeight: "100vh", background: "#0f1117", fontFamily: "'Georgia', serif", color: "#e2e8f0", padding: "0 0 40px" },
    wrap: { maxWidth: 640, margin: "0 auto", padding: "0 16px" },
    header: { background: "#161b27", borderBottom: "1px solid #1e2535", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 0, position: "sticky", top: 0, zIndex: 10 },
    logo: { fontSize: 11, fontWeight: 700, letterSpacing: 4, color: "#3B82F6", textTransform: "uppercase" },
    pill: (active) => ({ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", background: active ? "#3B82F6" : "#1e2535", color: active ? "#fff" : "#64748b", transition: "all 0.2s" }),
    card: { background: "#161b27", border: "1px solid #1e2535", borderRadius: 16, padding: "20px", marginBottom: 12, cursor: "pointer", transition: "all 0.2s" },
    btn: (color = "#3B82F6") => ({ background: color, color: "#fff", border: "none", borderRadius: 10, padding: "13px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%", marginTop: 12, fontFamily: "inherit" }),
    optBtn: (sel, fb, isCorr) => {
      let bg = "#1a2035", border = "1px solid #1e2535";
      if (fb && sel) { bg = isCorr ? "#0d2e1f" : "#2e0d0d"; border = `1px solid ${isCorr ? "#10B981" : "#EF4444"}`; }
      if (fb && !sel && isCorr) { bg = "#0d2e1f"; border = "1px solid #10B981"; }
      return { background: bg, border, borderRadius: 10, padding: "13px 16px", marginBottom: 8, cursor: "pointer", textAlign: "left", color: "#e2e8f0", fontSize: 13, width: "100%", fontFamily: "inherit", lineHeight: 1.5, transition: "all 0.2s" };
    },
    tag: (color) => ({ background: `${color}22`, border: `1px solid ${color}55`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, color, letterSpacing: 1 })
  };

  const sectionColors = { Rates: "#3B82F6", Components: "#8B5CF6", Arithmetic: "#F59E0B", Geometric: "#10B981", Harmonic: "#EC4899", MWR: "#EF4444", TWR: "#06B6D4", Choosing: "#84CC16" };

  if (mode === "menu") return (
    <div style={S.app}>
      <div style={S.header}>
        <span style={S.logo}>CFA Level I · Practice</span>
        <span style={{ fontSize: 12, color: "#64748b" }}>{ALL_QUESTIONS.length} questions</span>
      </div>
      <div style={{ ...S.wrap, paddingTop: 28 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, background: "linear-gradient(135deg, #60A5FA, #fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>Rates & Returns</h1>
          <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>Exam-style practice · 3 choices per question · 90 sec timer · Questions aléatoires</p>
        </div>

        {/* Full exam */}
        <div style={{ ...S.card, background: "linear-gradient(135deg, #1a2535, #0f1825)", border: "1px solid #3B82F666" }} onClick={() => startQuiz("All")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>🎯 Full Practice Exam</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>{ALL_QUESTIONS.length} questions · Tous les sujets mélangés</div>
            </div>
            <div style={{ fontSize: 28 }}>→</div>
          </div>
        </div>

        {/* By section */}
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#475569", textTransform: "uppercase", margin: "20px 0 10px" }}>Par Section</div>
        {SECTIONS.filter(s => s !== "All").map(section => {
          const count = ALL_QUESTIONS.filter(q => q.section === section).length;
          const color = sectionColors[section] || "#3B82F6";
          return (
            <div key={section} style={S.card} onClick={() => startQuiz(section)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{SECTION_LABELS[section]}</div>
                  <div style={S.tag(color)}>{count} QUESTIONS</div>
                </div>
                <div style={{ fontSize: 22, color: "#334155" }}>→</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (mode === "quiz" && q) {
    const isCorr = selected === q.correct;
    const color = sectionColors[q.section] || "#3B82F6";
    return (
      <div style={S.app}>
        <div style={S.header}>
          <span style={S.logo}>Q{qIdx + 1} / {questions.length}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 100, height: 4, background: "#1e2535", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${((qIdx) / questions.length) * 100}%`, background: "#3B82F6", borderRadius: 2, transition: "width 0.4s" }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: timerColor, minWidth: 32 }}>{timer}s</div>
          </div>
        </div>

        {/* Timer bar */}
        <div style={{ height: 3, background: "#1e2535" }}>
          <div style={{ height: "100%", width: `${timerPct}%`, background: timerColor, transition: "width 1s linear" }} />
        </div>

        <div style={{ ...S.wrap, paddingTop: 20 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
            <span style={S.tag(color)}>{SECTION_LABELS[q.section]}</span>
          </div>

          <p style={{ fontSize: 16, lineHeight: 1.7, fontWeight: 600, color: "#f1f5f9", marginBottom: 24 }}>{q.q}</p>

          {q.opts.map((opt, i) => {
            const isSel = selected === i;
            const isC = i === q.correct;
            let suffix = "";
            if (showFb && isSel) suffix = isCorr ? " ✅" : " ❌";
            if (showFb && !isSel && isC) suffix = " ✅";
            return (
              <button key={i} style={S.optBtn(isSel, showFb, isCorr)} onClick={() => selectAnswer(i)}>
                <span style={{ fontWeight: 700, color, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
                {opt}{suffix}
              </button>
            );
          })}

          {showFb && (
            <div style={{ background: isCorr ? "#0d2e1f" : "#2e0d0d", border: `1px solid ${isCorr ? "#10B981" : "#EF4444"}`, borderRadius: 12, padding: "14px 16px", margin: "12px 0" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: isCorr ? "#10B981" : "#EF4444", marginBottom: 6 }}>
                {isCorr ? "✓ CORRECT" : "✗ INCORRECT"}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: isCorr ? "#6ee7b7" : "#fca5a5" }}>{q.exp}</p>
            </div>
          )}

          {timer === 0 && !showFb && (
            <div style={{ background: "#2e1f0d", border: "1px solid #F59E0B", borderRadius: 12, padding: "12px 16px", marginBottom: 12 }}>
              <p style={{ margin: 0, fontSize: 13, color: "#fcd34d" }}>⏱ Temps écoulé ! La bonne réponse est <strong>{String.fromCharCode(65 + q.correct)}</strong>.</p>
            </div>
          )}

          {showFb && <button style={S.btn(color)} onClick={next}>{qIdx + 1 < questions.length ? "Next Question →" : "See Results 🏆"}</button>}
        </div>
      </div>
    );
  }

  if (mode === "results") {
    const bySection = {};
    answers.forEach((a, i) => {
      const sec = questions[i].section;
      if (!bySection[sec]) bySection[sec] = { correct: 0, total: 0 };
      bySection[sec].total++;
      if (a.selected === a.correct) bySection[sec].correct++;
    });
    const avgTime = Math.round(answers.reduce((s, a) => s + a.time, 0) / answers.length);

    return (
      <div style={S.app}>
        <div style={S.header}>
          <span style={S.logo}>Results</span>
          <span style={{ fontSize: 12, color: "#64748b" }}>{correctCount}/{answers.length} correct</span>
        </div>
        <div style={{ ...S.wrap, paddingTop: 28 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 56, marginBottom: 10 }}>{pct >= 70 ? "🏆" : pct >= 50 ? "⭐" : "📚"}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: pct >= 70 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444" }}>{pct}%</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>{correctCount} / {answers.length} · Avg {avgTime}s per question</div>
            <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>{pct >= 70 ? "Above passing threshold ✓" : "CFA passing ~70% — keep practicing!"}</div>
          </div>

          {/* By section breakdown */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#475569", textTransform: "uppercase", marginBottom: 12 }}>Performance by Section</div>
          {Object.entries(bySection).map(([sec, data]) => {
            const p = Math.round((data.correct / data.total) * 100);
            const color = sectionColors[sec] || "#3B82F6";
            return (
              <div key={sec} style={{ ...S.card, cursor: "default", padding: "14px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{SECTION_LABELS[sec]}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: p >= 70 ? "#10B981" : "#EF4444" }}>{data.correct}/{data.total}</span>
                </div>
                <div style={{ height: 4, background: "#1e2535", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${p}%`, background: p >= 70 ? "#10B981" : "#EF4444", borderRadius: 2 }} />
                </div>
              </div>
            );
          })}

          <button style={S.btn()} onClick={() => setMode("menu")}>← Back to Menu</button>
          <button style={{ ...S.btn("#1e2535"), marginTop: 8 }} onClick={() => startQuiz(selectedSection)}>Retry Same Section 🔄</button>
        </div>
      </div>
    );
  }

  return null;
}