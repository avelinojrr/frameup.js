import chalkAnimation from "chalk-animation";
import figlet from "figlet";

/**
 * Message of welcome
 */

async function welcomeMessage() {
    const rainbowText = chalkAnimation.rainbow(
        figlet.textSync(
            'Frameupjs',
        )
    )
}

await welcomeMessage();