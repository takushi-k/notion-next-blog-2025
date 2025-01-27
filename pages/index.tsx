import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Card from '../components/Card'
import Layout from '../components/Layout'
import { siteConfig } from '../site.config'
import { IndexProps } from '../types/types'
import { fetchPages } from '../utils/notion'
import { sampleCards } from '../utils/sample'

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { results } = await fetchPages({});
//   return {
//     props: {
//       pages: results ? results : [],
//     },
//   };
// };

export const getStaticProps: GetStaticProps = async () => {
  const { results } = await fetchPages({})
  // console.log('resultsです', results)
  return {
    props: {
      pages: results ? results : [],
    },
    revalidate: 10,
  }
}

const Home: NextPage<IndexProps> = ({ pages }) => {
  // console.log('pagesです', pages)
  return (
    <Layout>
      <div className="pt-12">
        <h1 className="text-5xl mb-8">
          {siteConfig.title}(爆速でブログサイトを自作してみた)
        </h1>
        <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12">
          {/* Card */}
          {pages.map((page, index) => (
            <Card key={index} page={page} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home
