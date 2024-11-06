import Header from "../../components/header.js";
import Footer from "../../components/footer.js";

(async () => {
  try {
    const [headerContent, footerContent] = await Promise.all([
      Header(),
      Footer(),
    ]);
    // Insert content into the DOM
    document.querySelector("#header").innerHTML = headerContent;
    document.querySelector("#footer").innerHTML = footerContent;
  } catch (error) {
    console.error("Error loading components:", error);
  }
})();
