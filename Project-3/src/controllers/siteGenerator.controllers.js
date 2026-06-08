const homePage = (req, res) => {
    const data = {
        title: "Aero Page | Home",
        logo: "logo.png",
        faq: "4-RkTMV7PL.svg",
        portfolio: "img-1.jpg",
        service: "img-4.jpg",
        testi1: "anant-sir.jpg",
        testi2: "keyur-sir.png",
        blog1: "img-1.jpg",
        blog2: "img-2.jpg",
        blog3: "img-3.jpg"
    };

    console.info("here it is")
    res.render("pages/home", data)
}

const featuresPage = (req, res) => {
    const data = {
        title: "Aero Page | Features",
        logo: "logo.png"
    };
    res.render("pages/features", data);
}

const faqPage = (req, res) => {
    data = {
        title: "Aero Page | FAQ",
        logo: "logo.png",
        faq: "4-RkTMV7PL.svg"
    };

    res.render("pages/faq", data);
}

const portfolioPage = (req, res) => {
    const data = {
        title: "Aero Page | Portfolio",
        logo: "logo.png",
        portfolio: "img-1.jpg"
    };

    res.render("pages/portfolio", data);
}

const pricingPage = (req, res) => {
    const data = {
        title: "Aero Page | Pricing",
        logo: "logo.png"
    }
    
    res.render("pages/pricing", data);
}

const servicesPage = (req, res) => {
    const data = {
        title: "Aero Page | Service",
        logo: "logo.png",
        service: "img-4.jpg"
    };

    res.render("pages/services", data);
}

const testimonialPage = (req, res) => {
    const data = {
        title: "Aero Page | Testimonial",
        logo: "logo.png",
        testi1: "anant-sir.jpg",
        testi2: "keyur-sir.png"
    };

    res.render("pages/testimonial", data);
}

const blogPage = (req, res) => {
    const data = {
        title: "Aero Page | Blog",
        logo: "logo.png",
        blog1: "img-1.jpg",
        blog2: "img-2.jpg",
        blog3: "img-3.jpg"
    };
    res.render("pages/blog", data);
}


module.exports = { 
    homePage,
    featuresPage,
    faqPage,
    portfolioPage,
    pricingPage,
    servicesPage,
    testimonialPage,
    blogPage
};