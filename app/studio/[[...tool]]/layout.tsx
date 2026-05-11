export const metadata = {
  title: 'Sanity Studio - Ilanthoodhu',
  description: 'Manage Ilanthoodhu Literary Journal Content',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="sanity-studio"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        margin: 0,
        padding: 0,
        background: '#101112',
      }}
    >
      {children}
    </div>
  )
}
