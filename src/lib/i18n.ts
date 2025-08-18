import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.features": "Features",
      "nav.benefits": "Benefits", 
      "nav.pricing": "Pricing",
      "nav.contact": "Contact",
      "nav.signIn": "Sign In",
      "nav.getDemo": "Get Demo",
      
      // Hero Section
      "hero.title": "Modern Property Management",
      "hero.subtitle": "Simplified",
      "hero.description": "Streamline your property management operations with our comprehensive platform. Manage tenants, track maintenance, collect rent, and generate reports - all in one place.",
      "hero.startTrial": "Start Free Trial",
      "hero.watchDemo": "Watch Demo",
      "hero.stats.properties": "Properties Managed",
      "hero.stats.satisfaction": "Customer Satisfaction",
      "hero.stats.support": "Support Available",
      
      // Features Section
      "features.title": "Comprehensive Property Management Features",
      "features.subtitle": "Everything you need to manage your properties efficiently and profitably",
      "features.portfolio.title": "Property Portfolio Management",
      "features.portfolio.description": "Organize and track all your properties in one centralized dashboard with detailed information and analytics.",
      "features.tenant.title": "Tenant Management",
      "features.tenant.description": "Manage tenant information, lease agreements, and communication all in one place.",
      "features.maintenance.title": "Maintenance Scheduling",
      "features.maintenance.description": "Schedule and track maintenance requests with automated workflows and vendor management.",
      "features.payments.title": "Rent Collection",
      "features.payments.description": "Automated rent collection with multiple payment options and late fee management.",
      "features.analytics.title": "Financial Analytics", 
      "features.analytics.description": "Comprehensive reporting and analytics to track your property performance and ROI.",
      "features.security.title": "Security & Compliance",
      "features.security.description": "Bank-level security with compliance features to protect your data and operations.",
      "features.mobile.title": "Mobile Access",
      "features.mobile.description": "Access your property management tools on-the-go with our mobile-responsive platform.",
      "features.automation.title": "Smart Automation",
      "features.automation.description": "Automate routine tasks like lease renewals, payment reminders, and maintenance schedules.",
      
      // Benefits Section
      "benefits.title": "Why Choose PropertyFlow?",
      "benefits.description": "Join thousands of property managers who have transformed their operations",
      "benefits.revenue.title": "Increase Revenue",
      "benefits.revenue.description": "Optimize rent collection and reduce vacancy rates with automated processes.",
      "benefits.revenue.metric": "+15% Revenue",
      "benefits.time.title": "Save Time",
      "benefits.time.description": "Automate repetitive tasks and streamline your workflow for maximum efficiency.",
      "benefits.time.metric": "20+ Hours/Week",
      "benefits.costs.title": "Reduce Costs", 
      "benefits.costs.description": "Lower operational costs through efficient resource management and automation.",
      "benefits.costs.metric": "-30% Costs",
      "benefits.satisfaction.title": "Improve Tenant Satisfaction",
      "benefits.satisfaction.description": "Provide better service with faster response times and transparent communication.",
      "benefits.satisfaction.metric": "98% Satisfied",
      "benefits.stats.title": "Trusted by Property Managers Worldwide",
      "benefits.stats.properties": "Properties Under Management",
      "benefits.stats.managers": "Property Managers",
      "benefits.stats.uptime": "Platform Uptime",
      "benefits.stats.countries": "Countries Served",
      
      // Contact Section
      "contact.title": "Ready to Transform Your Property Management?",
      "contact.description": "Get in touch with our team to learn how PropertyFlow can help streamline your operations.",
      "contact.form.name": "Full Name",
      "contact.form.email": "Email Address",
      "contact.form.company": "Company Name",
      "contact.form.properties": "Number of Properties",
      "contact.form.message": "Tell us about your needs",
      "contact.form.submit": "Schedule Demo",
      "contact.details.email": "Email Us",
      "contact.details.phone": "Call Us",
      "contact.details.address": "Visit Us",
      "contact.details.chat": "Live Chat",
      "contact.trial.title": "Start Your Free Trial Today",
      "contact.trial.description": "No credit card required. Get full access to all features for 14 days.",
      "contact.trial.button": "Start Free Trial",
      
      // Footer
      "footer.description": "The complete property management solution for modern real estate professionals.",
      "footer.product": "Product",
      "footer.support": "Support",
      "footer.copyright": "© 2024 PropertyFlow. All rights reserved.",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      
      // Pricing
      "pricing.title": "Choose Your Plan",
      "pricing.subtitle": "Select the perfect plan for your property management needs",
      "pricing.monthly": "Monthly",
      "pricing.annually": "Annually",
      "pricing.starter.name": "Starter",
      "pricing.starter.description": "Perfect for individual property owners",
      "pricing.starter.features.1": "Up to 5 properties",
      "pricing.starter.features.2": "Basic tenant management",
      "pricing.starter.features.3": "Rent collection",
      "pricing.starter.features.4": "Email support",
      "pricing.professional.name": "Professional",
      "pricing.professional.description": "Ideal for small to medium property managers",
      "pricing.professional.features.1": "Up to 50 properties",
      "pricing.professional.features.2": "Advanced analytics",
      "pricing.professional.features.3": "Maintenance management",
      "pricing.professional.features.4": "Priority support",
      "pricing.professional.features.5": "Mobile app access",
      "pricing.enterprise.name": "Enterprise",
      "pricing.enterprise.description": "Comprehensive solution for large portfolios",
      "pricing.enterprise.features.1": "Unlimited properties",
      "pricing.enterprise.features.2": "Custom integrations",
      "pricing.enterprise.features.3": "Advanced reporting",
      "pricing.enterprise.features.4": "24/7 dedicated support",
      "pricing.enterprise.features.5": "API access",
      "pricing.enterprise.features.6": "White-label options",
      "pricing.getStarted": "Get Started",
      "pricing.contactSales": "Contact Sales"
    }
  },
  ar: {
    translation: {
      // Navigation
      "nav.features": "المميزات",
      "nav.benefits": "الفوائد", 
      "nav.pricing": "الأسعار",
      "nav.contact": "اتصل بنا",
      "nav.signIn": "تسجيل الدخول",
      "nav.getDemo": "احصل على عرض",
      
      // Hero Section
      "hero.title": "إدارة الممتلكات الحديثة",
      "hero.subtitle": "مبسطة",
      "hero.description": "اجعل عمليات إدارة الممتلكات أكثر سلاسة مع منصتنا الشاملة. إدارة المستأجرين، تتبع الصيانة، جمع الإيجار، وإنشاء التقارير - كل شيء في مكان واحد.",
      "hero.startTrial": "ابدأ النسخة التجريبية",
      "hero.watchDemo": "شاهد العرض",
      "hero.stats.properties": "عقار مُدار",
      "hero.stats.satisfaction": "رضا العملاء",
      "hero.stats.support": "دعم متاح",
      
      // Features Section
      "features.title": "مميزات شاملة لإدارة الممتلكات",
      "features.subtitle": "كل ما تحتاجه لإدارة ممتلكاتك بكفاءة وربحية",
      "features.portfolio.title": "إدارة محفظة الممتلكات",
      "features.portfolio.description": "نظم وتتبع جميع ممتلكاتك في لوحة تحكم مركزية مع معلومات وتحليلات مفصلة.",
      "features.tenant.title": "إدارة المستأجرين",
      "features.tenant.description": "إدارة معلومات المستأجرين وعقود الإيجار والتواصل كله في مكان واحد.",
      "features.maintenance.title": "جدولة الصيانة",
      "features.maintenance.description": "جدولة وتتبع طلبات الصيانة مع سير عمل آلي وإدارة المقاولين.",
      "features.payments.title": "تحصيل الإيجار",
      "features.payments.description": "تحصيل إيجار آلي مع خيارات دفع متعددة وإدارة رسوم التأخير.",
      "features.analytics.title": "التحليلات المالية", 
      "features.analytics.description": "تقارير وتحليلات شاملة لتتبع أداء ممتلكاتك والعائد على الاستثمار.",
      "features.security.title": "الأمان والامتثال",
      "features.security.description": "أمان بمستوى البنوك مع مميزات الامتثال لحماية بياناتك وعملياتك.",
      "features.mobile.title": "الوصول المحمول",
      "features.mobile.description": "الوصول لأدوات إدارة الممتلكات أثناء التنقل مع منصتنا المتجاوبة.",
      "features.automation.title": "الأتمتة الذكية",
      "features.automation.description": "أتمتة المهام الروتينية مثل تجديد العقود وتذكيرات الدفع وجداول الصيانة.",
      
      // Benefits Section
      "benefits.title": "لماذا تختار PropertyFlow؟",
      "benefits.description": "انضم إلى آلاف مديري الممتلكات الذين حولوا عملياتهم",
      "benefits.revenue.title": "زيادة الإيرادات",
      "benefits.revenue.description": "تحسين تحصيل الإيجار وتقليل معدلات الشغور مع العمليات الآلية.",
      "benefits.revenue.metric": "+15% إيرادات",
      "benefits.time.title": "توفير الوقت",
      "benefits.time.description": "أتمتة المهام المتكررة وتبسيط سير عملك لأقصى كفاءة.",
      "benefits.time.metric": "20+ ساعة/أسبوع",
      "benefits.costs.title": "تقليل التكاليف", 
      "benefits.costs.description": "تقليل التكاليف التشغيلية من خلال إدارة الموارد بكفاءة والأتمتة.",
      "benefits.costs.metric": "-30% تكاليف",
      "benefits.satisfaction.title": "تحسين رضا المستأجرين",
      "benefits.satisfaction.description": "تقديم خدمة أفضل مع أوقات استجابة أسرع وتواصل شفاف.",
      "benefits.satisfaction.metric": "98% راضون",
      "benefits.stats.title": "موثوق من قبل مديري الممتلكات حول العالم",
      "benefits.stats.properties": "عقار تحت الإدارة",
      "benefits.stats.managers": "مدير عقارات",
      "benefits.stats.uptime": "وقت تشغيل المنصة",
      "benefits.stats.countries": "دولة مخدومة",
      
      // Contact Section
      "contact.title": "مستعد لتحويل إدارة ممتلكاتك؟",
      "contact.description": "تواصل مع فريقنا لتتعلم كيف يمكن لـ PropertyFlow أن يساعد في تبسيط عملياتك.",
      "contact.form.name": "الاسم الكامل",
      "contact.form.email": "عنوان البريد الإلكتروني",
      "contact.form.company": "اسم الشركة",
      "contact.form.properties": "عدد العقارات",
      "contact.form.message": "أخبرنا عن احتياجاتك",
      "contact.form.submit": "جدولة عرض",
      "contact.details.email": "راسلنا",
      "contact.details.phone": "اتصل بنا",
      "contact.details.address": "زرنا",
      "contact.details.chat": "دردشة مباشرة",
      "contact.trial.title": "ابدأ نسختك التجريبية المجانية اليوم",
      "contact.trial.description": "لا حاجة لبطاقة ائتمان. احصل على وصول كامل لجميع المميزات لمدة 14 يوماً.",
      "contact.trial.button": "ابدأ النسخة التجريبية",
      
      // Footer
      "footer.description": "الحل الشامل لإدارة الممتلكات للمتخصصين العقاريين الحديثين.",
      "footer.product": "المنتج",
      "footer.support": "الدعم",
      "footer.copyright": "© 2024 PropertyFlow. جميع الحقوق محفوظة.",
      "footer.privacy": "سياسة الخصوصية",
      "footer.terms": "شروط الخدمة",
      
      // Pricing
      "pricing.title": "اختر خطتك",
      "pricing.subtitle": "اختر الخطة المثالية لاحتياجات إدارة ممتلكاتك",
      "pricing.monthly": "شهرياً",
      "pricing.annually": "سنوياً",
      "pricing.starter.name": "المبتدئ",
      "pricing.starter.description": "مثالي لملاك العقارات الأفراد",
      "pricing.starter.features.1": "حتى 5 عقارات",
      "pricing.starter.features.2": "إدارة أساسية للمستأجرين",
      "pricing.starter.features.3": "تحصيل الإيجار",
      "pricing.starter.features.4": "دعم بريد إلكتروني",
      "pricing.professional.name": "المحترف",
      "pricing.professional.description": "مثالي لمديري الممتلكات الصغيرة والمتوسطة",
      "pricing.professional.features.1": "حتى 50 عقار",
      "pricing.professional.features.2": "تحليلات متقدمة",
      "pricing.professional.features.3": "إدارة الصيانة",
      "pricing.professional.features.4": "دعم أولوية",
      "pricing.professional.features.5": "وصول للتطبيق المحمول",
      "pricing.enterprise.name": "المؤسسي",
      "pricing.enterprise.description": "حل شامل للمحافظ الكبيرة",
      "pricing.enterprise.features.1": "عقارات غير محدودة",
      "pricing.enterprise.features.2": "تكاملات مخصصة",
      "pricing.enterprise.features.3": "تقارير متقدمة",
      "pricing.enterprise.features.4": "دعم مخصص 24/7",
      "pricing.enterprise.features.5": "وصول API",
      "pricing.enterprise.features.6": "خيارات العلامة البيضاء",
      "pricing.getStarted": "ابدأ",
      "pricing.contactSales": "اتصل بالمبيعات"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;