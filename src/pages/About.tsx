
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    Layers,
    Database,
    Brain,
    MessageSquare,
    ArrowDown,
    ArrowRight,
    Zap,
    Calculator,
    BarChart3,
    GitBranch,
    Sparkles,
    Server,
    Code,
    ChevronRight,
    User,
    Mail,
    Linkedin,
    Target,
    FileText,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Project Data (Placeholders for PDF content) ---
const projectIntro = "The Electric Vehicle Decision Support System (EV-DSS) is a comprehensive platform designed to facilitate the transition from Internal Combustion Engine (ICE) vehicles to Electric Vehicles (EVs). It provides data-driven insights through TCO analysis, environmental impact assessment, and infrastructure readiness evaluation.";
const projectScope = [
    "Comparative Total Cost of Ownership (TCO) Analysis.",
    "Environmental Impact Assessment (CO2 Emissions).",
    "City-wise EV Readiness Clustering.",
    "Interactive What-If Scenario Modeling."
];
const projectObjectives = [
    "To empower consumers with accurate economic data.",
    "To visualize the environmental benefits of EV adoption.",
    "To assess infrastructure gaps across varying geographies.",
    "To provide a user-friendly decision support interface."
];

// --- Team Data (Placeholders) ---
const teamMembers = [
    {
        name: "Devang Nadkarni",
        role: "System Architect Developer",
        email: "nadkarnidevang@example.com", // Placeholder
        linkedin: "www.linkedin.com/in/devang-nadkarni-79066a319", // Placeholder
        contribution: "Full stack development, System Architecture design, ML Model integration, and Deployment pipeline.",

    },
    {
        name: "Yuvraj Mangutkar",
        role: "Data Scientist / ML Engineer",
        email: "mangutkaryuvraj@gmail.com",
        linkedin: "https://www.linkedin.com/in/yuvraj-mangutkar/",
        contribution: "Data collection, Preprocessing, Feature Engineering, and training of K-Means and Regression models.",

    },
    {
        name: "Chaitanya Naik",
        role: "Frontend Developer / UI/UX",
        email: "chaitanya_naik_aids@moderncoe.edu.in",
        linkedin: "linkedin.com/in/chaitanya-naik-82b44a2b8",
        contribution: "UI Design, Dashboard implementation, and User Experience optimization.",

    },
    {
        name: "Manav Konde",
        role: "Research & Documentation",
        email: "manavkonde01@gmail.com",
        linkedin: "linkedin.com/in/manav-konde-9b23242b1",
        contribution: "Market research, Literature review, and Requirement analysis.",

    }
];

// --- Architecture Data (Migrated) ---
const layers = [
    {
        id: "deterministic",
        name: "Layer 1: Deterministic Core",
        icon: Calculator,
        color: "primary",
        description: "Physics-based calculations with India-specific parameters",
        components: [
            { name: "Cost Calculator", desc: "TCO, running costs, break-even analysis" },
            { name: "Emission Calculator", desc: "CO₂/km based on grid and fuel type" },
            { name: "Energy Model", desc: "kWh/km efficiency calculations" },
        ],
        inputs: ["Vehicle specs", "Energy prices", "Grid CO₂ factors", "Tariff structures"],
        outputs: ["Cost per km", "TCO", "CO₂ emissions", "Break-even point"],
    },
    {
        id: "ml",
        name: "Layer 2: ML Intelligence",
        icon: Brain,
        color: "ev",
        description: "Machine learning models for pattern recognition and clustering",
        components: [
            { name: "City Clustering (K-Means)", desc: "EV-Ready, Moderate, Low-Infra classification" },
            { name: "Random Forest Classifier", desc: "City readiness prediction" },
            { name: "Regression Models", desc: "Price and adoption forecasting" },
        ],
        inputs: ["City infrastructure data", "Economic indicators", "Environmental metrics"],
        outputs: ["City clusters", "Readiness scores", "Economic/Environmental indices"],
    },
    {
        id: "ai",
        name: "Layer 3: AI Explanation",
        icon: MessageSquare,
        color: "info",
        description: "Natural language generation for human-readable insights",
        components: [
            { name: "Context Engine", desc: "Aggregates all model outputs" },
            { name: "Insight Generator", desc: "Creates actionable recommendations" },
            { name: "Narrative Builder", desc: "Formats explanations for users" },
        ],
        inputs: ["Calculation results", "ML predictions", "User context"],
        outputs: ["Natural language explanations", "Recommendations", "Decision support"],
    },
];

