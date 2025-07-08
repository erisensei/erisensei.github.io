// Configuration file for Eri Nakafutami's Portfolio Website
// Update these values to customize the website content

const CONFIG = {
    // Personal Information
    name: "Eri Nakafutami",
    title: "Japanese Language Tutor",
    japaneseName: "恵理",
    greeting: "こんにちは！",
    
    // Contact Information
    email: "sorasora.brown@gmail.com",
    preplyProfile: "https://preply.com/ja/tutor/6337467",
    
    // Social Media Links (add your actual links)
    socialMedia: {
        // linkedin: "https://linkedin.com/in/eri-nakafutami",
        // twitter: "https://twitter.com/eri_nakafutami",
        // instagram: "https://instagram.com/eri_nakafutami",
        // youtube: "https://youtube.com/@eri_nakafutami"
    },
    
    // Statistics (update with actual numbers)
    stats: {
        lessons: "50+",
        experience: "3+",
        countries: "🇯🇵 🇦🇺 🇺🇸 🇨🇦 🇫🇯 🇪🇸 🇹🇭"
    },
    
    // Teaching Experience
    experience: {
        years: 3,
        description: "I tailor each lesson to suit your level and goals, making sure learning Japanese is fun, easy to understand, and truly sticks. With a background in nursing and healthcare, I bring a unique perspective to Japanese language teaching, especially for those interested in Japanese healthcare and welfare."
    },
    
    // Services and Pricing (update with actual rates)
    services: [
        {
            name: "Beginner Japanese",
            description: "Perfect for those starting their Japanese journey. Learn basic grammar, vocabulary, and essential phrases.",
            features: [
                "Hiragana & Katakana mastery",
                "Basic grammar structures", 
                "Essential vocabulary",
                "Simple conversations"
            ],
            price: "$25/hour" // Update with actual pricing
        },
        {
            name: "Intermediate Japanese",
            description: "Build upon your foundation with more complex grammar, Kanji, and natural conversation skills.",
            features: [
                "Kanji introduction & practice",
                "Complex grammar patterns",
                "Reading comprehension",
                "Fluid conversations"
            ],
            price: "$30/hour" // Update with actual pricing
        },
        {
            name: "Advanced Japanese",
            description: "Master advanced concepts, business Japanese, and achieve near-native fluency.",
            features: [
                "Advanced Kanji mastery",
                "Business Japanese",
                "Academic writing",
                "Cultural nuances"
            ],
            price: "$35/hour" // Update with actual pricing
        },
        {
            name: "JLPT Preparation",
            description: "Specialized preparation for Japanese Language Proficiency Test (N5-N1 levels).",
            features: [
                "Test-specific strategies",
                "Practice exams",
                "Grammar & vocabulary focus",
                "Reading & listening skills"
            ],
            price: "$40/hour" // Update with actual pricing
        }
    ],
    
    // Testimonials (replace with actual student testimonials)
    testimonials: [
        {
            text: "Eri-sensei is an amazing teacher! Her patience and clear explanations made learning Japanese so much easier. I've improved dramatically in just a few months.",
            author: "Sarah M.",
            level: "Beginner Student"
        },
        {
            text: "The cultural context Eri provides makes learning Japanese much more meaningful. She doesn't just teach the language, she helps you understand Japan.",
            author: "Michael T.",
            level: "Intermediate Student"
        },
        {
            text: "Eri's JLPT preparation course was excellent. Her structured approach and practice materials helped me pass N3 with confidence!",
            author: "Emma L.",
            level: "JLPT Student"
        }
    ],
    
    // Teaching Approach
    approach: [
        {
            title: "Conversation-Focused Learning",
            description: "Learn Japanese through natural conversations, not just textbook exercises. I emphasize practical communication skills that you can use in real-life situations.",
            icon: "fas fa-comments"
        },
        {
            title: "Cultural Integration",
            description: "Language and culture are inseparable. Learn about Japanese customs, traditions, and social norms while mastering the language.",
            icon: "fas fa-palette"
        },
        {
            title: "Progress Tracking",
            description: "Regular assessments and feedback ensure you're making steady progress toward your language goals.",
            icon: "fas fa-chart-line"
        }
    ],
    
    // Features/Specialties
    features: [
        {
            title: "Certified Educator",
            description: "Professional teaching qualifications and continuous training",
            icon: "fas fa-graduation-cap"
        },
        {
            title: "Student-Centered",
            description: "Tailored lessons based on your learning style and goals",
            icon: "fas fa-users"
        },
        {
            title: "Cultural Immersion",
            description: "Learn language through authentic cultural context",
            icon: "fas fa-heart"
        }
    ],
    
    // SEO and Meta Information
    seo: {
        title: "Eri Nakafutami - Japanese Language Tutor",
        description: "Learn Japanese with Eri Nakafutami - Professional Japanese language tutor offering personalized lessons for all levels. Start your Japanese journey today!",
        keywords: "Japanese tutor, Japanese lessons, Japanese language learning, JLPT preparation, online Japanese classes, Japanese teacher"
    },
    
    // Colors (optional - customize the color scheme)
    colors: {
        primary: "#e74c3c",
        secondary: "#2c3e50", 
        accent: "#f39c12"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 