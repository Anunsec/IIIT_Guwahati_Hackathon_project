import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "$2B+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your spending patterns with AI-powered analytics",
    href: "/analytics",
  },
  {
    icon: <Receipt className="h-8 w-8 text-blue-600" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data automatically from receipts using advanced AI technology",
    href: "/receipt-scanner",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
    href: "/budget-planning",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "Community Support",
    description:
      "Connect with a supportive financial community, share insights, and get expert guidance while managing multiple accounts and credit cards seamlessly",
    href: "/community-support",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: "Learn Finance",
    description: "Interactive lessons to build your financial knowledge",
    href: "/learn-finance",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Market Analysis",
    description:
      "Leverage AI-driven market analysis to uncover trends, assess risks, and receive data-backed financial recommendations for smarter decision-making",
    href: "/market-analysis",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "1. Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "2. Market Analysis",
    description:
      "Use AI-driven analysis to spot trends, assess risks, and get data-backed financial insights for smarter decisions.",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "3. Get Insights",
    description:
      "Receive AI-powered insights and recommendations to optimize your finances",
  },
  
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Gayathri Devi",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "Welth has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed.",
  },
  {
    name: "Rajendra prasad",
    role: "Local Village Man",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.",
  },
  {
    name: "Sahil kumar",
    role: "Financial Advisor",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "I recommend Welth to all my clients. The multi-currency support and detailed analytics make it perfect for international investors.",
  },
];
