import React from 'react'
import CardNav, { CardNavItem } from './ui/Navbar';
import logo from '../assests/Weblogo.png'

export const Navbar = (props) => {

    const items = [
  {
    label: "About",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Company-soon", ariaLabel: "About Company", href: "/#company" },
      { label: "Careers-soon", ariaLabel: "About Careers", href: "/#careers" }
    ]
  },
  {
    label: "Projects",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Featured", ariaLabel: "Featured Projects", href: "/#projects" },
      { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/#projects" }
    ]
  },
  {
    label: "Contact",
    bgColor: "#271E37",
    textColor: "#fff",
    links: [
      { label: "Email", ariaLabel: "Email us", href: "mailto:kapilrhode0000@gmail.com" },
      { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://www.linkedin.com/in/kabilan12-j/" }
    ]
  }
];

  return (
      <div className="sticky top-0 left-0 z-50 right-0 w-[90%] mx-auto ">
        <CardNav
          logo={logo}
          logoAlt="Company Logo"
          items={items}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
      </div>
  );
}

