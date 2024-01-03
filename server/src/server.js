import web  from "./app/web.js";

web.listen(process.env.PORT, () => {
    console.log(`\n> server running on http://localhost:${process.env.PORT} \n> development`)
})