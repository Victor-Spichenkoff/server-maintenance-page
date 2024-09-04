export const Header = ({ title }: { title: string }) => {

    return (
        <>
            <header className="text-center text-3xl text-white font-semibold py-6">
                <h1>
                    {title}
                </h1>
            </header>
            <hr />
        </>
    )
}