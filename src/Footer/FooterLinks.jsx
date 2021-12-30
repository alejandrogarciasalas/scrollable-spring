import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

const LinksWrapper = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-flow: column;
  column-gap: 1.5rem;
  row-gap: 1.5rem;

  @media (max-width: 62rem) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-flow: row;
  }

  @media (max-width: 50rem) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row;
  }

  @media (max-width: 32rem) {
    display: flex;
    flex-direction: column;
    row-gap: 0;
  }
`;

const LinksStyle = styled.div`
  width: 100%;

  @media (max-width: 32rem) {
    border: 2px solid #eaeafa;
    border-radius: 0.75rem;
    background: white;
    margin-bottom: 0.75rem;
  }
`;

const Heading = styled.h4`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #2e248f;
  font-variation-settings: "wght" 500, "wdth" 120;
  padding-bottom: 1rem;
`;

const HeadingButton = styled.button`
  font-size: 1.125rem;
  color: #2e248f;
  font-variation-settings: "wght" 600;
  padding-bottom: 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  height: 3rem;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  width: 100%;

  .chevron {
    position: absolute;
    right: 1.25rem;
    transition: transform 300ms;
  }
`;

const LinkList = styled.ul`
  list-style-type: none;

  @media (max-width: 32rem) {
    padding-bottom: 1.25rem;
    padding-top: 0.25rem;
  }
`;

const ItemContentHider = styled.div`
  transition: height 300ms, opacity 300ms, transform 300ms;
  overflow: hidden;
  opacity: ${(props) => (props.open ? `1` : "0")};
  transform: ${(props) => (props.open ? `translateY(0)` : "translateY(-1rem)")};

  height: ${(props) =>
    props.open
      ? `${props.contentHeight ? `${props.contentHeight}px` : "auto"}`
      : "0"};
`;

const ListItem = styled.li`
  @media (max-width: 32rem) {
    font-size: 1.125rem;
    width: 100%;
    margin: 0;
  }
`;

const Link = styled.a`
  font-size: 1.125rem;
  color: #211e4f;
  line-height: 160%;
  font-variation-settings: "wght" 300;
  transition: font-variation-settings 200ms, letter-spacing 200ms;
  line-height: 170%;
  width: 100%;

  @media (max-width: 32rem) {
    font-variation-settings: "wght" 400;
    line-height: 200%;
    height: 2.25rem;
    padding: 0 1.25rem;
    display: block;
  }

  b {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: white;
    background: #ad58db;
    font-variation-settings: "wght" 500, "wdth" 120;
    padding: 0.125rem 0.375rem;
    border-radius: 0.375rem;
    transition: font-variation-settings 200ms, letter-spacing 200ms;
    margin-left: 0.125rem;
  }

  &:hover {
    font-variation-settings: "wght" 600;

    b {
      font-variation-settings: "wght" 700, "wdth" 120;
    }
    /* letter-spacing: -0.023em; */
  }
`;

const links = [
  {
    name: "Create",
    span: true,
    links: [
      "Facebook video ads",
      "Facebook cover videos",
      "Instagram videos ads",
      "Slideshow videos",
      "YouTube videos",
      "YouTube intros",
      "Promo videos",
      "Demo videos",
      "Video memes",
      "Video montages",
      "Testimonial videos",
      "Corporate videos"
    ]
  },
  {
    name: "Tools",
    span: true,
    links: [
      "Video maker",
      "Edit",
      "Record",
      "Compress",
      "Convert",
      "Rotate",
      "Trim",
      "Record webcam",
      "Record screen",
      "Video overlay",
      "Loop video and gifs",
      <>
        Mobile app <b>new</b>
      </>
    ]
  },
  {
    name: "Resources",
    span: false,
    links: ["Blog", "Video templates", "Stock library"]
  },
  {
    name: "Support",
    span: false,
    links: ["Help", "Contact"]
  },
  {
    name: "About",
    span: false,
    links: [
      "Pricing",
      "Company",
      <>
        Careers <b>Hiring</b>
      </>,
      "Media kit",
      "Partnerships"
    ]
  }
  // {
  //   name: "Legal",
  //   span: false,
  //   links: [
  //     <Link href="">Terms & conditions</Link>,
  //     <Link href="">Privacy policy</Link>,
  //     <Link href="">Cookie notice</Link>,
  //     <Link href="">Childrens policy</Link>
  //   ]
  // }
];

export function Links({ linkList, title, gridRow, mobile }) {
  const [height, setHeight] = useState(0);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  useLayoutEffect(() => {
    if (listRef.current) {
      const rectHeight = listRef.current.scrollHeight;
      if (rectHeight && rectHeight !== height) {
        setHeight(rectHeight);
      }
    }
  });

  const links = linkList.map((y, i) => (
    <ListItem key={i}>
      <Link tabIndex={open ? 0 : -1}>{y}</Link>
    </ListItem>
  ));

  return (
    <LinksStyle style={{ gridRow }}>
      {mobile ? (
        <HeadingButton onClick={toggle}>
          {title}
          <svg
            style={{ transform: open ? `rotate(-180deg)` : "rotate(0deg)" }}
            className="chevron"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </HeadingButton>
      ) : (
        <Heading>{title}</Heading>
      )}

      {mobile ? (
        <ItemContentHider contentHeight={height} open={open}>
          <LinkList ref={listRef}>{links}</LinkList>
        </ItemContentHider>
      ) : (
        <LinkList ref={listRef}>{links}</LinkList>
      )}
    </LinksStyle>
  );
}

export default function FooterLinks() {
  const mediaQuery = window.matchMedia("(max-width: 32rem)");
  const [mobile, setMobile] = useState(mediaQuery.matches);

  function handleTabletChange(e) {
    setMobile(e.matches);
  }

  mediaQuery.addListener(handleTabletChange);

  return (
    <LinksWrapper>
      {links.map((x, i) => (
        <Links
          key={i}
          mobile={mobile}
          title={x.name}
          gridRow={x.span ? "1 / 3" : "initial"}
          linkList={x.links}
        ></Links>
      ))}
    </LinksWrapper>
  );
}
