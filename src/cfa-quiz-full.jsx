import { useState, useEffect, useCallback } from "react";

const ALL_QUESTIONS = [
  // ═══════════════════════════════════════════
  // SECTION 1: INTERPRETING INTEREST RATES (15)
  // ═══════════════════════════════════════════
  { id:1, section:"Rates", difficulty:"easy",
    q:"An interest rate is BEST described as:",
    opts:["The minimum return required to accept an investment","A rate that reflects the relationship between differently dated cash flows","The cost of borrowing money from a financial institution"],
    correct:1, exp:"An interest rate reflects the relationship between differently dated cash flows. It can be a required rate of return, discount rate, or opportunity cost." },
  { id:2, section:"Rates", difficulty:"easy",
    q:"An investor requires a minimum of 6% before investing in any asset. This 6% is MOST likely a:",
    opts:["Discount rate","Required rate of return","Opportunity cost"],
    correct:1, exp:"The required rate of return is the minimum return an investor must receive to accept an investment." },
  { id:3, section:"Rates", difficulty:"easy",
    q:"A firm uses 8% to convert future cash flows to present value. This 8% is BEST described as a:",
    opts:["Required rate of return","Opportunity cost","Discount rate"],
    correct:2, exp:"The discount rate converts future cash flows to their present value today." },
  { id:4, section:"Rates", difficulty:"easy",
    q:"An investor spends $50,000 on a vacation instead of investing it at 7%. The 7% foregone return is MOST accurately a(n):",
    opts:["Discount rate","Required rate of return","Opportunity cost"],
    correct:2, exp:"Opportunity cost is the value foregone by choosing one action over another. Spending rather than investing means foregoing the 7% return." },
  { id:5, section:"Rates", difficulty:"medium",
    q:"If $9,500 today is equivalent in value to $10,000 in one year, the interest rate is closest to:",
    opts:["4.76%","5.26%","5.56%"],
    correct:1, exp:"Rate = ($10,000 − $9,500) / $9,500 = $500 / $9,500 = 5.26%. Always divide by the present value." },
  { id:6, section:"Rates", difficulty:"medium",
    q:"Using a 5.26% discount rate, the present value of $10,000 received in one year is closest to:",
    opts:["$9,000","$9,500","$10,526"],
    correct:1, exp:"PV = $10,000 / 1.0526 = $9,500." },
  { id:7, section:"Rates", difficulty:"medium",
    q:"The same 5.26% interest rate can be interpreted as all of the following EXCEPT a:",
    opts:["Required rate of return","Discount rate","Nominal risk-free rate"],
    correct:2, exp:"One rate can be a required return, discount rate, AND opportunity cost simultaneously. It is NOT automatically a nominal risk-free rate." },
  { id:8, section:"Rates", difficulty:"hard",
    q:"An investor lends $9,500 and receives $10,000 in one year. From the borrower's perspective, the 5.26% is MOST accurately a(n):",
    opts:["Opportunity cost of investing the $9,500","Required rate of return on the loan","Cost of borrowing equal to the lender's required return"],
    correct:2, exp:"From the borrower's view, 5.26% is the cost of capital. From the lender's view, it's the required rate of return. The same rate serves both perspectives." },
  { id:9, section:"Rates", difficulty:"medium",
    q:"Which of the following BEST illustrates the opportunity cost interpretation of an interest rate?",
    opts:["A bank sets 4% as the rate it charges borrowers","An analyst uses 4% to discount future dividends to present value","A saver who spends rather than saves foregoes 4% annual growth"],
    correct:2, exp:"Opportunity cost is about what you forgo. Spending means foregoing the 4% growth." },
  { id:10, section:"Rates", difficulty:"easy",
    q:"Which of the following is NOT a typical interpretation of an interest rate?",
    opts:["A required rate of return","A discount rate","A guaranteed rate of profit"],
    correct:2, exp:"The three interpretations are: required rate of return, discount rate, and opportunity cost. A guaranteed rate of profit is not standard." },
  { id:11, section:"Rates", difficulty:"hard",
    q:"An interest rate of 7% per year most likely reflects the time value of money because:",
    opts:["Investors prefer to receive cash in the future rather than today","Cash received today can be invested to generate additional returns","Interest rates are set by central banks to control inflation"],
    correct:1, exp:"The time value of money reflects that cash today is worth more than future cash because it can be invested immediately." },
  { id:12, section:"Rates", difficulty:"medium",
    q:"A pension fund manager uses 6% to determine what a future obligation of $1 million due in 10 years is worth today. This 6% is BEST described as a:",
    opts:["Required rate of return","Discount rate","Opportunity cost"],
    correct:1, exp:"When converting future cash flows to present value, the rate used is a discount rate." },
  { id:13, section:"Rates", difficulty:"hard",
    q:"An investor considers two projects: Project A returns 8% and Project B returns 12%. By choosing Project A, the opportunity cost is MOST accurately:",
    opts:["8%","12%","4% (the difference)"],
    correct:1, exp:"The opportunity cost is the return of the BEST foregone alternative — 12% from Project B." },
  { id:14, section:"Rates", difficulty:"medium",
    q:"Which statement about interest rates is MOST accurate?",
    opts:["The required rate of return and discount rate are fundamentally different","An interest rate can serve as a required return, discount rate, and opportunity cost simultaneously","Interest rates only reflect the time value of money, not risk"],
    correct:1, exp:"The same interest rate can be all three interpretations simultaneously — it depends on perspective." },
  { id:15, section:"Rates", difficulty:"hard",
    q:"A company borrows at 5% to fund a project returning 9%. From the lender's perspective, the 5% MOST likely represents a:",
    opts:["Opportunity cost","Discount rate for project cash flows","Required rate of return"],
    correct:2, exp:"The 5% borrowing rate represents what lenders REQUIRE to lend. For the company it's the cost of capital." },

  // ═══════════════════════════════════════════
  // SECTION 2: COMPONENTS OF INTEREST RATES (15)
  // ═══════════════════════════════════════════
  { id:16, section:"Components", difficulty:"easy",
    q:"The nominal risk-free rate is BEST described as the sum of the real risk-free rate and a premium for:",
    opts:["Default risk","Expected inflation","Maturity risk"],
    correct:1, exp:"Nominal risk-free rate ≈ Real risk-free rate + Inflation premium. It excludes default, liquidity, and maturity premiums." },
  { id:17, section:"Components", difficulty:"easy",
    q:"The real risk-free interest rate is MOST accurately described as the rate for a completely risk-free security assuming:",
    opts:["No default risk and no liquidity risk","No inflation is expected","No maturity premium is required"],
    correct:1, exp:"The real risk-free rate assumes NO INFLATION. It reflects only time preferences for current vs. future consumption." },
  { id:18, section:"Components", difficulty:"medium",
    q:"A Canadian T-bill yields 3.5%. If expected inflation is 2%, the real risk-free rate is closest to:",
    opts:["1.5%","2.0%","5.5%"],
    correct:0, exp:"Nominal ≈ Real + Inflation → 3.5% ≈ Real + 2% → Real ≈ 1.5%." },
  { id:19, section:"Components", difficulty:"medium",
    q:"Investment A: 2-year, high liquidity, low default → 2.0%. Investment B: 2-year, LOW liquidity, low default → 2.5%. The 0.5% difference MOST likely represents:",
    opts:["A maturity premium","A default risk premium","A liquidity premium"],
    correct:2, exp:"Identical except for liquidity — the 0.5% difference is purely the liquidity premium." },
  { id:20, section:"Components", difficulty:"hard",
    q:"Investment C: 8-year, high liquidity, low default → 4.0%. Investment D: 8-year, low liquidity, HIGH default → 6.5%. Given a liquidity premium of 0.5%, the default risk premium is closest to:",
    opts:["1.5%","2.0%","2.5%"],
    correct:1, exp:"Total diff = 2.5%. Liquidity = 0.5%. Default = 2.5% − 0.5% = 2.0%." },
  { id:21, section:"Components", difficulty:"easy",
    q:"A 30-year government bond yields more than a 2-year government bond of the same issuer. This difference MOST likely reflects a:",
    opts:["Default risk premium","Liquidity premium","Maturity premium"],
    correct:2, exp:"Same issuer = same default and liquidity. Yield difference between long and short government bonds reflects the maturity premium." },
  { id:22, section:"Components", difficulty:"easy",
    q:"Which risk premium compensates investors for the possibility of not being repaid?",
    opts:["Liquidity premium","Default risk premium","Maturity premium"],
    correct:1, exp:"Default risk premium compensates for the possibility that the borrower fails to make promised payments." },
  { id:23, section:"Components", difficulty:"medium",
    q:"US Treasury bills typically have no liquidity premium because:",
    opts:["They are backed by the government so default risk is zero","They can be bought and sold in large quantities without affecting market price","They have very short maturities of less than one year"],
    correct:1, exp:"T-bills have no liquidity premium because they trade in very large volumes without price impact." },
  { id:24, section:"Components", difficulty:"hard",
    q:"A bond from a small, thinly traded company. Its extra yield above a comparable government bond MOST likely includes all EXCEPT a:",
    opts:["Default risk premium","Liquidity premium","Inflation premium"],
    correct:2, exp:"Both bonds of same maturity have the same inflation premium. Extra corporate yield reflects default and liquidity risk premiums." },
  { id:25, section:"Components", difficulty:"hard",
    q:"The maturity premium exists primarily because:",
    opts:["Longer maturities have greater default risk","Longer-maturity bonds are more sensitive to interest rate changes","Longer maturities are less liquid"],
    correct:1, exp:"Maturity premium compensates for increased sensitivity of bond market value to interest rate changes as maturity extends." },
  { id:26, section:"Components", difficulty:"medium",
    q:"Investment 3: 7-year, low liquidity, low default. Investment 2: 2-year, low liquidity, low default → 2.5%. Investment 4: 8-year, high liquidity, low default → 4.0%. The rate for Investment 3 is MOST likely between:",
    opts:["2.0% and 2.5%","2.5% and 4.5%","4.0% and 6.5%"],
    correct:1, exp:"r3 > 2.5% (longer than Inv 2) and < 4.5% (Inv 4 + 0.5% liquidity premium). So 2.5% < r3 < 4.5%." },
  { id:27, section:"Components", difficulty:"medium",
    q:"Which correctly expresses the full interest rate formula?",
    opts:["r = Real risk-free + Inflation + Default + Liquidity + Maturity","r = Nominal risk-free + Default + Liquidity + Maturity","r = Real risk-free + Inflation + Default + Maturity"],
    correct:0, exp:"r = Real risk-free + Inflation + Default risk + Liquidity + Maturity premiums. All five components." },
  { id:28, section:"Components", difficulty:"hard",
    q:"Bond X: large, frequently traded company. Bond Y: small, rarely traded company. Same maturity, same default risk. Bond Y's higher yield MOST likely reflects:",
    opts:["A higher maturity premium","A higher default risk premium","A higher liquidity premium"],
    correct:2, exp:"Same maturity = same maturity premium. Same default = same default premium. Difference is liquidity only." },
  { id:29, section:"Components", difficulty:"medium",
    q:"The inflation premium in an interest rate compensates investors for:",
    opts:["The risk that the borrower defaults","The loss of purchasing power over the investment period","The difficulty of selling the investment quickly"],
    correct:1, exp:"The inflation premium compensates for the expected reduction in purchasing power." },
  { id:30, section:"Components", difficulty:"hard",
    q:"If all risk premiums are zero and inflation is 2%, the nominal risk-free rate approximately equals:",
    opts:["The real risk-free rate only","The real risk-free rate + 2%","2% only"],
    correct:1, exp:"Nominal ≈ Real + Inflation. If all premiums = 0, nominal = real + 2%." },

  // ═══════════════════════════════════════════
  // SECTION 3: HOLDING PERIOD RETURN (10)
  // ═══════════════════════════════════════════
  { id:31, section:"HPR", difficulty:"easy",
    q:"A stock purchased at $100, sold at $108, with a $3 dividend. The holding period return is closest to:",
    opts:["8.0%","11.0%","3.0%"],
    correct:1, exp:"HPR = ($108 − $100 + $3) / $100 = $11 / $100 = 11%." },
  { id:32, section:"HPR", difficulty:"easy",
    q:"A bond bought for $950, sold for $1,020 with $60 coupon received. The holding period return is closest to:",
    opts:["6.3%","7.4%","13.7%"],
    correct:2, exp:"HPR = ($1,020 − $950 + $60) / $950 = $130 / $950 = 13.68% ≈ 13.7%." },
  { id:33, section:"HPR", difficulty:"medium",
    q:"100 shares bought at $34.50. Dividend received: $51.55. Sold at $30.50. The HPR is closest to:",
    opts:["−13.0%","−11.6%","−10.1%"],
    correct:2, exp:"HPR = (3,050 − 3,450 + 51.55) / 3,450 = −348.45 / 3,450 = −10.1%." },
  { id:34, section:"HPR", difficulty:"medium",
    q:"A mutual fund returns +14%, −10%, −2% over three years. The 3-year HPR is closest to:",
    opts:["0.18%","0.55%","0.67%"],
    correct:1, exp:"HPR = [(1.14)(0.90)(0.98)] − 1 = 1.0055 − 1 = 0.55%." },
  { id:35, section:"HPR", difficulty:"medium",
    q:"A stock purchased at $50, pays no dividend, worth $45 after one year. The HPR is:",
    opts:["−10.0%","−11.1%","10.0%"],
    correct:0, exp:"HPR = ($45 − $50) / $50 = −$5 / $50 = −10.0%." },
  { id:36, section:"HPR", difficulty:"hard",
    q:"A holding period return consists of two components. Which BEST describes these?",
    opts:["Arithmetic return and geometric return","Income yield and capital gain/loss","Gross return and net return"],
    correct:1, exp:"Total return = Income yield (dividends/coupons) + Capital gain or loss." },
  { id:37, section:"HPR", difficulty:"easy",
    q:"An asset's holding period return can be calculated for:",
    opts:["Annual periods only","Any specified time period","Periods longer than one year only"],
    correct:1, exp:"HPR can be calculated for any period — one day, one week, five years, etc." },
  { id:38, section:"HPR", difficulty:"hard",
    q:"A hedge fund returns +22%, −25%, +11% over three years. The 3-year HPR is closest to:",
    opts:["0.52%","1.57%","2.67%"],
    correct:1, exp:"HPR = [(1.22)(0.75)(1.11)] − 1 = 1.01565 − 1 = 1.57%." },
  { id:39, section:"HPR", difficulty:"medium",
    q:"Which is the correct formula for holding period return?",
    opts:["R = (P1 × P0 + I) / P0","R = (P1 − P0 + I) / P0","R = (P1 − P0) × I / P0"],
    correct:1, exp:"HPR = (Ending Price − Beginning Price + Income) / Beginning Price." },
  { id:40, section:"HPR", difficulty:"hard",
    q:"A security bought at $50, now worth $49, pays $2 income. The capital gain component of HPR is:",
    opts:["+4.0%","−2.0%","−4.0%"],
    correct:1, exp:"Capital gain = ($49 − $50) / $50 = −$1 / $50 = −2.0%. Income yield = $2/$50 = 4%. Total HPR = 2%." },

  // ═══════════════════════════════════════════
  // SECTION 4: ARITHMETIC MEAN (10)
  // ═══════════════════════════════════════════
  { id:41, section:"Arithmetic", difficulty:"easy",
    q:"Annual returns: +15%, −5%, +10%, +20%, 0% over five years. The arithmetic mean return is:",
    opts:["7%","8%","9%"],
    correct:1, exp:"(15 + (−5) + 10 + 20 + 0) / 5 = 40 / 5 = 8%." },
  { id:42, section:"Arithmetic", difficulty:"easy",
    q:"The arithmetic mean return is MOST appropriate for estimating the average return over:",
    opts:["Multiple future periods with compounding","A single future period","Historical compound growth"],
    correct:1, exp:"Arithmetic mean best estimates expected return over a SINGLE future period." },
  { id:43, section:"Arithmetic", difficulty:"medium",
    q:"A stock returns +100% in Year 1 and −50% in Year 2. Arithmetic mean = 25%. An investor who starts with $1,000 ends up with:",
    opts:["$1,250","$1,000 (breakeven)","$750 (a loss)"],
    correct:1, exp:"$1,000 × 2.00 × 0.50 = $1,000. Despite 25% arithmetic mean, the investor breaks even." },
  { id:44, section:"Arithmetic", difficulty:"medium",
    q:"Which statement regarding the arithmetic mean return is MOST accurate?",
    opts:["It always equals the geometric mean","It equals or exceeds the geometric mean","It is always less than the geometric mean"],
    correct:1, exp:"Arithmetic mean ≥ Geometric mean always. Equal only when all returns are identical." },
  { id:45, section:"Arithmetic", difficulty:"hard",
    q:"Returns: −50%, +35%, +27%. Arithmetic mean = 4%. Which is MOST accurate?",
    opts:["An investor ends Year 3 with $1.12 per $1 invested","The 4% arithmetic mean overstates the actual compound return","Arithmetic mean equals geometric mean here"],
    correct:1, exp:"Actual ending = (0.50)(1.35)(1.27) = $0.857 per $1. Geometric mean = −5%. The 4% arithmetic mean significantly overstates." },
  { id:46, section:"Arithmetic", difficulty:"medium",
    q:"10-year returns: 4.5%, 6.0%, 1.5%, −2.0%, 0%, 4.5%, 3.5%, 2.5%, 5.5%, 4.0%. Arithmetic mean is closest to:",
    opts:["2.97%","3.00%","3.33%"],
    correct:1, exp:"Sum = 30.0%. Mean = 30/10 = 3.0%." },
  { id:47, section:"Arithmetic", difficulty:"hard",
    q:"The bias of arithmetic mean above geometric mean is MOST severe when:",
    opts:["Returns are all positive","Returns include large positive and negative values","Returns are stable over time"],
    correct:1, exp:"High variance (mix of large positive and negative returns) creates the greatest arithmetic mean bias." },
  { id:48, section:"Arithmetic", difficulty:"medium",
    q:"An analyst wants to forecast the expected return for NEXT YEAR using 5 years of historical data. The MOST appropriate measure is:",
    opts:["Geometric mean","Arithmetic mean","Harmonic mean"],
    correct:1, exp:"For estimating expected return over a SINGLE future period, the arithmetic mean is most appropriate." },
  { id:49, section:"Arithmetic", difficulty:"easy",
    q:"Returns of −50%, 35%, 27% give an arithmetic mean of:",
    opts:["2%","4%","6%"],
    correct:1, exp:"(−50 + 35 + 27) / 3 = 12 / 3 = 4%." },
  { id:50, section:"Arithmetic", difficulty:"hard",
    q:"Compared to the geometric mean, the arithmetic mean of a volatile portfolio will MOST likely:",
    opts:["Understate compound growth","Overstate compound growth","Equal compound growth"],
    correct:1, exp:"Arithmetic mean always overstates compound growth when returns are volatile." },

  // ═══════════════════════════════════════════
  // SECTION 5: GEOMETRIC MEAN (12)
  // ═══════════════════════════════════════════
  { id:51, section:"Geometric", difficulty:"medium",
    q:"A hedge fund returns +22%, −25%, +11% over three years. The geometric mean return is closest to:",
    opts:["0.52%","1.57%","2.67%"],
    correct:0, exp:"RG = [(1.22)(0.75)(1.11)]^(1/3) − 1 = [1.01565]^(1/3) − 1 = 0.52%." },
  { id:52, section:"Geometric", difficulty:"easy",
    q:"The geometric mean return is BEST described as:",
    opts:["The average of one-period returns","The compound rate of growth over multiple periods","The return adjusted for cash flow timing"],
    correct:1, exp:"Geometric mean represents the compound rate of growth over multiple periods." },
  { id:53, section:"Geometric", difficulty:"medium",
    q:"$1.00 grew to $1.35 over 3 years. The geometric mean annual return is closest to:",
    opts:["11.7%","10.5%","9.5%"],
    correct:1, exp:"RG = (1.35)^(1/3) − 1 = 1.1050 − 1 = 10.5%." },
  { id:54, section:"Geometric", difficulty:"medium",
    q:"When returns have non-zero variance, which relationship is MOST accurate?",
    opts:["Geometric mean > Arithmetic mean","Geometric mean = Arithmetic mean","Geometric mean < Arithmetic mean"],
    correct:2, exp:"With non-zero variance, geometric mean is always LESS than arithmetic mean." },
  { id:55, section:"Geometric", difficulty:"easy",
    q:"Which mean is MOST appropriate for measuring the actual ending value of a multi-period investment?",
    opts:["Arithmetic mean","Geometric mean","Harmonic mean"],
    correct:1, exp:"Geometric mean gives the compound growth rate — applying it over T periods yields the actual ending value." },
  { id:56, section:"Geometric", difficulty:"hard",
    q:"A portfolio earns +50%, −50% over two years. The geometric mean return is closest to:",
    opts:["0%","−13.4%","25%"],
    correct:1, exp:"RG = [(1.50)(0.50)]^(1/2) − 1 = [0.75]^0.5 − 1 = 0.866 − 1 = −13.4%. Arithmetic mean = 0% but investor loses money." },
  { id:57, section:"Geometric", difficulty:"medium",
    q:"Fund Y 5-year returns: +19.5%, −1.9%, +19.7%, +35.0%, +5.7%. The geometric mean is closest to:",
    opts:["14.9%","15.6%","19.5%"],
    correct:0, exp:"RG = [(1.195)(0.981)(1.197)(1.350)(1.057)]^(1/5) − 1 ≈ 14.9%. Arithmetic mean is 15.6%." },
  { id:58, section:"Geometric", difficulty:"hard",
    q:"Portfolio: starts EUR1.00, Year 1: −50% → EUR0.50, Year 2: +35% → EUR0.675, Year 3: +27% → EUR0.8573. The geometric mean is closest to:",
    opts:["4%","−5%","0%"],
    correct:1, exp:"RG = [(0.50)(1.35)(1.27)]^(1/3) − 1 = [0.8573]^(1/3) − 1 = 0.950 − 1 = −5%." },
  { id:59, section:"Geometric", difficulty:"medium",
    q:"The geometric mean formula requires adding 1 to each return before multiplying because:",
    opts:["To convert percentages to decimals","Each period's return applies to the TOTAL value including prior gains","To eliminate negative returns"],
    correct:1, exp:"The (1+R) is a wealth multiplier. $150 (after +50%) loses 50% of $150 not $100 — compounding on total value." },
  { id:60, section:"Geometric", difficulty:"hard",
    q:"The ^(1/T) is applied in the geometric mean formula to:",
    opts:["Convert the product into a percentage","Find the equivalent per-period rate that produces the same total growth","Adjust for the number of compounding periods per year"],
    correct:1, exp:"^(1/T) finds the single per-period rate that, compounded over T periods, yields the same total as actual varying returns." },
  { id:61, section:"Geometric", difficulty:"medium",
    q:"A country's index returns +7.8%, +6.3%, −1.5% over 3 years. The geometric mean return is closest to:",
    opts:["4.12%","4.20%","3.73%"],
    correct:0, exp:"RG = [(1.078)(1.063)(0.985)]^(1/3) − 1 = [1.12873]^(1/3) − 1 = 4.12%." },
  { id:62, section:"Geometric", difficulty:"easy",
    q:"For reporting historical multi-year performance, the geometric mean is preferred because it:",
    opts:["Is always higher than arithmetic mean","Represents the actual compound growth rate experienced","Is easier to calculate"],
    correct:1, exp:"Geometric mean represents the actual compound growth rate — the rate that matches cumulative performance if earned consistently." },

  // ═══════════════════════════════════════════
  // SECTION 6: HARMONIC MEAN (10)
  // ═══════════════════════════════════════════
  { id:63, section:"Harmonic", difficulty:"medium",
    q:"Investor buys $1,000 of stock each month for 2 months at prices $10 and $15. The average price per share is BEST the:",
    opts:["Arithmetic mean of $12.50","Geometric mean of $12.25","Harmonic mean of $12.00"],
    correct:2, exp:"Fixed $ amount at variable prices → harmonic mean. Month 1: 100 shares, Month 2: 66.67 shares. Avg = $2,000/166.67 = $12." },
  { id:64, section:"Harmonic", difficulty:"easy",
    q:"The harmonic mean is MOST appropriate when averaging:",
    opts:["Compound returns over multiple periods","Rates or ratios applied to a fixed quantity","Returns adjusted for extreme outliers"],
    correct:1, exp:"Harmonic mean is appropriate for averaging rates and ratios when a fixed quantity is applied." },
  { id:65, section:"Harmonic", difficulty:"medium",
    q:"Three companies have P/E ratios of 45, 15, and 15. The harmonic mean P/E is closest to:",
    opts:["19.3","25.0","21.2"],
    correct:0, exp:"Harmonic = 3 / (1/45 + 1/15 + 1/15) = 3 / 0.1556 = 19.3." },
  { id:66, section:"Harmonic", difficulty:"easy",
    q:"Which relationship is always true (assuming non-zero variance)?",
    opts:["Harmonic ≥ Geometric ≥ Arithmetic","Arithmetic ≥ Geometric ≥ Harmonic","Geometric ≥ Arithmetic ≥ Harmonic"],
    correct:1, exp:"The correct order is always: Arithmetic ≥ Geometric ≥ Harmonic." },
  { id:67, section:"Harmonic", difficulty:"hard",
    q:"A manager invests €5,000 annually for 4 years at prices €62, €76, €84, €90. Average price is BEST the:",
    opts:["Arithmetic mean of €78.00","Harmonic mean of €76.48","Geometric mean of €77.26"],
    correct:1, exp:"Fixed amount (€5,000) at variable prices → harmonic mean = 4/(1/62+1/76+1/84+1/90) = €76.48." },
  { id:68, section:"Harmonic", difficulty:"medium",
    q:"The harmonic mean gives less weight to larger values because:",
    opts:["It uses reciprocals, so larger values contribute smaller reciprocals","It removes outliers before calculating","It compounds values rather than adding"],
    correct:0, exp:"Using reciprocals (1/X): larger X → smaller reciprocal → less influence on harmonic mean." },
  { id:69, section:"Harmonic", difficulty:"hard",
    q:"Investor invests EUR1,000/month at EUR10 then EUR15. Arithmetic mean = EUR12.50, harmonic mean = EUR12.00. The harmonic is lower because:",
    opts:["The investor bought more shares when price was lower","The investor bought fewer shares when price was higher","Both A and B — more shares at lower price means lower prices are weighted more"],
    correct:2, exp:"With fixed $ amount: more shares when price is LOW → lower price has more weight → harmonic mean is lower than simple average." },
  { id:70, section:"Harmonic", difficulty:"easy",
    q:"Which mathematical relationship connects the three means?",
    opts:["Arithmetic + Harmonic = 2 × Geometric","Arithmetic × Harmonic = (Geometric)²","Geometric = (Arithmetic + Harmonic) / 2"],
    correct:1, exp:"Arithmetic × Harmonic = (Geometric)². A mathematical property of the three means." },
  { id:71, section:"Harmonic", difficulty:"hard",
    q:"A trimmed mean is MOST appropriate when:",
    opts:["Data has outliers that should be excluded","Data involves rates and ratios","Data involves compounding"],
    correct:0, exp:"A trimmed mean removes a defined percentage of largest and smallest values to reduce outlier impact." },
  { id:72, section:"Harmonic", difficulty:"medium",
    q:"Which return measure is most appropriate for comparing the P/E ratios of 10 stocks?",
    opts:["Arithmetic mean","Geometric mean","Harmonic mean"],
    correct:2, exp:"P/E ratios are rates/ratios — the harmonic mean is appropriate, giving less weight to extreme P/E values." },

  // ═══════════════════════════════════════════
  // SECTION 7: MONEY-WEIGHTED RETURN (12)
  // ═══════════════════════════════════════════
  { id:73, section:"MWR", difficulty:"easy",
    q:"The money-weighted rate of return (MWR) is BEST described as the:",
    opts:["Geometric mean of sub-period returns","Internal rate of return on all portfolio cash flows","Time-weighted average of holding period returns"],
    correct:1, exp:"MWR = IRR. It finds the single rate that equates PV of all cash inflows to PV of outflows." },
  { id:74, section:"MWR", difficulty:"medium",
    q:"A fund returns +15% Year 1, −4% Year 2. Investor deposits $1,000 initially and $45,000 more at start of Year 2. MWR is MOST likely:",
    opts:["Positive and approximately equal to TWR","Negative due to the large deposit before the loss","Equal to the arithmetic mean of 5.5%"],
    correct:1, exp:"The large $45,000 deposit just before −4% makes MWR negative. Most capital suffered the loss. IRR ≈ −2.22%." },
  { id:75, section:"MWR", difficulty:"medium",
    q:"The primary disadvantage of using MWR to evaluate a portfolio manager is that it:",
    opts:["Does not account for compounding","Is affected by timing of client deposits and withdrawals","Cannot be used with more than two cash flows"],
    correct:1, exp:"MWR is influenced by cash flows controlled by the INVESTOR, not the manager — unfair for evaluating manager skill." },
  { id:76, section:"MWR", difficulty:"hard",
    q:"Fund starts with $10M, earns 14% Year 1, receives $100M at start of Year 2, earns 8% Year 2. MWR is MOST likely:",
    opts:["Greater than TWR of ~10.96%","Less than TWR of ~10.96%","Equal to TWR of ~10.96%"],
    correct:1, exp:"Most capital ($100M) invested in 8% year. MWR ≈ 8.53% < TWR ≈ 10.96%." },
  { id:77, section:"MWR", difficulty:"medium",
    q:"To calculate MWR, an investor uses which method?",
    opts:["Compound the sub-period geometric means","Solve for IRR that makes NPV of all cash flows equal zero","Average annual returns weighted by time"],
    correct:1, exp:"MWR = IRR. Input all cash flows (deposits negative, withdrawals positive) and solve for rate making NPV = 0." },
  { id:78, section:"MWR", difficulty:"hard",
    q:"Deposits: $1,000 at t=0, $2,850 at t=1, $40,440 at t=2. Ending value at t=3: $43,200. The MWR is closest to:",
    opts:["−2.22%","7.97%","5.00%"],
    correct:0, exp:"Setting up IRR: CF0=−1000, CF1=−2850, CF2=−40440, CF3=+43200 → IRR = −2.22%." },
  { id:79, section:"MWR", difficulty:"medium",
    q:"A client invests a large sum just BEFORE excellent performance. Compared to TWR, the MWR will MOST likely be:",
    opts:["Higher than TWR","Lower than TWR","Equal to TWR"],
    correct:0, exp:"Large deposit before good performance: MWR > TWR. Large capital benefits from high return period." },
  { id:80, section:"MWR", difficulty:"easy",
    q:"MWR is MOST appropriate for measuring the performance of:",
    opts:["A portfolio manager's investment skill","An individual investor's actual experience","A portfolio's performance independent of cash flows"],
    correct:1, exp:"MWR reflects what the INVESTOR actually earned, accounting for when they invested and withdrew." },
  { id:81, section:"MWR", difficulty:"hard",
    q:"Which return measure over 3 years would be NEGATIVE if most assets were invested just before a losing year?",
    opts:["Geometric mean return","Time-weighted rate of return","Money-weighted rate of return"],
    correct:2, exp:"MWR is sensitive to cash flow timing. Large investment before a loss year can make MWR negative even when TWR stays positive." },
  { id:82, section:"MWR", difficulty:"medium",
    q:"MWR and IRR are the same concept because both:",
    opts:["Use arithmetic averaging","Find the discount rate equating PV of inflows to outflows","Eliminate the effect of cash flow timing"],
    correct:1, exp:"Both find the rate r such that PV(outflows) = PV(inflows), i.e., NPV = 0." },
  { id:83, section:"MWR", difficulty:"hard",
    q:"Fund receives: $1,000 at start Year 1 (+15%), $4,000 at start Year 2 (+14%), $45,000 at start Year 3 (−4%). MWR is MOST likely:",
    opts:["Positive and close to 8%","Negative","Equal to geometric mean of ~8%"],
    correct:1, exp:"The enormous $45,000 in the −4% year dominates. MWR = IRR ≈ −2.22% (negative)." },
  { id:84, section:"MWR", difficulty:"medium",
    q:"The annualized MWR is MOST accurately described as:",
    opts:["The geometric mean of annual sub-period returns","The IRR of all cash flows, annualized if period is less than one year","The arithmetic mean of all holding period returns"],
    correct:1, exp:"MWR = IRR. For periods less than one year, the IRR must be annualized." },

  // ═══════════════════════════════════════════
  // SECTION 8: TIME-WEIGHTED RETURN (12)
  // ═══════════════════════════════════════════
  { id:85, section:"TWR", difficulty:"easy",
    q:"The time-weighted rate of return (TWR) is MOST appropriate for evaluating:",
    opts:["Individual investors who control their cash flows","Portfolio managers who do not control client cash flows","Portfolios with no external cash flows"],
    correct:1, exp:"TWR eliminates cash flow impact, making it fair for evaluating managers who cannot control when clients invest." },
  { id:86, section:"TWR", difficulty:"medium",
    q:"A portfolio earns +20% in the first half of the year and −10% in the second half. The TWR for the full year is closest to:",
    opts:["5.0%","8.0%","10.0%"],
    correct:1, exp:"TWR = (1.20)(0.90) − 1 = 1.08 − 1 = 8.0%." },
  { id:87, section:"TWR", difficulty:"medium",
    q:"To calculate TWR, the portfolio manager calculates the return for each sub-period between:",
    opts:["Market open and close each day","Each external cash flow (deposit or withdrawal)","Each calendar quarter"],
    correct:1, exp:"TWR requires calculating HPR between each external cash flow, then geometrically linking the sub-period returns." },
  { id:88, section:"TWR", difficulty:"easy",
    q:"Which statement BEST describes the relationship between TWR and the geometric mean?",
    opts:["TWR is the arithmetic mean of sub-period returns","TWR is the geometric mean of sub-period returns","TWR and geometric mean are unrelated"],
    correct:1, exp:"TWR IS the geometric mean of sub-period returns (sub-periods defined by external cash flows)." },
  { id:89, section:"TWR", difficulty:"medium",
    q:"A client deposits a large sum into a portfolio just BEFORE poor performance. Compared to TWR, MWR will MOST likely be:",
    opts:["Higher than TWR","Lower than TWR","Equal to TWR"],
    correct:1, exp:"Large deposit before poor performance: MWR < TWR. Large capital suffered the loss, dragging down MWR." },
  { id:90, section:"TWR", difficulty:"medium",
    q:"The TWR is preferred over MWR for evaluating portfolio managers because:",
    opts:["It always produces a higher return","It eliminates the impact of cash flows the manager cannot control","It is simpler to calculate"],
    correct:1, exp:"Managers cannot control when clients invest or withdraw. TWR removes this influence for a fair measure of skill." },
  { id:91, section:"TWR", difficulty:"hard",
    q:"A fund has a TWR of 21.03% and an MWR of 20.05%. This MOST likely means:",
    opts:["Performance was better during periods when more money was invested","Performance was relatively poorer during periods when more money was invested","The fund manager outperformed the benchmark"],
    correct:1, exp:"MWR < TWR means more money was invested during lower-performing periods." },
  { id:92, section:"TWR", difficulty:"medium",
    q:"Which return measure over 3 years would be POSITIVE even if MWR were negative?",
    opts:["Arithmetic mean return","Time-weighted rate of return","Holding period return"],
    correct:1, exp:"TWR is unaffected by cash flow timing. Even if large investment before a loss makes MWR negative, TWR reflects manager's positive performance." },
  { id:93, section:"TWR", difficulty:"hard",
    q:"Fund A: TWR=12%, MWR=15%. Fund B: TWR=10%, MWR=8%. To fairly compare manager skill, you compare:",
    opts:["MWR: Fund A (15%) beats Fund B (8%)","TWR: Fund A (12%) beats Fund B (10%)","MWR for one and TWR for the other"],
    correct:1, exp:"Always use TWR to compare managers — it eliminates cash flow timing effects managers cannot control." },
  { id:94, section:"TWR", difficulty:"easy",
    q:"The key advantage of TWR over MWR is that TWR:",
    opts:["Accounts for the size of investments at each period","Is not sensitive to the timing and amount of cash flows","Always produces a higher return than MWR"],
    correct:1, exp:"TWR's main advantage: NOT sensitive to timing and amount of cash flows — appropriate for evaluating managers." },
  { id:95, section:"TWR", difficulty:"hard",
    q:"Portfolio start: $100. Month 6 client deposits $1,000 when fund = $110. Year end fund = $1,190. Sub-period 1 return is:",
    opts:["8.2%","10.0%","9.1%"],
    correct:1, exp:"Sub-period 1: ($110 − $100) / $100 = 10%. This is then linked with sub-period 2 return to compute TWR." },
  { id:96, section:"TWR", difficulty:"hard",
    q:"Why is calculating TWR more data-intensive than calculating geometric mean?",
    opts:["TWR requires daily returns while geometric mean uses annual returns","TWR requires portfolio valuation at every external cash flow","TWR accounts for taxes while geometric mean does not"],
    correct:1, exp:"TWR requires the portfolio to be valued at every external cash flow to separate sub-periods. This is more demanding than simply having annual returns." },

  // ═══════════════════════════════════════════
  // SECTION 9: ANNUALIZED RETURNS (8)
  // ═══════════════════════════════════════════
  { id:97, section:"Annualized", difficulty:"medium",
    q:"A security earns 6.2% over 100 days. The annualized return is closest to:",
    opts:["22.6%","24.6%","26.6%"],
    correct:1, exp:"Rannual = (1.062)^(365/100) − 1 = (1.062)^3.65 − 1 ≈ 24.55%." },
  { id:98, section:"Annualized", difficulty:"medium",
    q:"A security earns 2% over 4 weeks. The annualized return is closest to:",
    opts:["24.0%","29.4%","26.0%"],
    correct:1, exp:"Rannual = (1.02)^(52/4) − 1 = (1.02)^13 − 1 = 29.4%." },
  { id:99, section:"Annualized", difficulty:"medium",
    q:"ETF 1: 125 days +4.25%. ETF 2: 8 weeks +1.95%. ETF 3: 16 months +17.18%. Which has the HIGHEST annualized return?",
    opts:["ETF 1","ETF 2","ETF 3"],
    correct:1, exp:"ETF1=(1.0425)^(365/125)−1=12.92%, ETF2=(1.0195)^(52/8)−1=13.37%, ETF3=(1.1718)^(12/16)−1=12.63%. ETF 2 wins." },
  { id:100, section:"Annualized", difficulty:"easy",
    q:"If the weekly return is 0.2%, the compound annual return is closest to:",
    opts:["10.4%","10.95%","11.5%"],
    correct:1, exp:"Rannual = (1.002)^52 − 1 = 10.95%." },
  { id:101, section:"Annualized", difficulty:"hard",
    q:"An 18-month return of 20% annualized is closest to:",
    opts:["12.92%","13.33%","20.00%"],
    correct:0, exp:"Rannual = (1.20)^(2/3) − 1 = (1.20)^0.667 − 1 = 1.1292 − 1 = 12.92%." },
  { id:102, section:"Annualized", difficulty:"medium",
    q:"The main limitation of annualizing short-term returns is that it:",
    opts:["Understates the true annual return","Assumes returns can be repeated precisely, which is unrealistic","Requires geometric rather than arithmetic compounding"],
    correct:1, exp:"Annualizing assumes the short-term return can be repeated continuously — often unrealistic for extreme short-term returns." },
  { id:103, section:"Annualized", difficulty:"hard",
    q:"A continuously compounded return is related to holding period return R by:",
    opts:["r = R / T","r = ln(1 + R)","r = e^R − 1"],
    correct:1, exp:"Continuously compounded return r = ln(1 + R) = ln(Pt+1/Pt). Always slightly less than HPR." },
  { id:104, section:"Annualized", difficulty:"hard",
    q:"A stock moves from $208.25 to $186.75. The continuously compounded return is closest to:",
    opts:["−10.90%","−10.32%","−9.35%"],
    correct:0, exp:"r = ln(P1/P0) = ln(186.75/208.25) = ln(0.8968) = −10.90%." },

  // ═══════════════════════════════════════════
  // SECTION 10: OTHER RETURN MEASURES (10)
  // ═══════════════════════════════════════════
  { id:105, section:"OtherReturns", difficulty:"easy",
    q:"The gross return of a portfolio is BEST described as the return:",
    opts:["After all fees including management and administrative expenses","Before deduction of management and administrative expenses","After taxes but before administrative expenses"],
    correct:1, exp:"Gross return is before management/administrative expenses. Trading expenses ARE reflected in gross return." },
  { id:106, section:"OtherReturns", difficulty:"easy",
    q:"Net return is MOST accurately defined as:",
    opts:["Gross return minus taxes","Gross return minus management and administrative expenses","Pre-tax nominal return"],
    correct:1, exp:"Net return = Gross return − management and administrative expenses." },
  { id:107, section:"OtherReturns", difficulty:"medium",
    q:"An investment manager's gross return is MOST useful for:",
    opts:["Comparing after-tax performance","Evaluating the comparative performance of the asset manager","Measuring real purchasing power gains"],
    correct:1, exp:"Gross return evaluates manager skill, excluding administrative expenses unrelated to investment decisions." },
  { id:108, section:"OtherReturns", difficulty:"medium",
    q:"The real return is MOST useful for:",
    opts:["Comparing returns across different time periods when inflation varies","Measuring performance before administrative expenses","Calculating the IRR of a portfolio"],
    correct:0, exp:"Real returns are useful for comparing across time periods because inflation rates vary over time." },
  { id:109, section:"OtherReturns", difficulty:"hard",
    q:"Equities geometric return: 8%, Inflation: 2.1%. The real return for equities is closest to:",
    opts:["5.4%","5.8%","5.9%"],
    correct:1, exp:"Real return = (1.08)/(1.021) − 1 = 1.0578 − 1 = 5.78% ≈ 5.8%." },
  { id:110, section:"OtherReturns", difficulty:"hard",
    q:"Equities: 8%, T-bills: 2.5%. The equity risk premium is closest to:",
    opts:["5.4%","5.5%","5.6%"],
    correct:0, exp:"Risk premium = (1.08)/(1.025) − 1 = 1.0537 − 1 = 5.37% ≈ 5.4%." },
  { id:111, section:"OtherReturns", difficulty:"medium",
    q:"A $25M equity portfolio financed 20% with debt at 6% generates 10% total return. The leveraged return is closest to:",
    opts:["11.0%","11.2%","13.2%"],
    correct:0, exp:"RL = 10% + (5M/20M)(10% − 6%) = 10% + 0.25 × 4% = 11.0%." },
  { id:112, section:"OtherReturns", difficulty:"medium",
    q:"Which statement about leverage is MOST accurate?",
    opts:["Leverage amplifies gains but not losses","Leverage increases returns only if portfolio return exceeds borrowing cost","Leverage doubles the return if half the capital is borrowed"],
    correct:1, exp:"Leverage increases returns ONLY if Rp > rD. It amplifies BOTH gains and losses." },
  { id:113, section:"OtherReturns", difficulty:"hard",
    q:"Gross return 8.46%, trading expenses 1.10%, management expenses 1.60%, tax rate 30%. After-tax return is closest to:",
    opts:["3.60%","3.98%","5.00%"],
    correct:1, exp:"Net return = 8.46% − 1.10% − 1.60% = 5.76%. After-tax = 5.76% × 0.70 = 4.03% ≈ 3.98%." },
  { id:114, section:"OtherReturns", difficulty:"medium",
    q:"The after-tax nominal return is computed as:",
    opts:["Total return minus inflation","Total return minus taxes on dividends, interest, and realized gains","Gross return minus management fees"],
    correct:1, exp:"After-tax nominal return = Total return − tax allowance on dividends, interest, and realized capital gains." },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SECTIONS = {
  "All": { label: "🎯 Full Exam", color: "#3B82F6", desc: "All 114 questions shuffled" },
  "Rates": { label: "Interpreting Rates", color: "#3B82F6", desc: "Required return, discount rate, opportunity cost" },
  "Components": { label: "Rate Components", color: "#8B5CF6", desc: "5 risk premiums, nominal vs real" },
  "HPR": { label: "Holding Period Return", color: "#F59E0B", desc: "Single period, income + capital gain" },
  "Arithmetic": { label: "Arithmetic Mean", color: "#F97316", desc: "Simple average, single period" },
  "Geometric": { label: "Geometric Mean", color: "#10B981", desc: "Compound growth, multi-period" },
  "Harmonic": { label: "Harmonic Mean", color: "#EC4899", desc: "Ratios, P/E, cost averaging" },
  "MWR": { label: "Money-Weighted Return", color: "#EF4444", desc: "IRR, investor performance" },
  "TWR": { label: "Time-Weighted Return", color: "#06B6D4", desc: "Manager performance, geometric mean of sub-periods" },
  "Annualized": { label: "Annualized Returns", color: "#84CC16", desc: "Compounding, continuously compounded" },
  "OtherReturns": { label: "Other Return Measures", color: "#A78BFA", desc: "Gross/net, real, leveraged, after-tax" },
};

const TIMER = 90;

export default function CFAQuiz() {
  const [screen, setScreen] = useState("menu");
  const [section, setSection] = useState("All");
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFb, setShowFb] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(TIMER);
  const [timerOn, setTimerOn] = useState(false);
  const [stats, setStats] = useState({});

  const startQuiz = useCallback((sec) => {
    const pool = sec === "All" ? ALL_QUESTIONS : ALL_QUESTIONS.filter(q => q.section === sec);
    setQuestions(shuffle(pool));
    setSection(sec); setQIdx(0); setSelected(null); setShowFb(false); setAnswers([]);
    setTimer(TIMER); setTimerOn(true); setScreen("quiz");
  }, []);

  useEffect(() => {
    if (!timerOn || showFb) return;
    if (timer <= 0) { setShowFb(true); setTimerOn(false); return; }
    const t = setTimeout(() => setTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, timerOn, showFb]);

  const pick = (idx) => { if (showFb) return; setSelected(idx); setShowFb(true); setTimerOn(false); };

  const next = () => {
    const q = questions[qIdx];
    const newA = [...answers, { selected, correct: q.correct, section: q.section, time: TIMER - timer, difficulty: q.difficulty }];
    if (qIdx + 1 >= questions.length) {
      const bySection = {};
      newA.forEach(a => {
        if (!bySection[a.section]) bySection[a.section] = { correct: 0, total: 0 };
        bySection[a.section].total++;
        if (a.selected === a.correct) bySection[a.section].correct++;
      });
      setStats(bySection); setAnswers(newA); setScreen("results");
    } else {
      setAnswers(newA); setQIdx(i => i + 1);
      setSelected(null); setShowFb(false); setTimer(TIMER); setTimerOn(true);
    }
  };

  const q = questions[qIdx];
  const totalCorrect = answers.filter(a => a.selected === a.correct).length;
  const pct = answers.length > 0 ? Math.round((totalCorrect / answers.length) * 100) : 0;
  const timerPct = (timer / TIMER) * 100;
  const timerColor = timer > 60 ? "#10B981" : timer > 30 ? "#F59E0B" : "#EF4444";

  const css = {
    app: { minHeight: "100vh", background: "#0b0f1a", color: "#e2e8f0", fontFamily: "'Georgia', serif", paddingBottom: 40 },
    hdr: { background: "#111827", borderBottom: "1px solid #1f2937", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 },
    wrap: { maxWidth: 660, margin: "0 auto", padding: "0 16px" },
    card: (active, color) => ({ background: active ? `${color}15` : "#111827", border: `1px solid ${active ? color + "55" : "#1f2937"}`, borderRadius: 14, padding: "16px 18px", marginBottom: 10, cursor: "pointer", transition: "all 0.15s" }),
    opt: (sel, fb, corr) => {
      let bg = "#131b2e", bdr = "1px solid #1f2937";
      if (fb && sel) { bg = corr ? "#0a2e1a" : "#2e0a0a"; bdr = `1px solid ${corr ? "#10B981" : "#EF4444"}`; }
      if (fb && !sel && corr) { bg = "#0a2e1a"; bdr = "1px solid #10B981"; }
      return { background: bg, border: bdr, borderRadius: 10, padding: "13px 16px", marginBottom: 8, cursor: "pointer", textAlign: "left", color: "#e2e8f0", fontSize: 13.5, width: "100%", fontFamily: "inherit", lineHeight: 1.5, transition: "all 0.15s" };
    },
    btn: (c = "#3B82F6") => ({ background: c, color: "#fff", border: "none", borderRadius: 10, padding: "13px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%", marginTop: 10, fontFamily: "inherit" }),
    ghost: { background: "#1f2937", color: "#9ca3af", border: "1px solid #374151", borderRadius: 10, padding: "11px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 8, width: "100%", fontFamily: "inherit" },
    tag: (c) => ({ background: `${c}20`, border: `1px solid ${c}50`, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 700, color: c, letterSpacing: 1, display: "inline-block" }),
    diffColor: (d) => ({ easy: "#10B981", medium: "#F59E0B", hard: "#EF4444" }[d] || "#666"),
  };

  if (screen === "menu") return (
    <div style={css.app}>
      <div style={css.hdr}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: "#4B5563", textTransform: "uppercase" }}>CFA Level I · M1 · Practice</span>
        <span style={{ fontSize: 12, color: "#6B7280" }}>{ALL_QUESTIONS.length} questions</span>
      </div>
      <div style={{ ...css.wrap, paddingTop: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, background: "linear-gradient(135deg,#60A5FA,#fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>Rates & Returns</h1>
        <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 24 }}>Format exact CFA · 3 choix (A/B/C) · Timer 90s · Questions aléatoires</p>
        <div style={css.card(true, "#3B82F6")} onClick={() => startQuiz("All")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 3 }}>🎯 Full Practice Exam</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>{ALL_QUESTIONS.length} questions · Tous les sujets mélangés</div>
            </div>
            <div style={{ fontSize: 22, color: "#3B82F6" }}>→</div>
          </div>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#4B5563", textTransform: "uppercase", margin: "20px 0 10px" }}>Par Section</div>
        {Object.entries(SECTIONS).filter(([k]) => k !== "All").map(([key, info]) => {
          const count = ALL_QUESTIONS.filter(q => q.section === key).length;
          return (
            <div key={key} style={css.card(false, info.color)} onClick={() => startQuiz(key)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{info.label}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{info.desc}</div>
                </div>
                <span style={css.tag(info.color)}>{count} Q</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (screen === "quiz" && q) {
    const isCorr = selected === q.correct;
    const color = (SECTIONS[q.section] || {}).color || "#3B82F6";
    return (
      <div style={css.app}>
        <div style={css.hdr}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{ ...css.ghost, width: "auto", marginTop: 0, padding: "6px 12px", fontSize: 12 }} onClick={() => setScreen("menu")}>✕</button>
            <span style={{ fontSize: 12, color: "#9CA3AF" }}>Q{qIdx + 1}/{questions.length}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 120, height: 4, background: "#1f2937", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(qIdx / questions.length) * 100}%`, background: color, borderRadius: 2, transition: "width 0.3s" }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: timerColor, minWidth: 32 }}>{timer}s</span>
          </div>
        </div>
        <div style={{ height: 3, background: "#1f2937" }}>
          <div style={{ height: "100%", width: `${timerPct}%`, background: timerColor, transition: "width 1s linear" }} />
        </div>
        <div style={{ ...css.wrap, paddingTop: 20 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
            <span style={css.tag(color)}>{(SECTIONS[q.section] || {}).label || q.section}</span>
            <span style={{ ...css.tag(css.diffColor(q.difficulty)), textTransform: "capitalize" }}>{q.difficulty}</span>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.75, fontWeight: 600, color: "#F1F5F9", marginBottom: 22 }}>{q.q}</p>
          {q.opts.map((opt, i) => {
            const isSel = selected === i;
            const isC = i === q.correct;
            let suffix = "";
            if (showFb && isSel) suffix = isCorr ? " ✅" : " ❌";
            if (showFb && !isSel && isC) suffix = " ✅";
            return (
              <button key={i} style={css.opt(isSel, showFb, isCorr)} onClick={() => pick(i)}>
                <span style={{ fontWeight: 700, color, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
                {opt}{suffix}
              </button>
            );
          })}
          {timer === 0 && !showFb && (
            <div style={{ background: "#2d1f0a", border: "1px solid #F59E0B", borderRadius: 10, padding: "12px 16px", marginTop: 8 }}>
              <p style={{ margin: 0, fontSize: 13, color: "#FCD34D" }}>⏱ Time's up! Answer: <strong>{String.fromCharCode(65 + q.correct)}</strong></p>
            </div>
          )}
          {showFb && (
            <div style={{ background: isCorr ? "#0a2e1a" : "#2e0a0a", border: `1px solid ${isCorr ? "#10B981" : "#EF4444"}`, borderRadius: 12, padding: "14px 16px", marginTop: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: isCorr ? "#10B981" : "#EF4444", marginBottom: 6 }}>
                {isCorr ? "✓ CORRECT" : "✗ INCORRECT"}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: isCorr ? "#6EE7B7" : "#FCA5A5" }}>{q.exp}</p>
            </div>
          )}
          {showFb && <button style={css.btn(color)} onClick={next}>{qIdx + 1 < questions.length ? "Next Question →" : "See Results 🏆"}</button>}
        </div>
      </div>
    );
  }

  if (screen === "results") {
    const avgTime = Math.round(answers.reduce((s, a) => s + a.time, 0) / answers.length);
    const byDiff = (d) => answers.filter(a => a.difficulty === d);
    const diffPct = (d) => { const g = byDiff(d); return g.length ? Math.round(g.filter(a=>a.selected===a.correct).length/g.length*100) : null; };
    return (
      <div style={css.app}>
        <div style={css.hdr}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: "#4B5563", textTransform: "uppercase" }}>Results</span>
          <span style={{ fontSize: 12, color: "#6B7280" }}>{totalCorrect}/{answers.length}</span>
        </div>
        <div style={{ ...css.wrap, paddingTop: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 52, marginBottom: 8 }}>{pct >= 70 ? "🏆" : pct >= 50 ? "⭐" : "📚"}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: pct >= 70 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444" }}>{pct}%</div>
            <div style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>{totalCorrect}/{answers.length} correct · avg {avgTime}s/question</div>
            <div style={{ fontSize: 12, marginTop: 4, color: pct >= 70 ? "#10B981" : "#EF4444" }}>
              {pct >= 70 ? "✓ Above CFA passing threshold (~70%)" : "CFA requires ~70% — keep practicing!"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {["easy","medium","hard"].map(d => {
              const p = diffPct(d);
              if (p === null) return null;
              return <div key={d} style={{ flex:1, background:"#111827", border:"1px solid #1f2937", borderRadius:10, padding:"12px", textAlign:"center" }}>
                <div style={{ fontSize:10, color:css.diffColor(d), fontWeight:700, letterSpacing:2, marginBottom:4, textTransform:"uppercase" }}>{d}</div>
                <div style={{ fontSize:20, fontWeight:700, color:p>=70?"#10B981":"#EF4444" }}>{p}%</div>
              </div>;
            })}
          </div>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:"#4B5563", textTransform:"uppercase", marginBottom:10 }}>By Section</div>
          {Object.entries(stats).map(([sec, data]) => {
            const p = Math.round((data.correct / data.total) * 100);
            const color = (SECTIONS[sec] || {}).color || "#3B82F6";
            return (
              <div key={sec} style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:12, padding:"14px 16px", marginBottom:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:13, fontWeight:600 }}>{(SECTIONS[sec] || {}).label || sec}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:p>=70?"#10B981":"#EF4444" }}>{data.correct}/{data.total} ({p}%)</span>
                </div>
                <div style={{ height:4, background:"#1f2937", borderRadius:2, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${p}%`, background:p>=70?"#10B981":"#EF4444", borderRadius:2 }} />
                </div>
              </div>
            );
          })}
          <button style={css.btn()} onClick={() => setScreen("menu")}>← Back to Menu</button>
          <button style={css.ghost} onClick={() => startQuiz(section)}>🔄 Retry Same Section</button>
        </div>
      </div>
    );
  }
  return null;
}