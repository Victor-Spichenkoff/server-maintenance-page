import {NextUIProvider} from "@nextui-org/react"

export const NextUiProvider = ({ children }: { children:React.ReactNode }) => {
    return (
    <NextUIProvider>
        { children }
      </NextUIProvider> 
    )
}