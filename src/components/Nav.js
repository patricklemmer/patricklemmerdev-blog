// Imports
// Next imports
import Link from 'next/link'

// Styles imports
import styles from '@/styles/Nav.module.css'

// Icon imports
import { HiArrowNarrowLeft } from 'react-icons/hi'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navDirect}>
        <div className={styles.navBack}>
          <HiArrowNarrowLeft className={styles.navArrow} />
          <Link href="https://www.patricklemmer.dev" className={styles.navLink}>
            Home
          </Link>
        </div>
      </div>
      <div>
        <h1 className={styles.navHeader}>Blog</h1>
      </div>
    </nav>
  )
}
