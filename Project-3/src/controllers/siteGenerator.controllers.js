const brand = "LumaFlux";
const logo = "logo.png";
const siteTitle = (page) => `${brand} | ${page}`;

const homePage = (req, res) => {
    const data = {
        title: siteTitle("Home"),
        logo,
        faq: "4-RkTMV7PL.svg",
        portfolio: "img-1.jpg",
        service: "img-4.jpg",
        testi1: "anant-sir.jpg",
        testi2: "keyur-sir.png",
        blog1: "img-1.jpg",
        blog2: "img-2.jpg",
        blog3: "img-3.jpg"
    };

    console.info("rendering LumaFlux home page")
    res.render("pages/home", data);
};

const featuresPage = (req, res) => {
    const data = {
        title: siteTitle("Features"),
        logo
    };
    res.render("pages/features", data);
};

const faqPage = (req, res) => {
    const data = {
        title: siteTitle("FAQ"),
        logo,
        faq: "4-RkTMV7PL.svg"
    };

    res.render("pages/faq", data);
};

const portfolioPage = (req, res) => {
    const data = {
        title: siteTitle("Portfolio"),
        logo,
        portfolio: "img-1.jpg"
    };

    res.render("pages/portfolio", data);
};

const pricingPage = (req, res) => {
    const data = {
        title: siteTitle("Pricing"),
        logo
    };
    
    res.render("pages/pricing", data);
};

const servicesPage = (req, res) => {
    const data = {
        title: siteTitle("Services"),
        logo,
        service: "img-4.jpg"
    };

    res.render("pages/services", data);
};

const testimonialPage = (req, res) => {
    const data = {
        title: siteTitle("Testimonials"),
        logo,
        testi1: "anant-sir.jpg",
        testi2: "keyur-sir.png"
    };

    res.render("pages/testimonial", data);
};

const blogPage = (req, res) => {
    const data = {
        title: siteTitle("Blog"),
        logo,
        blog1: "img-1.jpg",
        blog2: "img-2.jpg",
        blog3: "img-3.jpg"
    };
    res.render("pages/blog", data);
};

const contactPage = (req, res) => {
    const data = {
        title: siteTitle("Contact"),
        logo
    };
    
    res.render("pages/contact", data);
};

const email = (req, res) => {
    console.log("Newsletter Email:", req.body.email);
    res.redirect("/");
}

module.exports = { 
    homePage,
    featuresPage,
    faqPage,
    portfolioPage,
    pricingPage,
    servicesPage,
    testimonialPage,
    blogPage,
    contactPage,
    email
};