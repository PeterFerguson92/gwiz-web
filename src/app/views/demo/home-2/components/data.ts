import type { BlogType, CaseStudyType, FAQType, MemberType, TestimonialType } from "@/types";

const caseStudies:CaseStudyType[] = [
    {
        image: 'assets/img/all-images/case-img7.png',
        icon: 'assets/img/icons/case-icons1.svg',
        title: 'Eco-Electric Chronicles',
        description: 'Explore our range of services below & discover how.',
        duration: 800,
    },
    {
        image: 'assets/img/all-images/case-img8.png',
        icon: 'assets/img/icons/case-icons2.svg',
        title: 'Bright Spark Services',
        description: 'Explore our range of services below & discover how.',
        duration: 1000,
    },
    {
        image: 'assets/img/all-images/case-img9.png',
        icon: 'assets/img/icons/case-icons3.svg',
        title: 'Best Power and Progress',
        description: 'Explore our range of services below & discover how.',
        duration: 1200,
    }
];


const teamMembers: MemberType[] = [
    {
        image: 'assets/img/all-images/team-img1.png',
        name: 'Shoaib Bashir',
        role: 'Sales Manager',
        aosDuration: 800,
    },
    {
        image: 'assets/img/all-images/team-img3.png',
        name: 'Reece Toply',
        role: 'Team Leader',
        aosDuration: 1200,
    },
    {
        image: 'assets/img/all-images/team-img4.png',
        name: 'Robert Anderson',
        role: 'Sales Manager',
        aosDuration: 1400,
    }
];

const testimonials:TestimonialType[] = [
    {
        rating: 5,
        description: '“Discover why our customers love our electricity services Read testimonials from satisfied clients who have experienced the reliability, efficiency, and excellence”',
        image: 'assets/img/all-images/testimonial-img10.png',
        name: 'Richardson',
        role: 'Team Leader',
    },
    {
        rating: 5,
        description: '“Discover why our customers love our electricity services Read testimonials from satisfied clients who have experienced the reliability, efficiency, and excellence”',
        image: 'assets/img/all-images/testimonial-img11.png',
        name: 'Issuant Sharma',
        role: 'Team Leader',
    },
    {
        rating: 5,
        description: '“Discover why our customers love our electricity services Read testimonials from satisfied clients who have experienced the reliability, efficiency, and excellence”',
        image: 'assets/img/all-images/testimonial-img10.png',
        name: 'Richardson',
        role: 'Team Leader',
    },
    {
        rating: 5,
        description: '“Discover why our customers love our electricity services Read testimonials from satisfied clients who have experienced the reliability, efficiency, and excellence”',
        image: 'assets/img/all-images/testimonial-img11.png',
        name: 'Issuant Sharma',
        role: 'Team Leader',
    },
];

const faqs: FAQType[] = [
    {
        question: 'What types of electricity plans do you offer?',
        answer: 'We understand that navigating the world of electricity services can <br> be daunting, which is why we\'ve compiled this comprehensive.',
    },
    {
        question: 'How do I sign up for your electricity services?',
        answer: 'We understand that navigating the world of electricity services can <br> be daunting, which is why we\'ve compiled this comprehensive.',
    },
    {
        question: 'What happens if there\'s a power outage?',
        answer: 'We understand that navigating the world of electricity services can <br> be daunting, which is why we\'ve compiled this comprehensive.',
    },
    {
        question: 'How can I track my energy usage with your services?',
        answer: 'We understand that navigating the world of electricity services can <br> be daunting, which is why we\'ve compiled this comprehensive.',
    },
    {
        question: 'Do you offer any discounts or promotions for new customers?',
        answer: 'We understand that navigating the world of electricity services can <br> be daunting, which is why we\'ve compiled this comprehensive.',
    },
    {
        question: 'What types of electricity plans do you offer?',
        answer: 'We understand that navigating the world of electricity services can <br> be daunting, which is why we\'ve compiled this comprehensive.',
    }
];

const blogs: BlogType[] = [
    {
        image: 'assets/img/all-images/blog-img10.png',
        title: 'Exploring Energy Solutions Eco-Electric Insights',
        description: 'Welcome to our electricity services blog! Stay informed and inspired.',
        date: 'Apr 20, 2024',
    },
    {
        image: 'assets/img/all-images/blog-img11.png',
        title: 'Illuminating Energy Trends Power Perspectives',
        description: "Whether you're a homeowner looking to reduce your energy bills, a business",
        date: 'Apr 20, 2024',
    },
    {
        image: 'assets/img/all-images/blog-img12.png',
        title: 'Spark Connections: Engage with Our Energy',
        description: 'Join us as we explore topics ranging from renewable energy sources',
        date: 'Apr 20, 2024',
    }
];

export { caseStudies, teamMembers, testimonials, faqs, blogs }