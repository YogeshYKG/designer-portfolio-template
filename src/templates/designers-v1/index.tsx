import type { Designer } from "@/types/designer";
import CaseStudies from "@/components/designer-v1/caseStudies/CaseStudies";
import Tools from "@/components/designer-v1/tools/Tools";
import Contact from "@/components/designer-v1/contact/Contact";
import Footer from "@/components/designer-v1/footer/Footer";
import FeaturedProjects from "@/components/designer-v1/featuredProjects/FeaturedProjects";
import Strip from "@/components/designer-v1/strip/Strip";
import Hero from "@/components/designer-v1/hero/Hero";
import DesignProcess from "@/components/designer-v1/designProcess/DesignProcess";
import Navbar from "@/components/designer-v1/navbar/Navbar";
import Sidebar from "@/components/designer-v1/sidebar/Sidebar";

type Props = {
  designer: Designer;
};

export default function DesignerV1({ designer }: Props) {
  return (
    <>
      <Navbar navbarData={designer} />
      <Sidebar sidebarData={designer.socials} /> 
      <main className="layoutContainer">
        {designer?.sections?.hero && <Hero data={designer.data.hero} background="grid" />}
        <Strip type={1} />
        {designer?.sections?.featuredProjects && <FeaturedProjects data={designer.data.featuredProjects} />}
        <Strip type={2} />
        {designer?.sections?.designProcess && <DesignProcess data={designer.data.designProcess} background="grid"/>}
        {designer?.sections?.caseStudies && <CaseStudies data={designer.data.caseStudies} />}
        {designer?.sections?.tools && <Tools data={designer.data.tools} />}
        {designer?.sections?.contact && <Contact data={designer.data.contact} />}

      </main>
      <Footer />
    </>
  );
}