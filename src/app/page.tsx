import styles from './main.module.css'
import {clsx} from 'clsx';
import MinecraftSkinViewer from '@/components/MinecraftSkinViewer';
import {Accordion} from '@/components/Accordion'

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.names}>
            <p className={styles.enName}>Yamada Yugo</p>
            <p className={styles.jaName}>山田 優吾</p>
          </div>
          <div className={styles.skin}>
            <MinecraftSkinViewer 
              skinUrl={"/megaaak.png"} 
              width={500} 
              height={500} 
              autoRotate={false}
              model="classic"
            />
          </div>
        </div>

        <div className={styles.middleColumn}>
          <div className={styles.middleItems}>
            <div className={styles.aboutMe}>
              <h1 className={styles.title}>About Me</h1>
              <p><span className={styles.highlight}>2005</span>生まれ</p>
              <p><span className={styles.highlight}>福岡</span>生まれ育ち</p>
              <p><span className={styles.highlight}>北九州工業高等専門学校<br/>情報システムコース</span>在学中</p>
              <p className={clsx(styles.highlight,styles.ikigomi)}>バックエンドエンジニアに成るべく日々勉強中</p>
            </div>
            <div className={styles.skills}>
              <h1 className={styles.title}>Skills & Langs</h1>
              <Accordion title="Go" description="普段からメインで書いています。主にバックエンド開発をするときに用いています。現在はEffective Goを読んだり、標準ライブラリを読んだりしています。"/>
              <Accordion title="C" description="学校の授業で習いました。基本的な構文は書くことができます。"/>
              <Accordion title="Python" description="機械学習を用いるために、研究で書いています。"/>
              <Accordion title="HTML / CSS" description="簡単なフロントエンドであれば書くことができます。"/>
              <Accordion title="Next.js / React" description="フロントエンドフレームワークとしてよく用いています。SSRやstate管理に関してはまだまだ未熟です。"/>
              <Accordion title="Terraform" description="触ったことがある程度ですが、プロダクト開発に用いたことがあります。"/>
              <Accordion title="Docker" description="コンテナを使うときによく用いています。DockerfileやDocker Composeなどを用いて開発しています。"/>
              <Accordion title="Git / Github" description="開発を行うときはほぼ必ず使用しています。GithubActionsでのCI/CDパイプラインを構築しています。"/>

              <br/>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          ccc
        </div>

      </div>
    </main>
  );
}
