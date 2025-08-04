export type FAQType = {
    question: string;
    answer: string
    duration?:number
}

export type MemberType = {
    name: string;
    role: string;
    image: string;
    aosDuration?: number;
}

export type BlogType = {
    image: string;
    author?:string;
    authorRole?:string;
    authorImg?:string;
    title: string;
    description?: string;
    date: string;
    aosDuration?: number;
}

export type ServiceType = {
    id:number;
    image?: string;
    aos?: string;
    title: string;
    icon?: string;
    description: string;
    duration?: number;
}

export type CaseStudyType = {
    image: string;
    subtitle?: string;
    title: string;
    duration?: number;
    icon?:string;
    description?:string;
}

export type TestimonialType = {
    image?: string;
    name: string;
    role: string;
    description?: string;
    message?:string;
    authorImg?:string;
    rating?:number
}

export type PricingPlanType = {
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;
    billingNote: string;
    title: string;
    features: string[];
    active: boolean;
    aos: string;
    duration: number
}