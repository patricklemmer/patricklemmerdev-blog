// Imports
// Next imports
import Image from 'next/image'
import Link from 'next/link'

//Styles imports
import styles from '@/styles/Slug.module.css'

// Icon imports
import { HiArrowNarrowLeft } from 'react-icons/hi'

// Package imports
import { GraphQLClient, gql } from 'graphql-request'
import moment from 'moment'

const graphcms = new GraphQLClient(
  'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cldowi58f1mk801ul15ulgazw/master'
)

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`
const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST)
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  const data = await graphcms.request(QUERY, { slug })
  const post = data.post
  return {
    props: {
      post,
    },
    revalidate: 30,
  }
}

export default function BlogPost({ post }) {
  return (
    <main className={styles.blog}>
      <Link href="/" className={styles.backLink}>
        <HiArrowNarrowLeft />
        <p>Back to All Posts</p>
      </Link>
      <div>
        <Image
          className={styles.cover}
          src={post.coverPhoto.url}
          alt={post.title}
          width={600}
          height={250}
        />
        <div className={styles.title}>
          <div className={styles.authdetails}>
            <Image
              src={post.author.avatar.url}
              alt={post.author.name}
              className={styles.authdetailsImage}
              width={40}
              height={40}
            />
            <div className={styles.authtext}>
              <h6>By {post.author.name} </h6>
              <h6 className={styles.date}>
                {moment(post.datePublished).format('MMMM d, YYYY')}
              </h6>
            </div>
          </div>
          <h2>{post.title}</h2>
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        ></div>
      </div>
      <Link href="/" className={styles.backLink}>
        <HiArrowNarrowLeft />
        <p>Back to All Posts</p>
      </Link>
    </main>
  )
}
