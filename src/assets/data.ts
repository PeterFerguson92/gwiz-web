import type { PricingPlanType } from "@/types";

export const pricingPlans: PricingPlanType[] = [
    {
        name: 'Basic Pack',
        description: 'Create interactive forms that connect to your workflow.',
        monthlyPrice: 29,
        yearlyPrice: 99,
        billingNote: 'Billed Yearly',
        title: 'Everything you get with Basic',
        features: [
            'Indoor/outdoor Lighting Installation',
            'Appliance & Fixture Installation',
            'Unlimited Seats & Role Access',
            'Annual Electrical Inspection',
            'Inspection Ceiling Fan Installation'
        ],
        active: false,
        aos: 'flip-right',
        duration: 800
    },
    {
        name: 'Premium Pack',
        description: 'Create interactive forms that connect to your workflow.',
        monthlyPrice: 199,
        yearlyPrice: 399,
        billingNote: 'Billed Yearly',
        title: 'Everything you get with Basic',
        features: [
            'Indoor/outdoor Lighting Installation',
            'Appliance & Fixture Installation',
            'Unlimited Seats & Role Access',
            'Annual Electrical Inspection',
            'Inspection Ceiling Fan Installation'
        ],
        active: true,
        aos: 'flip-left',
        duration: 1000
    },
    {
        name: 'Stander Pack',
        description: 'Create interactive forms that connect to your workflow.',
        monthlyPrice: 259,
        yearlyPrice: 999,
        billingNote: 'Billed Yearly',
        title: 'Everything you get with Basic',
        features: [
            'Indoor/outdoor Lighting Installation',
            'Appliance & Fixture Installation',
            'Unlimited Seats & Role Access',
            'Annual Electrical Inspection',
            'Inspection Ceiling Fan Installation'
        ],
        active: false,
        aos: 'flip-right',
        duration: 1200
    }
];