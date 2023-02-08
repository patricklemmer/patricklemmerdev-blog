// Imports
// Next imports
import Image from 'next/image'
import Link from 'next/link'

// Package imports
import moment from 'moment'

// Styles import
import styles from '@/styles/BlogCard.module.css'

export default function BlogCard({
  title,
  author,
  coverPhoto,
  datePublished,
  slug,
}) {
  return (
    <div className={styles.card}>
      <Link href={`/posts/${slug}`}>
        <div className={styles.imageContainer}>
          <Image
            src={coverPhoto.url}
            alt="Blog post cover photo"
            className={styles.coverImage}
            fill
            priority
          />
        </div>
      </Link>
      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.details}>
          <div className={styles.author}>
            <Image
              src={author.avatar.url}
              alt={author.name}
              className={styles.authorImage}
              width={30}
              height={30}
            />
            <h3>{author.name}</h3>
          </div>
          <div className={styles.date}>
            <h3>{moment(datePublished).format('MMMM d, YYYY')}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
