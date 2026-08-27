import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedProperties from '@/components/FeaturedProperties'
import TrustSection from '@/components/TrustSection'
import ListPropertyCTA from '@/components/ListPropertyCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProperties />
      <TrustSection />
      <ListPropertyCTA />
    </main>
  )
}