import { About, Contacts, Intro, Projects } from '@/components';
import { useScrollToSection } from '@/hooks';
import { sectionsId } from '@/constants';
import './HomePage.scss';

function Home() {
  useScrollToSection();
  return (
    <>
      <Intro id={sectionsId.intro} />
      <About id={sectionsId.about} />
      <Projects id={sectionsId.projects} />
      <Contacts id={sectionsId.contacts} />
    </>
  );
}

export default Home;
