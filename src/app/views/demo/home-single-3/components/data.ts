import type { CaseStudyType, FAQType, MemberType, ServiceType } from "@/types";

export const services: ServiceType[] = [
    {
        id:1,
        aos: 'flip-left',
        duration: 800,
        image: 'assets/img/all-images/service-img4.png',
        icon: 'assets/img/icons/service-icons1.svg',
        title: 'Electra Works Solutions',
        description: 'Explore our range of services below and discover how we can help future.',
    },
    {
        id:2,
        aos: 'flip-right',
        duration: 1000,
        image: 'assets/img/all-images/service-img5.png',
        icon: 'assets/img/icons/service-icons2.svg',
        title: 'Bright Beam Solutions',
        description: 'Explore our range of services below and discover how we can help future.',
    },
    {
        id:3,
        aos: 'flip-left',
        duration: 1200,
        image: 'assets/img/all-images/service-img6.png',
        icon: 'assets/img/icons/service-icons3.svg',
        title: 'Electri Core Services',
        description: 'Explore our range of services below and discover how we can help future.',
    }
];

export const caseStudyData: CaseStudyType[] = [
    { image: 'assets/img/all-images/case-img1.png', subtitle: 'Electicity Solutions', title: 'Power Navigating', },
    { image: 'assets/img/all-images/case-img2.png', subtitle: 'Voltage Vision', title: 'Power Navigating', },
    { image: 'assets/img/all-images/case-img3.png', subtitle: 'Wizard Unveiling', title: 'Power Navigating', },
    { image: 'assets/img/all-images/case-img1.png', subtitle: 'Electicity Solutions', title: 'Power Navigating', },
    { image: 'assets/img/all-images/case-img2.png', subtitle: 'Voltage Vision', title: 'Power Navigating', },
    { image: 'assets/img/all-images/case-img3.png', subtitle: 'Wizard Unveiling', title: 'Power Navigating', },
    { image: 'assets/img/all-images/case-img1.png', subtitle: 'Electicity Solutions', title: 'Power Navigating', },
    { image: 'assets/img/all-images/case-img2.png', subtitle: 'Voltage Vision', title: 'Power Navigating', },
    { image: 'assets/img/all-images/case-img3.png', subtitle: 'Wizard Unveiling', title: 'Power Navigating', }
];

export const teamMembers: MemberType[] = [
    {
        image: 'assets/img/all-images/team-img5.png',
        name: 'Kore Anderson',
        role: 'Sales Manager',
        aosDuration: 800,
    },
    {
        image: 'assets/img/all-images/team-img6.png',
        name: 'Zara Matheson',
        role: 'Team Leader',
        aosDuration: 1200,
    },
    {
        image: 'assets/img/all-images/team-img7.png',
        name: 'Kore Anderson',
        role: 'Sales Manager',
        aosDuration: 1400,
    }
];

export const faqs:FAQType[] = [
    {
        question: "What types of electricity plans do you offer?",
        answer: `Whether you're wondering about our pricing plans, process
               installation , or sustainability initiatives, we've got Best.`
    },
    {
        question: "How do I sign up for your electricity services?",
        answer: `Whether you're wondering about our pricing plans, process
               installation , or sustainability initiatives, we've got Best.`
    },
    {
        question: "Do you offer renewable energy options?",
        answer: `Whether you're wondering about our pricing plans, process
               installation , or sustainability initiatives, we've got Best.`
    },
    {
        question: "What are your billing and payment options?",
        answer: `Whether you're wondering about our pricing plans, process
               installation , or sustainability initiatives, we've got Best.`
    },
    {
        question: "What happens if there's a power outage?",
        answer: `Whether you're wondering about our pricing plans, process
               installation , or sustainability initiatives, we've got Best.`
    },
    {
        question: "What types of electricity plans do you offer?",
        answer: `Whether you're wondering about our pricing plans, process
               installation , or sustainability initiatives, we've got Best.`
    }
];
