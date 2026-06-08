const express = require("express");
const router = express.Router();
const { 
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
} = require("../controllers/siteGenerator.controllers");

router.get("/", homePage);
router.get("/features", featuresPage);
router.get("/faq", faqPage);
router.get("/portfolio", portfolioPage);
router.get("/pricing", pricingPage);
router.get("/services", servicesPage);
router.get("/testimonial", testimonialPage);
router.get("/blog", blogPage);
router.get("/contact", contactPage);
router.post("/email", email);

module.exports = router;