export function SectionPlaceholder({ title, bgClass = "bg-white" }: { title: string, bgClass?: string }) {
    return (
        <section className={`w-full py-20 ${bgClass} border-t border-neutral-100`}>
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-neutral-300 uppercase tracking-widest">{title} Section</h2>
                <p className="text-neutral-400 mt-4">Coming Soon</p>
            </div>
        </section>
    )
}
