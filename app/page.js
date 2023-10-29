// app/page.js
import Link from "next/link";
import Image from "next/image";
import heroPic from "../public/images/index-hero.jpg";
import profilePic from "../public/images/profile.jpg";

const Index = () => {
  return (
    <>
      <div>
        <Image src={heroPic} alt="hero" />
        <div>
          <h1>I'm Piro Garzarg</h1>
          <h3>Next Developer</h3>
        </div>
      </div>
      <div>
        <div>
          <div>
            <h2>Next Nerd</h2>
            <p>Lorem Ipsum is ****</p>
          </div>
          <div>
            <Image src={profilePic} alt="hero" />
          </div>
        </div>
        <div>
          <h2>Skills</h2>
          <div>
            <div><img src = "/images/javascript.svg" alt="javascript"/><span>JavaScript / 3 years</span></div>
            <div><img src = "/images/react.svg" alt="react"/><span>react / 2 years</span></div>
            <div><img src = "/images/gatsby.svg" alt="gatsby"/><span>Gatsby / 0 years</span></div>
            <div><img src = "/images/next.svg" alt="next"/><span>Next.JS / 2 years</span></div>
          </div>
        </div>
        <div>
          <Link href="/contact">Make It Happen!</Link>
        </div>
      </div>
    </>
  )
  };

export default Index;