export interface Service {
    id: string;
    name: string;
    description: string;
    icon: string;
    deliverables?: string[];
}

export interface ServiceCategory {
    id: string;
    name: string;
    shortName: string;
    description: string;
    icon: string;
    services: Service[];
    certifications?: string[];
    frameworks?: string[];
}

export interface TrainingProgram {
    id: string;
    title: string;
    duration: string;
    audience: string;
    outcome?: string;
    certification?: string;
    focus?: string;
}

export interface TrainingCategory {
    id: string;
    name: string;
    description: string;
    programs: TrainingProgram[];
}
