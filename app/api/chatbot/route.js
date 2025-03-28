import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(apiKey);

// Predefined roles with structured response formats
const roles = {
    1: {
        description: "You are a financial assistant who provides users with clear and concise answers to general finance-related questions, such as budgeting, savings, debt management, and financial planning. Ensure your responses are accurate and user-friendly, offering practical advice.",
        format: (response) => ({ type: "finance", reply: response.text(), category: "General Finance Assistance", source: "AI-powered response" })
    },
    2: {
        description: "You are an investment advisor who suggests suitable investment options based on the user's risk preference, investment horizon, and financial goals. Make sure your recommendations align with the given criteria and explain why each option is suitable.",
        format: (response) => ({ type: "investment", recommendations: response.text(), category: "Investment Advice", source: "AI-generated insights", disclaimer: "Investments are subject to market risks." })
    },
    3: {
        description: "You are a loan approval assistant who evaluates loan eligibility based on household income, monthly savings, loan amount, and investment type. Provide a clear and well-reasoned assessment of whether the loan is likely to be approved or rejected.",
        format: (response) => ({ type: "loan", approval_status: response.text(), category: "Loan Eligibility", confidence: "Predicted outcome based on financial data analysis" })
    },
    4: {
        description: "You are a market analyst specializing in commodity price predictions. Use historical trends, market indicators, and other relevant data to generate a forecast for commodity prices over a given period. Ensure you communicate the inherent uncertainties in market predictions.",
        format: (response) => ({ type: "commodity", forecast: response.text(), category: "Market Forecasting", disclaimer: "Market trends are subject to fluctuations and unforeseen factors." })
    }
};

export async function POST(request) {
    try {
        const { message, role_number } = await request.json();
        
        if (!roles[role_number]) {
            return NextResponse.json({ error: "Invalid role selected. Please choose a valid role number." }, { status: 400 });
        }
        
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `${roles[role_number].description}\nUser Query: ${message}\nProvide a detailed and structured response according to the role's requirements.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        return NextResponse.json(roles[role_number].format(response));
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
