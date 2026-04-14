import app from "./src/app.js";

function main() {
    try {
        const PORT = 8080;

        app.listen(PORT, () => {
            console.log("Server starting on port: " + PORT);
        })

    } catch (error) {
        console.log(error);
        throw error;
    }
}

main();
