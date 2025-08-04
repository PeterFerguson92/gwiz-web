
interface MenuItem {
    title: string;
    link?: string;
    subMenu?: MenuItem[];
    isOpen?: boolean
}
export const menuItems:MenuItem[] = [
    {
        "title": "Home",
        "link": "#",
        "isOpen":false,
        "subMenu": [
            {
                title:"Multiple page",
                subMenu:[
                    { "title": "Home One", "link": "/home-1"},
                    { "title": "Home Two", "link": "/home-2" },
                    { "title": "Home Three", "link": "/home-3" },
                    { "title": "Home Four", "link": "/home-4" },
                ]
            },
            {
                title:"Landing page",
                subMenu:[
                    { "title": "Home One", "link": "/home-single-1"},
                    { "title": "Home Two", "link": "/home-single-2" },
                    { "title": "Home Three", "link": "/home-single-3" },
                    { "title": "Home Four", "link": "/home-single-4" },
                ]
            }
           
        ]
    },
    {
        "title": "About",
        "link": "/about"
    },
    {
        "title": "Services",
        "isOpen":false,
        "link": "#",
        "subMenu": [
            { "title": "Service One", "link": "/services/one" },
            { "title": "Service Left", "link": "/services/left" },
            { "title": "Service Right", "link": "/services/right" },
            { "title": "Service Single", "link": "/services/single" }
        ]
    },
    {
        "title": "Blogs",
        "link": "#",
        "isOpen":false,
        "subMenu": [
            { "title": "Blog One", "link": "/blogs/one" },
            { "title": "Blog Sidebar", "link": "/blogs/sidebar" },
            { "title": "Blog Left", "link": "/blogs/left" },
            { "title": "Blog Right", "link": "/blogs/right" },
            { "title": "Blog Single", "link": "/blogs/single" }
        ]
    },
    {
        "title": "Pages",
        "link": "#",
        "isOpen":false,
        "subMenu": [
            { "title": "Case Study One", "link": "/case-study-1" },
            { "title": "Case Study Left", "link": "/case-study-left" },
            { "title": "Case Study Right", "link": "/case-study-Right" },
            { "title": "Case Study Single", "link": "/case-study-single" },
            { "title": "Our Team", "link": "/our-team" },
            { "title": "Pricing Plan", "link": "/pricing-plan" },
            { "title": "Testimonials", "link": "/testimonials" },
            { "title": "FAQ", "link": "/faq" },
            { "title": "404", "link": "/404" },
        ]
    },
    {
        "title": "ContactUs",
        "link": "/contact-us"
    }, 
    
]


