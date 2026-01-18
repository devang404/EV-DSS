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

    // 1. Handling "What If" / Hypotheticals (The DSS Boundary)
    // The bot cannot change the state, so it must guide the user to the UI.
    if (
        lowerQuery.includes("what if") ||
        lowerQuery.includes("change") ||
        lowerQuery.includes("set") ||
        lowerQuery.includes("hypothetical") ||
        lowerQuery.includes("rate is") ||
        lowerQuery.includes("price is")
    ) {
        return `🛠️ **Scenario Adjustment**\n\nI analyze the *current* settings on your screen. I cannot change them for you.\n\n👉 **Action:** Please adjust the sliders on the dashboard (left side) to test this new value. I will instantly update my analysis based on your new input!`;
    }

    // 2. Economic / Decision Impact (Expanded Keywords)
    if (
        lowerQuery.includes("should") ||
        lowerQuery.includes("switch") ||
        lowerQuery.includes("buy") ||
        lowerQuery.includes("better") ||
        lowerQuery.includes("worth") ||
        lowerQuery.includes("decision") ||
        lowerQuery.includes("affect") ||
        lowerQuery.includes("cost") ||
        lowerQuery.includes("money") ||
        lowerQuery.includes("save")
    ) {
        const savings = ctx.savings || 0;
        const isPositive = savings > 0;

        // Detailed Reliance Logic
        if (isPositive) {
            return `✅ **Recommendation: Switch to EV**\n\n**Reliability Score: High**\nBased on your inputs (driving ${ctx.petrolPrice} ₹/L vs ${ctx.electricityRate} ₹/kWh), the EV is the clear financial winner.\n\n• **Net Benefit:** You save **₹${Math.abs(savings).toLocaleString('en-IN')}**.\n• **Why:** The high running cost of petrol outweighs the initial EV premium within ${ctx.breakEven} years.`;
        } else {
            return `⚠️ **Recommendation: Stick with ICE (For Now)**\n\n**Reliability Score: Moderate**\nCurrently, the EV's higher upfront cost isn't fully recovered by fuel savings.\n\n• **Deficit:** The EV costs **₹${Math.abs(savings).toLocaleString('en-IN')}** more overall.\n• **Tip:** Try increasing your "Daily Commute" or checking if a higher "Subsidy" is available to flip the decision.`;
        }
    }

    // 3. Break-even / Economical Timing
    if (
        lowerQuery.includes("break") ||
        lowerQuery.includes("even") ||
        lowerQuery.includes("long") ||
        lowerQuery.includes("time") ||
        lowerQuery.includes("year") ||
        lowerQuery.includes("recover")
    ) {
        return `⏱️ **Break-even Analysis**\n\nThe "Break-even Point" is when your fuel savings equal the extra cost of buying the EV.\n\n• **Your Point:** **${ctx.breakEven} years**.\n• **Context:** If you plan to keep the vehicle longer than ${ctx.breakEven} years, you will profit. If you sell before then, the ICE was cheaper.`;
    }

    // 4. Environmental Impact
    if (
        lowerQuery.includes("environment") ||
        lowerQuery.includes("nature") ||
        lowerQuery.includes("green") ||
        lowerQuery.includes("co2") ||
        lowerQuery.includes("emission") ||
        lowerQuery.includes("clean")
    ) {
        return `🌱 **Environmental Audit**\n\n• **Lifetime CO₂ Saved:** ${ctx.co2Savings?.toLocaleString()} kg\n• **Grid Reality:** Indian grid intensity is ~${ctx.gridCO2Factor} gCO₂/kWh.\n\n**Verdict:** Even with coal-based power, EVs are cleaner because electric motors are ~85-90% efficient vs ICE engines which are only ~20-30% efficient.`;
    }

    // 5. Specific Parameter Explainers
    if (lowerQuery.includes("subsidy")) {
        return `💰 **Subsidy Impact**\n\nCurrent Subsidy: **₹${ctx.evSubsidy.toLocaleString('en-IN')}**\n\nThis directly reduces the "sticker shock" of the EV. Without this subsidy, your break-even period would increase significantly.`;
    }

    if (lowerQuery.includes("petrol")) {
        return `⛽ **Petrol Context**\n\nCurrent Price: **₹${ctx.petrolPrice}/L**\n\nPetrol prices are historically volatile. If this price rises, the EV advantage grows even stronger.`;
    }

    // 6. Fallback / General Summary
    return `📊 **Scenario Summary**\n\nI didn't quite catch that specific question, but here is your current status:\n\n• **Decision:** ${ctx.evRecommended ? "Go Electric ⚡" : "Keep ICE ⛽"}\n• **360° View:** You save ₹${(ctx.savings || 0).toLocaleString('en-IN')} and reduce CO₂ by ${(ctx.co2Savings || 0).toLocaleString()}kg.\n\nTry asking: "What if I drive more?", "Should I switch?", or "Explain emissions".`;
};
