import type { ServiceType } from "@/types";
import type { BlogType } from "./types";

const serviceData: ServiceType[] = [
    {
        duration: 800,
        image: 'assets/img/all-images/service-img1.png',
        id: 1,
        title: 'Bright Spark Services',
        description: 'Explore our range of services below & discover how you power your life',
    },
    {
        duration: 1000,
        image: 'assets/img/all-images/service-img2.png',
        id: 2,
        title: 'Energy Ease Packages',
        description: 'With cutting-edge technology & industry expertise, we empower',
    },
    {
        duration: 1200,
        image: 'assets/img/all-images/service-img3.png',
        id: 3,
        title: 'Electra Care Packages',
        description: 'Our team of experts is committed to delivering high-quality services',
    },
]

const workData = [{
    id: 1,
    icon: 'assets/img/icons/work1.svg',
    duration: 800,
    title: 'Power Path Unveiling Our Process',
    image: 'assets/img/all-images/work-img1.png',
    description: 'Our process begins with a thorough assessment of energy needs and goals. Once we understand your requirements, we work closely with you to develop.'
},
{
    id: 2,
    icon: 'assets/img/icons/work2.svg',
    title: 'Electro Flow Decoding Our Method',
    duration: 1000,
    image: 'assets/img/all-images/work-img1.png',
    description: 'Our process begins with a thorough assessment of energy needs and goals. Once we understand your requirements, we work closely with you to develop.'
},
{
    id: 3,
    icon: 'assets/img/icons/work3.svg',
    title: 'Energetic Engine Behind Scenes',
    image: 'assets/img/all-images/work-img1.png',
    duration: 1200,
    description: 'Our process begins with a thorough assessment of energy needs and goals. Once we understand your requirements, we work closely with you to develop.'
},
{
    id: 4,
    icon: 'assets/img/icons/work4.svg',
    title: 'Watt Works Discover Operations',
    duration: 1400,
    image: 'assets/img/all-images/work-img1.png',
    description: 'Our process begins with a thorough assessment of energy needs and goals. Once we understand your requirements, we work closely with you to develop.'
}]

const teamMembers = [
    {
        name: 'Shoaib Bashir',
        role: 'Sales Manager',
        image: 'assets/img/all-images/team-img1.png',
    },
    {
        name: 'William Thompson',
        role: 'Product Manager',
        image: 'assets/img/all-images/team-img2.png',
    },
    {
        name: 'Reece Toply',
        role: 'Team Leader',
        image: 'assets/img/all-images/team-img3.png',
    },
    {
        name: 'Robert Anderson',
        role: 'Sales Manager',
        image: 'assets/img/all-images/team-img4.png',
    }
];

const faqData = [
    {
        question: "How do I sign up for your electricity services?",
        answer: "Whether you're wondering about our pricing plans, process installation , or sustainability initiatives."
    },
    {
        question: "What types of electricity plans do you offer?",
        answer: "Whether you're wondering about our pricing plans, process installation , or sustainability initiatives."
    },
    {
        question: "What are your billing and payment options?",
        answer: "Whether you're wondering about our pricing plans, process installation , or sustainability initiatives."
    },
    {
        question: "How can I track my energy usage with your services?",
        answer: "Whether you're wondering about our pricing plans, process installation , or sustainability initiatives."
    }
];


const blogs: BlogType[] = [
    {
        image: 'assets/img/all-images/blog-img1.png',
        title: 'Electrifying Reads Explore Our Electricity',
        date: 'April 2, 2024',
        category: 'Electricity Corner',
        description: 'Are you considering studying abroad and embarking on an visa to',
        aos: 'flip-left',
        duration: 800
    },
    {
        image: 'assets/img/all-images/blog-img2.png',
        title: 'Empowering Energy Dive into Our Electricity',
        date: 'April 2, 2024',
        category: 'Electricity Corner',
        description: 'From understanding our pricing plans to learning about our renewable',
        aos: 'flip-right',
        duration: 1000
    },
    {
        image: 'assets/img/all-images/blog-img3.png',
        title: 'Electricity Explained: Bloggin Power of Tomorrow',
        date: 'April 2, 2024',
        category: 'Electricity Corner',
        description: "We're committed to ensuring that you have all the information you need.",
        aos: 'flip-left',
        duration: 1200
    }
];

const testimonialData = [
    {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img2.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
    },
    {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img3.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
    },
    {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img4.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
    },
    {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img5.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
    },
    {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img1.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
    },
    {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img2.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
    },
    {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img3.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
    },
    {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img4.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
      },
      {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img5.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
      },
      {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img2.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
      },
      {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img1.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
      },
      {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img2.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
      },
      {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img3.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
      },
      {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img4.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
      },
      {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img5.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
      },
      {
        message: `“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how to work we've helped businesses thrive client.`,
        authorImg: 'assets/img/all-images/testimonial-img2.png',
        name: 'Shakib Mahmud',
        role: 'Happy Client',
      }
]

export { serviceData, workData, teamMembers, faqData, blogs,testimonialData }