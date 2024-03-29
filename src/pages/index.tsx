import { GetStaticProps } from "next";
import Head from "next/head";
import styles from '../styles/home.module.scss';

import Image from "next/image";

import techsImage from '../../public/images/techs.svg';

import { getPrismicClient } from "../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from 'prismic-dom';

type Content = {
  title: string;
  titleContent: string;
  linkAction: string;
  mobileTitle: string;
  mobileContent: string;
  mobileBanner: string;
  webTitle: string;
  webContent: string;
  webBanner: string;
}

interface ContentProps {
  content: Content
}

export default function Home({ content }: ContentProps) {
  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <span>{content.titleContent}</span>
            <a href={content.linkAction}>
              <button>
                COMEÇAR AGORA
              </button>
            </a>
          </section>

          <img 
            src="images/banner-conteudos.png"
          />
        </div>

        <hr className={styles.divisor}/>

        <div className={styles.sectionContent}>
          <section>
            <h2>{content.mobileTitle}</h2>
            <span>{content.mobileContent}</span>
          </section>

          <img 
            src={content.mobileBanner}
            alt="Conteúdos desenvolvimento de apps"
          />
        </div>

        <hr className={styles.divisor}/>

        <div className={styles.sectionContent}>
          <img 
            src={content.webBanner}
            alt="Conteúdos desenvolvimento de aplicacoes web"
          />

          <section>
            <h2>{content.webTitle}</h2>
            <span>{content.webContent}</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image 
            src={techsImage}
            alt="Tecnologias"
          />
          <h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira para o próximo nível</h2>
          <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
          <a href={content.linkAction}>
            <button>ACESSAR TURMA</button>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])

  // console.log(response.results[0].data)

  const {
    title, subtitle, link_action,
    mobile, mobile_content, mobile_banner,
    title_web, web_content, web_banner
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(subtitle),
    linkAction: link_action.url,
    mobileTitle: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    webTitle: RichText.asText(title_web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url
  };

    return {
      props: {
        content
      },
      revalidate: 60 * 2 // Every 2 hours
    }
}