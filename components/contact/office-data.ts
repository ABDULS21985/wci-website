// Office data - exported separately for server component compatibility

export interface OfficeData {
    name: string;
    city: string;
    address: string[];
    phones: string[];
    email: string;
    timezone: string;
    mapUrl: string;
    whatsapp?: string;
    bestTimeToCall: string;
}

export const officesData: OfficeData[] = [
    {
        name: "Nigeria Headquarters",
        city: "Abuja",
        address: [
            "15 D Yalinga Crescent",
            "Off Adedokumbo Ademola Crescent",
            "Wuse 2, Abuja, Nigeria",
        ],
        phones: ["+234 (0) 816 177 8448"],
        email: "connect@globaldigibit.com",
        timezone: "Africa/Lagos",
        mapUrl: "https://maps.google.com/?q=15+D+Yalinga+Crescent+Wuse+2+Abuja+Nigeria",
        whatsapp: "2348161778448",
        bestTimeToCall: "9 AM - 5 PM WAT (Mon-Fri)",
    },
    {
        name: "Doha Office",
        city: "Doha",
        address: ["Level 14, Commercial Bank Plaza", "West Bay, Doha, Qatar"],
        phones: ["+974 3147 5305", "+974 7795 3122", "+974 300 74170"],
        email: "connect@globaldigibit.com",
        timezone: "Asia/Qatar",
        mapUrl: "https://maps.google.com/?q=Commercial+Bank+Plaza+West+Bay+Doha",
        whatsapp: "97431475305",
        bestTimeToCall: "8 AM - 5 PM AST (Sun-Thu)",
    },
];
