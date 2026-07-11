import { Layout } from '../components'

export function HomePage() {
  return (
    <Layout>
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Welcome</h2>
        <p className="text-gray-400">
          Базовая структура проекта готова. Начните с папок{' '}
          <code className="rounded bg-gray-900 px-2 py-1 text-sm">components</code>,{' '}
          <code className="rounded bg-gray-900 px-2 py-1 text-sm">pages</code>,{' '}
          <code className="rounded bg-gray-900 px-2 py-1 text-sm">data</code> и{' '}
          <code className="rounded bg-gray-900 px-2 py-1 text-sm">hooks</code>.
        </p>
      </section>
    </Layout>
  )
}
