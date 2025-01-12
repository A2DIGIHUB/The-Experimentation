import Image from 'next/image'
import Link from 'next/link'

interface ArticleCardProps {
  title: string
  excerpt: string
  category: string
  readTime: string
  image: string
  slug: string
}

const ArticleCard = ({ title, excerpt, category, readTime, image, slug }: ArticleCardProps) => {
  return (
    <article className="card group">
      <Link href={`/articles/${slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-sm font-medium text-primary-blue">{category}</span>
            <span className="text-sm text-gray-500">{readTime}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-blue transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 line-clamp-2">{excerpt}</p>
        </div>
      </Link>
    </article>
  )
}

export default ArticleCard
