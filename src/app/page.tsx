'use client'

import {clsx} from 'clsx';
import {useState, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image'
import {useTheme} from "next-themes";

import MinecraftSkinViewer from '@/components/MinecraftSkinViewer';
import {Accordion} from '@/components/Accordion'
import { ProductCard } from "@/components/ProductCard";
import { Scramble } from "@/components/ScrambleText"
import ThemeToggle from "@/components/ThemeToggle"

import LowerArrow from '../../public/LowerArrow.svg'
import CrownIcon from '../../public/crown.svg'
import RightArrow from '../../public/RightArrow.svg'
import LeftArrow from '../../public/LeftArrow.svg'

import styles from './main.module.css'
import 'swiper/css';



export default function Home() {
  const [hasArrowMoved, setHasArrowMoved] = useState(false); // 右下の矢印を一度だけ動かす
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [isHoverdOnName, setIsHoverdOnName] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  


  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.profileSection}>
          <div className={styles.leftColumn}>
            <div className={styles.names} onMouseEnter={() => setIsHoverdOnName(true)} onMouseLeave={() => setIsHoverdOnName(false)}>
              <div className={styles.enName}>
                <Scramble
                  initialText = "Yamada Yugo"
                  hoverText = "    Megaak"
                  type = "en"
                  active={isHoverdOnName}
                />
              </div>
              <div className={styles.jaName}>
                <Scramble
                  initialText = "山田 優吾"
                  hoverText = "めがあく"
                  type = "ja"
                  active={isHoverdOnName}
                />
              </div>
            </div>
            <div className={styles.skin}>
              <MinecraftSkinViewer 
                skinUrl={"/Megaaak.png"} 
                width={200} 
                height={500} 
                autoRotate={false}
                model="classic"
              />
            </div>
          </div>

          <div className={styles.middleColumn}>
            <div className={styles.middleItems}>
              <div className={styles.aboutMe}>
                <h1 className={clsx(styles.title,styles.aboutMeTitle)}>About Me</h1>
                <p><span className={styles.highlight}>2005</span>生まれ</p>
                <p><span className={styles.highlight}>福岡</span>生まれ育ち</p>
                <div className={styles.wrapperDeg}>
                  <p><span className={styles.highlight}>北九州工業高等専門学校<br/>情報システムコース</span>在学中</p>
                  <LowerArrow className={`${styles.lowerArrow1} ${hasArrowMoved ? styles.moved : ''}`} onMouseEnter={() => setHasArrowMoved(true)}></LowerArrow>
                  <LowerArrow className={`${styles.lowerArrow2} ${hasArrowMoved ? styles.moved : ''}`} onMouseEnter={() => setHasArrowMoved(true)}></LowerArrow>
                  <LowerArrow className={`${styles.lowerArrow3} ${hasArrowMoved ? styles.moved : ''}`} onMouseEnter={() => setHasArrowMoved(true)}></LowerArrow>
                </div>
                <p className={clsx(styles.highlight,styles.ikigomi)}><span className={styles.marker}>つよつよエンジニア</span>に<br/>成るべく日々勉強中</p>

              </div>
              <div className={styles.skills}>
                <h1 className={styles.title}>Skills & Langs</h1>
                <div className={styles.wrapperGo}>
                  <CrownIcon className={styles.crown}></CrownIcon>
                  <div className={styles.wrapperGoAccordion}>
                    <Accordion title="Go" description="普段からメインで書いています！主にバックエンド開発をするときに用いています！現在はEffective Goを読んだり、標準ライブラリを読んだりしています！"/>
                  </div>
                </div>
                <Accordion title="C" description="学校の授業で習いました！基本的な構文は書くことができます！"/>
                <Accordion title="Python" description="機械学習を用いるために、研究で書いています！"/>
                <Accordion title="HTML / CSS" description="簡単なフロントエンドであれば書くことができます！"/>
                <Accordion title="Next.js / React" description="フロントエンドフレームワークとしてよく用いています！SSRやstate管理に関してはまだまだ未熟です！"/>
                <Accordion title="Terraform" description="触ったことがある程度ですが、プロダクト開発に用いたことがあります！"/>
                <Accordion title="Docker" description="コンテナを使うときによく用いています！DockerfileやDocker Composeなどを用いて開発しています！"/>
                <Accordion title="Git / Github" description="開発を行うときはほぼ必ず使用しています！GithubActionsでのCI/CDパイプラインを構築しています！"/>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productsSection}>
          <h1 className={styles.title}>Products</h1>
          <div className={styles.productCards}>
            <Swiper
              modules={[Navigation]} // ナビゲーション（矢印）機能を使う
              loop={true}            // ★これで無限ループになります
              centeredSlides={true}
              navigation={{
                nextEl: nextEl,
                prevEl: prevEl,
              }}
              breakpoints={{
                  // 画面幅が0pxから768pxまでの場合
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20, // 必要であれば、スマホでのスペースも調整できます
                  },
                  // 画面幅が769px以上の場合
                 700: {
                     slidesPerView: 2,
                     spaceBetween: 0, // 必要であれば、PCでのスペースも調整できます
                    },
                  1150: {
                     slidesPerView: 1,
                     spaceBetween: 0, // 必要であれば、PCでのスペースも調整できます
                    },
                  1600: {
                    slidesPerView: 3,
                    spaceBetween: 0, // 必要であれば、PCでのスペースも調整できます
                  },
               }}
              className="mySwiper"
            >
              <SwiperSlide>
                <ProductCard 
                  title="2vs2将棋"
                  detailUrl='https://topaz.dev/projects/25d00c5fb3c16d590d84'
                  description='味方と完全ランダムマッチング！会話、チャット禁止の完全読み合い将棋です。もし味方と同じ駒を選ぶと、手が合成されます！'
                  githubUrl='https://github.com/shii-park/2vs2shogi'
                  imagePath='/2vs2shogi.png'
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard 
                  title="2vs2将棋"
                  detailUrl='https://topaz.dev/projects/25d00c5fb3c16d590d84'
                  description='味方と完全ランダムマッチング！会話、チャット禁止の完全読み合い将棋です。もし味方と同じ駒を選ぶと、手が合成されます！'
                  githubUrl='https://github.com/shii-park/2vs2shogi'
                  imagePath='/2vs2shogi.png'
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard 
                  title="2vs2将棋"
                  detailUrl='https://topaz.dev/projects/25d00c5fb3c16d590d84'
                  description='味方と完全ランダムマッチング！会話、チャット禁止の完全読み合い将棋です。もし味方と同じ駒を選ぶと、手が合成されます！'
                  githubUrl='https://github.com/shii-park/2vs2shogi'
                  imagePath='/2vs2shogi.png'
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard 
                  title="2vs2将棋"
                  detailUrl='https://topaz.dev/projects/25d00c5fb3c16d590d84'
                  description='味方と完全ランダムマッチング！会話、チャット禁止の完全読み合い将棋です。もし味方と同じ駒を選ぶと、手が合成されます！'
                  githubUrl='https://github.com/shii-park/2vs2shogi'
                  imagePath='/2vs2shogi.png'
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard 
                  title="2vs2将棋"
                  detailUrl='https://topaz.dev/projects/25d00c5fb3c16d590d84'
                  description='味方と完全ランダムマッチング！会話、チャット禁止の完全読み合い将棋です。もし味方と同じ駒を選ぶと、手が合成されます！'
                  githubUrl='https://github.com/shii-park/2vs2shogi'
                  imagePath='/2vs2shogi.png'
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard 
                  title="2vs2将棋"
                  detailUrl='https://topaz.dev/projects/25d00c5fb3c16d590d84'
                  description='味方と完全ランダムマッチング！会話、チャット禁止の完全読み合い将棋です。もし味方と同じ駒を選ぶと、手が合成されます！'
                  githubUrl='https://github.com/shii-park/2vs2shogi'
                  imagePath='/2vs2shogi.png'
                />
              </SwiperSlide>
           </Swiper>
           <button type="button" ref={(node) => setPrevEl(node)} className={`custom-prev-button ${styles.leftArrow}`} >
              <LeftArrow />
           </button>
           <button type="button" ref={(node) => setNextEl(node)} className={`custom-next-button ${styles.rightArrow}`} >
              <RightArrow />
           </button>
          </div>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.icons}>
          {mounted ? (<>
          <a href="https://github.com/meg44k" target="_blank" rel="noopener noreferrer">
              {resolvedTheme === "dark" ? (
                <Image src="/github-mark-white.png" alt="xのロゴ" width={50} height={50}/>
              ) : (
                <Image src="/github-mark-black.png" alt="xのロゴ" width={50} height={50}/>
              )}
            </a>
            <a href="https://x.com/MegaakDev" target="_blank" rel="noopener noreferrer">
              {resolvedTheme === "dark" ? (
                <Image src="/x-logo-white.png" alt="xのロゴ" width={50} height={50}/>
              ) : (
                <Image src="/x-logo-black.png" alt="xのロゴ" width={50} height={50}/>
              )}
            </a>
            </>) 
          : (<></>)
          }
            
            <div className={styles.themeToggle}>
              <ThemeToggle/>
            </div>
        </div>
      </div>
    </main>
  );
}