const dataFlow = [
    { from: "User Input", to: "Deterministic Core", type: "input" },
    { from: "Deterministic Core", to: "ML Intelligence", type: "data" },
    { from: "ML Intelligence", to: "AI Explanation", type: "insights" },
    { from: "AI Explanation", to: "User Interface", type: "output" },
];

const techStack = [
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Recharts"] },
    { category: "Backend", items: ["Supabase", "Edge Functions", "PostgreSQL"] },
    { category: "ML/AI", items: ["Python", "Scikit-learn", "NumPy", "Pandas"] },
    { category: "Data", items: ["Government APIs", "Energy databases", "Vehicle catalogs"] },
];

const About = () => {

    const getColorClasses = (color: string) => {
        switch (color) {
            case "ev":
                return {
                    bg: "bg-ev/10",
                    border: "border-ev/30",
                    text: "text-ev",
                    gradient: "gradient-ev",
                };
            case "info":
                return {
                    bg: "bg-info/10",
                    border: "border-info/30",
                    text: "text-info",
                    gradient: "bg-gradient-to-r from-info to-primary",
                };
            default:
                return {
                    bg: "bg-primary/10",
                    border: "border-primary/30",
                    text: "text-primary",
                    gradient: "gradient-primary",
                };
        }
    };

    return (
        <MainLayout>
            <PageHeader
                title="About The Project"
                description="Overview, Architecture, and Team behind the EV Decision Support System"
            >
                <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Team & Project
                </Badge>
            </PageHeader>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 max-w-[600px]">
                    <TabsTrigger value="overview" className="gap-2"><FileText className="h-4 w-4" /> Overview</TabsTrigger>
                    <TabsTrigger value="architecture" className="gap-2"><Layers className="h-4 w-4" /> Architecture</TabsTrigger>
                    <TabsTrigger value="team" className="gap-2"><Users className="h-4 w-4" /> Team</TabsTrigger>
                </TabsList>

                {/* --- OVERVIEW TAB --- */}
                <TabsContent value="overview">
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Introduction</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">{projectIntro}</p>
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-ev" /> Scope</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {projectScope.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <ChevronRight className="h-4 w-4 mt-0.5 text-ev flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-info" /> Objectives</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {projectObjectives.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <ChevronRight className="h-4 w-4 mt-0.5 text-info flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* --- ARCHITECTURE TAB --- */}
                <TabsContent value="architecture">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Layers className="h-5 w-5 text-primary" />
                                System Architecture
                            </CardTitle>
                            <CardDescription>Three-layer Decision Support System architecture</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center gap-4">
                                {/* User Input */}
                                <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
                                    <Code className="h-4 w-4" />
                                    <span className="font-medium">User Input</span>
                                </div>
                                <ArrowDown className="h-6 w-6 text-muted-foreground" />

                                {/* Layers */}
                                <div className="w-full space-y-4">
                                    {layers.map((layer, index) => {
                                        const colors = getColorClasses(layer.color);
                                        return (
                                            <div key={layer.id}>
                                                <Card className={cn("overflow-hidden", colors.border, colors.bg)}>
                                                    <CardContent className="p-6">
                                                        <div className="flex items-start gap-4">
                                                            <div className={cn("rounded-xl p-3", colors.gradient)}>
                                                                <layer.icon className="h-6 w-6 text-white" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <h3 className="font-bold text-lg">{layer.name}</h3>
                                                                    <Badge variant="outline" className={colors.text}>
                                                                        {layer.id === "deterministic" ? "Physics-Based" : layer.id === "ml" ? "Data-Driven" : "AI-Powered"}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground mb-4">{layer.description}</p>

                                                                <div className="grid gap-4 md:grid-cols-3">
                                                                    {/* Components */}
                                                                    <div>
                                                                        <h4 className="text-sm font-medium mb-2 flex items-center gap-1"><Server className="h-3 w-3" /> Components</h4>
                                                                        <ul className="space-y-1">
                                                                            {layer.components.map((comp) => (
                                                                                <li key={comp.name} className="text-xs text-muted-foreground flex items-start gap-1">
                                                                                    <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                                                                    <span><span className="font-medium text-foreground">{comp.name}</span>: {comp.desc}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                    {/* Inputs */}
                                                                    <div>
                                                                        <h4 className="text-sm font-medium mb-2 flex items-center gap-1"><ArrowRight className="h-3 w-3 rotate-180" /> Inputs</h4>
                                                                        <ul className="space-y-1">
                                                                            {layer.inputs.map((input) => (
                                                                                <li key={input} className="text-xs text-muted-foreground flex items-center gap-1">
                                                                                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                                                                    {input}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                    {/* Outputs */}
                                                                    <div>
                                                                        <h4 className="text-sm font-medium mb-2 flex items-center gap-1"><ArrowRight className="h-3 w-3" /> Outputs</h4>
                                                                        <ul className="space-y-1">
                                                                            {layer.outputs.map((output) => (
                                                                                <li key={output} className={cn("text-xs flex items-center gap-1", colors.text)}>
                                                                                    <Sparkles className="h-3 w-3" />
                                                                                    {output}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                {index < layers.length - 1 && (
                                                    <div className="flex justify-center py-2">
                                                        <ArrowDown className="h-6 w-6 text-muted-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <ArrowDown className="h-6 w-6 text-muted-foreground" />
                                {/* User Interface */}
                                <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
                                    <BarChart3 className="h-4 w-4" />
                                    <span className="font-medium">Interactive Dashboard</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Flow & Tech Stack */}
                    <div className="grid gap-6 lg:grid-cols-2 mb-8">
                        {/* Data Flow */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><GitBranch className="h-5 w-5 text-primary" /> Data Flow</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {dataFlow.map((flow, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                                <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline">{flow.from}</Badge>
                                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                                    <Badge variant="secondary">{flow.to}</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1 capitalize">{flow.type} transfer</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tech Stack */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Code className="h-5 w-5 text-primary" /> Technology Stack</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    {techStack.map((stack) => (
                                        <div key={stack.category}>
                                            <h4 className="text-sm font-medium mb-2">{stack.category}</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {stack.items.map((item) => (
                                                    <Badge key={item} variant="secondary" className="text-xs">{item}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* --- TEAM TAB --- */}
                <TabsContent value="team">
                    <div className="grid md:grid-cols-2 gap-6">
                        {teamMembers.map((member, i) => (
                            <Card key={i} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{member.name}</CardTitle>
                                            <div className="text-sm text-ev font-medium mt-1">{member.role}</div>
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border">
                                            {member.image ? <img src={member.image} alt={member.name} className="h-full w-full object-cover" /> : <User className="h-5 w-5 text-slate-400" />}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-sm text-muted-foreground">
                                        <span className="font-semibold text-foreground">Contribution:</span> {member.contribution}
                                    </div>
                                    <Separator />
                                    <div className="flex gap-2">
                                        <a href={`mailto:${member.email}`} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                                            <Mail className="h-3 w-3" /> {member.email}
                                        </a>
                                        {member.linkedin !== "#" && (
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-[#0077b5] flex items-center gap-1 transition-colors ml-auto">
                                                <Linkedin className="h-3 w-3" /> LinkedIn
                                            </a>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </MainLayout>
    );
};

export default About;
