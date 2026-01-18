export interface ScenarioContext {
    petrolPrice: number;
    electricityRate: number;
    chargingCost: number;
    gridCO2Factor: number;
    evSubsidy: number;
    evPriceReduction: number;
    showGreenGrid: boolean;
    evTCO?: number;
    iceTCO?: number;
    savings?: number;
    breakEven?: string;
    co2Savings?: number;
    evRecommended?: boolean;
}

const INAPPROPRIATE_TERMS = ["stupid", "dumb", "idiot", "sex", "porn", "kill", "hate", "fuck", "shit", "shut up"];

export const generateScenarioResponse = (query: string, ctx: ScenarioContext): string => {
    const lowerQuery = query.toLowerCase();

    // 0. Safety / Professionalism Check
    if (INAPPROPRIATE_TERMS.some(term => lowerQuery.includes(term))) {
        return "I am a professional EV Decision Support Advisor. I am here to help you analyze economic and environmental data. Please ask questions related to your vehicle scenario.";
    }

    // 1. Handling "What If" / Hypotheticals
    // Matches: "what if", "change rate", "set price", "rate is", "price is", "hypothetical"
    if (/(what if|change|set|hypothetical|rate is|price is|electricity is|petrol is)/i.test(lowerQuery)) {
        return `🛠️ **Scenario Adjustment**\n\nI analyze the *current* settings on your screen. I cannot change them for you.\n\n👉 **Action:** Please adjust the sliders on the dashboard (left side) to test this new value. I will instantly update my analysis based on your new input!`;
    }

    // 2. Break-even / Economical Timing (Prioritized over generic 'money')
    // Matches: "break even", "break-even", "how long", "time to recover", "years", "payback"
    if (/(break\s*even|how long|time|year|recover|payback)/i.test(lowerQuery)) {
        return `⏱️ **Break-even Analysis**\n\nThe "Break-even Point" is when your fuel savings equal the extra cost of buying the EV.\n\n• **Your Point:** **${ctx.breakEven} years**.\n• **Context:** If you plan to keep the vehicle longer than ${ctx.breakEven} years, you will profit. If you sell before then, the ICE was cheaper.`;
    }

    // 3. Environmental Impact
    // Matches: "environment", "planet", "nature", "green", "co2", "emission", "clean", "pollution", "carbon"
    if (/(environment|planet|nature|green|co2|emission|clean|pollution|carbon)/i.test(lowerQuery)) {
        return `🌱 **Environmental Audit**\n\n• **Lifetime CO₂ Saved:** ${ctx.co2Savings?.toLocaleString()} kg\n• **Grid Reality:** Indian grid intensity is ~${ctx.gridCO2Factor} gCO₂/kWh.\n\n**Verdict:** Even with coal-based power, EVs are cleaner because electric motors are ~85-90% efficient vs ICE engines which are only ~20-30% efficient.`;
    }

    // 4. Economic / Decision Impact
    // Matches: "should", "switch", "buy", "better", "worth", "decision", "affect", "cost", "money", "save", "financial", "wallet"
    if (/(should|switch|buy|better|worth|decision|affect|cost|money|save|financial|wallet|cheaper|expensive)/i.test(lowerQuery)) {
        const savings = ctx.savings || 0;
        const isPositive = savings > 0;

        if (isPositive) {
            return `✅ **Recommendation: Switch to EV**\n\n**Reliability Score: High**\nBased on your inputs (driving ${ctx.petrolPrice} ₹/L vs ${ctx.electricityRate} ₹/kWh), the EV is the clear financial winner.\n\n• **Net Benefit:** You save **₹${Math.abs(savings).toLocaleString('en-IN')}**.\n• **Why:** The high running cost of petrol outweighs the initial EV premium within ${ctx.breakEven} years.`;
        } else {
            return `⚠️ **Recommendation: Stick with ICE (For Now)**\n\n**Reliability Score: Moderate**\nCurrently, the EV's higher upfront cost isn't fully recovered by fuel savings.\n\n• **Deficit:** The EV costs **₹${Math.abs(savings).toLocaleString('en-IN')}** more overall.\n• **Tip:** Try increasing your "Daily Commute" or checking if a higher "Subsidy" is available to flip the decision.`;
        }
    }

    // 5. Specific Parameter Explainers
    if (/(subsidy|subsidies|incentive)/i.test(lowerQuery)) {
        return `💰 **Subsidy Impact**\n\nCurrent Subsidy: **₹${ctx.evSubsidy.toLocaleString('en-IN')}**\n\nThis directly reduces the "sticker shock" of the EV. Without this subsidy, your break-even period would increase significantly.`;
    }

    if (/(petrol|fuel|gas)/i.test(lowerQuery)) {
        return `⛽ **Petrol Context**\n\nCurrent Price: **₹${ctx.petrolPrice}/L**\n\nPetrol prices are historically volatile. If this price rises, the EV advantage grows even stronger.`;
    }

    // 6. Fallback / General Summary
    return `📊 **Scenario Summary**\n\nI didn't quite catch that specific question, but here is your current status:\n\n• **Decision:** ${ctx.evRecommended ? "Go Electric ⚡" : "Keep ICE ⛽"}\n• **360° View:** You save ₹${(ctx.savings || 0).toLocaleString('en-IN')} and reduce CO₂ by ${(ctx.co2Savings || 0).toLocaleString()}kg.\n\nTry asking: "What if I drive more?", "Should I switch?", or "Explain emissions".`;
};
