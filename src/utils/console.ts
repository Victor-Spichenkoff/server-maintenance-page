export class Cons {
    static dev (message: string) {
        if (process.env.NODE_ENV === 'development')
            console.log(`Dev: ${message}`)
    }

    static Red(message: string) {
        console.log(`%c${message}`, "color: red; font-weight: bold;")
    }

    static Blue(message: string) {
        console.log(`%c${message}`, "color: skyblue; font-weight: bold;")
    }


    static Yellow(message: string) {
        console.log(`%c${message}`, "color: yellow; font-weight: bold;")
    }

    static ConsoleRed(message: string) {
        console.log(`${RED}${message}${RESET}`)
    }

    static ConsoleBlue(message: string) {
        console.log(`${BLUE}${message}${RESET}`)
    }


    static ConsoleYellow(message: string) {
        console.log(`${YELLOW}${message}${RESET}`)
    }

    static RedBackground(message: string) {
        console.log(`${RED_BG}${message}${RESET}`)
    }

    static BlueBackground(message: string) {
        console.log(`${BLUE_BG}${message}${RESET}`)
    }
}

export const BLUE = "\x1b[34m";
export const BLUE_BG = "\x1b[44m";
export const RED = "\x1b[31m";
export const RED_BG = "\x1b[41m";
export const YELLOW = "\x1b[33m";
export const RESET = "\x1b[0m";
