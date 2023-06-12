import { defineConfig } from "vite"

export default defineConfig({
    base: '/trabalho-gerencia-projetos/',
    server:{
        port:3000
    },
    build: {
        chunkSizeWarningLimit: 1600,
    }
})
