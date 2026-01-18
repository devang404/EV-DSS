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

export const generateScenarioResponse = (query: string, ctx: ScenarioContext): string => {
    const lowerQuery = query.toLowerCase();

    // 1. Economic / Decision Impact
    if (
        lowerQuery.includes("affect") ||
        lowerQuery.includes("decision") ||
        lowerQuery.includes("parameter") ||
        lowerQuery.includes("factors")
    ) {
        const savings = ctx.savings || 0;
        const isPositive = savings > 0;
        const betterChoice = isPositive ? "EV" : "Internal Combustion Engine (ICE)";

        return `Based on these parameters, the **${betterChoice}** is financially favorable.
    
• **Net Savings:** ₹${Math.abs(savings).toLocaleString('en-IN')} over the ownership period.
• **Running Costs:** Petrol at ₹${ctx.petrolPrice}/L is significantly more expensive than Electricity at ₹${ctx.electricityRate}/kWh.
• **Key Factor:** The high upfront cost of the EV is offset by these running savings over time.`;
    }

    // 2. Break-even / Economical Timing
    if (
        lowerQuery.includes("economical") ||
        lowerQuery.includes("break") ||
        lowerQuery.includes("even") ||
        lowerQuery.includes("long") ||
        lowerQuery.includes("time")
    ) {
        const subsidyMsg = ctx.evSubsidy > 0
            ? `A subsidy of ₹${ctx.evSubsidy.toLocaleString('en-IN')} is factored in, accelerating the payback.`
            : "No subsidy is applied in this scenario.";

        return `**Break-even Analysis:**
    
• It takes approximately **${ctx.breakEven} years** for the EV's fuel savings to cover its higher purchase price.
• ${subsidyMsg}
• After year ${ctx.breakEven}, every kilometer driven is pure savings compared to a petrol vehicle.`;
    }

    // 3. Environmental Impact
    if (
        lowerQuery.includes("environment") ||
        lowerQuery.includes("impact") ||
        lowerQuery.includes("co2") ||
        lowerQuery.includes("emission") ||
        lowerQuery.includes("green")
    ) {
        const co2 = ctx.co2Savings || 0;
        const gridMsg = ctx.gridCO2Factor > 700
            ? "The grid is currently carbon-heavy, but EVs still typically emit less lifetime CO₂ than ICEs."
            : "With a cleaner grid, the environmental benefits of the EV are maximized.";

        return `**Environmental Snapshot:**
    
• **CO₂ Avoided:** ${co2.toLocaleString()} kg over the vehicle's lifetime.
• **Grid Impact:** Modeled with a Grid CO₂ Factor of ${ctx.gridCO2Factor} g/kWh.
• ${gridMsg}`;
    }

    // 4. Fallback / General Summary
    return `Here is the summary of your current scenario:

• **Recommendation:** ${ctx.evRecommended ? "Go Electric (EV)" : "Stay with Petrol (ICE)"}
• **Total Analysis:** EV TCO is ₹${(ctx.evTCO || 0).toLocaleString('en-IN')} vs ICE TCO of ₹${(ctx.iceTCO || 0).toLocaleString('en-IN')}.
• **Environment:** Reducing emissions by ${(ctx.co2Savings || 0).toLocaleString()} kg.

Try asking about "break-even point", "environmental impact", or "decision factors" for more details.`;
};
